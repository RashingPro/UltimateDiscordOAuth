const DISCORD_API_URL = "https://discord.com/api/"

export class DiscordApiResult {
    public readonly status: "success" | "error";
    public readonly data?: { [key: string]: any };
    constructor(status: "success" | "error", data?: {}) {
        this.status = status;
        if (data) this.data = data;
    }
}

export class DiscordApiCore {
    public static async fetch(
        apiEndpoint: string,
        method: "GET" | "POST" = "GET",
        data?: {},
        auth?: string[],
        apiVersion: number = 10,
        contentType: string = "application/x-www-form-urlencoded",
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
                headers.append('Authorization', 'Basic ' + btoa(auth.join(':')));
            }
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? body : undefined
            });
            const res_data = await response.json();
            return new DiscordApiResult("success", res_data);
        } catch (error) {
            return new DiscordApiResult("error", {"error": error});
        }
    }
}