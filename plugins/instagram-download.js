const puppeteer = require('puppeteer');
const axios = require('axios');

const handler = async (m, { text }) => {
    const url = text.trim();

    if (!url) {
        return m.reply(`*Format salah*\n*Contoh*: .download https://www.instagram.com/p/VIDEO_ID/`);
    }

    try {
        // Meluncurkan browser Puppeteer
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Menarik URL video dari halaman Instagram
        const videoUrl = await page.evaluate(() => {
            const videoElement = document.querySelector('video');
            if (videoElement) {
                return videoElement.src;
            }

            // Instagram mungkin menggunakan struktur yang berbeda untuk video
            const scripts = Array.from(document.querySelectorAll('script'));
            for (const script of scripts) {
                const scriptContent = script.innerText;
                const match = scriptContent.match(/"video_url":"(.*?)"/);
                if (match) {
                    return match[1].replace(/\\u002F/g, '/'); // Mengganti escape sequences
                }
            }
            return null;
        });

        await browser.close();

        if (videoUrl) {
            // Mendapatkan video dari URL
            const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });

            // Mengirim video ke pengguna
            await conn.sendMessage(m.chat, { 
                video: { url: videoUrl }, 
                caption: 'Video dari Instagram'
            }, { quoted: m });

        } else {
            return m.reply(`*Tidak dapat menemukan video dari URL yang diberikan*`);
        }

    } catch (error) {
        console.error(error);
        return m.reply(`*Terjadi kesalahan saat mengambil video*\nError: ${error.message}`);
    }
};

handler.command = ['istagram'];
handler.rowner = true;
module.exports = handler;