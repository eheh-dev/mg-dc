token = process.env["BOT_TOKEN"];

module.exports = {
  app: {
    px: '!mg',
    token: token,
    playing: '[Maintenance MODE]'
  },
  settings: {
    prefix: '!',
    clientID: '919940620456443935',
    url: 'https://manager-discord.netlify.app',
    supporturl: 'https://www.buymeacoffee.com/klubuntu',
    patreonurl: 'https://patreon.com/klubuntu'
  },
  opt: {
    maxVol: 100,
    loopMessage: false,
    discordPlayer: {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
      }
    }
  }
};
