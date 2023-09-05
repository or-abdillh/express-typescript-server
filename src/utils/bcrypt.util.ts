import bcrypt from 'bcrypt'
import { useAppConfig } from '@config/app.config'

const config = useAppConfig()

export const hash = (password: string): Promise<string> => {

    return bcrypt.genSalt(config.bcryptSaltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => hash)
}

export const hashValidate = (password: string, hash: string): Promise<boolean> => {

    return bcrypt.compare(password, hash)
        .then(res => true)
        .catch(err => false)
}
