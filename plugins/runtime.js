let handler = async (m, { conn }) => {
  let uptime = process.uptime();
  let hari = Math.floor(uptime / 86400);
  uptime %= 86400;
  let jam = Math.floor(uptime / 3600);
  uptime %= 3600;
  let menit = Math.floor(uptime / 60);
  let detik = Math.floor(uptime % 60);
    conn.sendMessage(m.chat, {
    react: {
      text: '🎟',
      key: m.key,
    }
  });
m.reply(`${hari}:${jam}:${menit}:${detik}`)
};

handler.help = ['runtime'];
handler.tags = ['info'];
handler.command = /^(runtime)$/i;

module.exports = handler;