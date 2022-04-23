// webhooks работают на https, используем ngrok глобально "ngrok http 3000"
const config = require('config');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const parsers = require('./parserApps');

const bot = new TelegramBot(config.get('token'), {
  webHook: {
    port: config.get('port'),
    autoOpen: false
  }
});

bot.openWebHook();
bot.setWebHook(`${config.get('url')}/bot${config.get('token')}`);

/*bot.on('message', (msg) => {
  const { chat: { id } } = msg;
  bot.sendMessage(id, `clone ${msg.text}`);
});*/

// GET News
let counter = 0;
const chatID = 396087497;
const timeNews = (1000 * 60) * 60; // Каждый час
const timeKURS = ((1000 * 60) * 60) * 6; // Каждые 6 часов
axios
  .get(`https://newsapi.org/v2/everything?q=Apple&from=2022-04-23&sortBy=popularity&apiKey=${config.get('tokenNews')}`)
  .then(async (res) => {
    setInterval(async () => {
      if (res.data.articles.length === counter) {
        counter = 0;
      } else {
        counter ++;
      }

      const parsedHtml = await parsers.news(res.data.articles[counter]);
      bot.sendMessage(chatID, parsedHtml);
    }, timeNews);
  })
  .catch(err => console.log(err));

// GET KURS
axios
  .get(`https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB,BTCUSD,ETHEUR,ETHRUB,BTCEUR,BTCRUB,ETHUSD&key=${config.get('tokenCurrate')}`)
  .then(async (res) => {
    setInterval(async () => {
      const parsedHtml = await parsers.kurs(res.data.data);
      await bot.sendMessage(id, parsedHtml);
    }, timeKURS);
  })
  .catch(err => console.log(err));

/*bot.onText(/\/gotoviy_biznes/, (msg, [ source, match ]) => {
  const { chat: { id } } = msg;
  axios
    .get('https://xkcd.com/info.0.json')
    .then(async (res) => {
      const parsedHtml = await parsers.apps(res.data);

      bot.sendMessage(id, parsedHtml, {
        parse_mode: 'HTML',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Кнопка 1', callback_data: '1' }],
            [{ text: 'Google', url: 'https://google.com' }],
            [
              { text: 'Back to the chat', switch_inline_query: 'Hello again' },
              { text: 'Stay here and talk to me again', switch_inline_query_current_chat: 'It`s love' }
            ],
            [{ text: 'Кнопка 2', callback_data: 'data 2' }],
            [{ text: 'Кнопка 3', callback_data: 'text 3' }],
            [{ text: 'Yandex', url: 'https://yandex.ru' }],
            [{ text: 'Show alert message', callback_data: 'Hello world!!' }]
          ]
        })
      });
    })
    .catch(err => console.log(err));
});*/

/*
bot.onText(/\/cars/, (msg, [ source, match ]) => {
  const { chat: { id } } = msg;
  bot.sendMessage(id, 'Hello cars');
});*/
