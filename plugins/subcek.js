const axios = require('axios');

const handler = async (m, { text }) => {
    const q = text.trim(); // Menggunakan text untuk menangkap argumen yang dimasukkan pengguna

    // Memeriksa apakah argumen 'q' kosong atau tidak
    if (!q) {
        return m.reply(`*Format salah*\n*Contoh*: .subcek untuk mengecek domain contoh google.com`);
    }

    try {
        let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${q}`);
        let list_domen = response.data.data.map((data) => {
            return `${data}`;
        }).join('\n');

        const subdomain = `*List Domain*\n\n${list_domen}`.trim();

        await conn.sendMessage(m.chat, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: global.title,
                    body: global.namabot,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: global.tracking,
                    sourceUrl: ``
                }
            },
            text: subdomain
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        return m.reply(`*Terjadi kesalahan saat mengambil data*\nSilakan coba lagi nanti.`);
    }
};

handler.command = ['subcek'];
handler.rowner = true;
module.exports = handler;