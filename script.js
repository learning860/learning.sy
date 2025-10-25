// 学习伙伴的回应库
const responses = {
    "聪明同学": {
        "greeting": "嗨！我是你的同学小明，我们一起学习吧！遇到难题就问我哦！??",
        "math": "数学其实超有趣的！就像解谜游戏一样。比如 25 × 4 = 100，因为 20×4=80，5×4=20，加起来就是100啦！??",
        "story": "让我讲个数学王国的故事：数字们每天都会开派对，偶数喜欢跳舞，奇数喜欢唱歌...??",
        "game": "我们来玩个游戏吧！从1数到100，遇到7的倍数就拍手！准备好了吗？??",
        "science": "你知道吗？蝴蝶的味觉器官在脚上！它们用脚来品尝花朵的味道。神奇吧？??"
    },
    "知识导师": {
        "greeting": "你好，我是你的知识导师。学习是通往梦想的阶梯，让我们开始吧！??",
        "math": "数学是科学的语言。比如圆的周长公式是 C=2πr，其中π约等于3.14。理解了吗？??",
        "story": "从前有个叫阿基米德的科学家，他在浴缸里发现了浮力原理，高兴得光着身子跑出去大喊'我发现了！'",
        "game": "我们来玩'词语接龙'：我说'学习'，你接'习作'，然后我接'作文'...",
        "science": "地球围绕太阳公转一周需要365.25天，这就是为什么每四年有一个闰年。??"
    },
    "探险伙伴": {
        "greeting": "嘿！冒险家！知识的世界就像一个大宝藏，我们一起探索吧！???",
        "math": "解数学题就像寻宝！每个数字都是线索，每个公式都是藏宝图！比如 15 + 27 = 42，我们找到宝藏啦！??",
        "story": "在遥远的智慧森林里，住着会说话的数字精灵，它们帮助孩子们解决学习难题...",
        "game": "让我们开始知识大冒险！第一关：说出5种不同的动物！第二关：背诵乘法口诀！",
        "science": "探险时间！你知道彩虹为什么有七种颜色吗？那是因为阳光穿过雨滴时发生了折射！??"
    }
};

// 梦想相关的鼓励语
const dreamEncouragements = {
    "科学家": "太棒了！科学家探索世界的奥秘，我们从现在开始积累科学知识吧！??",
    "医生": "伟大的梦想！医生帮助他人，我们先来学习生物知识怎么样？??",
    "宇航员": "酷！宇航员需要很多知识，数学、物理、天文...让我们一步步来！??",
    "老师": "真温暖！老师传递知识，我们先把自己变成知识小达人吧！??",
    "默认": "这个梦想真棒！学习是实现梦想的第一步，我们一起努力！??"
};

// DOM元素
let selectedCharacter = null;
let userDream = '';

document.addEventListener('DOMContentLoaded', function() {
    // 角色选择
    document.querySelectorAll('.character').forEach(char => {
        char.addEventListener('click', function() {
            document.querySelectorAll('.character').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedCharacter = this.dataset.role;
        });
    });

    // 开始学习按钮
    document.getElementById('startLearning').addEventListener('click', function() {
        userDream = document.getElementById('dreamInput').value.trim();
        
        if (!selectedCharacter) {
            alert('请先选择你的学习伙伴！');
            return;
        }

        if (!userDream) {
            alert('请告诉我你的梦想哦！');
            return;
        }

        // 切换到聊天页面
        document.getElementById('welcomePage').classList.remove('active');
        document.getElementById('chatPage').classList.add('active');
        
        // 更新聊天界面
        document.getElementById('companionName').textContent = selectedCharacter;
        document.getElementById('companionRole').textContent = selectedCharacter;
        
        // 发送欢迎消息
        sendWelcomeMessage();
    });

    // 返回按钮
    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('chatPage').classList.remove('active');
        document.getElementById('welcomePage').classList.add('active');
    });

    // 发送消息
    document.getElementById('sendMessage').addEventListener('click', sendUserMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // 快速问题
    document.querySelectorAll('.question-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.dataset.question;
            addMessageToChat('user', question);
            setTimeout(() => generateResponse(question), 1000);
        });
    });
});

function sendWelcomeMessage() {
    const welcomeMsg = responses[selectedCharacter].greeting;
    const encouragement = dreamEncouragements[userDream] || dreamEncouragements.默认;
    
    addMessageToChat('companion', welcomeMsg);
    setTimeout(() => {
        addMessageToChat('companion', `听说你想成为${userDream}？${encouragement}`);
    }, 1500);
}

function sendUserMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        addMessageToChat('user', message);
        input.value = '';
        
        // 模拟思考时间
        setTimeout(() => generateResponse(message), 1000 + Math.random() * 2000);
    }
}

function generateResponse(userMessage) {
    let response = '';
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('数学') || lowerMessage.includes('算数')) {
        response = responses[selectedCharacter].math;
    } else if (lowerMessage.includes('故事') || lowerMessage.includes('讲个')) {
        response = responses[selectedCharacter].story;
    } else if (lowerMessage.includes('游戏') || lowerMessage.includes('玩')) {
        response = responses[selectedCharacter].game;
    } else if (lowerMessage.includes('科学') || lowerMessage.includes('为什么')) {
        response = responses[selectedCharacter].science;
    } else {
        // 默认回应
        const defaultResponses = [
            "这个问题问得好！让我们一起来探索答案吧！??",
            "哇，你真是个爱思考的孩子！这个问题我们可以这样理解...",
            "太棒的问题！这让我想起了一个有趣的知识点...",
            "你的好奇心真强！这正是成为${userDream}需要的重要品质！",
            "让我们像真正的${userDream}一样来研究这个问题吧！"
        ];
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
                  .replace('${userDream}', userDream);
    }
    
    addMessageToChat('companion', response);
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'companion') {
        messageDiv.innerHTML = `
            <div class="avatar">${document.querySelector('.character.selected .avatar').textContent}</div>
            <div class="bubble">
                <strong>${selectedCharacter}</strong>
                <p>${message}</p >
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div style="flex:1"></div>
            <div class="bubble" style="background:#e1f7d5; margin-left: auto;">
                <p>${message}</p >
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}