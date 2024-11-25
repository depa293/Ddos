const { join } = require('path');
const fs = require('fs');

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const m2 = `       
≡ *𒄆DDoS Method Layer7*🪽
> - .demontlsvip
> - .tls
> - .tlsvip
> - .mix
> - .https
> - .ninja
> - .kill
> - .rape
> - .browsers
> - .bypass
> - .raw
> - .strike
> - .flood
> - .thunder
> - .rapid
> - .kilua
> - .storm
> - .ddos url time methods - khusus prem owner
≡ *𒄆Botnet Method DDoS*🪽
> - .browsers
> - .bypass
> - .raw
> - .strike
> - .tls
> - .ninja
> - .mix
> - .kill
> - .rape
> - .ssh
> - .botnet url time methods - khusus prem owner
\`──────────────────────────\`
≡ *𒄆Free DDoS Method Layer7*🪽
> - .browsers - port attack 60
> - .bypass - port attack 60
> - .kill - port attack count 60
> - .attack url time methods - free ddos
\`──────────────────────────\`
≡ *𒄆DDoS Method Layer4*🪽
> - .udp-raw
> - .tcp-kill
───────────────────────────`;


conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: global.title,
body: `Full Powererd Methods 2024`,
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

handler.help = ['methods'];
handler.tags = ['main'];
handler.command = /^(methods)$/i;

module.exports = handler
