require("../config.js");
const fetch = require('node-fetch');

const handler = async (m, { conn }) => {
  try {
    // Ambil informasi batasan akun dari DigitalOcean
    let response = await fetch('https://api.digitalocean.com/v2/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      }
    });

    let accountData = await response.json();

    if (!response.ok) {
      throw new Error(`Gagal mendapatkan informasi akun: ${accountData.message}`);
    }

    // Ambil semua droplets dari akun DigitalOcean
    let dropletsResponse = await fetch('https://api.digitalocean.com/v2/droplets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      }
    });

    let dropletsData = await dropletsResponse.json();

    if (!dropletsResponse.ok) {
      throw new Error(`Gagal mendapatkan daftar VPS: ${dropletsData.message}`);
    }

    let currentDroplets = dropletsData.droplets.length;
    let dropletLimit = accountData.account.droplet_limit;

    let remainingDroplets = dropletLimit - currentDroplets;

    let messageText = `💻 *Informasi Droplet Tersedia*\n\n`;
    messageText += `🔹 *Droplet yang Digunakan:* ${currentDroplets}\n`;
    messageText += `🔹 *Batas Maksimum Droplet:* ${dropletLimit}\n`;
    messageText += `🔹 *Droplet yang Tersisa:* ${remainingDroplets}\n`;

    await conn.sendMessage(m.chat, { text: messageText });

  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat mencoba mendapatkan informasi sisa droplet: ${err}`);
  }
};

handler.command = ['sisadroplet'];
handler.rowner = true; // Batasi hanya untuk pemilik bot
module.exports = handler;