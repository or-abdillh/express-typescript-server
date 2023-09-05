import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const { role: Role } = prisma

export async function roleSeeders() {

    const roles: string[] = ['admin', 'user', 'author']

    for (const role of roles) {
        await Role.create({
            data: {
                name: role
            }
        })
    }
}