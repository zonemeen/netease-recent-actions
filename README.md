<p align="center">
  <h2 align="center">Netease Recent Actions</h2>
  <p align="center">🎧 通过GitHub Action将你的网易云音乐的听歌记录生成svg</p>
</p>

## ⚙ 前置工作

获取网易云音乐用户 ID (https://music.163.com)

- 您的个人主页页面（`https://music.163.com/#/user/home?id=xxx`），`id` 为紧跟的那串数字

![user_id](https://user-images.githubusercontent.com/44596995/200237164-bf3b1c62-b2ee-4569-b5bf-bda06b09db08.png)

## 🔨 使用

需使用Github Actions，参考这个[仓库](https://github.com/zonemeen/zonemeen)的这个[文件](https://github.com/zonemeen/zonemeen/blob/main/.github/workflows/job-work.yml)的配置，触发更新会自动提交`163.svg`这个文件至您的目标仓库

### 默认配置

![image](https://user-images.githubusercontent.com/44596995/200254736-a5d4186a-8e9e-485e-a51b-3034e001602e.png)

```yml
name: Netease Recent Actions

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '00 22 * * 0'

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: zonemeen/netease-recent-actions@v1.0.18
        with:
          id: '126764012' # Your NetEase Cloud Music account id
```

配置说明：听歌排行类型默认为`1`，即为近一周的听歌排行；歌曲数量默认为`5`条

### 听歌排行类型配置

![image](https://user-images.githubusercontent.com/44596995/200254911-c22dd023-3957-4401-aba1-9b815fc7b951.png)

```yml
name: Netease Recent Actions

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '00 22 * * 0'

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: zonemeen/netease-recent-actions@v1.0.18
        with:
          id: '126764012' # Your NetEase Cloud Music account id
          type: '0'
```

配置说明：听歌排行类型为`0`，即为所有时间的听歌排行；歌曲数量默认为`5`条

### 歌曲数量配置

![image](https://user-images.githubusercontent.com/44596995/200255152-4c565397-38af-41b7-8657-0a2f5b022204.png)

```yml
name: Netease Recent Actions

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '00 22 * * 0'

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: zonemeen/netease-recent-actions@v1.0.18
        with:
          id: '126764012' # Your NetEase Cloud Music account id
          number: 3
```

配置说明：听歌排行类型默认为`1`，即为近一周的听歌排行；歌曲数量为`3`条

## 📄 开源协议

本项目使用 [MIT](./LICENSE) 协议






