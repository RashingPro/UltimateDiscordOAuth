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
    static exchangeCode(code, redirectUri, clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield DiscordApiCore.fetch("/oauth2/token", "POST", {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirectUri
            }, "application/x-www-form-urlencoded", [clientId, clientSecret]);
            return token;
        });
    }
}
