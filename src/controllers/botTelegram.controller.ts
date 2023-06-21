import { FastifyInstance } from "fastify";
import { botTelegram } from "../constant/variabel";
import { errorBotTelegram } from "../util/handlerRespons";
import { emailIsValid } from "../util/validationIs";
import { cloneDeep } from "lodash";
import { Markup } from "telegraf";


export const botTelegramController = (f: FastifyInstance): void => {
    // declare config
    botTelegram.telegram.setMyCommands([], { language_code: 'id' });

    // declare function
    // const start = async (): Promise<void> => {
    //     await botTelegram.command('start', async (ctx): Promise<void> => {
    //         try {
    //             ctx.deleteMessage();
    //             console.log('ctx', ctx.message);

    //             await botTelegram.telegram.sendMessage(ctx.chat.id, 'Selamat Datang di Monitoring Home Grand Balaraja Blok B4 no 16\nBot ini bertugas untuk melakukan pemantauan Rumah.', {
    //                 reply_markup: {
    //                     inline_keyboard: [
    //                         [
    //                             {
    //                                 text: "Masuk",
    //                                 callback_data: "btn_login"
    //                             },
    //                         ]
    //                     ],
    //                 }
    //             });
    //         } catch (error) {
    //             errorBotTelegram(f, error, ctx)
    //         }
    //     });
    // }

    // running function
    // start();

    botTelegram.start(async (ctx: any): Promise<void> => {
        ctx.deleteMessage();
        const replyKeyboard = Markup.keyboard([
            ['Masuk']
        ]).oneTime().resize();

        ctx.reply('Selamat Datang di Monitoring Home Grand Balaraja Blok B4 no 16\nBot ini bertugas untuk melakukan pemantauan Rumah.', replyKeyboard);
    });

    botTelegram.hears('Masuk', async (ctx: any): Promise<void> => {
        ctx.replyWithChatAction('typing');
        ctx.reply('Masukan Username atau Email Anda:\n\n(Reply pesan ini untuk memasukan Email)', Markup.removeKeyboard());
    });


    // bot action
    botTelegram.action('btn_login', async (ctx: any): Promise<void> => {
        await botTelegram.telegram.sendMessage(ctx.chat.id, 'Masukan Username atau Email Anda')
    })
    botTelegram.action('btn_no', async (ctx: any): Promise<void> => {
        await botTelegram.telegram.sendMessage(ctx.chat.id, 'no')
    })

    botTelegram.on('message', async (ctx: any): Promise<void> => {
        console.log('ctx-message', ctx.message);
        console.log('ctx-emailIsValid(ctx.message.text)', emailIsValid(ctx.message.text));
        const replyToMessage = ctx.message.reply_to_message;
        if (replyToMessage?.text && replyToMessage?.text === 'Masukan Username atau Email Anda:\n\n(Reply pesan ini untuk memasukan Email)' && emailIsValid(ctx.message.text)) {
            ctx.replyWithChatAction('typing');
            let email = cloneDeep(ctx.message.text);
            ctx.deleteMessage();
            const [name, domain] = email.split('@');
            email = `${name.slice(0, 3)}${new Array(name.length - 2).join('*')}@${domain}`;
            await ctx.reply(`Email: ${email}`);
            ctx.replyWithChatAction('typing');
            await ctx.reply(`Masukan Password Anda: \n\n(Reply pesan ini untuk memasukan Password)`);
        } else if (replyToMessage?.text && replyToMessage?.text === 'Masukan Password Anda: \n\n(Reply pesan ini untuk memasukan Password)') {
            ctx.replyWithChatAction('typing');
            ctx.deleteMessage();
            const replyKeyboard = Markup.keyboard([
                ['Foto Rumah']
            ]).oneTime().resize();

            await ctx.reply(`Password: **********`);
            ctx.replyWithChatAction('typing');
            await ctx.reply(`Yeay... Anda berhasil Masuk`, Markup.removeKeyboard());
        } else {
            ctx.deleteMessage();
            console.log('no email');
        }
    })

    botTelegram.on('chat_member', async (ctx: any): Promise<void> => {
        console.log('ctx-chat_member', ctx.message);
    })
}