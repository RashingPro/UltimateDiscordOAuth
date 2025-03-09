import {DiscordApiCore, DiscordApiResult} from "./core";

export class DiscordOAuth {
    public static async exchangeCode(code: string, redirectUri: string, clientId: string, clientSecret: string): Promise<DiscordApiResult> {
        const token = await DiscordApiCore.fetch(
            "/oauth2/token",
            "POST",
            {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirectUri
            },
            "application/x-www-form-urlencoded",
            [clientId, clientSecret]
        )
        return token;
    }
}
