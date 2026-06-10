// 从 localStorage 读取历史数据，如果不存在则赋予初始默认值
let wins = localStorage.getItem('ow_wins') ? parseInt(localStorage.getItem('ow_wins')) : 0;
let losses = localStorage.getItem('ow_losses') ? parseInt(localStorage.getItem('ow_losses')) : 0;
let currentMajor = localStorage.getItem('ow_currentMajor') ? parseInt(localStorage.getItem('ow_currentMajor')) : 3; // 0 = 青铜
let currentSub = localStorage.getItem('ow_currentSub') ? parseInt(localStorage.getItem('ow_currentSub')) : 1;   // 5 是最低

// 定义守望先锋的 8 个大段位
const majorRanks = ["Bronze", "Silver", "Gold", "Plat", "Diamond", "Master", "GM", "Champion"];

// 封装一个统一的更新显示并保存数据的函数
function updateDisplayAndSave() {
    // 1. 更新网页界面上的文字显示
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('rank-display').textContent = `${majorRanks[currentMajor]} ${currentSub}`;
    
    // 2. 将当前最新数据实时保存到浏览器的 localStorage 中
    localStorage.setItem('ow_wins', wins);
    localStorage.setItem('ow_losses', losses);
    localStorage.setItem('ow_currentMajor', currentMajor);
    localStorage.setItem('ow_currentSub', currentSub);
}

// 当网页加载完成后，立即执行一次，把上次保存的数据读取并显示出来
window.addEventListener('DOMContentLoaded', () => {
    updateDisplayAndSave();
});

function handleButtonPress(type) {
    switch(type) {
        case "win+":
            wins++;
            break;

        case "win-":
            if(wins > 0) wins--;
            break;    

        case "lose+":
            losses++;
            break;  

        case "lose-":
            if(losses > 0) losses--;
            break;

        case "rank+":
            // 段位提升：数字减小 (5 -> 4 -> 3 -> 2 -> 1)
            if (currentSub > 1) {
                currentSub--;
            } else if (currentMajor < majorRanks.length - 1) {
                // 如果当前是 1，且未达到最高大段位，则晋级下一个大段位的 5
                currentMajor++;
                currentSub = 5;
            }
            break;

        case "rank-":
            // 段位下降：数字增大 (1 -> 2 -> 3 -> 4 -> 5)
            if (currentSub < 5) {
                currentSub++;
            } else if (currentMajor > 0) {
                // 如果当前是 5，且未降到最低大段位，则掉落上一个大段位的 1
                currentMajor--;
                currentSub = 1;
            }
            break;

        case "clear":
            // 清空功能仅重置胜负场，保留当前段位
            wins = losses = 0;
            break;
    }
    
    // 按钮按下后，触发更新与保存
    updateDisplayAndSave();
}
// --- 新增：WebSocket 接收器 ---
function connectWebSocket() {
    // 连接到本地的后台服务
    const ws = new WebSocket('ws://localhost:8765');

    ws.onopen = () => {
        console.log("Connection Succesful");
    };

    ws.onmessage = (event) => {
        const command = event.data;
        // 当收到后台发来的指令时，相当于点击了对应的按钮
        handleButtonPress(command);
    };

    ws.onclose = () => {
        // 如果断开连接，3秒后自动重连
        setTimeout(connectWebSocket, 3000);
    };
}

// 启动接收器
connectWebSocket();
