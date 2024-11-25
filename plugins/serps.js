const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        m.reply(`What You Looking For?\n.serps domain.com query\nExample: .serps starsx.tech starsx`);
        return;
    }

    const domain = args[0];
    const query = args[1];
    const url = `https://www.google.com/search?q=${query}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        let rank = -1;

        $('h3').each((index, element) => {
            const title = $(element).text();
            const link = $(element).parent().attr('href');
            
            if (link && link.includes(domain)) {
                rank = index + 1;
            }
        });

        if (rank !== -1) {
            conn.sendMessage(m.chat, {
                text: `Domain "${domain}" is ranked at position ${rank} for query "${query}".`,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true, 
                        title: global.title || 'Search Results',
                        body: '',
                        mediaType: 1,  
                        renderLargerThumbnail: true,
                        thumbnailUrl: global.banner || '',
                        sourceUrl: ''
                    }
                }
            }, { quoted: m });
        } else {
            m.reply(`Domain "${domain}" not found in the search results for query "${query}".`);
        }
    } catch (error) {
        m.reply(`Error checking domain ranking: ${error.message}`);
    }
};

handler.help = ['serps'];
handler.tags = ['main'];
handler.command = /^(serps)$/i;

module.exports = handler;
