const { join } = require('path');
const fs = require('fs');

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const m2 = `
  *\`Hai! Terima kasih telah menggunakan bot ddos v3.\`*!\n> ───────────────
      Kami berharap dengan adanya bot ini kamu bisa attack website dengan mudah dan cepat

      Kami telah mendesain bot dengan se-simpel mungkin untuk meminimalisir terjadinya kebingungan bagi pengguna baru 

      Kami juga telah menyiapkan fitur-fitur yang dapat membantu anda dalam menggunakan bot ddos.
> ───────────────         
       Berikut adalah perintah untuk menggunakan fitur-fitur bot ini:

- .demonv3 
- .base - allfitur

*\`Bot ini sudah menggunakan Botnet, Sebelum menggunakan bot, kamu sebaiknya ketik .tutor-ddos terlebih dahulu untuk mencegah kesalah pahaman di saat anda attack website dengan mengetik .tutor-ddos anda akan melihat tutor attack website.\`*\n`;


conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
body: `BOT DDoS FULL FOWWERD`,
mediaType: 1,  
thumbnailUrl: global.menu,
}}, text: m2}, {quoted: m})
	  } catch (e) {
    conn.reply(m.chat, 'Menu Error Bejir', m);
    throw e;
  }
};

handler.help = ["menu", "?"]
handler.tags = ["main"]
handler.command = /^(menu|\?)$/i

module.exports = handler
