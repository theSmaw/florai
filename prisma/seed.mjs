import { PrismaClient } from '@prisma/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const prisma = new PrismaClient()

async function main() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const dbPath = path.resolve(__dirname, '../db.json')

  const raw = await fs.readFile(dbPath, 'utf8')
  const data = JSON.parse(raw)
  const flowers = Array.isArray(data?.flowers) ? data.flowers : []

  for (const f of flowers) {
    const id = String(f.id)
    await prisma.flower.upsert({
      where: { id },
      update: {
        name: f.name,
        imageUrl: f.imageUrl ?? null,
        color: f.color ?? [],
        type: f.type,
        wholesalePrice: Number(f.wholesalePrice),
        retailPrice: Number(f.retailPrice),
        supplier: f.supplier ?? null,
        origin: f.origin ?? null,
        season: f.season ?? [],
        availability: f.availability,
        quantityOnHand: Number.isFinite(f.quantityOnHand) ? Math.trunc(f.quantityOnHand) : 0,
        vaseLife: f.vaseLife ?? null,
        careInstructions: f.careInstructions ?? null,
        notes: f.notes ?? null,
        complementaryFlowerIds: f.complementaryFlowerIds ?? []
      },
      create: {
        id,
        name: f.name,
        imageUrl: f.imageUrl ?? null,
        color: f.color ?? [],
        type: f.type,
        wholesalePrice: Number(f.wholesalePrice),
        retailPrice: Number(f.retailPrice),
        supplier: f.supplier ?? null,
        origin: f.origin ?? null,
        season: f.season ?? [],
        availability: f.availability,
        quantityOnHand: Number.isFinite(f.quantityOnHand) ? Math.trunc(f.quantityOnHand) : 0,
        vaseLife: f.vaseLife ?? null,
        careInstructions: f.careInstructions ?? null,
        notes: f.notes ?? null,
        complementaryFlowerIds: f.complementaryFlowerIds ?? []
      }
    })
  }

  console.log(`Seeded ${flowers.length} flowers`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
