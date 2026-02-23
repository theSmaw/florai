import { PrismaClient } from '@prisma/client'

// Allow running without a .env by overriding the datasource URL.
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL || 'file:./dev.db' } }
})

async function main() {
  const count = await prisma.flower.count()
  const first = await prisma.flower.findFirst()
  console.log(`Flowers in DB: ${count}`)
  if (first) {
    console.log('First flower:', { id: first.id, name: first.name, type: first.type })
  } else {
    console.log('No flowers found. Try: pnpm prisma:push && pnpm prisma:seed')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
