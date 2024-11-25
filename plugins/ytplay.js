const axios = require('axios');

let handler = async (m, { args }) => {
    if (args.length === 0) {
        return m.reply('Please provide a song title.\nExample: .play aku ada');
    }

    const title = args.join(' ');
    const apiUrl = `https://api.agatz.xyz/api/ytplay?message=${encodeURIComponent(title)}`;

    try {
        const { data } = await axios.get(apiUrl);

        if (data.status !== 200) {
            return m.reply('Failed to retrieve the song.');
        }

        const songInfo = data.data;
        const caption = `Title: ${songInfo.title}\nDuration: ${songInfo.durasi}\nChannel: ${songInfo.channel}\nPublished: ${songInfo.published}\nViews: ${songInfo.views}\n\n[Original URL](${songInfo.originalUrl})`;

        await conn.sendFile(m.chat, songInfo.url, 'permen.mp3', caption, m);

    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['play'];
handler.tags = ['music'];
handler.command = /^(play)$/i;

module.exports = handler;
