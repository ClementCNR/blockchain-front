import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { walletConnect } from '@wagmi/connectors'

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        walletConnect({
            projectId: '',
        }),
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})