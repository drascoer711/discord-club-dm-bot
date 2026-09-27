# Discord club announcement bot

This bot registers `/clubannounce` and allows only Discord user ID `1254494074619297837` to use it.

It posts announcements in the current server channel rather than sending unsolicited direct messages to every member. For broader outreach, use a club announcement channel or an explicit opt-in role/channel.

## Setup

1. Create a Discord application and bot in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Invite it with the `bot` and `applications.commands` scopes and permission to send messages.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Set environment variables:

   ```bash
   export DISCORD_TOKEN='your-bot-token'
   export DISCORD_CLIENT_ID='your-application-client-id'
   ```

5. Start it:

   ```bash
   npm start
   ```

Use `/clubannounce message:Your announcement` in a server where the bot can send messages.
