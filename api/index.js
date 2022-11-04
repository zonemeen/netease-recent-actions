import { PythonShell } from 'python-shell'
import ejs from 'ejs'
import fs from 'fs'
import fetch from 'node-fetch'
import logo from './logo.js'

const imageToBase64 = (url) =>
  fetch(url)
    .then((r) => r.buffer())
    .then((buf) => `data:image/png;base64,` + buf.toString('base64'))

const readTemplateFile = () => fs.readFileSync('./template/dark.svg.ejs', 'utf-8')

export default async (request, response) => {
  const { id, song_type = 1 } = request.query
  PythonShell.run('163music.py', { args: [id, song_type] }, async (err, res) => {
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
    response.setHeader('content-type', 'image/svg+xml')
    response.send(ejs.render(readTemplateFile(), templateParams))
  })
}
