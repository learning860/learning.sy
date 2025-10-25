// ѧϰ���Ļ�Ӧ��
const responses = {
    "����ͬѧ": {
        "greeting": "�ˣ��������ͬѧС��������һ��ѧϰ�ɣ��������������Ŷ��??",
        "math": "��ѧ��ʵ����Ȥ�ģ����������Ϸһ�������� 25 �� 4 = 100����Ϊ 20��4=80��5��4=20������������100����??",
        "story": "���ҽ�����ѧ�����Ĺ��£�������ÿ�춼�Ὺ�ɶԣ�ż��ϲ�����裬����ϲ������...??",
        "game": "�����������Ϸ�ɣ���1����100������7�ı��������֣�׼��������??",
        "science": "��֪���𣿺�����ζ�������ڽ��ϣ������ý���Ʒ�������ζ��������ɣ�??"
    },
    "֪ʶ��ʦ": {
        "greeting": "��ã��������֪ʶ��ʦ��ѧϰ��ͨ������Ľ��ݣ������ǿ�ʼ�ɣ�??",
        "math": "��ѧ�ǿ�ѧ�����ԡ�����Բ���ܳ���ʽ�� C=2��r�����Ц�Լ����3.14���������??",
        "story": "��ǰ�и��а����׵µĿ�ѧ�ң�����ԡ���﷢���˸���ԭ�����˵ù��������ܳ�ȥ��'�ҷ����ˣ�'",
        "game": "��������'�������'����˵'ѧϰ'�����'ϰ��'��Ȼ���ҽ�'����'...",
        "science": "����Χ��̫����תһ����Ҫ365.25�죬�����Ϊʲôÿ������һ�����ꡣ??"
    },
    "̽�ջ��": {
        "greeting": "�٣�ð�ռң�֪ʶ���������һ���󱦲أ�����һ��̽���ɣ�???",
        "math": "����ѧ�����Ѱ����ÿ�����ֶ���������ÿ����ʽ���ǲر�ͼ������ 15 + 27 = 42�������ҵ���������??",
        "story": "��ңԶ���ǻ�ɭ���ס�Ż�˵�������־��飬���ǰ��������ǽ��ѧϰ����...",
        "game": "�����ǿ�ʼ֪ʶ��ð�գ���һ�أ�˵��5�ֲ�ͬ�Ķ���ڶ��أ����г˷��ھ���",
        "science": "̽��ʱ�䣡��֪���ʺ�Ϊʲô��������ɫ��������Ϊ���⴩�����ʱ���������䣡??"
    }
};

// ������صĹ�����
const dreamEncouragements = {
    "��ѧ��": "̫���ˣ���ѧ��̽������İ��أ����Ǵ����ڿ�ʼ���ۿ�ѧ֪ʶ�ɣ�??",
    "ҽ��": "ΰ������룡ҽ���������ˣ���������ѧϰ����֪ʶ��ô����??",
    "�Ա": "�ᣡ�Ա��Ҫ�ܶ�֪ʶ����ѧ����������...������һ��������??",
    "��ʦ": "����ů����ʦ����֪ʶ�������Ȱ��Լ����֪ʶС���˰ɣ�??",
    "Ĭ��": "������������ѧϰ��ʵ������ĵ�һ��������һ��Ŭ����??"
};

// DOMԪ��
let selectedCharacter = null;
let userDream = '';

document.addEventListener('DOMContentLoaded', function() {
    // ��ɫѡ��
    document.querySelectorAll('.character').forEach(char => {
        char.addEventListener('click', function() {
            document.querySelectorAll('.character').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedCharacter = this.dataset.role;
        });
    });

    // ��ʼѧϰ��ť
    document.getElementById('startLearning').addEventListener('click', function() {
        userDream = document.getElementById('dreamInput').value.trim();
        
        if (!selectedCharacter) {
            alert('����ѡ�����ѧϰ��飡');
            return;
        }

        if (!userDream) {
            alert('��������������Ŷ��');
            return;
        }

        // �л�������ҳ��
        document.getElementById('welcomePage').classList.remove('active');
        document.getElementById('chatPage').classList.add('active');
        
        // �����������
        document.getElementById('companionName').textContent = selectedCharacter;
        document.getElementById('companionRole').textContent = selectedCharacter;
        
        // ���ͻ�ӭ��Ϣ
        sendWelcomeMessage();
    });

    // ���ذ�ť
    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('chatPage').classList.remove('active');
        document.getElementById('welcomePage').classList.add('active');
    });

    // ������Ϣ
    document.getElementById('sendMessage').addEventListener('click', sendUserMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // ��������
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
    const encouragement = dreamEncouragements[userDream] || dreamEncouragements.Ĭ��;
    
    addMessageToChat('companion', welcomeMsg);
    setTimeout(() => {
        addMessageToChat('companion', `��˵�����Ϊ${userDream}��${encouragement}`);
    }, 1500);
}

function sendUserMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        addMessageToChat('user', message);
        input.value = '';
        
        // ģ��˼��ʱ��
        setTimeout(() => generateResponse(message), 1000 + Math.random() * 2000);
    }
}

function generateResponse(userMessage) {
    let response = '';
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('��ѧ') || lowerMessage.includes('����')) {
        response = responses[selectedCharacter].math;
    } else if (lowerMessage.includes('����') || lowerMessage.includes('����')) {
        response = responses[selectedCharacter].story;
    } else if (lowerMessage.includes('��Ϸ') || lowerMessage.includes('��')) {
        response = responses[selectedCharacter].game;
    } else if (lowerMessage.includes('��ѧ') || lowerMessage.includes('Ϊʲô')) {
        response = responses[selectedCharacter].science;
    } else {
        // Ĭ�ϻ�Ӧ
        const defaultResponses = [
            "��������ʵúã�������һ����̽���𰸰ɣ�??",
            "�ۣ������Ǹ���˼���ĺ��ӣ�����������ǿ����������...",
            "̫�������⣡������������һ����Ȥ��֪ʶ��...",
            "��ĺ�������ǿ�������ǳ�Ϊ${userDream}��Ҫ����ҪƷ�ʣ�",
            "��������������${userDream}һ�����о��������ɣ�"
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