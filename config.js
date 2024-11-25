const numowner = '6283836941715'
global.namebot = 'DemonXMODS'
global.title = 'DemonXDDoS V3'
global.proxy = 'Update proxy'
// Thumbnail Logo Bot
global.menu = 'https://telegra.ph/file/ad2b6cc34fac0cc0be2d4.jpg'
global.banner = 'https://telegra.ph/file/83b1cbfc0913dd2e274b9.jpg'
global.attacking = 'https://telegra.ph/file/cb984833046c7dc6724e5.jpg'
global.tracking = 'https://telegra.ph/file/83b1cbfc0913dd2e274b9.jpg'
global.brutall = 'https://telegra.ph/file/cb984833046c7dc6724e5.jpg'
global.standby = 'https://telegra.ph/file/b416529a8bc13f83a034f.jpg'
// kebutuhan cpanel.  ?
global.apikey = 'ptla mu'
global.linkPanel = 'isi link panel'
global.egg = '15'
global.loc = '1'
global.token_do = 'token_do'
// Ga Perlu Di Ganti
global.owner = [numowner]  
global.mods = [numowner] 
global.prems = [numowner]
global.nameowner = 'DemonX-Mods'
global.numberowner = numowner
global.mail = 'krisnayourbae@gmail.com' 
global.maxwarn = '2'

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
