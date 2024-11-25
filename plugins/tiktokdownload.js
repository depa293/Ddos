const axios = require('axios');

let handler = async (m, { args }) => {
    const link = args[0];
    
    if (!link || (!link.includes('vt') && !link.includes('vm') && !link.includes('tiktok'))) {
        return m.reply('Invalid TikTok link\n.tiktok link or .tt link');
    }
    
    try {
        const apiUrl = `https://api.agatz.xyz/api/tiktok?url=${encodeURIComponent(link)}`;
        const { data } = await axios.get(apiUrl);

        if (data.status !== 200 || !data.data.status) {
            return m.reply('Failed to download TikTok video.');
        }

        const videoUrl = data.data.data.find(v => v.type === 'nowatermark_hd').url;
        const caption = `Title: ${data.data.title}\nDuration: ${data.data.duration}\nViews: ${data.data.stats.views}\nLikes: ${data.data.stats.likes}`;

        await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption }, { quoted: m });

    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['tiktok', 'tt'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt)$/i;

module.exports = handler;
