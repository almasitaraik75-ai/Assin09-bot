// Assin09 WhatsApp Bot
// اسم المينيو: — Ⱥśsin彡|_𝒕𝒂𝒓𝒊𝒌

const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || "";

    if (text === ".menu") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "— Ⱥśsin彡|_𝒕𝒂𝒓𝒊𝒌"
      });
    }
  });
}

startBot();
