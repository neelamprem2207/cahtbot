io()


function openForm() {
  try{
    document.getElementById("chat-popup-id").style.display = "block";
    document.getElementById("open-button-id").style.pointerEvents="none";
  }
  catch(e){
    console.log(e)
  }
    
}
  
function closeForm() {
  try{
    document.getElementById("chat-popup-id").style.display = "none";
    document.getElementById("open-button-id").style.pointerEvents="auto";
    document.getElementById("popup-header-id").style.pointerEvents="auto";
    document.getElementById("message-area-id").style.pointerEvents="auto";
    document.getElementById("popup-footer-id").style.pointerEvents="auto";
  }
  catch(e){
    console.log(e)
  }
    
}

function openModalWindow(){

  try{
    document.getElementById("modal-window").style.display= "block";
    document.getElementById("popup-header-id").style.pointerEvents="none";
    document.getElementById("message-area-id").style.pointerEvents="none";
    document.getElementById("popup-footer-id").style.pointerEvents="none";
    document.getElementById("message-area-id").style.filter= "blur(5px)";
  }
  catch(e){
    console.log(e)
  }
   
}

function closeModalWindow(){

  try{
    document.getElementById("modal-window").style.display= "none";
    document.getElementById("message-area-id").style.filter= "none";
    document.getElementById("popup-header-id").style.pointerEvents="auto";
    document.getElementById("message-area-id").style.pointerEvents="auto";
    document.getElementById("popup-footer-id").style.pointerEvents="auto";
  }
  catch(e){
    console.log(e)
  }

}

document.getElementById("txtUserMsgId").addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    event.preventDefault();
      document.getElementById("sendBtnId").click();
  }
})


var socket;
// window.onload = function() {
				
//   socket = io.connect('http://localhost:3000');
				
//   socket.on('message-from-others', function(message){
//   var html = '<div class="message-box others-message-box">' + '<div class="message others-message"> ' + message + ' </div>' + '<div class="separator"></div>' + '</div>';
							
//   document.getElementById("message-area").innerHTML += html;
//   })

// }

const buttonHello = document.getElementById('hello');
buttonHello.addEventListener('click', function(e) {
  var message = e.target.innerText;
  responseMessage(message) 
})

const buttonHelp = document.getElementById('help');
buttonHelp.addEventListener('click', function(e) {
  var message = e.target.innerText;
  responseMessage(message) 
})

const buttonLink = document.getElementById('link');
buttonLink.addEventListener('click', function(e) {
  var message = e.target.innerText;
  responseMessage(message) 
})


function sendMessageHello(){
  try{
    var message = 'Hello'
    responseMessage(message)  
  }
  catch(e){
    console.log(e)
  }
}
		
function sendMessage() {
  try{
    let message = document.getElementById("txtUserMsgId").value.trim();
    
    if(message==""){
      return
    }
    
    responseMessage(message)
  
  }
	catch(e){
    console.log(e)
  }
}

function speak(string) {
  try{
    const u = new SpeechSynthesisUtterance();
    allVoices = speechSynthesis.getVoices();
    u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
    u.text = string;
    u.lang = "en-US";
    u.volume = 1; //0-1 interval
    u.rate = 1;
    u.pitch = 2; //0-2 interval
    speechSynthesis.speak(u);
  }
  catch(e){
    console.log(e)
  }
  
}

function sessionClear(){
  
  try{
    document.getElementById("modal-window").style.display= "none";
    document.getElementById("popup-header-id").style.pointerEvents="auto";
    document.getElementById("message-area-id").style.pointerEvents="auto";
    document.getElementById("popup-footer-id").style.pointerEvents="auto";
    document.getElementById("chat-area").innerHTML = "";
    document.getElementById("txtUserMsgId").value = "";
    document.getElementById("message-area-id").style.filter= "none";
    document.getElementById("chat-popup-id").style.display = "none";
    document.getElementById("open-button-id").style.pointerEvents="auto";
    
  } 
  catch(e){
    console.log(e)
  }

}


