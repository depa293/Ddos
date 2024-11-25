let handler = async (m, {conn, groupMetadata }) => {
m.reply(`ID GROUP:*\n${await groupMetadata.id}`)
}
handler.help = ['idgc']
handler.tags = ['group']
handler.command = /^(idgc)$/i
handler.group = true

module.exports = handler;