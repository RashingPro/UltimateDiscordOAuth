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
        authType: "Basic" | "Bearer" = "Bearer",
        apiVersion: number = 10,
        contentType: string = "application/x-www-form-urlencoded",
    ) {
        try {
            const url = DISCORD_API_URL + `v${apiVersion.toString()}` + apiEndpoint;

            let body: string | undefined;
            if (!data) {
                body = undefined
            } else {
                if (contentType === "application/x-www-form-urlencoded") {
                    body = new URLSearchParams(data).toString();
                } else {
                    body = JSON.stringify(data);
                }
            }

            const headers = new Headers();
            headers.append("Content-Type", contentType);
            if (auth) {
                if (authType === "Basic") {
                    headers.append('Authorization', `Basic ` + btoa(auth.join(':')));
                } else {
                    headers.append('Authorization', `Bearer ` + auth[0]);
                }

            }
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? body : undefined
            });
            const res_data = await response.json();
            if (!response.ok) {
                return new DiscordApiResult("error", {"error": response.statusText});
            }
            return new DiscordApiResult("success", res_data);
        } catch (error) {
            return new DiscordApiResult("error", {"error": error});
        }
    }
}