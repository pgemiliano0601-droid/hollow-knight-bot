export const prefix = '#'

export async function handleMessage(sock, msg) {
  try {
    // Ignorar mensajes sin texto
    const message =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text

    if (!message) return

    // Ignorar si no es comando
    if (!message.startsWith(prefix)) return

    const args = message.slice(prefix.length).trim().split(/\s+/)
    const command = args.shift().toLowerCase()

    // Comando de prueba
    if (command === 'ping') {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '🏓 Pong!'
      })
    }

  } catch (err) {
    console.error('❌ Error en handler:', err)
  }
}

