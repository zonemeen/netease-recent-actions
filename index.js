import { PythonShell } from 'python-shell'
import { cac } from 'cac'
import { readFileSync, createWriteStream } from 'fs'
import ejs from 'ejs'
import fetch from 'node-fetch'
import logo from './logo.js'

const imageToBase64 = (url) =>
  fetch(url + '?param=60x60')
    .then((r) => r.buffer())
    .then((buf) => `data:image/jpg;base64,` + buf.toString('base64'))

const readTemplateFile = () => readFileSync('./template/svg.ejs', 'utf-8')

const cli = cac('netease')

cli
  .option('--id <id>', 'Your NetEase Cloud Music account id')
  .option('--type <type>', 'Song ranking type, 1 for weekData, 0 for allData', { default: '1' })
  .option('--number <number>', 'The number of songs', { default: '5' })

const {
  options: { id, type, number },
} = cli.parse()

PythonShell.run('163music.py', { args: [id, type] }, async (err, res) => {
  if (err) throw err
  const songs = JSON.parse(res).slice(0, Number(number))
  const getAllImages = (recentlyPlayedSongs) =>
    Promise.all(recentlyPlayedSongs.map(({ song }) => imageToBase64(song.al.picUrl)))

  const covers = await getAllImages(songs)

  const templateParams = {
    recentPlayed: songs.map(({ song }, i) => {
      return {
        name: song.name,
        artist: song.ar.map(({ name }) => name).join('/'),
        cover: covers[i],
        url: `https://music.163.com/#/song?id=${song.id}`,
        logo,
      }
    }),
  }
  const svgFile = createWriteStream('163.svg')
  svgFile.write(ejs.render(readTemplateFile(), templateParams))
})
