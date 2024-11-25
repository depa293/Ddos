
const fetch = require('node-fetch');

const handler = async (m, { text, conn }) => {
  if (!text) {
    return m.reply(`*Format salah!*\nPenggunaan: .weather <nama kota>`);
  }

  const city = text.trim();
  const apiKey = "395398683c944198a36232704242208"; // Ganti dengan API key dari WeatherAPI

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    const data = await response.json();

    if (response.status !== 200) {
      return m.reply(`Terjadi kesalahan: ${data.error.message}`);
    }

    const current = data.current;
    const location = data.location;

    const weatherInfo = `
🌤️ *Cuaca di ${location.name}, ${location.country}* 🌤️

*Deskripsi:* ${current.condition.text}
*Temperatur:* ${current.temp_c}°C
*Terasa Seperti:* ${current.feelslike_c}°C
*Kelembaban:* ${current.humidity}%
*Kecepatan Angin:* ${current.wind_kph} kph
*Waktu Lokasi:* ${location.localtime}
    `;

    await conn.sendMessage(m.chat, { text: weatherInfo.trim() });
  } catch (err) {
    console.error(err);
    m.reply(`Terjadi kesalahan saat mengambil data cuaca: ${err}`);
  }
};

handler.command = ['weather', 'cuaca']; // Command untuk memanggil handler ini
handler.rowner = true; // Hanya pemilik bot yang bisa menggunakan command ini
module.exports = handler;