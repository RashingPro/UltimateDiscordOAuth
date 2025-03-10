var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DISCORD_API_URL = "https://discord.com/api/";
export class DiscordApiResult {
    constructor(status, data) {
        this.status = status;
        if (data)
            this.data = data;
    }
}
export class DiscordApiCore {
    static fetch(apiEndpoint_1) {
        return __awaiter(this, arguments, void 0, function* (apiEndpoint, method = "GET", data, auth, apiVersion = 10, contentType = "application/x-www-form-urlencoded") {
            try {
                const url = DISCORD_API_URL + `v${apiVersion.toString()}` + apiEndpoint;
                let body;
                if (!data) {
                    body = undefined;
                }
                else {
                    if (contentType === "application/x-www-form-urlencoded") {
                        body = new URLSearchParams(data).toString();
                    }
                    else {
                        body = JSON.stringify(data);
                    }
                }
                const headers = new Headers();
                headers.append("Content-Type", contentType);
                if (auth) {
                    headers.append('Authorization', 'Basic ' + btoa(auth.join(':')));
                }
                const response = yield fetch(url, {
                    method: method,
                    headers: headers,
                    body: body ? body : undefined
                });
                const res_data = yield response.json();
                return new DiscordApiResult("success", res_data);
            }
            catch (error) {
                return new DiscordApiResult("error", { "error": error });
            }
        });
    }
}
