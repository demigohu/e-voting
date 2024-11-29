import { createConfig,  http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [ sepolia],
  ssr: true,
  syncConnectedChain: false,
  connectors: [injected()], 
  transports: { 
    [sepolia.id]: http('https://sepolia.infura.io/v3/d045864c488e4b7cb952105a356d971f'), 
  }, 
})