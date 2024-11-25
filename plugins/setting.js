let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'open': 'not_announcement',
        'close': 'announcement',
        'unlock': 'unlocked',
        'lock': 'locked',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*Invalid! Format All:*
  *⚉ ${usedPrefix + command} close*
  *⚉ ${usedPrefix + command} open*
  *⚉ ${usedPrefix + command} unlock*
  *⚉ ${usedPrefix + command} lock*
`.trim()
conn.sendMessage(m.chat, {
		react: {
			text: '🕑',
			key: m.key,
		}
	})
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group ⧼open/close⧽']
handler.tags = ['group']
handler.command = /^(group)$/i
handler.group = true;
handler.admin = true
handler.botAdmin = true

module.exports = handler;
