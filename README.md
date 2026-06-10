Usage of the **OBS Win/Loss Counter With Overwatch Rank and Remote Control **

**USAGE:**
- OBS里添加浏览器源
- 添加inedx.html  （其他文件也要下载）
- 浏览器窗口设置**800x500** 
- 裁切掉所有按钮，只保留上面的胜负场和分段
- OBS界面选择浏览器源后在小窗口里点交互按钮可以修改胜负场和分段

***手机遥控功能***
-首先需要确保电脑上安装了 Python。官网地址 https://www.python.org/downloads/windows/     下载64bit版本
-打开电脑的命令行（CMD 或 PowerShell），输入以下命令安装所需的库：
-pip install websockets
-在工具文件夹中双击运行 server.py，直播期间不要关闭这个。
-黑色控制台弹出来后，它会自动显示一串网址（例如 http://192.168.x.x:8000/remote.html）。
-确保你的手机和电脑连接在同一个路由器/WiFi下。
-在手机浏览器里输入那串网址，你就会看到专属的控制面板，且状态显示为“🟢 已连接到 OBS”。
