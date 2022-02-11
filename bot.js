const fs = require("fs");
require('dotenv').config();
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
import * as CSV from 'csv-string';
 

//discord shenanigans
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.login(process.env.DISCORD_TOKEN);

console.log("SCP Bot is now starting...");
setTimeout(() => start(), 1000);

function start() {
    console.log("SCP Bot is now running.");

    let chan = client.channels.cache.get(process.env.CHANNEL_ID);

    var path = process.env.FILE_PATH;

    var watching = false;
    fs.watch(path, function () {
        if (watching) return;
        watching = true;

        fs.readFile(path, "utf8", function (err, data) {
            var lines = data.split("\n");
            var lastLine = lines[lines.length - 2];

            const scp = CSV.parse('lastLine');            
            console.log(scp);

            colors = {
                "Safe" : "#198754",
                "Euclid" : "#ffc107",
                "Keter" : "#dc3545",
                "Thaumiel" : "#0d6efd",
            };

            const embed = new MessageEmbed()
                .setColor(colors[scp[2]])
                .setTitle('📢 ALERT : NEW SCP HAS BEEN FOUND')
                .setURL('http://www.thisscpdoesnotexist.ml/list#' + scp[0])
                .setDescription('\n **SCP-' + scp[0] + ' is ' + scp[1] + '.** \n')
                .setThumbnail('https://i.imgur.com/56QhP4A.jpeg')
                .setFooter({text: scp[5]});
                
            chan.send({ embeds: [embed] });



            setTimeout(() => {
                watching = false;
            }, 100);
        });
    });
}