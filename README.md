## Installation
First of all, you should install package using npm:
```
npm i @rashingpro/ultimate-discord-oauth
```

## Using
### Creating Discord app
You need create discord app. Go to https://discord.com/developers/applications/ -> New Application. After app will created, select OAuth2 in the left-side menu. Copy client id, then click Reset secret and copy it too. Remember: **NOBODY** must know client id and secret except of you. Add redirect URI, scroll down, select scopes you need, select redirect uri you've just added and copy generated url. More info about using Discord apps can be found in [official docs](https://discord.com/developers/docs/topics/oauth2)

### Using Discord OAuth in your project
Now you're ready to use OAuth in your project.
1. Import module:
```javascript
import DiscordOAuth from "@rashingpro/ultimate-discord-oauth";
```
2. Exchanging code/token:
   Next, user should go to url that you've copied on previous step. After that discord will redirect user to link <redirect uri>?code=<code>. You need to get code from url parameter, than to get token:
```javascript
const tokenResponse = await DiscordOAuth.exchangeCode(<code>, <redirect uri>, <client id>, <client secret>);
```
Strongly recommended not to store client id and secret in code (in variables). Instead of this, use `.env` files or any other way.<br>
`exchangeCode()` function will return object of class `DiscordApiResult`. More about it read in full docs here.