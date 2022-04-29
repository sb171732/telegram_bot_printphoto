const TelegramBot = require('node-telegram-bot-api');
const { print } = require("pdf-to-printer");
const axios = require('axios')
const fs = require('fs');
const request = require('request');
const path = require('path');
// replace the value below with the Telegram token you receive from @BotFather
const token = '5189029938:AAHm4ZL-KZDz7whSlbkzMaKZPx_vyIkgxkU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
  request(url).pipe(fs.createWriteStream(path)).on('close', callback);
});
}

//Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg)  => {
  const chatId = msg.chat.id;
  const resp = msg;
  const count = resp.photo.length 
  const file_id = resp.photo[count-1].file_id
  console.log(`https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`)
  
  console.log(file_id)
  let file_path = ''
  axios.get(`https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`)
  .then(function (response) {
    // handle success
    // print("123.png").then(console.log);
    bot.sendMessage(chatId, "Отправлено на печать!" );
    
    const downloadURL = 
      `https://api.telegram.org/file/bot${token}/${response.data.result.file_path}`;

    // download the file (in this case it's an image)
    download(downloadURL, path.join(__dirname, `${response.data.result.file_path}`), () =>
      print(`${response.data.result.file_path}`).then(console.log("Done!"))
     );

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


  // print(url).then(console.log);
  
});

