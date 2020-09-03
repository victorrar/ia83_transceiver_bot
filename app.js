// https://t.me/ia83_transceiver_bot
const telegraf = require('telegraf');

const bot = new telegraf(process.env.API_KEY);  //creating bot

const targetChatId = parseInt(process.env.TARGET_CHAT);    //sokul unchained caht
const sokulChatId = parseInt(process.env.SOKUL_CHAT);   //sokul chat
let fromIds = [sokulChatId] //chat list to retransmit

bot.start(async (ctx) => {  //action on /start command
    if (ctx.chat.id !== sokulChatId) {  //ignore in the sokul chat
        await ctx.reply("You are not a my father!");
    }
});

bot.hears("ping", ctx => {  //action on the 'ping' message
    if (ctx.chat.id !== sokulChatId) {  //ignore in the sokul chat
        ctx.reply("pong");
    }
});

bot.on("message", ctx => {  //on any message
    if (fromIds.includes(ctx.chat.id)) {    //react only on included chats
        bot.telegram.forwardMessage(targetChatId, ctx.chat.id, ctx.message.message_id); //forward message
        //TODO do rich message retransmission like print author of forward the forwarded message in 'from' chat
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

bot.launch().catch((data) => console.log("telegram bot crashed!11!!!" + data)); //start bot
