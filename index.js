import { readFileSync, createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import crypto from 'crypto'
import ejs from 'ejs'
import axios from 'axios'
import { cac } from 'cac'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readTemplateFile = () => readFileSync(path.resolve(__dirname, './template/svg.ejs'), 'utf-8')

const aesEncrypt = (secKey, text) => {
  const cipher = crypto.createCipheriv('AES-128-CBC', secKey, '0102030405060708')
  return cipher.update(text, 'utf-8', 'base64') + cipher.final('base64')
}

const aesRsaEncrypt = (text) => ({
  params: aesEncrypt('TA3YiYCfY2dDJQgg', aesEncrypt('0CoJUm6Qyw8W8jud', text)),
  encSecKey:
    '84ca47bca10bad09a6b04c5c927ef077d9b9f1e37098aa3eac6ea70eb59df0aa28b691b7e75e4f1f9831754919ea784c8f74fbfadf2898b0be17849fd656060162857830e241aba44991601f137624094c114ea8d17bce815b0cd4e5b8e2fbaba978c6d1d14dc3d1faf852bdd28818031ccdaaa13a6018e1024e2aae98844210',
})

const cli = cac('netease')

cli
  .option('--id <id>', 'Your NetEase Cloud Music account id')
  .option('--type <type>', 'Song ranking type, 1 for weekData, 0 for allData', { default: '1' })
  .option('--number <number>', 'The number of songs', { default: '5' })
  .option('--title <title>', 'Title of svg profile', { default: 'Recently Played' })
  .option('--size <size>', 'Size of the song picture', { default: '800' })
  .option('--theme <theme>', 'Theme of the card', { default: 'dark' })
  .option('--width <width>', 'Width of the card', { default: '280' })
  .option('--column <column>', 'Number of columns of the card', { default: '1' })
  .option('--show_percent <show_percent>', 'Whether to show the percentage of play count', {
    default: '0',
  })

let {
  options: { id, type, number, title, size, width, column, theme, show_percent },
} = cli.parse()

const imageToBase64 = (url) =>
  axios
    .get(`${url}${size !== '800' ? `?param=${size}x${size}` : ''}`, { responseType: 'arraybuffer' })
    .then((response) => {
      const buffer64 = Buffer.from(response.data, 'binary').toString('base64')
      return `data:image/jpg;base64,` + buffer64
    })

const {
  data: { weekData, allData },
} = await axios.post(
  'https://music.163.com/weapi/v1/play/record?csrf_token=',
  aesRsaEncrypt(
    JSON.stringify({
      uid: id,
      type,
    })
  ),
  {
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
      Connection: 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Host: 'music.163.com',
      Referer: 'https://music.163.com/',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
      Cookie:
        'os=pc; osver=Microsoft-Windows-10-Professional-build-10586-64bit; appver=2.0.3.131777; ',
    },
  }
)
const songs = (weekData ?? allData).slice(0, parseInt(number))

if (!songs.length) title = 'Not Played Recently'

const getAllImages = (recentlyPlayedSongs) =>
  Promise.all(recentlyPlayedSongs.map(({ song }) => imageToBase64(song.al.picUrl)))

const covers = await getAllImages(songs)

const templateParams = {
  recentPlayedList: songs.map(({ song, score }, i) => {
    return {
      name: song.name,
      artist: song.ar.map(({ name }) => name).join('/'),
      cover: covers[i],
      url: `https://music.163.com/#/song?id=${song.id}`,
      percent: parseInt(show_percent) === 1 ? score / 100 : 0,
    }
  }),
  themeConfig: {
    title,
    width: parseInt(width),
    column: parseInt(column),
    theme,
    color:
      theme === 'light'
        ? { bgColor: '#f6f8fa', fontColor: '#161b22', itemBgColor: '#000000' }
        : { bgColor: '#212121', fontColor: '#f4f4f4', itemBgColor: '#ffffff' },
  },
}
const svgFile = createWriteStream('163.svg')
svgFile.write(ejs.render(readTemplateFile(), templateParams))
