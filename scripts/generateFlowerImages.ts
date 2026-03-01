/**
 * generateFlowerImages.ts
 *
 * Generates botanical flower images via the OpenAI DALL-E 3 API for every
 * flower in db.json that is missing an imageUrl.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... pnpm generate:images
 *
 * The script will:
 *   1. Find all flowers in db.json with no imageUrl.
 *   2. Call DALL-E 3 to generate a botanical photo for each.
 *   3. Download and save the image to public/images/flowers/<id>.png.
 *   4. Update db.json with the local path.
 *
 * Cost estimate (DALL-E 3, standard quality, 1024×1024):
 *   ~$0.04 per image. With 94 missing images ≈ $3.76 total.
 *
 * Rate limiting:
 *   Free-tier OpenAI accounts are limited to ~5 images/min.
 *   The script waits 13 s between requests by default (safe for free tier).
 *   If you are on a paid plan with higher limits, lower DELAY_MS below.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Config ───────────────────────────────────────────────────────────────────

const DELAY_MS = 13_000; // ms between requests — safe for free-tier rate limit
const IMAGE_DIR = 'public/images/flowers';
const DB_PATH = join(ROOT, 'db.json');

// ─── Types ────────────────────────────────────────────────────────────────────

interface DbFlower {
  id: string;
  name: string;
  type: string;
  imageUrl?: string;
  [key: string]: unknown;
}

interface Db {
  flowers: DbFlower[];
  [key: string]: unknown;
}

interface DalleResponse {
  data: { url: string }[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildPrompt(flower: DbFlower): string {
  return (
    `Professional botanical photograph of a ${flower.name} (${flower.type}). ` +
    `Isolated on a clean white background. Natural studio lighting, highly detailed ` +
    `petals and foliage. No people, no text, no watermarks.`
  );
}

async function generateImage(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${error}`);
  }

  const json = (await response.json()) as DalleResponse;
  const url = json.data[0]?.url;
  if (!url) throw new Error('No image URL returned from API');
  return url;
}

async function downloadImage(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download image: ${response.status}`);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const apiKey = process.env['OPENAI_API_KEY'];
  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.');
    console.error('Usage: OPENAI_API_KEY=sk-... pnpm generate:images');
    process.exit(1);
  }

  const db = JSON.parse(readFileSync(DB_PATH, 'utf8')) as Db;
  const missing = db.flowers.filter((f) => !f.imageUrl);

  if (missing.length === 0) {
    console.log('All flowers already have images. Nothing to do.');
    return;
  }

  console.log(`Found ${missing.length} flowers without images.`);
  console.log(`Estimated cost: ~$${(missing.length * 0.04).toFixed(2)} (DALL-E 3 standard)\n`);

  for (let i = 0; i < missing.length; i++) {
    const flower = missing[i];
    if (!flower) continue;

    const filename = `${flower.id}.png`;
    const localPath = `/${IMAGE_DIR}/${filename}`;
    const diskPath = join(ROOT, IMAGE_DIR, filename);

    console.log(`[${i + 1}/${missing.length}] Generating: ${flower.name}...`);

    try {
      const prompt = buildPrompt(flower);
      const imageUrl = await generateImage(prompt, apiKey);
      const imageData = await downloadImage(imageUrl);

      writeFileSync(diskPath, imageData);

      // Update in-memory db
      const dbFlower = db.flowers.find((f) => f.id === flower.id);
      if (dbFlower) dbFlower.imageUrl = localPath;

      console.log(`    ✓ Saved to ${localPath}`);
    } catch (err) {
      console.error(`    ✗ Failed for ${flower.name}:`, err instanceof Error ? err.message : err);
    }

    // Save db.json after each image in case the script is interrupted
    writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    // Respect rate limit — skip delay after last image
    if (i < missing.length - 1) {
      console.log(`    Waiting ${DELAY_MS / 1000}s before next request...`);
      await sleep(DELAY_MS);
    }
  }

  console.log('\nDone. Restart pnpm dev:api to serve the updated db.json.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
