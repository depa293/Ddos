
const fetch = require('node-fetch');

const handler = async (m, { text, conn }) => {
  if (!text) {
    return m.reply(`*Format salah!*\nPenggunaan: .phoneinfo <nomor telepon>`);
  }

  const phoneNumber = text.trim();
  const apiKey = "ffbd6d2142de4e26898b8370ac0988e6"; // Ganti dengan API key dari AbstractAPI

  try {
    const response = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${phoneNumber}`);
    const data = await response.json();

    if (response.status !== 200 || data.valid === false) {
      return m.reply(`Terjadi kesalahan: Nomor telepon tidak valid atau informasi tidak ditemukan.`);
    }

    const phoneInfo = `
📱 *Informasi Nomor Telepon* 📱

*Nomor Telepon:* ${data.phone}
*Valid:* ${data.valid ? "Ya" : "Tidak"}
*Negara:* ${data.country.name}
*Kode Negara:* ${data.country.code}
*Lokasi:* ${data.location || "Tidak diketahui"}
*Operator:* ${data.carrier || "Tidak diketahui"}
*Jenis:* ${data.type || "Tidak diketahui"}
    `;

    await conn.sendMessage(m.chat, { text: phoneInfo.trim() });
  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat mengambil informasi nomor telepon: ${err}`);
  }
};

handler.command = ['phoneinfo', 'infonomor']; // Command untuk memanggil handler ini
handler.rowner = true; // Hanya pemilik bot yang bisa menggunakan command ini
module.exports = handler;