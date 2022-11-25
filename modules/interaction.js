const {Client, ActivityType, EmbedBuilder} = require("discord.js");
config = require('../config');
settings = config.settings

let EmptyQueueMsg = "Queue empty ! \nPlease `/play` the song first";

function Ready(client){
    client.on("ready", () => {
        console.log("I am ready to Manage 👀 on:");
        client.user.setPresence({
            activities: [
                { 
                    name: `MG version 2.5`, 
                    type: ActivityType.Listening,
                    url: settings.url
                }
            ],
            status: 'dnd',
          });
          const Guilds = client.guilds.cache.map(guild => guild.id);
          //console.log(Guilds);
          Guilds.forEach((guildID) => {
            console.log(client.guilds.cache.get(guildID).name)
            if(guildID == 765642040913559573){
                (async () => {
                    try {
                
                        await rest.put(
                            Routes.applicationGuildCommands(settings.clientID, guildID), // Error is at guildID, as it is not getting the actual guilds ID, just the one I set for testing.
                            { body: commandsDev },
                        );
                    }
                    catch{
                        console.log("Hidden ERR");
                    }
                })();
            }
          });
    });
}


function Interactions(client){
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isChatInputCommand()){
            console.log("> " + interaction.member.user.username + '#' + interaction.member.user.discriminator)
            console.log(`used /${interaction.commandName}`);
        }
        if (interaction.commandName === 'help') {
            embed = new EmbedBuilder()
            .setColor("Green")
            //.setTitle(songName)
            //.setURL(songUrl)
            .setAuthor({ name: "*Help Page*", url: settings.url })
            .addFields(
                { name: "/play", value: "Play song, from YouTube query/link"},
                { name: "/skip", value: "Skip Current Song"},
                { name: "/stop", value: "Stop Playing all songs on queue"},
                { name: "/pause", value: "Pause play current song"},
                { name: "/resume", value: "Resume paued song"},
                { name: "/shuffle", value: "Changes the queue to randomly"},
                { name: "/seek", value: "Seek (seconds) to other moment on song"},
                { name: "/moveto", value: "Move song to selected minutes/seconds on song etc. (2:05)"},
                { name: "/queuelist", value: "Display all songs on queue list"},
                { name: "/progress", value: "Show progress of current song"},
                { name: "/support", value: "Support this Project"},
                { name: "_________", value: "*Sorry, playing live currently not supported*\nPlease reports all errors/issues on Support Server (you will find on bot status)"},
            )
            .setDescription("All Commands")
            interaction.reply({ embeds: [ embed ] });
        }
        if (interaction.commandName === 'support') {
            embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Thank you for use my project")
            //.setURL(songUrl)
            .setAuthor({ name: "*Support Author*", url: settings.url })
            .addFields(
                { name: "Info", value: "Your support gives me more desire to develop the project. Thank you for every penny spent"},
                { name: "Buy Coffee", value: settings.supporturl},
                { name: "Become a patreon", value: settings.patreonurl},
            )
            .setDescription("All Commands")
            interaction.reply({ embeds: [ embed ] });
        }
        if (interaction.commandName === 'play') {
            UserTextChannel = interaction.channel.id
            let channelName;
            let args = interaction.options.getString('song');
            try{
                channelName = interaction.member.voice.channel.name;
                let queue = client.player.createQueue(interaction.guild.id);
                await queue.join(interaction.member.voice.channel);
                queue.textChannel = interaction.channel.id
                let checkarg1 = args.includes('https://youtube.com') || args.includes('http://youtube.com')
                let checkarg2 = args.includes('https://youtu.be') || args.includes('http://youtu.be')
                let checkarg3 = args.includes('https://m.youtube.com') || args.includes('http://m.youtube.com')
                let checkarg4 = args.includes('https://www.youtube.com') || args.includes('http://www.youtube.com')
                let protocolcheck = args.includes('https://') || args.includes('http://')
                console.log(`test1: ${checkarg1}`)
                console.log(`test2: ${checkarg2}`)
                console.log(`test3: ${checkarg3}`)
                console.log(`test4: ${checkarg4}`)
                console.log(`proto: ${protocolcheck}`)

                // Test YouTube link

                if(protocolcheck){
                    if(checkarg1){
                        detect = 1
                    }
                    else if(checkarg2){
                        detect = 1
                    }
                    else if(checkarg3){
                        detect = 1
                    }
                    else if(checkarg4){
                        detect = 1
                    }
                    else{
                        detect = 0
                    }

                    if(detect == 1){
                        interaction.reply(`:musical_note:  Added **${args}** to queue on *${channelName}* :microphone:`)
                        await queue.play(args);
                    }
                    else{
                        interaction.reply("You can't play songs from outside YouTube")
                    }

                }
                else{
                    interaction.reply(`:musical_note:  Added **${args}** to queue on *${channelName}* :microphone:`)
                    await queue.play(args);

                }
    
            }catch{
                interaction.reply("You didn't connect to Voice Channel")
            }
        }
        if(interaction.commandName === 'skip'){
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                interaction.reply('Skipped playing current song');
                guildQueue.skip();
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
        if(interaction.commandName === 'stop'){
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                interaction.reply('Stop Playing Queue');
                guildQueue.stop();
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
    
        if(interaction.commandName === 'pause'){
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                guildQueue.setPaused(true);
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
        if(interaction.commandName === 'resume'){
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                guildQueue.setPaused(false);
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
        if(interaction.commandName === 'shuffle'){
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                interaction.reply('List songs on queue shuffled');
                guildQueue.shuffle();
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
        if(interaction.commandName === 'seek'){
            let args = interaction.options.getString('time');
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                interaction.reply(`Seeking music to ${args} seconds`);
                guildQueue.seek(parseInt(args) * 1000);
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
        if(interaction.commandName === 'moveto'){
            //let min2 = 0;
            let sec = parseInt(interaction.options.getString('seconds')) || 0;
            let min = parseInt(interaction.options.getString('minutes')) || 0;
            min2 = min * 60;
            let time = sec + min2
            if (sec > 0){
                if(min > 0){
                    seekText = `Seeking music to ${min}m ${sec}s`
                }
                else{
                    seekText = `Seeking music to ${sec}s`
                }
            }
            else if(min > 0){
                seekText = `Seeking music to ${min}m` 
            }
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                console.log("F:", sec + min2)
                interaction.reply(seekText);
                guildQueue.seek(parseInt(time) * 1000);
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }

        }
        if(interaction.commandName === 'queuelist'){
            let guildQueue = client.player.getQueue(interaction.guild.id);
            if(guildQueue){
                a = [];
                //interaction.reply("Result on console")
                //console.log(guildQueue.songs)
                for (song of guildQueue.songs){
                    sName = song.name
                    sUrl = song.url
                    sDuration = song.duration
                    x = { name: sName, value: `${sUrl} Duration: ${sDuration}`}
                    a.push(x)
                }
                console.log(a)
                embed = new EmbedBuilder()
                .setColor("Green")
                //.setTitle(songName)
                //.setURL(songUrl)
                .setAuthor({ name: "*Song's queue list*", url: settings.url })
                .addFields(
                    a
                )
                //.setDescription("")
                interaction.reply({ embeds: [ embed ] });
            }
            else{
                interaction.reply(EmptyQueueMsg);
            }
        }
        if(interaction.commandName === 'progress'){
            try{
                let guildQueue = client.player.getQueue(interaction.guild.id);
                const ProgressBar = guildQueue.createProgressBar();
                let progress = ProgressBar.times
                //console.clear();
                let songName = guildQueue.songs[0].name
                let songUrl = guildQueue.songs[0].url
                let songIcon = guildQueue.songs[0].thumbnail
                embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle(songName)
                .setURL(songUrl)
                .setAuthor({ name: 'Progress Song', iconURL: songIcon, url: settings.url })
                .setDescription(`Current progress: [${progress}]`)
                interaction.reply({ embeds: [ embed ] });
         }catch(e) {
            interaction.reply(EmptyQueueMsg);
         }
        }
    
    
    
        /* Only for Bot Staff Team Members */
        if(interaction.commandName === 'devreload'){
            console.log(typeof(interaction.guild.id))
            if(interaction.guild.id == 765642040913559573){
                if(interaction.member.user.id == 546747585675657226){
                    interaction.reply('Please Wait ... Bot reloading');
                    console.log('Rebooting bot...');
                    setTimeout(function(){
                        process.exit();
                    }, 1250);
                }
                else{
                    interaction.reply("You don't have permission to reload")
                }
    
            }
            else{
                interaction.reply('Unknown command');
            }
        }
    })
}



module.exports = {
    actionsInteraction: Interactions,
    botReady: Ready,
}
