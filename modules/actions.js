function actions(client){
    client.player
    .on('channelEmpty',  (queue) =>
    console.log(`Everyone left the Voice Channel, queue ended.`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
    console.log(`Song ${song} was added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
    //client.channels.cache.get(queue.channel.id).send(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`)
    console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`)
    // Emitted when there was no more music to play.
    )
    .on('queueDestroyed',  (queue) =>
    console.log(`The queue was destroyed.`))
    // Emitted when the queue was destroyed (either by ending or stopping).    
    .on('queueEnd', function(queue){
    console.log(`The queue has ended.`)
    client.channels.cache.get(queue.textChannel).send(":stop_button:  Queue Ended (Sorry, live currently not supported)")
    // Emitted when a song changed.
    })
    .on('songChanged', function(queue, newSong, oldSong){
    client.channels.cache.get(queue.textChannel).send(`:arrow_forward:  Started, next playing ${newSsong}`)
    console.log(`Started, next playing ${newSong} on ${queue.guild.name}`)
    //client.channels.cache.get(queue.channel.id).send(`${newSong} is now playing.`)
    //console.log(`${newSong} is now playing.`))
    // Emitted when a first song in the queue started playing.
    })
    .on('songFirst', function(queue, song) {
    client.channels.cache.get(queue.textChannel).send(`:arrow_forward:  Started playing ${song}`)
    console.log(`Started playing ${song} on ${queue.guild.name}`)
    ///console.log(`Started playing ${song}.`)
    //var_dump(queue.connection.channel)
    // Emitted when someone disconnected the bot from the channel.
    })
    .on('clientDisconnect', function(queue){
    console.log(`I was kicked from the Voice Channel, queue ended.`)
    client.channels.cache.get(queue.textChannel).send(`:x: User kicked, me from channel. Queue ended`)
    })
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
    console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
    console.log(`Error: ${error} in ${queue.guild.name}`);
    });
}



module.exports = {
    actionsPlayer: actions,
}