const DISCORD_API_URL = "https://discord.com/api/"

class DiscordApiResult {
    public readonly status: "success" | "error";
    public readonly data?: {};
    constructor(status: "success" | "error", data?: {}) {
        this.status = status;
        if (data) this.data = data;
    }
}

export class DiscordApiCore {
    public static async fetch(
        apiEndpoint: string,
        method: "GET" | "POST" = "POST",
        data?: {},
        contentType: string = "application/json",
        auth?: string[],
        apiVersion: number = 10
    ) {
        try {
            let body: string;
            const url = DISCORD_API_URL + `v${apiVersion.toString()}` + apiEndpoint;
            if (contentType === "application/x-www-form-urlencoded") {
                body = new URLSearchParams(data).toString();
            } else {
                body = JSON.stringify(data);
            }
            const headers = new Headers();
            headers.append("Content-Type", contentType);
            if (auth) {
                headers.append('Authorization', 'Basic ' + btoa(auth[0] + ":" + auth[1]));
            }
            console.log(url)
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            });
            const res_data = await response.json();
        } catch (error) {
            return new DiscordApiResult("error", {"error": error});
        }
    }
}