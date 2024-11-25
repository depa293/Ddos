const { join } = require('path');
const fs = require('fs');

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const m2 = `
*Group Command*
> - group - group open/close 
> - idgc - untuk melihat id group
> - resetlink - mereset link group
> - setdesk - merubah deskripsi group
> - getpp - melihat profile dalam group
> - tagall - tag semuah anggota group
\`──────────────────────────\`
*OpenAi*
> - openai - openai
> - gpt - chat gpt
──────────────────────────
*Botnet Control*
> - botnet-list - list botnet
> - botnet-test - tes botnet
> - botnet-add - tambah botnet
> - botnet-del - hapus botnet
───────────────────────────
*Tracking Command*
> - cuaca - informasi cuaca
> - infonomor - informasi kartu
> - dw-check - dark web check
> - nik-sniff - info nik
> - serps - vip
\`───────────────────────────\`
*WhatsApp Attack Command*
> - sikat - bug whatsapp 
> - flood-otp - temporary nomor
\`───────────────────────────\`
*Hacking Command*
> - cctv-hijack - hack video cctv
> - data-siswa - data siswa
\`───────────────────────────\`
*Owner Command*
> - addprem - tambah premium
> - delprem - hapus premium 
> - listprem - list premium
> - self - self bot
> - public - public bot
\`───────────────────────────\`
*Pterodactyl Panel Command*
> - cpanel - create panel
> - listsrv - list server panel
> - listusr - list user panel
> - delsrv - del server
> - delusr - del user
\`───────────────────────────\`
*DigitalOcean Command*
> - cvps - create vps digitalocean
> - listvps - list vps digitalocean 
> - delvps - delete vps digitalocean
> - rebuildvps - rebuild vps digitalocean
> - sisadroplet - check sisa droplet 
> - ceksaldo - check sisa saldo 
\`───────────────────────────\`
*Subdomain Command*
> - subcek - cek subdomain
> - subdo-add - tambah domain
> - subdo-del - del domain
> - subdo-list - list subdomain
> - subdo-check - check subdomain
\`───────────────────────────\`
*Fun Command*
> - cekkhodam - check khodam 
> - vccgen - check vcc
> - gempa - untuk mengecek lokasi gempa
> - totalfitur - melihat total fitur bot
\`───────────────────────────\`
*Download Command*
> - play - play music 
> - istagram - url vidio istagram
> - tiktok - download vid tiktok
───────────────────────────`;


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
handler.command = /^(base)$/i;

module.exports = handler
