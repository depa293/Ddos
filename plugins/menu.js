let handler = async (m, { conn }) => {
  try {
      function formatUptime(uptimeInSeconds) {
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    return `${hours}:${minutes}:${seconds}`;
}
const uptimeInSeconds = process.uptime();
const quotes = ['Script ini mahal versi demon']
const formattedUptime = formatUptime(uptimeInSeconds);

    const m2 = `
 
\`Cara Command\`
> - cara-ddos - untuk melihat tutorial ddos
> - runtime - untuk melihat waktu bot aktif
─────────────────────────── 
\`Preparation Command\`
> - check-host - check host website
> - methods - show all methods
> - proxy - proxy scrapper
> - ua - ua scrapper
> - info-web - informasi website
> - ipinfo - informasi ip
───────────────────────────
\`DDoS Command\`
> - botnet - ddos botnet
> - ddos - ddos vip
> - ddos-hold - ddos hourse vip
> - gyat - ddos digitalocean 
> - kill_ssh - kill vps digitalocean
───────────────────────────
\`Comand Base & Free DDoS\`
> - attack - free ddos user
───────────────────────────`;

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: global.title,
body: quotes[Math.floor(Math.random() * quotes.length)],
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.banner,
sourceUrl: ``
}}, text: m2}, {quoted: m})
	  } catch (e) {
    conn.reply(m.chat, 'Menu Error Bejir', m);
    throw e;
  }
};

handler.help = ['demonv3'];
handler.tags = ['main'];
handler.command = /^(demonv3)$/i;
module.exports = handler
