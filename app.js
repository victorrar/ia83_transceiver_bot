// t.me/ia83_transciver_bot
const telegraf = require('telegraf');
const BOT_TOKEN = process.env.API_KEY;

// bot.telegram.

const bot = new telegraf(BOT_TOKEN);
const targetChatId = process.env.TARGET_CHAT;    //sokul unchained
const sokulChatId = process.env.SOKUL_CHAT;
let fromIds = [sokulChatId]
bot.start(async (ctx) => {
    await ctx.reply("You are my father!");
});
bot.hears("ping", ctx => {

    ctx.reply(ctx.chat.id + " pong");
});
bot.on("message", ctx => {

    if (fromIds.includes(ctx.chat.id)) {
        bot.telegram.forwardMessage(targetChatId, ctx.chat.id, ctx.message.message_id)
        /*
        switch(ctx.updateSubTypes[0]){
            case "text":
                let text = "*" + ctx.message.from.username.replace(/([*_~`])/, "\\$1") + "* :\r\n" +
                    ctx.message.text;
                console.log(text)
                bot.telegram.sendMessage(targetChatId,
                    text, {parse_mode: "MarkdownV2"})
                    .catch(reason => console.error(reason));
                break;
            case "sticker":
                break;
            case "photo":
                break;
            case "new_chat_members":
                break;
            case "left_chat_member":
                break;
            case "document":
                break;
        }
        */

    }
});

bot.launch().catch((data) => console.log("telegram bot crashed!11!!!" + data));
