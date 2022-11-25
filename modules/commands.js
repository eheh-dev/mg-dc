let commands = [
    {
        name: 'play',
        description: 'Play Song !',
        options: [
            {
                name: 'song',
                description: 'Song to play',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'skip',
        description: 'Skip current song',
    },
    {
        name: 'stop',
        description: 'Stop playing queued songs',
    },
    {
        name: 'seek',
        description: 'Seek to moment on song',
        options: [
            {
                name: 'time',
                description: 'Time to seek',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'moveto',
        description: 'Move postion playing for current song',
        options: [
            {
                name: 'minutes',
                description: 'Minutes',
                type: 3,
            },
            {
                name: 'seconds',
                description: 'Seconds',
                type: 3,
            },
        ],
    },
    {
        name: 'pause',
        description: 'Pause current moment at the song',
    },
    {
        name: 'resume',
        description: 'Resume paused moment at the song',
    },
    {
        name: 'shuffle',
        description: 'Shuffle songs on queue list',
    },
    {
        name: 'queuelist',
        description: 'Display songs from queue list',
    },
    {
        name: 'progress',
        description: 'Display progress of current song'
    },
    {
        name: 'help',
        description: 'View all commands'
    },
    {
        name: 'support',
        description: 'Support this project'
    },
];


let commandsDev = [
    {
        name: 'play',
        description: 'Play Song !',
        options: [
            {
                name: 'song',
                description: 'Song to play',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'skip',
        description: 'Skip current song',
    },
    {
        name: 'stop',
        description: 'Stop playing queued songs',
    },
    {
        name: 'seek',
        description: 'Seek to moment on song',
        options: [
            {
                name: 'time',
                description: 'Time to seek',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'moveto',
        description: 'Move postion playing for current song',
        options: [
            {
                name: 'minutes',
                description: 'Minutes',
                type: 3,
            },
            {
                name: 'seconds',
                description: 'Seconds',
                type: 3,
            },
        ],
    },
    {
        name: 'pause',
        description: 'Pause current moment at the song',
    },
    {
        name: 'resume',
        description: 'Resume paused moment at the song',
    },
    {
        name: 'shuffle',
        description: 'Shuffle songs on queue list',
    },
    {
        name: 'queuelist',
        description: 'Display songs from queue list',
    },
    {
        name: 'progress',
        description: 'Display progress of current song'
    },
    {
        name: 'help',
        description: 'View all commands'
    },
    {
        name: 'support',
        description: 'Support this project'
    },
    {   
        name: 'devreload', 
        description: 'Reload bot process, only for Dev Staff'
    },
];


module.exports = {
    commands: commands,
    commandsDev: commandsDev
}