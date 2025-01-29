export const evms = {
  holesky: {
    id: '17000',
    label: 'holesky',
    name: 'Holesky',
    nativeCurrency: {
      name: 'Holesky Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:8101',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://holesky.etherscan.io',
      apiUrl: 'https://api-holesky.etherscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 77
      },
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        blockCreated: 801613
      },
      ensUniversalResolver: {
        address: '0xa6AC935D4971E3CD133b950aE053bECD16fE7f3b',
        blockCreated: 973484
      },
      BlsVerifier: {
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        blockCreated: 1
      },
      Vault: {
        address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        blockCreated: 2
      },
      ERC20Mock: {
        address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        blockCreated: 3
      }
    },
    testnet: true,
    block: 0
  },
  sepolia: {
    id: '11155111',
    label: 'sepolia',
    name: 'Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:8102',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
      apiUrl: 'https://api-sepolia.etherscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 751532
      },
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
      },
      ensUniversalResolver: {
        address: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC',
        blockCreated: 5317080
      },
      BlsVerifier: {
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        blockCreated: 1
      },
      Vault: {
        address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        blockCreated: 2
      },
      ERC20Mock: {
        address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        blockCreated: 3
      }
    },
    testnet: true,
    block: 0
  }
}
