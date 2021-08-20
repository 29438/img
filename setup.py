import requests
import os
import zipfile
import shutil
import sys
import io
from datetime import datetime, timedelta, timezone

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


def downloadfile(url, filename):
    filename = filename + os.path.splitext(url)[-1]
    file_to_save = os.path.join(os.getcwd(), filename)
    with open(file_to_save, "wb") as fw:
        data = requests.get(url, stream=True)
        fw.write(data.content)
    return file_to_save


def getTimeStr():
    utc_dt = datetime.utcnow().replace(tzinfo=timezone.utc)
    bj_dt = utc_dt.astimezone(timezone(timedelta(hours=8)))
    return bj_dt.strftime("%Y-%m-%d %H:%M:%S")


def log(content):
    print(getTimeStr() + " " + str(content))
    sys.stdout.flush()


if __name__ == "__main__":
    log('今日校园云函数一键部署V1.0')
    log('开始下载代码，请耐心等待')
    path = downloadfile(
        "https://cdn.jsdelivr.net/gh/29438/img@master/FuckCpdaily.zip",
        "code")
    log('代码下载完成,开始解压')
    zip_file = zipfile.ZipFile(path)
    zip_list = zip_file.namelist()
    for f in zip_list:
        zip_file.extract(f, os.path.join(os.getcwd()))
    os.remove(path)
    log('代码解压完成，开始下载依赖，时间较长请耐心等待')
    path = downloadfile(
        "https://cdn.jsdelivr.net/gh/29438/img@master/Dependency.zip",
        "dependency")
    log('依赖下载完成,开始解压')
    zip_file = zipfile.ZipFile(path)
    zip_list = zip_file.namelist()
    for f in zip_list:
        zip_file.extract(f, os.path.join(os.getcwd() + "/auto-cpdaily-main"))
    os.remove(path)
    log('依赖解压完成,开始初始化')

    log('初始化完成，请手动修改src/config.yml中的参数')
    log('不要忘记点击部署按钮上传配置！！！')
    log('不要忘记点击部署按钮上传配置！！！')
    log('不要忘记点击部署按钮上传配置！！！')
    os.remove(__file__)
