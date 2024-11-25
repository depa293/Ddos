require("../config.js");
const fetch = require('node-fetch');

const handler = async (m, { conn }) => {
  try {
    // Ambil informasi billing akun dari DigitalOcean
    let response = await fetch('https://api.digitalocean.com/v2/customers/my/balance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      }
    });

    let balanceData = await response.json();

    if (!response.ok) {
      throw new Error(`Gagal mendapatkan informasi saldo akun: ${balanceData.message}`);
    }

    let accountBalance = balanceData.account_balance;
    let monthToDateUsage = balanceData.month_to_date_usage;
    let monthToDateBalance = balanceData.month_to_date_balance;
    let promoCredits = balanceData.promo_credits || "Informasi tidak tersedia";

    let messageText = `💰 *Informasi Saldo dan Kredit Promo DigitalOcean*\n\n`;
    messageText += `🔹 *Saldo Tersisa:* $${accountBalance}\n`;
    messageText += `🔹 *Penggunaan Bulan Ini:* $${monthToDateUsage}\n`;
    messageText += `🔹 *Saldo Setelah Penggunaan:* $${monthToDateBalance}\n`;
    messageText += `🔹 *Kredit Promo (jika tersedia):* ${promoCredits}\n`;

    await conn.sendMessage(m.chat, { text: messageText });

  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat mencoba mendapatkan informasi saldo akun: ${err}`);
  }
};

handler.command = ['ceksaldo'];
handler.rowner = true; // Batasi hanya untuk pemilik bot
module.exports = handler;