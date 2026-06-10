import asyncio
import websockets
import http.server
import socketserver
import threading
import socket

# 获取本机在路由器下的局域网IP
def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

clients = set()

# 接收手机发来的指令，并广播给 OBS
async def handler(websocket):
    clients.add(websocket)
    try:
        async for message in websocket:
            await broadcast(message, sender=websocket)
    finally:
        clients.remove(websocket)

async def broadcast(message, sender=None):
    if clients:
        for client in clients:
            if client != sender:
                await client.send(message)

def handle_hotkey(command, loop):
    asyncio.run_coroutine_threadsafe(broadcast(command), loop)

# 启动一个简单的网页服务器，专门用来给手机发送页面
def start_http_server():
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", 8000), Handler) as httpd:
        httpd.serve_forever()

async def main():
    loop = asyncio.get_running_loop()



    local_ip = get_local_ip()
    print("\n" + "="*50)
    print("✨ OBS Remote Counter Server ✨")
    print(f"【Important!】Make Sure Your Phone and PC Under the Same Local Network or WiFi")
    print(f"          Open The Link Below in Your Phone's Browser:")
    print(f"          http://{local_ip}:8000/remote.html")
    print("="*50 + "\n")

    # 监听 0.0.0.0 (允许局域网设备连接)
    async with websockets.serve(handler, "0.0.0.0", 8765):
        await asyncio.Future()

if __name__ == "__main__":
    # 在后台同时启动网页服务器
    threading.Thread(target=start_http_server, daemon=True).start()
    asyncio.run(main())
