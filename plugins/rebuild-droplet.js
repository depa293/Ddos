require("../config.js");
const fetch = require('node-fetch');

const generateRandomPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const handler = async (m, { text, conn }) => {
  let [dropletId, image] = text.split(',');

  if (!dropletId || !image) {
    return m.reply(`*Format salah!*\nPenggunaan: .rebuildvps <droplet_id>,<image_id|slug>\n\nContoh: .rebuildvps 12345678,ubuntu-20-04-x64`);
  }

  try {
    // Generate random password for the new rebuild
    let newPassword = generateRandomPassword();

    // Perform rebuild action
    let rebuildResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      },
      body: JSON.stringify({
        type: 'rebuild',
        image: image,
        user_data: `#cloud-config\npassword: ${newPassword}\nchpasswd: { expire: False }`
      })
    });

    let rebuildData = await rebuildResponse.json();

    if (!rebuildResponse.ok) {
      throw new Error(`Gagal melakukan rebuild VPS: ${rebuildData.message}`);
    }

    m.reply(`🔄 Rebuild droplet dengan ID ${dropletId} sedang berlangsung. Tunggu sebentar...`);

    // Wait for some time to allow the rebuild process to complete
    await new Promise(resolve => setTimeout(resolve, 60000));

    // Get droplet information after rebuild
    let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      }
    });

    let dropletData = await dropletResponse.json();

    if (!dropletResponse.ok) {
      throw new Error(`Gagal mendapatkan informasi VPS: ${dropletData.message}`);
    }

    // Get IP address
    let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia";

    // Send final message with rebuild details
    let messageText = `🔄 *Rebuild selesai!*\n\n`;
    messageText += `💻 *VPS Rebuild Details:*\n`;
    messageText += `ID: ${dropletId}\n`;
    messageText += `IP: ${ipVPS}\n`;
    messageText += `New Password: ${newPassword}\n`;
    messageText += `Image: ${image}\n\n`;

    await conn.sendMessage(m.chat, { text: messageText });

  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat melakukan rebuild VPS: ${err}`);
  }
};

handler.command = ['rebuildvps'];
handler.rowner = true; // Batasi hanya untuk pemilik bot
module.exports = handler;