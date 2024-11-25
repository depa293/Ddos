require("../config.js");
const fetch = require('node-fetch');

const handler = async (m, { conn }) => {
  try {
    // Ambil semua droplets dari akun DigitalOcean
    let response = await fetch('https://api.digitalocean.com/v2/droplets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      }
    });

    let responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Gagal mendapatkan daftar VPS: ${responseData.message}`);
    }

    let droplets = responseData.droplets;

    if (droplets.length === 0) {
      return m.reply(`Tidak ada VPS yang ditemukan.`);
    }

    // Membuat daftar VPS
    let messageText = `💻 *Daftar VPS yang Tersedia:*\n\n`;
    droplets.forEach(droplet => {
      // Memastikan kita mendapatkan IP yang benar dari jaringan v4 dan v6
      let ipV4 = "Tidak ada IP V4";
      let ipV6 = "Tidak ada IP V6";

      droplet.networks.v4.forEach(network => {
        if (network.type === "public") {
          ipV4 = network.ip_address;
        }
      });

      droplet.networks.v6.forEach(network => {
        if (network.type === "public") {
          ipV6 = network.ip_address;
        }
      });

      messageText += `🔹 *ID:* ${droplet.id}\n`;
      messageText += `*Nama:* ${droplet.name}\n`;
      messageText += `*Region:* ${droplet.region.slug}\n`;
      messageText += `*IP V4:* ${ipV4}\n`;
      messageText += `*IP V6:* ${ipV6}\n`;
      messageText += `*Image:* ${droplet.image.slug}\n`;
      messageText += `*Status:* ${droplet.status}\n\n`;
    });

    await conn.sendMessage(m.chat, { text: messageText });

  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat mencoba mendapatkan daftar VPS: ${err}`);
  }
};

handler.command = ['listvps'];
handler.rowner = true; // Batasi hanya untuk pemilik bot
module.exports = handler;