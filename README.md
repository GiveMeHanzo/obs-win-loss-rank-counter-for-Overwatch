Usage of the **OBS Win/Loss Counter With Overwatch Rank and Remote Control **

**USAGE:**
- Click Add a new **Source** in OBS and select **Browser**.
- **Open the File** *(index.html)* in Your browser and **Copy the URL** *(It should look something like that "C:/User/folder-name/obs-win-loss-counter/inedx.html")*.
- **Paste** in the **URL** into the **OBS**.
- Set **Width/Height** preferably to **800x500** to avoid potential issues with scaling.
- Click **"OK"**
- **Crop out the excess space** by aiming at the edge of the source, pressing **(ALT + Mouse-Left-Button)** and moving Your mouse.
- Use **"Interact"** option **below the preview** in order to control the counter.

***Remote Control Via Mobile phone***
- Python Installation is Required for Remote Control Feature https://www.python.org/downloads/windows/
- Use CMD or PowerShell and run the command below to install websockets
- pip install websockets
- Start Server.py and keep it running while streaming
- Make Sure your Phone and PC is under the same local network or WiFi
- Type the link shown in the CMD window in your phone's browser  For example (http://192.168.x.x:8000/remote.html）
- Use Your Phone to change Wins/Losses and Rank without the need to alt-tab from the game.
