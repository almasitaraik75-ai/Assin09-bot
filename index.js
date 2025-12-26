const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) console.log("QR:", qr);

    if (connection === "close") {
      if (
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut
      ) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("✅ Bot connected");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (text === ".menu") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `—Ⱥśsin彡|_𝒕𝒂𝒓𝒊𝒌

• .menu
• .ping
`
      });
    }

    if (text === ".ping") {
      await sock.sendMessage(msg.key.remoteJid, { text: "Pong ✅" });
    }
  });
}

startBot();
