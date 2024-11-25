let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    await conn.groupUpdateDescription(m.chat, text)
  m.reply(`Description group now changed !`)
  } else throw '[ ! ] Masukkan teks yang ingin dijadikan deskripsi.'
}
handler.help = ['setdesk'].map(v => "⧼text⧽" + v)
handler.tags = ['group']
handler.command = /^set(desk)$/i
handler.botAdmin = true
handler.group = true
handler.admin = true
module.exports = handler;
