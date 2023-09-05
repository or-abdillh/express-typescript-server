import { Request } from "express"
import { useAppConfig } from "@config/app.config"

const config = useAppConfig()

export const useHeader = {

    getTokenFrom(req: Request, key: string = config.headersAuthorization.key, useSplitter: boolean = true): string | undefined {

        if (useSplitter) {
            return req.headers?.authorization?.split(config.headersAuthorization.spliter)[1].trim()
        } else {
            return req.headers?.authorization
        }
    }
}
