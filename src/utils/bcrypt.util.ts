import bcrypt from 'bcrypt'

// initial
const SALT_ROUNDS = 10

export const hash = (password: string): Promise<string> => {

    return bcrypt
        .genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => hash)
}
