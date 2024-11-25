const axios = require('axios');
const handler = async (m, { text }) => {
 
    if (!text) {
        return m.reply(`*Format salah*\n*Contoh*: .gpt halo`);
    }

    try {
        // Make the API call to the OpenAI service
        let response = await axios.get(`https://widipe.com/gpt4?text=${text}`);
        let aiResult = response.data.result;

        // Format the response for the chat
        const chat_ai = `*OpenAi*\n${aiResult}`.trim();

        // Send the message with the result
        await conn.sendMessage(m.chat, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: global.title,
                    body: global.namabot,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    thumbnailUrl: global.tracking,
                    sourceUrl: ``
                }
            },
            text: chat_ai
        }, { quoted: m });

    } catch (error) {
        // Handle any errors from the API call
        m.reply(`Terjadi kesalahan: ${error.message}`);
    }
};

handler.command = ['gpt'];
handler.rowner = false;
module.exports = handler;