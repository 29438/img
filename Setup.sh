echo "欢迎使用今日校园任务自动化"
echo "开始下载项目代码"
wget -O code.zip https://cdn.jsdelivr.net/gh/29438/img@master/FuckCpdaily.zip
echo "开始解压项目代码"
unzip -o code.zip
echo "开始初始化项目依赖"
pip3 install -r FuckCpdaily/requirements.txt -t FuckCpdaily/ -i https://mirrors.aliyun.com/pypi/simple
if [ -d src/ ];then
  echo "清除原有SRC目录"
  rm -rf src/
fi
mv FuckCpdaily/ src/
rm code.zip
echo "项目初始化完成，请自行修改src/config.yml内的用户参数"
echo "不要忘记点击 部署 按钮上传配置！！！"
rm -f setup.sh
