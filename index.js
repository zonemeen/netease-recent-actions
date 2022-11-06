import { PythonShell } from 'python-shell'
import { readFileSync, createWriteStream } from 'fs'
import { getInput } from '@actions/core'
import ejs from 'ejs'
import fetch from 'node-fetch'
import logo from './logo.js'

const imageToBase64 = (url) =>
  fetch(url)
    .then((r) => r.buffer())
    .then((buf) => `data:image/png;base64,` + buf.toString('base64'))

const readTemplateFile = () => readFileSync('./template/svg.ejs', 'utf-8')

const id = getInput('id') || '126764012'

PythonShell.run('163music.py', { args: [id] }, async (err, res) => {
  if (err) throw err
  const songs = JSON.parse(res).slice(0, 4)
  const getAllImages = (recentlyPlayedSongs) =>
    Promise.all(recentlyPlayedSongs.map(({ song }) => imageToBase64(song.al.picUrl)))

  const covers = await getAllImages(songs)

  const templateParams = {
    recentPlayed: songs.map(({ song }, i) => {
      return {
        name: song.name,
        artist: song.ar.map(({ name }) => name).join('/'),
        cover: covers[i],
        logo,
      }
    }),
  }
  const svgFile = createWriteStream('163.svg')
  svgFile.write(ejs.render(readTemplateFile(), templateParams))
})
