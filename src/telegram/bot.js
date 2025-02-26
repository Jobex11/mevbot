const TelegramBot = require("node-telegram-bot-api");

// Replace with your Telegram bot token
const token = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage =
    `🚀 *Welcome to Solana MEV Bot!* 🚀\n\n` +
    `💰 *Arbitrage Scanner*: Monitor price differences on DEXs.\n` +
    `⚡ *Liquidation Alerts*: Get notified about profitable liquidations.\n` +
    `📊 *Bot Status*: Check current performance.\n\n` +
    `👉 *Use the buttons below to navigate!*`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💰 Arbitrage Scanner", callback_data: "arbitrage" },
          { text: "⚡ Liquidation Alerts", callback_data: "liquidation" },
        ],
        [
          {
            text: "📊 Bot Status",
            callback_data: "status",
          },
          {
            text: "⚙ Settings",
            callback_data: "setting",
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

//HANDLES BUTTON CLICK

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "arbitrage") {
    bot.sendMessage(
      chatId,
      "🔍 Scan for arbitrage opportunities on Raydium, Orca, Jupiter... 🧐",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🔗 Raydium", callback_data: "raydium" },
              { text: "🎭 Orca", callback_data: "Orca" },
            ],
            [
              { text: "🔗 Jupiter", callback_data: "jupiter" },
              { text: "🎭 Meteora", callback_data: "meteora" },
            ],
          ],
        },
      }
    );
  } else if (data === "liquidation") {
    bot.sendMessage(
      chatId,
      "📡 Monitoring Solend for undercollateralized loans... 📊"
    );
  } else if (data === "status") {
    bot.sendMessage(
      chatId,
      "📈 *Bot Performance:*\n\n✅ Uptime: 99.9%\n💰 Profit Today: 3.2 SOL\n⚡ Speed: 0.3s Execution Time",
      { parse_mode: "Markdown" }
    );
  } else if (data === "setting") {
    bot.sendMessage(
      chatId,
      "⚙ *Settings Menu:*\n\n🔔 Toggle Notifications\n🔄 Refresh Data\n📞 Contact Support",
      { parse_mode: "Markdown" }
    );
  } else if (data === "select_rpc") {
    bot.sendMessage(chatId, "🌐 Choose an RPC option or enter a custom one:", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🔵 Alchemy Mainnet", callback_data: "alchemy_mainnet" },
            { text: "🟡 Quick Node Mainnet", callback_data: "quick_node" },
          ],
          [
            { text: "🔵 Helius Mainnet", callback_data: "helius_mainnet" },
            { text: "🟡 Ankr Mainnet", callback_data: "ankr_node" },
          ],
          [
            {
              text: "🔵 Chainstack Mainnet",
              callback_data: "chainstack_mainnet",
            },
            { text: "🟡 Blast Mainnet", callback_data: "blast_node" },
          ],

          [
            //  { text: "🟡 Testnet", callback_data: "rpc_testnet" },
            { text: "✏️ Enter Custom RPC", callback_data: "rpc_custom" },
          ],
        ],
      },
    });
  }

  bot.answerCallbackQuery(query.id);
});

console.log("🤖 Telegram Bot is running...");

module.exports = bot;
