import { PrismaClient } from '@prisma/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const prisma = new PrismaClient()

interface RawFlower {
  id: string | number
  name: string
  imageUrl?: string | null
  color?: string[]
  type: string
  wholesalePrice: number | string
  retailPrice: number | string
  supplier?: string | null
  origin?: string | null
  season?: string[]
  availability: string
  quantityOnHand?: number
  vaseLife?: string | null
  careInstructions?: string | null
  notes?: string | null
  complementaryFlowerIds?: string[]
}

async function main(): Promise<void> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const dbPath = path.resolve(__dirname, '../db.json')

  const raw = await fs.readFile(dbPath, 'utf8')
  const data = JSON.parse(raw) as { flowers?: RawFlower[] }
  const flowers: RawFlower[] = Array.isArray(data?.flowers) ? data.flowers : []

  for (const f of flowers) {
    const id = String(f.id)
    const qty = typeof f.quantityOnHand === 'number' && Number.isFinite(f.quantityOnHand)
      ? Math.trunc(f.quantityOnHand)
      : 0
    const flowerData = {
      name: f.name,
      imageUrl: f.imageUrl ?? null,
      color: JSON.stringify(f.color ?? []),
      type: f.type,
      wholesalePrice: Number(f.wholesalePrice),
      retailPrice: Number(f.retailPrice),
      supplier: f.supplier ?? null,
      origin: f.origin ?? null,
      season: JSON.stringify(f.season ?? []),
      availability: f.availability,
      quantityOnHand: qty,
      vaseLife: f.vaseLife ?? null,
      careInstructions: f.careInstructions ?? null,
      notes: f.notes ?? null,
      complementaryFlowerIds: JSON.stringify(f.complementaryFlowerIds ?? []),
    }
    await prisma.flower.upsert({
      where: { id },
      update: flowerData,
      create: { id, ...flowerData },
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