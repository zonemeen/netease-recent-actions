# -*- coding: UTF-8 -*-
import requests,base64,json
from Crypto.Cipher import AES
from http.server import BaseHTTPRequestHandler


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    "Referer" : "http://music.163.com/",
    "Accept-Encoding" : "gzip, deflate",
}

def encrypt(key, text):
    cryptor = AES.new(key.encode('utf8'), AES.MODE_CBC, b'0102030405060708')
    length = 16
    count = len(text.encode('utf-8'))
    if (count % length != 0):
        add = length - (count % length)
    else:
        add = 16
    pad = chr(add)
    text1 = text + (pad * add)
    ciphertext = cryptor.encrypt(text1.encode('utf8'))
    cryptedStr = str(base64.b64encode(ciphertext),encoding='utf-8')
    return cryptedStr

def protect(text):
    return {"params":encrypt('TA3YiYCfY2dDJQgg',encrypt('0CoJUm6Qyw8W8jud',text)),"encSecKey":"84ca47bca10bad09a6b04c5c927ef077d9b9f1e37098aa3eac6ea70eb59df0aa28b691b7e75e4f1f9831754919ea784c8f74fbfadf2898b0be17849fd656060162857830e241aba44991601f137624094c114ea8d17bce815b0cd4e5b8e2fbaba978c6d1d14dc3d1faf852bdd28818031ccdaaa13a6018e1024e2aae98844210"}

def getSongData(uid, song_type = 1):
    url = "https://music.163.com/weapi/v1/play/record?csrf_token="
    data = {
        'uid': uid, #用户uid 可以到网页版搜索下用户进入到主页获取
        'type': song_type, #1最近一周 0所有时间
    }
    session = requests.session()
    res=session.post(url,protect(json.dumps(data)),headers=headers)
    result=json.loads(res.text,strict=False)
    if song_type == 0:
        song_datas = result['allData']
    elif song_type == 1:
        song_datas = result['weekData']
    return song_datas

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path
        print(path)
        id = path.split('?')[1]
        data = getSongData(uid=id, 1)
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return
