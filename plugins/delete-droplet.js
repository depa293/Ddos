require("../config.js");
const fetch = require('node-fetch');

const handler = async (m, { text, conn }) => {
  if (!text) return m.reply(`*Format salah!*\nPenggunaan: .delvps <droplet_id>`);

  let dropletId = text.trim();

  try {
    // Menghapus droplet berdasarkan ID
    let response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      }
    });

    if (response.ok) {
      m.reply(`💥 Droplet dengan ID ${dropletId} berhasil dihapus.`);
    } else {
      let responseData = await response.json();
      throw new Error(`Gagal menghapus VPS: ${responseData.message}`);
    }
  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat menghapus VPS: ${err}`);
  }
};

handler.command = ['delvps'];
handler.rowner = true; // Batasi hanya untuk pemilik bot
module.exports = handler;