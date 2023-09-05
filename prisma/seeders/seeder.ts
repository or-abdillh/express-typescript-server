import { PrismaClient } from "@prisma/client"
import { userSeeders } from "./user.seeders"
import { roleSeeders } from "./role.seeders"

const prisma = new PrismaClient()

async function main() {

    console.log('Seeding database ...')

    // running all seeder
    await roleSeeders()
    await userSeeders()
}

main()
    .then(async () => {
        console.log('Seeding completed')
        await prisma.$disconnect()
    })
    .catch(async err => {
        console.log('Seeding failed')
        console.log(err)

        await prisma.$disconnect()
        process.exit(1)
    })

