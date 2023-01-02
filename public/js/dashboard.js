function openChatHistory(){

    document.getElementById("chat-display").innerHTML = "";
    
    let i=0
    for(i=0;i<20;i++){
        var html = '<div class="user"><img class="user-icon" src="/img/userIcon.png">UserMsg</div><div class="seperator"></div><div class="bot"><img class="chat-icon" src="/img/chatbot.png">BotMsg</div><div class="seperator"></div>'
        document.getElementById("chat-display").innerHTML += html;
    }
}