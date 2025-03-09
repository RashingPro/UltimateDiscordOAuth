import {DiscordApiCore, DiscordApiResult} from "./core";

export class DiscordOAuth {
    /**
     *
     * @param {string} code code got from discord auth url
     * @param {string} redirectUri must be equal to redirect uri that was selected when generate OAuth link
     * @param {string} clientId app's client id
     * @param {string} clientSecret app's client secret
     * @returns {Promise<DiscordApiResult>} read discord docs for more info about API response
     */
    public static async exchangeCode(code: string, redirectUri: string, clientId: string, clientSecret: string): Promise<DiscordApiResult> {
        return await DiscordApiCore.fetch(
            "/oauth2/token",
            "POST",
            {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirectUri
            },
            "application/x-www-form-urlencoded",
            [clientId, clientSecret]
        );
    }

    /**
     * Get info about current user. If app was authorised with email scope - email will be also provided
     * @return {Promise<DiscordApiResult>} info about current user
     */
    public static async getCurrentUser(): Promise<DiscordApiResult> {
        return await DiscordApiCore.fetch(
            "/users/@me",
            "GET"
        );
    }
}
