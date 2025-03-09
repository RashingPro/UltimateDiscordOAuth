var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DiscordApiCore } from "./core";
export class DiscordOAuth {
    /**
     *
     * @param {string} code code got from discord auth url
     * @param {string} redirectUri must be equal to redirect uri that was selected when generate OAuth link
     * @param {string} clientId app's client id
     * @param {string} clientSecret app's client secret
     * @returns {Promise<DiscordApiResult>} read discord docs for more info about API response
     */
    static exchangeCode(code, redirectUri, clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DiscordApiCore.fetch("/oauth2/token", "POST", {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirectUri
            }, "application/x-www-form-urlencoded", [clientId, clientSecret]);
        });
    }
    /**
     * Get info about current user. If app was authorised with email scope - email will be also provided
     * @return {Promise<DiscordApiResult>} info about current user
     */
    static getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DiscordApiCore.fetch("/users/@me", "GET");
        });
    }
}
