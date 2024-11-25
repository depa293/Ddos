const fetch = require('node-fetch');
const dns = require('dns').promises;

const handler = async (m, { text, conn }) => {
    const url = text.trim();

    if (!url) {
        return m.reply('Usage: .info <website_url>\n\nExample: .info-web https://example.com');
    }

    const validUrl = /^https?:\/\/([^\s/$.?#].[^\s]*)$/i.test(url);
    if (!validUrl) {
        return m.reply('Please provide a valid URL.');
    }

    try {
        
        const domain = new URL(url).hostname;


        const addresses = await dns.lookup(domain, { all: true });
        const ipAddresses = addresses.map(addr => addr.address).join(', ');

        
        const response = await fetch(`https://ipinfo.io/${ipAddresses.split(',')[0]}/json`);
        const ipInfo = await response.json();

        const { city, region, country, org } = ipInfo;

       
        const infoMessage = `
\`Website Information✅\`

*Website URL* : ${url}
*Domain* : ${domain}
*IP Addresses* : ${ipAddresses}
*City* : ${city || 'Unknown'}
*Region* : ${region || 'Unknown'}
*Country* : ${country || 'Unknown'}
*ISP* : ${org || 'Unknown'}

        `.trim();


        m.reply(infoMessage);
    } catch (error) {
        console.error('Error fetching website information:', error.message);
        m.reply('An error occurred while fetching the website information. Please check the URL or try again later.');
    }
};

handler.command = ['info-web'];
handler.rowner = false; // Restrict the command to the bot owner if needed
module.exports = handler;