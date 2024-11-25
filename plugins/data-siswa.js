const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) {
    m.reply(`Dimana Nama Siswa?
.data-siswa nama
Example: .data-siswa Revandika Cahya Putra`);
    return;
  }

  const nama = text;
  try {
    let response = await axios.get(`https://api.agatz.xyz/api/mahasiswa?message=${nama}`);
    let responseData = response.data.data.map((data, index) => {
      return `-----------------------------
Siswa ${index + 1}\nNama: ${data.name}

Website: ${data.website}`;
    }).join('\n');

    conn.sendMessage(m.chat, { contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: global.title,
        body: 'Massive Scraper',
        mediaType: 1,
        renderLargerThumbnail: true,
        thumbnailUrl: global.banner,
        sourceUrl: ``
      }
    }, text: responseData}, {quoted: m});

  } catch (e) {
    conn.reply(m.chat, 'Error', m);
    throw e;
  }
};

handler.help = ['data-siswa'];
handler.tags = ['main'];
handler.command = /^(data-siswa)$/i;
module.exports = handler;
