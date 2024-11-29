'use client'

import {
  createAppKit,
  useAppKit,
  useAppKitEvents,
  useAppKitState,
  useAppKitTheme
} from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = 'fd9418b1127f6a3f271577f4c2328b1c'

// 2. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [sepolia],
  projectId,
  features: {
    analytics: true
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})

export function AppKit() {
  // 4. Use modal hook
  const modal = useAppKit()
  const state = useAppKitState()
  const { themeMode, themeVariables, setThemeMode } = useAppKitTheme()
  const events = useAppKitEvents()

  return (
    <>
      <appkit-button />
      <appkit-network-button />
      <appkit-connect-button />
      <appkit-account-button />

      <button onClick={() => modal.open()}>Connect Wallet</button>
      <button onClick={() => modal.open({ view: 'Networks' })}>Choose Network</button>
      <button onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme Mode
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify({ themeMode, themeVariables }, null, 2)}</pre>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </>
  )
}