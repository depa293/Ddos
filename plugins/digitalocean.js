require("../config.js");
const fs = require('fs');
const path = require('path');

const generateRandomPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < 12; i++) { // Panjang password 12 karakter
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const availableRegions = ['nyc1', 'nyc3', 'sfo1', 'sfo3', 'ams3', 'sgp1', 'lon1', 'fra1', 'tor1'];
const availableOSVersions = ['ubuntu-20-04-x64', 'ubuntu-22-04-x64', 'debian-10-x64', 'debian-11-x64', 'centos-7-x64', 'centos-stream8-x64'];
const availableRAMSizes = ['s-1vcpu-1gb', 's-1vcpu-2gb', 's-2vcpu-2gb', 's-2vcpu-4gb', 's-4vcpu-8gb'];

const handler = async (m, { text, conn }) => {
  let t = text.split(',');
  if (t.length < 4) {
    let errorMessage = `*Format salah!*\nPenggunaan: .cvps hostname,region,osversi,ram\n\n`;
    errorMessage += `*Region yang tersedia:*\n${availableRegions.join(', ')}\n\n`;
    errorMessage += `*OSVersi yang tersedia:*\n${availableOSVersions.join(', ')}\n\n`;
    errorMessage += `*RAM yang tersedia:*\n${availableRAMSizes.join(', ')}`;
    return m.reply(errorMessage);
  }

  let hostname = t[0];
  let regions = t[1];
  let ram = t[2];
  let osvps = t[3];
    
  try {
    let dropletData = {
      name: hostname,
      region: regions,
      size: ram,
      image: osvps,
      ssh_keys: null,
      backups: false,
      ipv6: true,
      user_data: null,
      private_networking: null,
      volumes: null,
      tags: ['Azzam']
    };

    let password = generateRandomPassword();
    dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

    let response = await fetch('https://api.digitalocean.com/v2/droplets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.token_do
      },
      body: JSON.stringify(dropletData)
    });

    let responseData = await response.json();

    if (response.ok) {
      let dropletConfig = responseData.droplet;
      let dropletId = dropletConfig.id;

      // Waiting for the VPS to be created
      m.reply(`💬 \`\`\`Tunggu Sebentar...\`\`\``);
      await new Promise(resolve => setTimeout(resolve, 60000));

      // Retrieving detailed information about the VPS
      let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + global.token_do
        }
      });

      let dropletData = await dropletResponse.json();

      // Checking if a VPS IP address is available
      let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0 ? dropletData.droplet.networks.v4[0].ip_address : "Tidak ada alamat IP yang tersedia";

      let messageText = `*\`VPS berhasil dibuat √\`*\n\n`;

      messageText += `ID: ${dropletId}\n`;
      messageText += `IP VPS: ${ipVPS}\n`;
      messageText += `Password: ${password}\n\n`;
      
      messageText += `*\`SPEKTIFIKASI\`*\n`;
      messageText += `HOSTNAME: ${hostname}\n`;
      messageText += `REGION: ${regions}\n`;
      messageText += `RAM: ${ram}\n`;
      messageText += `OS + VERSI: ${osvps}\n`;

      await conn.sendMessage(m.chat, { text: messageText });

    } else {
      throw new Error(`Gagal membuat VPS: ${responseData.message}`);
    }
  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat membuat VPS: ${err}`);
  }
};

handler.command = ['cvps'];
handler.rowner = true; // Restrict the command to the bot owner
module.exports = handler;