### 📄 `src/index.js` (primer arranque)

```js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'

import Pino from 'pino'

async function startBot () {
  const { state, saveCreds } = await useMultiFileAuthState('sessions')

  const sock = makeWASocket({
    logger: Pino({ level: 'silent' }),
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log('✅ Bot conectado correctamente')
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode
      if (reason !== DisconnectReason.loggedOut) {
        startBot()
      }
    }
  })
}

startBot()
