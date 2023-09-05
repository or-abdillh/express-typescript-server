import { PrismaClient } from "@prisma/client"
import { hash } from "@/utils/bcrypt.util"

const prisma = new PrismaClient()

const { user: User } = prisma

export async function userSeeders() {

    await User.createMany({
        data: [
            {
                name: 'Administrator',
                email: 'admin@gmail.com',
                password: await hash('password'),
                roleId: 1 // admin
            },
            {
                name: 'John Doe',
                email: 'john@gmail.com',
                password: await hash('password'),
                roleId: 2 // user
            }
        ]
    })
}