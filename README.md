<p align="center">
  <h2 align="center">Netease Recent Actions</h2>
  <p align="center">🎧 通过GitHub Action将你的网易云音乐的听歌记录生成svg</p>
</p>

## ⚙ 前置工作

获取网易云音乐用户 ID (https://music.163.com)

- 您的个人主页页面（`https://music.163.com/#/user/home?id=xxx`），`id` 为紧跟的那串数字

![user_id](https://user-images.githubusercontent.com/44596995/200237164-bf3b1c62-b2ee-4569-b5bf-bda06b09db08.png)

## 🔨 使用

需使用Github Actions，参考这个[仓库](https://github.com/zonemeen/zonemeen)的这个[文件](https://github.com/zonemeen/zonemeen/blob/a8c4549f38fd0ba254e3650eb0832a9e3cd1eb58/.github/workflows/job-work.yml)的配置，触发更新会自动提交`163.svg`这个文件至您的目标仓库

### 默认配置

![163-default](https://user-images.githubusercontent.com/44596995/200461439-01e74061-74a8-47af-8b43-87f83e247010.svg)

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
      - uses: zonemeen/netease-recent-actions@latest # 使用最新版本，最新版本查看https://github.com/marketplace/actions/netease-recent-actions
        with:
          id: '126764012' # 你的网易云音乐账号id
```

### 听歌排行类型

![163-type](https://user-images.githubusercontent.com/44596995/200461612-166fc262-4bf3-46f6-b0dc-e8d0cb5394ff.svg)

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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          type: '0'
```

配置说明：`0`：为所有时间的听歌排行；`1`：默认为1，即近一周的听歌排行

### 歌曲数量

![163-number](https://user-images.githubusercontent.com/44596995/200461744-0d241454-7230-4fdd-846d-d97adfa573ff.svg)


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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          number: 3
```

配置说明：歌曲数量自定义为`3`条，默认为`5`条

### 标题

![163-title](https://user-images.githubusercontent.com/44596995/200462389-820b61ac-7625-4c70-810a-563c7a7353b7.svg)

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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          title: '最近在听'
```

配置说明：标题自定义为`最近在听`，默认为`Recently Played`

### 图片尺寸

![163-size](https://user-images.githubusercontent.com/44596995/200756757-62c04d9e-af87-47fa-96af-02ded58180c9.svg)

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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          size: 60
```

配置说明：图片尺寸自定义为`60`，默认为`800`；尺寸越小，优点是 svg 尺寸较小、请求返回的时间变短，缺点是图片会失真变模糊

### 卡片单列宽度

![163-width](https://user-images.githubusercontent.com/44596995/202070468-eb7b582d-903e-47d3-b580-ef3b54f8d081.svg)

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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          width: 380
```

配置说明：卡片单列宽度自定义为`380`，默认为`280`

### 列数

![163-column](https://user-images.githubusercontent.com/44596995/206646510-8456cde4-675d-4bd0-bf80-03e1d4285650.svg)

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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          column: 2
```

配置说明：列数自定义为`2`，默认为`1`

### 是否显示听歌次数对比百分比

![163-percent](https://user-images.githubusercontent.com/44596995/202071066-10defec9-2e99-471c-ace8-bc06d80003cb.svg)

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
      - uses: zonemeen/netease-recent-actions@latest
        with:
          id: '126764012'
          show_percent: '1'
```

配置说明：自定义为`1`，即显示听歌次数对比百分比；默认为`0`，即不显示

## 📄 开源协议

本项目使用 [MIT](./LICENSE) 协议






