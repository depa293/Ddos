const { join } = require('path');
const fs = require('fs');

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const m2 = `
\`ONLY DDOS FREE\`

Cara DDoS Free [ *.attack url time methods* ]
\`CONTOH\`
Cara DDoS [ *.attack https 60 bypass* ]
DDoS Wajib Di Dalam Group
Max Time [ *60 Second* ]
Website Black List [ *nasa,google,youtube,static,github* ]

\`CEK METHODS DDOS FREE ATTACK KETIK METHODS CARI YANG FREE\`

\`ONLY OWNER-PREMIUM\`
   
CARA DDOS PREMIUM [ *.ddos url time methods* ]
\`CONTOH\`
DDOS PREM [ *.ddos url 120 demontlsvip* ]
DDOS UDP-RAW [ *ip port durasi* ]
CONTOH DDOS UDP-RAW [ .udp-raw 10.10.34.35 80 120 ]
DDOC TCP-KILL [ *.tcp-kill ip durasi port* ]
CONTOH DDOS TCP-KILL [ tcp-kill 45.60.34.49 120 80 ]`;


conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: global.title,
body: `Berhasil mengecek fitur lainya`,
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

handler.help = ['base'];
handler.tags = ['main'];
handler.command = /^(cara-ddos)$/i;

module.exports = handler
