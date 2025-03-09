[![wakatime](https://wakatime.com/badge/github/RashingPro/UltimateDiscordOAuth.svg)](https://wakatime.com/badge/github/RashingPro/UltimateDiscordOAuth)
## Installation
First of all, you should install package using npm:
```
npm i @rashingpro/ultimate-discord-oauth
```

## Using
> [!NOTE]
> This package originally written on TypeScript and docs also provided with TypeScript using. Using on JS can be different, feel freely to use issues section
### Creating Discord app
You need create discord app. Go to https://discord.com/developers/applications/ -> New Application. After app will created, select OAuth2 in the left-side menu. Copy client id, then click Reset secret and copy it too.
> [!CAUTION]
> **NOBODY** must know client id and secret except of you.

Add redirect URI, scroll down, select scopes you need, select redirect uri you've just added and copy generated url.
> [!TIP]
> More info about using Discord apps can be found in [official docs](https://discord.com/developers/docs/topics/oauth2)

### Using Discord OAuth in your project
Now you're ready to use OAuth in your project.
1. Import module:
   ```javascript
   import DiscordOAuth from "@rashingpro/ultimate-discord-oauth";
   ```
2. Exchanging code/token:<br>
   Next, you should redirect user to url that you've copied on previous step. After that discord will redirect user to following url:<br>
   `<redirect uri>?code=<code>`<br>
   You need to get code from url parameter, than to get token:
   ```javascript
   const tokenResponse = await DiscordOAuth.exchangeCode(<code>, <redirect uri>, <client id>, <client secret>);
   ```
> [!WARNING]
> Strongly recommended **NOT** to store client id and secret in code (in variables). Instead of this, use `.env` files or any other way.
   
   `exchangeCode()` function will return object of class `DiscordApiResult`. More about it read in full docs [here](https://github.com/RashingPro/UltimateDiscordOAuth/wiki).
