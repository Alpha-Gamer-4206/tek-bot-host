const config = {
    "owners": [ '334412919435689986', '99965250052300800' ],
    "admins": [ ],
    "token": "MzgxNTA1OTk4NjUwNzM2NjUw.DPIItw.6CVLaq6i2c-DupgTKphhZYNvxno",
    "defaultSettings": {
        "prefix": "t.",
        "modLogChannel": "mod-log",
        "modLogEnabled": "false",
        "modRole": "Moderator",
        "adminRole": "Administrator",
        "muteRole": "Muted",
        "systemNotice": "true",
        "welcomehannel": "welcome",
        "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes! :D",
        "welcomeEnabled": "false"
    },
    permLevels: [
        {   level: 0,
            name: "User",
            check: () => true
        },
        {   level: 1,
            name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
        },
        {
            level: 2,
            name: "Moderator",
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if(modRole && message.member.roles.has(modRole.id)) return true;
                } catch(e) {
                    return false;
                }
            }
        },
        {
            level: 3,
            name: "Administrator",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    if(adminRole && message.member.roles.has(adminRole.id)) return true;
                } catch(e) {
                    return false;
                }
            }
        },
        {   level: 4,
            name: "Bot Admin",
            check: (message) => config.admins.includes(message.author.id)
        },
        {   level: 5,
            name: "Bot Owner",
            check: (message) => config.owners.includes(message.author.id)
        }
    ]
};

module.exports = config;
