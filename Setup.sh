echo "欢迎使用今日校园自动化任务一键部署"
echo "开始下载项目代码"
wget -O code.zip https://github.com/29438/auto-cpdaily/archive/refs/heads/main.zip
echo "开始解压项目代码"
unzip -o code.zip
echo "开始初始化项目依赖"
pip3 install -r auto-cpdaily-main/requirements.txt -t auto-cpdaily-main/ -i https://mirrors.aliyun.com/pypi/simple
if [ -d src/ ];then
  echo "清除原有SRC目录"
  rm -rf src/
fi
mv auto-cpdaily-main/ src/
rm code.zip
echo "项目初始化完成，请自行修改src/config.yml内的用户参数"
echo "修改完不要忘记点击 部署 按钮保存配置！！！"
echo "修改完不要忘记点击 部署 按钮保存配置！！！"
echo "部署完成即可点击 测试 运行签到任务！！！"
rm -f setup.sh