function responseMessage(message){
  try{
    
    var date = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    var html = '<div class="message-box my-message-box"><img class="user-icon" src="/img/userIcon.png"><div class="message my-message">' + message + '</div></div> <div class="separator-my-message">'+date+'</div>';
    var objDiv = document.getElementById("message-area")


    document.getElementById("chat-area").innerHTML += html;
    document.getElementById("txtUserMsgId").value = "";
          

    fetch('http://localhost:3000/api/chatbot?message='+encodeURIComponent(message)).then((response)=>{
      response.json().then((data)=>{
  
          if(data.error){
            
            var html = '<div class="others-message-div"><img class="chat-icon" src="/img/chatbot.png"><div class="message others-message">' + data.error + ' </div></div>' + '<div class="separator-others-message"></div>' + '</div>';
                
            document.getElementById("chat-area").innerHTML += html
            objDiv.scrollTop = objDiv.scrollHeight
            return 
          }
  
          let botresponse = data.botMsg
  
          speak(botresponse)

          botresponse = urlifany(botresponse)

          console.log(botresponse)
          
          var html = '<div class="others-message-div"><img class="chat-icon" src="/img/chatbot.png"><div class="message others-message">' + botresponse + ' </div></div>' + '<div class="separator-others-message"></div>' + '</div>';
                
          document.getElementById("chat-area").innerHTML += html
          
          objDiv.scrollTop = objDiv.scrollHeight
  
          console.log(date)
         
      })
      
    })
    
  }
  catch(e){
    console.log(e)
  }
  
}

function runSpeechRecognition() {
  try{
    document.getElementById("modal-window-microphone").style.display="block";
    document.getElementById("message-area-id").style.filter= "blur(5px)";
    document.getElementById("popup-header-id").style.pointerEvents="none";
    document.getElementById("message-area-id").style.pointerEvents="none";
    document.getElementById("popup-footer-id").style.pointerEvents="none";

    var output = document.getElementById("txtUserMsgId");
  
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
      console.log('speech recognition started')
    }
        
    recognition.onspeechend = function() {
      console.log('speech recognition stoped')
      recognition.stop();
      document.getElementById("modal-window-microphone").style.display="none";
      document.getElementById("message-area-id").style.filter= "none";
      document.getElementById("popup-header-id").style.pointerEvents="auto";
      document.getElementById("message-area-id").style.pointerEvents="auto";
      document.getElementById("popup-footer-id").style.pointerEvents="auto";
    }
      
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      console.log(transcript)
      output.value = transcript;
           
    };
      
     // start recognition
    recognition.start();
  }
  catch(e){
    console.log(e)
  }
  
}

function urlifany(botresponse) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return botresponse.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}



{/* <div class="message-box my-message-box">
  <img class="user-icon" src="/img/userIcon.png">
  <div class="message my-message"> 
    ' + message + '
  </div>
</div> 
<div class="separator-my-message">
    '+date+'
</div>

<div class="others-message-div">
  <img class="chat-icon" src="/img/chatbot.png">
  <div class="message others-message">
    ' + data.error + ' 
  </div>
</div>
<div class="separator-others-message">
  '+date+'
</div> */}


// function responseMessage(message){
//   try{
//     var date = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
//     var html = '<div class="message-box my-message-box">' + '<div class="message my-message"><img class="user-icon" src="/img/userIcon.png"> ' + message + '<img></div>' + '<div class="separator-my-message"><span class="date-my-message">'+date+'</span></div>' + '</div>';
                
//     document.getElementById("chat-area").innerHTML += html;
//     document.getElementById("txtUserMsgId").value = "";
          
  
//     fetch('http://localhost:3000/api/chatbot?message='+encodeURIComponent(message)).then((response)=>{
//       response.json().then((data)=>{
  
//           if(data.error){
            
//             var html = '<div class="others-message-div"><img class="chat-icon" src="/img/chatbot.png"><div class="message others-message">' + data.error + ' </div></div>' + '<div class="separator-others-message">'+date+'</div>' + '</div>';
                
//             document.getElementById("chat-area").innerHTML += html
//             return 
//           }
  
//           let botresponse = data.botMsg
  
//           speak(botresponse)

//           botresponse = urlifany(botresponse)

//           console.log(botresponse)
          
//           var html = '<div class="others-message-div"><img class="chat-icon" src="/img/chatbot.png"><div class="message others-message">' + botresponse + ' </div></div>' + '<div class="separator-others-message">'+date+'</div>' + '</div>';
                
//           document.getElementById("chat-area").innerHTML += html
          
  
//           console.log(date)
         
//       })
  
//     })
//   }
//   catch(e){
//     console.log(e)
//   }
  
// }

