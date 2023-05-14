const wsUri = " wss://echo-ws-service.herokuapp.com";

const inputMess = document.querySelector('.input');
const btnMess = document.querySelector('.btn-mess');
const btnGeo = document.querySelector('.btn-geo');
const messages = document.querySelector('.messages');
const wrapperChat = document.querySelector('.wrapper-chat');

function writeToScreen(message, position = 'flex-end') {
   let element = `
        <p class='message' style='align-self: ${position}'>
            ${message}
        </p>
    `;
   messages.innerHTML += element;
   wrapperChat.scrollTop = wrapperChat.scrollHeight;
}


let websocket = new WebSocket(wsUri);
websocket.onopen = function (evt) {
   console.log("CONNECTED");
};
websocket.onmessage = function (evt) {
   writeToScreen(`сервер: ${evt.data}`, 'flex-start');
};
websocket.onerror = function (evt) {
   writeToScreen(`server: ${evt.data}`, 'flex-start');
};

btnMess.addEventListener('click', () => {
   let message = inputMess.value;

   if(!(message == "")) {
      websocket.send(message);
      writeToScreen(`Вы: ${message}`);
   } 

   inputMess.value = ''
});



const error = () => {
   let textError = 'Невозможно получить ваше местоположение';
   writeToScreen(textError);
};

const success = (position) => {
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
   writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
};

btnGeo.addEventListener('click', () => {
   if (!navigator.geolocation) {
      console.log('Geolocation не поддерживается вашим браузером');
   } else {
      navigator.geolocation.getCurrentPosition(success, error);
   }
});
