//
// import{ Telegraf, Markup} from 'telegraf'
// // import {webApp} from "telegraf/typings/button.js";
// import {message} from "telegraf/filters";
//
// const token ='8092794181:AAEmhNLOZUHe1eO4aVRPGGFSE_gNig_LMeQ'
// const webAppUrl = 'https://angular-tg-app-71dfc.web.app'
// const bot = new Telegraf(token, {})
//
// bot.command('start', (ctx)=>{
//     ctx.reply(
//         'Добро пожаловать! Нажмите кнопку ниже, чтобы запустить приложение и перейти на аккаунт красотки',
//         Markup.keyboard([Markup.button.webApp(
//             'Отправить сообщение',
//             `${webAppUrl}/feedback`
//         )])
//     )
// })
//
// bot.on( message('web_app_data'), async (ctx)=>{
//     const data = ctx.webAppData.data.json
//     ctx.reply(`Ваше сообщение : ${data?.feedback}` ?? 'empty message')
// } )
//
// bot.launch()
///////////////////////////////////


// import { Telegraf, Markup } from 'telegraf';
//
// const token = '8092794181:AAEmhNLOZUHe1eO4aVRPGGFSE_gNig_LMeQ'; // Замените на ваш токен
// const webAppUrl = 'https://angular-tg-app-71dfc.web.app'; // Замените на URL вашего веб-приложения
//
// const bot = new Telegraf(token);
//
// // Проверка статуса бота
// bot.telegram.getMe().then((botInfo) => {
//     console.log('Бот активен:', botInfo.username);
// }).catch((error) => {
//     console.error('Ошибка при проверке бота:', error);
// });
//
// // Обработка команды /start
// bot.command('start', async (ctx) => {
//     const chatId = ctx.from.id;
//     console.log('Пользователь chat_id:', chatId);
//
//     try {
//         await ctx.reply(
//             'Добро пожаловать! Нажмите кнопку ниже, чтобы запустить приложение и перейти на аккаунт красотки',
//             Markup.keyboard([
//                 Markup.button.webApp('Отправить сообщение', `${webAppUrl}/feedback`),
//             ]).resize(),
//         );
//     } catch (error) {
//         if (error.response && error.response.error_code === 403) {
//             console.log(`Пользователь ${chatId} заблокировал бота.`);
//         } else {
//             console.error('Ошибка при отправке сообщения:', error);
//         }
//     }
// });
//
// // Обработка данных из веб-приложения
// bot.on('web_app_data', async (ctx) => {
//     try {
//         const data = ctx.webAppData?.data?.json();
//         if (data && data.feedback) {
//             await ctx.reply(`Ваше сообщение: ${data.feedback}`);
//         } else {
//             await ctx.reply('Получены пустые данные.');
//         }
//     } catch (error) {
//         console.error('Ошибка при обработке данных из веб-приложения:', error);
//         ctx.reply('Произошла ошибка при обработке вашего сообщения.');
//     }
// });
//
// // Глобальная обработка ошибок
// bot.catch((err, ctx) => {
//     console.error('Ошибка в боте:', err);
//     ctx.reply('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
// });
//
// // Запуск бота
// bot.launch();
//
// // Обработка завершения работы
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));
/////////////////////////////////////////////////////

import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';

const token = '8092794181:AAEmhNLOZUHe1eO4aVRPGGFSE_gNig_LMeQ';
const webAppUrl = 'https://angular-tg-app-71dfc.web.app';
const bot = new Telegraf(token);

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! Нажмите кнопку ниже, чтобы запустить приложение и перейти на аккаунт красотки',
        Markup.keyboard([
            Markup.button.webApp('Отправить сообщение', `${webAppUrl}/feedback`)
        ]).resize()
    );
});

bot.on(message('web_app_data'), async (ctx) => {
    try {
        // Получаем корректный путь к данным
        const rawData = ctx.update.message.web_app_data?.data;
        if (!rawData) {
            throw new Error('Данные отсутствуют');
        }

        // Парсим данные, так как web_app_data.data приходит в виде строки JSON
        const data = JSON.parse(rawData);

        // Проверяем, есть ли в данных поле feedback
        const feedback = data?.feedback?.trim();
        if (!feedback) {
            ctx.reply('Вы не отправили сообщение. Попробуйте еще раз!');
            return;
        }

        ctx.reply(`Ваше сообщение: ${feedback}`);
    } catch (error) {
        console.error('Ошибка при обработке данных:', error);
        ctx.reply('Произошла ошибка при обработке вашего сообщения.');
    }
});

bot.launch();
console.log('Бот запущен...');
