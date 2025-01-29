export const networks = {
  abey: {
    id: 179n,
    label: 'abey',
    name: 'ABEY Mainnet',
    nativeCurrency: {
      name: 'ABEY',
      symbol: 'ABEY',
      decimals: 18
    },
    providerURL: 'https://rpc.abeychain.com',
    blockExplorer: {
      name: 'Abey Scan',
      url: 'https://abeyscan.com'
    },
    contracts: {},
    testnet: false
  },
  abstract: {
    id: 2741n,
    label: 'abstract',
    name: 'Abstract',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://api.mainnet.abs.xyz',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://abscan.org'
    },
    contracts: {
      multicall3: {
        address: '0xAa4De41dba0Ca5dCBb288b7cC6b708F3aaC759E7',
        blockCreated: 5288
      },
      universalSignatureVerifier: {
        address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
        blockCreated: 5263
      }
    },
    testnet: false
  },
  abstractTestnet: {
    id: 11124n,
    label: 'abstractTestnet',
    name: 'Abstract Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://api.testnet.abs.xyz',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia.abscan.org'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
        blockCreated: 358349
      },
      universalSignatureVerifier: {
        address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
        blockCreated: 431682
      }
    },
    testnet: true
  },
  acala: {
    id: 787n,
    label: 'acala',
    name: 'Acala',
    nativeCurrency: {
      name: 'Acala',
      symbol: 'ACA',
      decimals: 18
    },
    providerURL: 'https://eth-rpc-acala.aca-api.network',
    blockExplorer: {
      name: 'Acala Blockscout',
      url: 'https://blockscout.acala.network',
      apiUrl: 'https://blockscout.acala.network/api'
    },
    contracts: {},
    testnet: false
  },
  acria: {
    id: 47n,
    label: 'acria',
    name: 'Acria IntelliChain',
    nativeCurrency: {
      decimals: 18,
      name: 'ACRIA',
      symbol: 'ACRIA'
    },
    providerURL: 'https://aic.acria.ai',
    blockExplorer: {
      name: 'Acria Explorer',
      url: 'https://explorer.acria.ai'
    },
    contracts: {},
    testnet: false
  },
  adf: {
    id: 1215n,
    label: 'adf',
    name: 'ADF Chain',
    nativeCurrency: {
      name: 'ADDFILL',
      symbol: 'ADF',
      decimals: 18
    },
    providerURL: 'https://mainnet.adftechnology.com',
    blockExplorer: {
      name: 'ADF Mainnet Explorer',
      url: 'https://explorer.adftechnology.com'
    },
    contracts: {},
    testnet: false
  },
  aioz: {
    id: 168n,
    label: 'aioz',
    name: 'AIOZ Network',
    nativeCurrency: {
      decimals: 18,
      name: 'AIOZ',
      symbol: 'AIOZ'
    },
    providerURL: 'https://eth-dataseed.aioz.network',
    blockExplorer: {
      name: 'AIOZ Explorer',
      url: 'https://explorer.aioz.network'
    },
    contracts: {},
    testnet: false
  },
  alephZero: {
    id: 41455n,
    label: 'alephZero',
    name: 'Aleph Zero',
    nativeCurrency: {
      name: 'Aleph Zero',
      symbol: 'AZERO',
      decimals: 18
    },
    providerURL: 'https://rpc.alephzero.raas.gelato.cloud',
    blockExplorer: {
      name: 'Aleph Zero EVM Explorer',
      url: 'https://evm-explorer.alephzero.org',
      apiUrl: 'https://evm-explorer.alephzero.org/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 4603377
      }
    },
    testnet: false
  },
  alephZeroTestnet: {
    id: 2039n,
    label: 'alephZeroTestnet',
    name: 'Aleph Zero Testnet',
    nativeCurrency: {
      name: 'TZERO',
      symbol: 'TZERO',
      decimals: 18
    },
    providerURL: 'https://rpc.alephzero-testnet.gelato.digital',
    blockExplorer: {
      name: 'Aleph Zero EVM Testnet explorer',
      url: 'https://evm-explorer-testnet.alephzero.org',
      apiUrl: 'https://evm-explorer-testnet.alephzero.org/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 2861745
      }
    },
    testnet: true
  },
  alienx: {
    id: 10241024n,
    label: 'alienx',
    name: 'AlienX Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.alienxchain.io/http',
    blockExplorer: {
      name: 'AlienX Explorer',
      url: 'https://explorer.alienxchain.io'
    },
    contracts: {},
    testnet: false
  },
  alienxHalTestnet: {
    id: 10241025n,
    label: 'alienxHalTestnet',
    name: 'ALIENX Hal Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://hal-rpc.alienxchain.io/http',
    blockExplorer: {
      name: 'AlienX Explorer',
      url: 'https://hal-explorer.alienxchain.io'
    },
    contracts: {},
    testnet: true
  },
  ancient8: {
    id: 888888888n,
    label: 'ancient8',
    name: 'Ancient8',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.ancient8.gg',
    blockExplorer: {
      name: 'Ancient8 explorer',
      url: 'https://scan.ancient8.gg',
      apiUrl: 'https://scan.ancient8.gg/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '1': {
          address: '0xB09DC08428C8b4EFB4ff9C0827386CDF34277996'
        }
      },
      portal: {
        '1': {
          address: '0x639F2AECE398Aa76b07e59eF6abe2cFe32bacb68',
          blockCreated: 19070571
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0xd5e3eDf5b68135D559D572E26bF863FBC1950033',
          blockCreated: 19070571
        }
      }
    },
    testnet: false
  },
  ancient8Sepolia: {
    id: 28122024n,
    label: 'ancient8Sepolia',
    name: 'Ancient8 Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpcv2-testnet.ancient8.gg',
    blockExplorer: {
      name: 'Ancient8 Celestia Testnet explorer',
      url: 'https://scanv2-testnet.ancient8.gg',
      apiUrl: 'https://scanv2-testnet.ancient8.gg/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB'
        }
      },
      portal: {
        '11155111': {
          address: '0xfa1d9E26A6aCD7b22115D27572c1221B9803c960',
          blockCreated: 4972908
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xF6Bc0146d3c74D48306e79Ae134A260E418C9335',
          blockCreated: 4972908
        }
      }
    },
    testnet: false
  },
  anvil: {
    id: 31337n,
    label: 'anvil',
    name: 'Anvil',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'http://127.0.0.1:8545',
    blockExplorer: {},
    contracts: {},
    testnet: false
  },
  apeChain: {
    id: 33139n,
    label: 'apeChain',
    name: 'Ape Chain',
    nativeCurrency: {
      name: 'ApeCoin',
      symbol: 'APE',
      decimals: 18
    },
    providerURL: 'https://rpc.apechain.com/http',
    blockExplorer: {
      name: 'Apescan',
      url: 'https://apescan.io',
      apiUrl: 'https://api.apescan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 20889
      }
    },
    testnet: false
  },
  apexTestnet: {
    id: 3993n,
    label: 'apexTestnet',
    name: 'APEX Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-testnet.apexlayer.xyz',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://exp-testnet.apexlayer.xyz',
      apiUrl: 'https://exp-testnet.apexlayer.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xf7642be33a6b18D16a995657adb5a68CD0438aE2',
        blockCreated: 283775
      }
    },
    testnet: true
  },
  arbitrum: {
    id: 42161n,
    label: 'arbitrum',
    name: 'Arbitrum One',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 7654707
      }
    },
    testnet: false
  },
  arbitrumGoerli: {
    id: 421613n,
    label: 'arbitrumGoerli',
    name: 'Arbitrum Goerli',
    nativeCurrency: {
      name: 'Arbitrum Goerli Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://goerli-rollup.arbitrum.io/rpc',
    blockExplorer: {
      name: 'Arbiscan',
      url: 'https://goerli.arbiscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 88114
      }
    },
    testnet: true
  },
  arbitrumNova: {
    id: 42170n,
    label: 'arbitrumNova',
    name: 'Arbitrum Nova',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://nova.arbitrum.io/rpc',
    blockExplorer: {
      name: 'Arbiscan',
      url: 'https://nova.arbiscan.io',
      apiUrl: 'https://api-nova.arbiscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1746963
      }
    },
    testnet: false
  },
  arbitrumSepolia: {
    id: 421614n,
    label: 'arbitrumSepolia',
    name: 'Arbitrum Sepolia',
    nativeCurrency: {
      name: 'Arbitrum Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia-rollup.arbitrum.io/rpc',
    blockExplorer: {
      name: 'Arbiscan',
      url: 'https://sepolia.arbiscan.io',
      apiUrl: 'https://api-sepolia.arbiscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 81930
      }
    },
    testnet: true
  },
  areonNetwork: {
    id: 463n,
    label: 'areonNetwork',
    name: 'Areon Network',
    nativeCurrency: {
      decimals: 18,
      name: 'AREA',
      symbol: 'AREA'
    },
    providerURL: 'https://mainnet-rpc.areon.network',
    blockExplorer: {
      name: 'Areonscan',
      url: 'https://areonscan.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 353286
      }
    },
    testnet: false
  },
  areonNetworkTestnet: {
    id: 462n,
    label: 'areonNetworkTestnet',
    name: 'Areon Network Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'TAREA',
      symbol: 'TAREA'
    },
    providerURL: 'https://testnet-rpc.areon.network',
    blockExplorer: {
      name: 'Areonscan',
      url: 'https://areonscan.com'
    },
    contracts: {},
    testnet: true
  },
  artelaTestnet: {
    id: 11822n,
    label: 'artelaTestnet',
    name: 'Artela Testnet',
    nativeCurrency: {
      name: 'ART',
      symbol: 'ART',
      decimals: 18
    },
    providerURL: 'https://betanet-rpc1.artela.network',
    blockExplorer: {
      name: 'Artela',
      url: 'https://betanet-scan.artela.network',
      apiUrl: 'https://betanet-scan.artela.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xd07c8635f76e8745Ee7092fbb6e8fbc5FeF09DD7',
        blockCreated: 7001871
      }
    },
    testnet: true
  },
  arthera: {
    id: 10242n,
    label: 'arthera',
    name: 'Arthera',
    nativeCurrency: {
      name: 'Arthera',
      symbol: 'AA',
      decimals: 18
    },
    providerURL: 'https://rpc.arthera.net',
    blockExplorer: {
      name: 'Arthera EVM Explorer',
      url: 'https://explorer.arthera.net',
      apiUrl: 'https://explorer.arthera.net/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 4502791
      }
    },
    testnet: false
  },
  artheraTestnet: {
    id: 10243n,
    label: 'artheraTestnet',
    name: 'Arthera Testnet',
    nativeCurrency: {
      name: 'Arthera',
      symbol: 'AA',
      decimals: 18
    },
    providerURL: 'https://rpc-test.arthera.net',
    blockExplorer: {
      name: 'Arthera EVM Explorer',
      url: 'https://explorer-test.arthera.net',
      apiUrl: 'https://explorer-test.arthera.net/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 22051
      }
    },
    testnet: false
  },
  assetChain: {
    id: 42420n,
    label: 'assetChain',
    name: 'AssetChain Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Real World Asset',
      symbol: 'RWA'
    },
    providerURL: 'https://mainnet-rpc.assetchain.org',
    blockExplorer: {
      name: 'Asset Chain Explorer',
      url: 'https://scan.assetchain.org',
      apiUrl: 'https://scan.assetchain.org/api'
    },
    contracts: {},
    testnet: false
  },
  assetChainTestnet: {
    id: 42421n,
    label: 'assetChainTestnet',
    name: 'AssetChain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Real World Asset',
      symbol: 'RWA'
    },
    providerURL: 'https://enugu-rpc.assetchain.org',
    blockExplorer: {
      name: 'Asset Chain Testnet Explorer',
      url: 'https://scan-testnet.assetchain.org',
      apiUrl: 'https://scan-testnet.assetchain.org/api'
    },
    contracts: {
      multicall3: {
        address: '0x989F832D35988cb5e3eB001Fa2Fe789469EC31Ea',
        blockCreated: 17177
      }
    },
    testnet: true
  },
  astar: {
    id: 592n,
    label: 'astar',
    name: 'Astar',
    nativeCurrency: {
      name: 'Astar',
      symbol: 'ASTR',
      decimals: 18
    },
    providerURL: 'https://astar.api.onfinality.io/public',
    blockExplorer: {
      name: 'Astar Subscan',
      url: 'https://astar.subscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 761794
      }
    },
    testnet: false
  },
  astarZkEVM: {
    id: 3776n,
    label: 'astarZkEVM',
    name: 'Astar zkEVM',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-zkevm.astar.network',
    blockExplorer: {
      name: 'Astar zkEVM Explorer',
      url: 'https://astar-zkevm.explorer.startale.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 93528
      }
    },
    testnet: false
  },
  astarZkyoto: {
    id: 6038361n,
    label: 'astarZkyoto',
    name: 'Astar zkEVM Testnet zKyoto',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.startale.com/zkyoto',
    blockExplorer: {
      name: 'zKyoto Explorer',
      url: 'https://zkyoto.explorer.startale.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 196153
      }
    },
    testnet: true
  },
  atletaOlympia: {
    id: 2340n,
    label: 'atletaOlympia',
    name: 'Atleta Olympia',
    nativeCurrency: {
      decimals: 18,
      name: 'Atla',
      symbol: 'ATLA'
    },
    providerURL: 'https://testnet-rpc.atleta.network:9944',
    blockExplorer: {
      name: 'Atleta Olympia Explorer',
      url: 'https://blockscout.atleta.network',
      apiUrl: 'https://blockscout.atleta.network/api'
    },
    contracts: {
      multicall3: {
        address: '0x1472ec6392180fb84F345d2455bCC75B26577115',
        blockCreated: 1076473
      }
    },
    testnet: true
  },
  aurora: {
    id: 1313161554n,
    label: 'aurora',
    name: 'Aurora',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://mainnet.aurora.dev',
    blockExplorer: {
      name: 'Aurorascan',
      url: 'https://aurorascan.dev',
      apiUrl: 'https://aurorascan.dev/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 62907816
      }
    },
    testnet: false
  },
  auroraTestnet: {
    id: 1313161555n,
    label: 'auroraTestnet',
    name: 'Aurora Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://testnet.aurora.dev',
    blockExplorer: {
      name: 'Aurorascan',
      url: 'https://testnet.aurorascan.dev',
      apiUrl: 'https://testnet.aurorascan.dev/api'
    },
    contracts: {},
    testnet: true
  },
  auroria: {
    id: 205205n,
    label: 'auroria',
    name: 'Auroria Testnet',
    nativeCurrency: {
      name: 'Auroria Stratis',
      symbol: 'tSTRAX',
      decimals: 18
    },
    providerURL: 'https://auroria.rpc.stratisevm.com',
    blockExplorer: {
      name: 'Auroria Testnet Explorer',
      url: 'https://auroria.explorer.stratisevm.com'
    },
    contracts: {},
    testnet: true
  },
  avalanche: {
    id: 43114n,
    label: 'avalanche',
    name: 'Avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX'
    },
    providerURL: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: {
      name: 'SnowTrace',
      url: 'https://snowtrace.io',
      apiUrl: 'https://api.snowtrace.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 11907934
      }
    },
    testnet: false
  },
  avalancheFuji: {
    id: 43113n,
    label: 'avalancheFuji',
    name: 'Avalanche Fuji',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche Fuji',
      symbol: 'AVAX'
    },
    providerURL: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExplorer: {
      name: 'SnowTrace',
      url: 'https://testnet.snowtrace.io',
      apiUrl: 'https://api-testnet.snowtrace.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 7096959
      }
    },
    testnet: true
  },
  b3: {
    id: 8333n,
    label: 'b3',
    name: 'B3',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet-rpc.b3.fun/http',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.b3.fun'
    },
    contracts: {},
    testnet: false
  },
  b3Sepolia: {
    id: 1993n,
    label: 'b3Sepolia',
    name: 'B3 Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.b3.fun/http',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://sepolia.explorer.b3.fun'
    },
    contracts: {},
    testnet: true
  },
  bahamut: {
    id: 5165n,
    label: 'bahamut',
    name: 'Bahamut',
    nativeCurrency: {
      name: 'Fasttoken',
      symbol: 'FTN',
      decimals: 18
    },
    providerURL: 'https://rpc1.bahamut.io',
    blockExplorer: {
      name: 'Ftnscan',
      url: 'https://www.ftnscan.com',
      apiUrl: 'https://www.ftnscan.com/api'
    },
    contracts: {},
    testnet: false
  },
  base: {
    id: 8453n,
    label: 'base',
    name: 'Base',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.base.org',
    blockExplorer: {
      name: 'Basescan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '1': {
          address: '0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e'
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0x56315b90c40730925ec5485cf004d835058518A0'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 5022
      },
      portal: {
        '1': {
          address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
          blockCreated: 17482143
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
          blockCreated: 17482143
        }
      }
    },
    testnet: false
  },
  baseGoerli: {
    id: 84531n,
    label: 'baseGoerli',
    name: 'Base Goerli',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://goerli.base.org',
    blockExplorer: {
      name: 'Basescan',
      url: 'https://goerli.basescan.org',
      apiUrl: 'https://goerli.basescan.org/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '5': {
          address: '0x2A35891ff30313CcFa6CE88dcf3858bb075A2298'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1376988
      },
      portal: {
        '5': {
          address: '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'
        }
      },
      l1StandardBridge: {
        '5': {
          address: '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a'
        }
      }
    },
    testnet: true
  },
  baseSepolia: {
    id: 84532n,
    label: 'baseSepolia',
    name: 'Base Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.base.org',
    blockExplorer: {
      name: 'Basescan',
      url: 'https://sepolia.basescan.org',
      apiUrl: 'https://api-sepolia.basescan.org/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '11155111': {
          address: '0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1'
        }
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254'
        }
      },
      portal: {
        '11155111': {
          address: '0x49f53e41452c74589e85ca1677426ba426459e85',
          blockCreated: 4446677
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xfd0Bf71F60660E2f608ed56e1659C450eB113120',
          blockCreated: 4446677
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1059647
      }
    },
    testnet: true
  },
  beam: {
    id: 4337n,
    label: 'beam',
    name: 'Beam',
    nativeCurrency: {
      decimals: 18,
      name: 'Beam',
      symbol: 'BEAM'
    },
    providerURL: 'https://build.onbeam.com/rpc',
    blockExplorer: {
      name: 'Beam Explorer',
      url: 'https://subnets.avax.network/beam'
    },
    contracts: {
      multicall3: {
        address: '0x4956f15efdc3dc16645e90cc356eafa65ffc65ec',
        blockCreated: 1
      }
    },
    testnet: false
  },
  beamTestnet: {
    id: 13337n,
    label: 'beamTestnet',
    name: 'Beam Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Beam',
      symbol: 'BEAM'
    },
    providerURL: 'https://build.onbeam.com/rpc/testnet',
    blockExplorer: {
      name: 'Beam Explorer',
      url: 'https://subnets-test.avax.network/beam'
    },
    contracts: {
      multicall3: {
        address: '0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e',
        blockCreated: 3
      }
    },
    testnet: true
  },
  bearNetworkChainMainnet: {
    id: 641230n,
    label: 'bearNetworkChainMainnet',
    name: 'Bear Network Chain Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BearNetworkChain',
      symbol: 'BRNKC'
    },
    providerURL: 'https://brnkc-mainnet.bearnetwork.net',
    blockExplorer: {
      name: 'BrnkScan',
      url: 'https://brnkscan.bearnetwork.net',
      apiUrl: 'https://brnkscan.bearnetwork.net/api'
    },
    contracts: {},
    testnet: false
  },
  bearNetworkChainTestnet: {
    id: 751230n,
    label: 'bearNetworkChainTestnet',
    name: 'Bear Network Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'tBRNKC',
      symbol: 'tBRNKC'
    },
    providerURL: 'https://brnkc-test.bearnetwork.net',
    blockExplorer: {
      name: 'BrnkTestScan',
      url: 'https://brnktest-scan.bearnetwork.net',
      apiUrl: 'https://brnktest-scan.bearnetwork.net/api'
    },
    contracts: {},
    testnet: true
  },
  berachainTestnet: {
    id: 80085n,
    label: 'berachainTestnet',
    name: 'Berachain Artio',
    nativeCurrency: {
      decimals: 18,
      name: 'BERA Token',
      symbol: 'BERA'
    },
    providerURL: 'https://artio.rpc.berachain.com',
    blockExplorer: {
      name: 'Berachain',
      url: 'https://artio.beratrail.io'
    },
    contracts: {},
    testnet: true
  },
  berachainTestnetbArtio: {
    id: 80084n,
    label: 'berachainTestnetbArtio',
    name: 'Berachain bArtio',
    nativeCurrency: {
      decimals: 18,
      name: 'BERA Token',
      symbol: 'BERA'
    },
    providerURL: 'https://bartio.rpc.berachain.com',
    blockExplorer: {
      name: 'Berachain bArtio Beratrail',
      url: 'https://bartio.beratrail.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 109269
      },
      ensRegistry: {
        address: '0xB0eef18971290b333450586D33dcA6cE122651D2',
        blockCreated: 7736794
      },
      ensUniversalResolver: {
        address: '0x41692Ef1EA0C79E6b73077E4A67572D2BDbD7057',
        blockCreated: 7736795
      }
    },
    testnet: true
  },
  bevmMainnet: {
    id: 11501n,
    label: 'bevmMainnet',
    name: 'BEVM Mainnet',
    nativeCurrency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://rpc-mainnet-1.bevm.io',
    blockExplorer: {
      name: 'Bevmscan',
      url: 'https://scan-mainnet.bevm.io',
      apiUrl: 'https://scan-mainnet-api.bevm.io/api'
    },
    contracts: {},
    testnet: false
  },
  bifrost: {
    id: 3068n,
    label: 'bifrost',
    name: 'Bifrost Mainnet',
    nativeCurrency: {
      name: 'BFC',
      symbol: 'BFC',
      decimals: 18
    },
    providerURL: 'https://public-01.mainnet.bifrostnetwork.com/rpc',
    blockExplorer: {
      name: 'Bifrost Blockscout',
      url: 'https://explorer.mainnet.bifrostnetwork.com'
    },
    contracts: {},
    testnet: false
  },
  bitTorrent: {
    id: 199n,
    label: 'bitTorrent',
    name: 'BitTorrent',
    nativeCurrency: {
      name: 'BitTorrent',
      symbol: 'BTT',
      decimals: 18
    },
    providerURL: 'https://rpc.bittorrentchain.io',
    blockExplorer: {
      name: 'Bttcscan',
      url: 'https://bttcscan.com',
      apiUrl: 'https://api.bttcscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 31078552
      }
    },
    testnet: false
  },
  bitTorrentTestnet: {
    id: 1028n,
    label: 'bitTorrentTestnet',
    name: 'BitTorrent Chain Testnet',
    nativeCurrency: {
      name: 'BitTorrent',
      symbol: 'BTT',
      decimals: 18
    },
    providerURL: 'https://testrpc.bittorrentchain.io',
    blockExplorer: {
      name: 'Bttcscan',
      url: 'https://testnet.bttcscan.com',
      apiUrl: 'https://testnet.bttcscan.com/api'
    },
    contracts: {},
    testnet: true
  },
  bitgert: {
    id: 32520n,
    label: 'bitgert',
    name: 'Bitgert Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Brise',
      symbol: 'Brise'
    },
    providerURL: 'https://rpc-bitgert.icecreamswap.com',
    blockExplorer: {
      name: 'Bitgert Scan',
      url: 'https://brisescan.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 2118034
      }
    },
    testnet: false
  },
  bitkub: {
    id: 96n,
    label: 'bitkub',
    name: 'Bitkub',
    nativeCurrency: {
      name: 'Bitkub',
      symbol: 'KUB',
      decimals: 18
    },
    providerURL: 'https://rpc.bitkubchain.io',
    blockExplorer: {
      name: 'Bitkub Chain Mainnet Explorer',
      url: 'https://www.bkcscan.com',
      apiUrl: 'https://www.bkcscan.com/api'
    },
    contracts: {},
    testnet: false
  },
  bitkubTestnet: {
    id: 25925n,
    label: 'bitkubTestnet',
    name: 'Bitkub Testnet',
    nativeCurrency: {
      name: 'Bitkub Test',
      symbol: 'tKUB',
      decimals: 18
    },
    providerURL: 'https://rpc-testnet.bitkubchain.io',
    blockExplorer: {
      name: 'Bitkub Chain Testnet Explorer',
      url: 'https://testnet.bkcscan.com',
      apiUrl: 'https://testnet.bkcscan.com/api'
    },
    contracts: {},
    testnet: true
  },
  bitlayer: {
    id: 200901n,
    label: 'bitlayer',
    name: 'Bitlayer Mainnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://rpc.bitlayer.org',
    blockExplorer: {
      name: 'bitlayer mainnet scan',
      url: 'https://www.btrscan.com'
    },
    contracts: {
      multicall3: {
        address: '0x5B256fE9e993902eCe49D138a5b1162cBb529474',
        blockCreated: 2421963
      }
    },
    testnet: false
  },
  bitlayerTestnet: {
    id: 200810n,
    label: 'bitlayerTestnet',
    name: 'Bitlayer Testnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.bitlayer.org',
    blockExplorer: {
      name: 'bitlayer testnet scan',
      url: 'https://testnet.btrscan.com'
    },
    contracts: {
      multicall3: {
        address: '0x5B256fE9e993902eCe49D138a5b1162cBb529474',
        blockCreated: 4135671
      }
    },
    testnet: true
  },
  bitrock: {
    id: 7171n,
    label: 'bitrock',
    name: 'Bitrock Mainnet',
    nativeCurrency: {
      name: 'BROCK',
      symbol: 'BROCK',
      decimals: 18
    },
    providerURL: 'https://brockrpc.io',
    blockExplorer: {
      name: 'Bitrock Explorer',
      url: 'https://explorer.bit-rock.io'
    },
    contracts: {},
    testnet: false
  },
  blast: {
    id: 81457n,
    label: 'blast',
    name: 'Blast',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.blast.io',
    blockExplorer: {
      name: 'Blastscan',
      url: 'https://blastscan.io',
      apiUrl: 'https://api.blastscan.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 212929
      }
    },
    testnet: false
  },
  blastSepolia: {
    id: 168587773n,
    label: 'blastSepolia',
    name: 'Blast Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.blast.io',
    blockExplorer: {
      name: 'Blastscan',
      url: 'https://sepolia.blastscan.io',
      apiUrl: 'https://api-sepolia.blastscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 756690
      }
    },
    testnet: true
  },
  bob: {
    id: 60808n,
    label: 'bob',
    name: 'BOB',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.gobob.xyz',
    blockExplorer: {
      name: 'BOB Explorer',
      url: 'https://explorer.gobob.xyz'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 23131
      },
      l2OutputOracle: {
        '1': {
          address: '0xdDa53E23f8a32640b04D7256e651C1db98dB11C1',
          blockCreated: 4462615
        }
      },
      portal: {
        '1': {
          address: '0x8AdeE124447435fE03e3CD24dF3f4cAE32E65a3E',
          blockCreated: 4462615
        }
      }
    },
    testnet: false
  },
  bobSepolia: {
    id: 808813n,
    label: 'bobSepolia',
    name: 'BOB Sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://bob-sepolia.rpc.gobob.xyz',
    blockExplorer: {
      name: 'BOB Sepolia Explorer',
      url: 'https://bob-sepolia.explorer.gobob.xyz'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 35677
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x14D0069452b4AE2b250B395b8adAb771E4267d2f',
          blockCreated: 4462615
        }
      },
      portal: {
        '11155111': {
          address: '0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4',
          blockCreated: 4462615
        }
      }
    },
    testnet: true
  },
  boba: {
    id: 288n,
    label: 'boba',
    name: 'Boba Network',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://mainnet.boba.network',
    blockExplorer: {
      name: 'BOBAScan',
      url: 'https://bobascan.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 446859
      }
    },
    testnet: false
  },
  bobaSepolia: {
    id: 28882n,
    label: 'bobaSepolia',
    name: 'Boba Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.boba.network',
    blockExplorer: {
      name: 'BOBAScan',
      url: 'https://testnet.bobascan.com'
    },
    contracts: {},
    testnet: true
  },
  boolBetaMainnet: {
    id: 11100n,
    label: 'boolBetaMainnet',
    name: 'Bool Beta Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BOL',
      symbol: 'BOL'
    },
    providerURL: 'https://beta-rpc-node-http.bool.network',
    blockExplorer: {
      name: 'BoolScan',
      url: 'https://beta-mainnet.boolscan.com/'
    },
    contracts: {},
    testnet: false
  },
  botanixTestnet: {
    id: 3636n,
    label: 'botanixTestnet',
    name: 'Botanix Testnet',
    nativeCurrency: {
      name: 'Botanix',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://poa-node.botanixlabs.dev',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://blockscout.botanixlabs.dev',
      apiUrl: 'https://blockscout.botanixlabs.dev'
    },
    contracts: {},
    testnet: true
  },
  bounceBit: {
    id: 6001n,
    label: 'bounceBit',
    name: 'BounceBit Mainnet',
    nativeCurrency: {
      name: 'BounceBit',
      symbol: 'BB',
      decimals: 18
    },
    providerURL: 'https://fullnode-mainnet.bouncebitapi.com',
    blockExplorer: {
      name: 'BB Scan',
      url: 'https://bbscan.io'
    },
    contracts: {},
    testnet: false
  },
  bounceBitTestnet: {
    id: 6000n,
    label: 'bounceBitTestnet',
    name: 'BounceBit Testnet',
    nativeCurrency: {
      name: 'BounceBit',
      symbol: 'BB',
      decimals: 18
    },
    providerURL: 'https://fullnode-testnet.bouncebitapi.com',
    blockExplorer: {
      name: 'BB Scan',
      url: 'https://testnet.bbscan.io'
    },
    contracts: {},
    testnet: true
  },
  bronos: {
    id: 1039n,
    label: 'bronos',
    name: 'Bronos',
    nativeCurrency: {
      decimals: 18,
      name: 'BRO',
      symbol: 'BRO'
    },
    providerURL: 'https://evm.bronos.org',
    blockExplorer: {
      name: 'BronoScan',
      url: 'https://broscan.bronos.org'
    },
    contracts: {},
    testnet: false
  },
  bronosTestnet: {
    id: 1038n,
    label: 'bronosTestnet',
    name: 'Bronos Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Bronos Coin',
      symbol: 'tBRO'
    },
    providerURL: 'https://evm-testnet.bronos.org',
    blockExplorer: {
      name: 'BronoScan',
      url: 'https://tbroscan.bronos.org'
    },
    contracts: {},
    testnet: true
  },
  bsc: {
    id: 56n,
    label: 'bsc',
    name: 'BNB Smart Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB'
    },
    providerURL: 'https://rpc.ankr.com/bsc',
    blockExplorer: {
      name: 'BscScan',
      url: 'https://bscscan.com',
      apiUrl: 'https://api.bscscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 15921452
      }
    },
    testnet: false
  },
  bscGreenfield: {
    id: 1017n,
    label: 'bscGreenfield',
    name: 'BNB Greenfield Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB'
    },
    providerURL: 'https://greenfield-chain.bnbchain.org',
    blockExplorer: {
      name: 'BNB Greenfield Mainnet Scan',
      url: 'https://greenfieldscan.com'
    },
    contracts: {},
    testnet: false
  },
  bscTestnet: {
    id: 97n,
    label: 'bscTestnet',
    name: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'tBNB'
    },
    providerURL: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    blockExplorer: {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
      apiUrl: 'https://api-testnet.bscscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 17422483
      }
    },
    testnet: true
  },
  bsquared: {
    id: 223n,
    label: 'bsquared',
    name: 'B2',
    nativeCurrency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://rpc.bsquared.network',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://explorer.bsquared.network'
    },
    contracts: {},
    testnet: false
  },
  bsquaredTestnet: {
    id: 1123n,
    label: 'bsquaredTestnet',
    name: 'B2 Testnet',
    nativeCurrency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.bsquared.network',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://testnet-explorer.bsquared.network'
    },
    contracts: {},
    testnet: true
  },
  btr: {
    id: 200901n,
    label: 'btr',
    name: 'Bitlayer',
    nativeCurrency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://rpc.bitlayer.org',
    blockExplorer: {
      name: 'Bitlayer(BTR) Scan',
      url: 'https://www.btrscan.com'
    },
    contracts: {},
    testnet: false
  },
  btrTestnet: {
    id: 200810n,
    label: 'btrTestnet',
    name: 'Bitlayer Testnet',
    nativeCurrency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.bitlayer.org',
    blockExplorer: {
      name: 'Bitlayer(BTR) Scan',
      url: 'https://testnet.btrscan.com'
    },
    contracts: {},
    testnet: true
  },
  bxn: {
    id: 4999n,
    label: 'bxn',
    name: 'BlackFort Exchange Network',
    nativeCurrency: {
      name: 'BlackFort Token',
      symbol: 'BXN',
      decimals: 18
    },
    providerURL: 'https://mainnet.blackfort.network/rpc',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.blackfort.network',
      apiUrl: 'https://explorer.blackfort.network/api'
    },
    contracts: {},
    testnet: false
  },
  bxnTestnet: {
    id: 4777n,
    label: 'bxnTestnet',
    name: 'BlackFort Exchange Network Testnet',
    nativeCurrency: {
      name: 'BlackFort Testnet Token',
      symbol: 'TBXN',
      decimals: 18
    },
    providerURL: 'https://testnet.blackfort.network/rpc',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://testnet-explorer.blackfort.network',
      apiUrl: 'https://testnet-explorer.blackfort.network/api'
    },
    contracts: {},
    testnet: true
  },
  cannon: {
    id: 13370n,
    label: 'cannon',
    name: 'Cannon',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'http://127.0.0.1:8545',
    blockExplorer: {},
    contracts: {},
    testnet: false
  },
  canto: {
    id: 7700n,
    label: 'canto',
    name: 'Canto',
    nativeCurrency: {
      decimals: 18,
      name: 'Canto',
      symbol: 'CANTO'
    },
    providerURL: 'https://canto.gravitychain.io',
    blockExplorer: {
      name: 'Tuber.Build (Blockscout)',
      url: 'https://tuber.build'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 2905789
      }
    },
    testnet: false
  },
  celo: {
    id: 42220n,
    label: 'celo',
    name: 'Celo',
    nativeCurrency: {
      decimals: 18,
      name: 'CELO',
      symbol: 'CELO'
    },
    providerURL: 'https://forno.celo.org',
    blockExplorer: {
      name: 'Celo Explorer',
      url: 'https://celoscan.io',
      apiUrl: 'https://api.celoscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 13112599
      }
    },
    testnet: false
  },
  celoAlfajores: {
    id: 44787n,
    label: 'celoAlfajores',
    name: 'Alfajores',
    nativeCurrency: {
      decimals: 18,
      name: 'CELO',
      symbol: 'A-CELO'
    },
    providerURL: 'https://alfajores-forno.celo-testnet.org',
    blockExplorer: {
      name: 'Celo Alfajores Explorer',
      url: 'https://celo-alfajores.blockscout.com',
      apiUrl: 'https://celo-alfajores.blockscout.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 14569001
      },
      portal: {
        '17000': {
          address: '0x82527353927d8D069b3B452904c942dA149BA381',
          blockCreated: 2411324
        }
      },
      disputeGameFactory: {
        '17000': {
          address: '0xE28AAdcd9883746c0e5068F58f9ea06027b214cb',
          blockCreated: 2411324
        }
      },
      l2OutputOracle: {
        '17000': {
          address: '0x4a2635e9e4f6e45817b1D402ac4904c1d1752438',
          blockCreated: 2411324
        }
      },
      l1StandardBridge: {
        '17000': {
          address: '0xD1B0E0581973c9eB7f886967A606b9441A897037',
          blockCreated: 2411324
        }
      }
    },
    testnet: true
  },
  chang: {
    id: 5858n,
    label: 'chang',
    name: 'Chang Chain Foundation Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CTH',
      symbol: 'CTH'
    },
    providerURL: 'https://rpc.cthscan.com',
    blockExplorer: {
      name: 'Chang Chain explorer',
      url: 'https://cthscan.com'
    },
    contracts: {},
    testnet: false
  },
  chiliz: {
    id: 88888n,
    label: 'chiliz',
    name: 'Chiliz Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'CHZ',
      symbol: 'CHZ'
    },
    providerURL: 'https://rpc.ankr.com/chiliz',
    blockExplorer: {
      name: 'Chiliz Explorer',
      url: 'https://scan.chiliz.com',
      apiUrl: 'https://scan.chiliz.com/api'
    },
    contracts: {},
    testnet: false
  },
  chips: {
    id: 2882n,
    label: 'chips',
    name: 'Chips Network',
    nativeCurrency: {
      decimals: 18,
      name: 'IOTA',
      symbol: 'IOTA'
    },
    providerURL: 'https://node.chips.ooo/wasp/api/v1/chains/iota1pp3d3mnap3ufmgqnjsnw344sqmf5svjh26y2khnmc89sv6788y3r207a8fn/evm',
    blockExplorer: {},
    contracts: {},
    testnet: false
  },
  citreaTestnet: {
    id: 5115n,
    label: 'citreaTestnet',
    name: 'Citrea Testnet',
    nativeCurrency: {
      name: 'cBTC',
      symbol: 'cBTC',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.citrea.xyz',
    blockExplorer: {
      name: 'Citrea Explorer',
      url: 'https://explorer.testnet.citrea.xyz',
      apiUrl: 'https://explorer.testnet.citrea.xyz/api'
    },
    contracts: {},
    testnet: true
  },
  classic: {
    id: 61n,
    label: 'classic',
    name: 'Ethereum Classic',
    nativeCurrency: {
      decimals: 18,
      name: 'ETC',
      symbol: 'ETC'
    },
    providerURL: 'https://etc.rivet.link',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://blockscout.com/etc/mainnet'
    },
    contracts: {},
    testnet: false
  },
  coinbit: {
    id: 112n,
    label: 'coinbit',
    name: 'Coinbit Mainnet',
    nativeCurrency: {
      name: 'GIDR',
      symbol: 'GIDR',
      decimals: 18
    },
    providerURL: 'https://coinbit-rpc-mainnet.chain.sbcrypto.app',
    blockExplorer: {
      name: 'Coinbit Explorer',
      url: 'https://coinbit-explorer.chain.sbcrypto.app'
    },
    contracts: {},
    testnet: false
  },
  coinex: {
    id: 52n,
    label: 'coinex',
    name: 'CoinEx Mainnet',
    nativeCurrency: {
      name: 'cet',
      symbol: 'cet',
      decimals: 18
    },
    providerURL: 'https://rpc.coinex.net',
    blockExplorer: {
      name: 'CoinEx Explorer',
      url: 'https://www.coinex.net'
    },
    contracts: {},
    testnet: false
  },
  confluxESpace: {
    id: 1030n,
    label: 'confluxESpace',
    name: 'Conflux eSpace',
    nativeCurrency: {
      name: 'Conflux',
      symbol: 'CFX',
      decimals: 18
    },
    providerURL: 'https://evm.confluxrpc.com',
    blockExplorer: {
      name: 'ConfluxScan',
      url: 'https://evm.confluxscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xEFf0078910f638cd81996cc117bccD3eDf2B072F',
        blockCreated: 68602935
      }
    },
    testnet: false
  },
  confluxESpaceTestnet: {
    id: 71n,
    label: 'confluxESpaceTestnet',
    name: 'Conflux eSpace Testnet',
    nativeCurrency: {
      name: 'Conflux',
      symbol: 'CFX',
      decimals: 18
    },
    providerURL: 'https://evmtestnet.confluxrpc.com',
    blockExplorer: {
      name: 'ConfluxScan',
      url: 'https://evmtestnet.confluxscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xEFf0078910f638cd81996cc117bccD3eDf2B072F',
        blockCreated: 117499050
      }
    },
    testnet: true
  },
  coreDao: {
    id: 1116n,
    label: 'coreDao',
    name: 'Core Dao',
    nativeCurrency: {
      decimals: 18,
      name: 'Core',
      symbol: 'CORE'
    },
    providerURL: 'https://rpc.coredao.org',
    blockExplorer: {
      name: 'CoreDao',
      url: 'https://scan.coredao.org'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 11907934
      }
    },
    testnet: false
  },
  corn: {
    id: 21000000n,
    label: 'corn',
    name: 'Corn',
    nativeCurrency: {
      decimals: 18,
      name: 'Bitcorn',
      symbol: 'BTCN'
    },
    providerURL: 'https://rpc.ankr.com/corn_maizenet',
    blockExplorer: {
      name: 'Corn Explorer',
      url: 'https://cornscan.io',
      apiUrl: 'https://api.routescan.io/v2/network/mainnet/evm/21000000/etherscan/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3228
      }
    },
    testnet: false
  },
  cornTestnet: {
    id: 21000001n,
    label: 'cornTestnet',
    name: 'Corn Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Bitcorn',
      symbol: 'BTCN'
    },
    providerURL: 'https://rpc.ankr.com/corn_testnet',
    blockExplorer: {
      name: 'Corn Testnet Explorer',
      url: 'https://testnet.cornscan.io',
      apiUrl: 'https://api.routescan.io/v2/network/testnet/evm/21000001/etherscan/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 4886
      }
    },
    testnet: true
  },
  crab: {
    id: 44n,
    label: 'crab',
    name: 'Crab Network',
    nativeCurrency: {
      decimals: 18,
      name: 'Crab Network Native Token',
      symbol: 'CRAB'
    },
    providerURL: 'https://crab-rpc.darwinia.network',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://crab-scan.darwinia.network'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 3032593
      }
    },
    testnet: false
  },
  creatorTestnet: {
    id: 66665n,
    label: 'creatorTestnet',
    name: 'Creator',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.creatorchain.io',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://explorer.creatorchain.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11'
      }
    },
    testnet: true
  },
  creditCoin3Mainnet: {
    id: 102030n,
    label: 'creditCoin3Mainnet',
    name: 'Creditcoin3 Mainnet',
    nativeCurrency: {
      name: 'Creditcoin3 Mainnet',
      symbol: 'CTC',
      decimals: 18
    },
    providerURL: 'https://mainnet3.creditcoin.network',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://creditcoin.blockscout.com',
      apiUrl: 'https://creditcoin.blockscout.com/api'
    },
    contracts: {},
    testnet: false
  },
  creditCoin3Testnet: {
    id: 102031n,
    label: 'creditCoin3Testnet',
    name: 'Creditcoin3 Testnet',
    nativeCurrency: {
      name: 'Creditcoin3 Testnet',
      symbol: 'TCTC',
      decimals: 18
    },
    providerURL: 'https://rpc.cc3-testnet.creditcoin.network',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://creditcoin-testnet.blockscout.com',
      apiUrl: 'https://creditcoin-testnet.blockscout.com/api'
    },
    contracts: {},
    testnet: true
  },
  cronos: {
    id: 25n,
    label: 'cronos',
    name: 'Cronos Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Cronos',
      symbol: 'CRO'
    },
    providerURL: 'https://evm.cronos.org',
    blockExplorer: {
      name: 'Cronos Explorer',
      url: 'https://explorer.cronos.org',
      apiUrl: 'https://explorer-api.cronos.org/mainnet/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1963112
      }
    },
    testnet: false
  },
  cronosTestnet: {
    id: 338n,
    label: 'cronosTestnet',
    name: 'Cronos Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CRO',
      symbol: 'tCRO'
    },
    providerURL: 'https://evm-t3.cronos.org',
    blockExplorer: {
      name: 'Cronos Explorer',
      url: 'https://cronos.org/explorer/testnet3'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 10191251
      }
    },
    testnet: true
  },
  cronoszkEVM: {
    id: 388n,
    label: 'cronoszkEVM',
    name: 'Cronos zkEVM Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Cronos zkEVM CRO',
      symbol: 'zkCRO'
    },
    providerURL: 'https://mainnet.zkevm.cronos.org',
    blockExplorer: {
      name: 'Cronos zkEVM (Mainnet) Chain Explorer',
      url: 'https://explorer.zkevm.cronos.org'
    },
    contracts: {
      multicall3: {
        address: '0x06f4487d7c4a5983d2660db965cc6d2565e4cfaa',
        blockCreated: 72
      }
    },
    testnet: false
  },
  cronoszkEVMTestnet: {
    id: 282n,
    label: 'cronoszkEVMTestnet',
    name: 'Cronos zkEVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Cronos zkEVM Test Coin',
      symbol: 'zkTCRO'
    },
    providerURL: 'https://testnet.zkevm.cronos.org',
    blockExplorer: {
      name: 'Cronos zkEVM Testnet Explorer',
      url: 'https://explorer.zkevm.cronos.org/testnet'
    },
    contracts: {},
    testnet: true
  },
  crossbell: {
    id: 3737n,
    label: 'crossbell',
    name: 'Crossbell',
    nativeCurrency: {
      decimals: 18,
      name: 'CSB',
      symbol: 'CSB'
    },
    providerURL: 'https://rpc.crossbell.io',
    blockExplorer: {
      name: 'CrossScan',
      url: 'https://scan.crossbell.io',
      apiUrl: 'https://scan.crossbell.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 38246031
      }
    },
    testnet: false
  },
  curtis: {
    id: 33111n,
    label: 'curtis',
    name: 'Curtis',
    nativeCurrency: {
      name: 'ApeCoin',
      symbol: 'APE',
      decimals: 18
    },
    providerURL: 'https://rpc.curtis.apechain.com',
    blockExplorer: {
      name: 'Curtis Explorer',
      url: 'https://explorer.curtis.apechain.com'
    },
    contracts: {},
    testnet: true
  },
  cyber: {
    id: 7560n,
    label: 'cyber',
    name: 'Cyber',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://cyber.alt.technology',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://cyberscan.co',
      apiUrl: 'https://cyberscan.co/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 0
      }
    },
    testnet: false
  },
  cyberTestnet: {
    id: 111557560n,
    label: 'cyberTestnet',
    name: 'Cyber Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://cyber-testnet.alt.technology',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://testnet.cyberscan.co',
      apiUrl: 'https://testnet.cyberscan.co/api'
    },
    contracts: {
      multicall3: {
        address: '0xffc391F0018269d4758AEA1a144772E8FB99545E',
        blockCreated: 304545
      }
    },
    testnet: true
  },
  dailyNetwork: {
    id: 824n,
    label: 'dailyNetwork',
    name: 'Daily Network Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Daily',
      symbol: 'DLY'
    },
    providerURL: 'https://rpc.mainnet.dailycrypto.net',
    blockExplorer: {
      name: 'Daily Mainnet Explorer',
      url: 'https://explorer.mainnet.dailycrypto.net'
    },
    contracts: {},
    testnet: false
  },
  dailyNetworkTestnet: {
    id: 825n,
    label: 'dailyNetworkTestnet',
    name: 'Daily Network Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Daily',
      symbol: 'DLY'
    },
    providerURL: 'https://rpc.testnet.dailycrypto.net',
    blockExplorer: {
      name: 'Daily Testnet Explorer',
      url: 'https://explorer.testnet.dailycrypto.net'
    },
    contracts: {},
    testnet: true
  },
  darwinia: {
    id: 46n,
    label: 'darwinia',
    name: 'Darwinia Network',
    nativeCurrency: {
      decimals: 18,
      name: 'RING',
      symbol: 'RING'
    },
    providerURL: 'https://rpc.darwinia.network',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://explorer.darwinia.network'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 69420
      }
    },
    testnet: false
  },
  dchain: {
    id: 2716446429837000n,
    label: 'dchain',
    name: 'Dchain',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://dchain-2716446429837000-1.jsonrpc.sagarpc.io',
    blockExplorer: {
      name: 'Dchain Explorer',
      url: 'https://dchain-2716446429837000-1.sagaexplorer.io',
      apiUrl: 'https://api-dchain-2716446429837000-1.sagaexplorer.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      }
    },
    testnet: false
  },
  dchainTestnet: {
    id: 2713017997578000n,
    label: 'dchainTestnet',
    name: 'Dchain Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io',
    blockExplorer: {
      name: 'Dchain Explorer',
      url: 'https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io',
      apiUrl: 'https://api-dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      }
    },
    testnet: false
  },
  defichainEvm: {
    id: 1130n,
    label: 'defichainEvm',
    name: 'DeFiChain EVM Mainnet',
    nativeCurrency: {
      name: 'DeFiChain',
      symbol: 'DFI',
      decimals: 18
    },
    providerURL: 'https://eth.mainnet.ocean.jellyfishsdk.com',
    blockExplorer: {
      name: 'DeFiScan',
      url: 'https://meta.defiscan.live'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 137852
      }
    },
    testnet: false
  },
  defichainEvmTestnet: {
    id: 1131n,
    label: 'defichainEvmTestnet',
    name: 'DeFiChain EVM Testnet',
    nativeCurrency: {
      name: 'DeFiChain',
      symbol: 'DFI',
      decimals: 18
    },
    providerURL: 'https://eth.testnet.ocean.jellyfishsdk.com',
    blockExplorer: {
      name: 'DeFiScan',
      url: 'https://meta.defiscan.live/?network=TestNet'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 156462
      }
    },
    testnet: true
  },
  degen: {
    id: 666666666n,
    label: 'degen',
    name: 'Degen',
    nativeCurrency: {
      decimals: 18,
      name: 'Degen',
      symbol: 'DEGEN'
    },
    providerURL: 'https://rpc.degen.tips',
    blockExplorer: {
      name: 'Degen Chain Explorer',
      url: 'https://explorer.degen.tips',
      apiUrl: 'https://explorer.degen.tips/api/v2'
    },
    contracts: {},
    testnet: false
  },
  dfk: {
    id: 53935n,
    label: 'dfk',
    name: 'DFK Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'Jewel',
      symbol: 'JEWEL'
    },
    providerURL: 'https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc',
    blockExplorer: {
      name: 'DFKSubnetScan',
      url: 'https://subnets.avax.network/defi-kingdoms'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14790551
      }
    },
    testnet: false
  },
  diode: {
    id: 15n,
    label: 'diode',
    name: 'Diode Prenet',
    nativeCurrency: {
      decimals: 18,
      name: 'DIODE',
      symbol: 'DIODE'
    },
    providerURL: 'https://prenet.diode.io:8443',
    blockExplorer: {
      name: 'Diode Explorer',
      url: 'https://diode.io/prenet'
    },
    contracts: {},
    testnet: false
  },
  disChain: {
    id: 513100n,
    label: 'disChain',
    name: 'DisChain',
    nativeCurrency: {
      decimals: 18,
      name: 'DIS',
      symbol: 'DIS'
    },
    providerURL: 'https://rpc.dischain.xyz',
    blockExplorer: {
      name: 'DisChain Explorer',
      url: 'https://www.oklink.com/dis'
    },
    contracts: {},
    testnet: false
  },
  dodochainTestnet: {
    id: 53457n,
    label: 'dodochainTestnet',
    name: 'DODOchain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'DODO',
      symbol: 'DODO'
    },
    providerURL: 'https://dodochain-testnet.alt.technology',
    blockExplorer: {
      name: 'DODOchain Testnet (Sepolia) Explorer',
      url: 'https://testnet-scan.dodochain.com'
    },
    contracts: {},
    testnet: true
  },
  dogechain: {
    id: 2000n,
    label: 'dogechain',
    name: 'Dogechain',
    nativeCurrency: {
      decimals: 18,
      name: 'Wrapped Dogecoin',
      symbol: 'WDOGE'
    },
    providerURL: 'https://rpc.dogechain.dog',
    blockExplorer: {
      name: 'DogeChainExplorer',
      url: 'https://explorer.dogechain.dog',
      apiUrl: 'https://explorer.dogechain.dog/api'
    },
    contracts: {
      multicall3: {
        address: '0x68a8609a60a008EFA633dfdec592c03B030cC508',
        blockCreated: 25384031
      }
    },
    testnet: false
  },
  dosChain: {
    id: 7979n,
    label: 'dosChain',
    name: 'DOS Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'DOS Chain',
      symbol: 'DOS'
    },
    providerURL: 'https://main.doschain.com',
    blockExplorer: {
      name: 'DOS Chain Explorer',
      url: 'https://doscan.io',
      apiUrl: 'https://api.doscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 161908
      }
    },
    testnet: false
  },
  dosChainTestnet: {
    id: 3939n,
    label: 'dosChainTestnet',
    name: 'DOS Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'DOS Chain Testnet',
      symbol: 'DOS'
    },
    providerURL: 'https://test.doschain.com',
    blockExplorer: {
      name: 'DOS Chain Testnet Explorer',
      url: 'https://test.doscan.io',
      apiUrl: 'https://api-test.doscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 69623
      }
    },
    testnet: true
  },
  dreyerxMainnet: {
    id: 23451n,
    label: 'dreyerxMainnet',
    name: 'DreyerX Mainnet',
    nativeCurrency: {
      name: 'DreyerX',
      symbol: 'DRX',
      decimals: 18
    },
    providerURL: 'https://rpc.dreyerx.com',
    blockExplorer: {
      name: 'DreyerX Scan',
      url: 'https://scan.dreyerx.com'
    },
    contracts: {},
    testnet: false
  },
  dreyerxTestnet: {
    id: 23452n,
    label: 'dreyerxTestnet',
    name: 'DreyerX Testnet',
    nativeCurrency: {
      name: 'DreyerX',
      symbol: 'DRX',
      decimals: 18
    },
    providerURL: 'http://testnet-rpc.dreyerx.com',
    blockExplorer: {
      name: 'DreyerX Testnet Scan',
      url: 'https://testnet-scan.dreyerx.com'
    },
    contracts: {},
    testnet: true
  },
  dustboyIoT: {
    id: 555888n,
    label: 'dustboyIoT',
    name: 'DustBoy IoT',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'DST',
      decimals: 18
    },
    providerURL: 'https://dustboy-rpc.jibl2.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://dustboy.jibl2.com',
      apiUrl: 'https://dustboy.jibl2.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xFFD34aa2C62B2D52E00A361e466C229788f4eD6a',
        blockCreated: 526569
      }
    },
    testnet: false
  },
  dymension: {
    id: 1100n,
    label: 'dymension',
    name: 'Dymension',
    nativeCurrency: {
      name: 'DYM',
      symbol: 'DYM',
      decimals: 18
    },
    providerURL: 'https://dymension-evm-rpc.publicnode.com',
    blockExplorer: {
      name: 'Dym FYI',
      url: 'https://dym.fyi'
    },
    contracts: {},
    testnet: false
  },
  edgeless: {
    id: 2026n,
    label: 'edgeless',
    name: 'Edgeless Network',
    nativeCurrency: {
      name: 'Edgeless Wrapped ETH',
      symbol: 'EwETH',
      decimals: 18
    },
    providerURL: 'https://rpc.edgeless.network/http',
    blockExplorer: {
      name: 'Edgeless Explorer',
      url: 'https://explorer.edgeless.network'
    },
    contracts: {},
    testnet: false
  },
  edgelessTestnet: {
    id: 202n,
    label: 'edgelessTestnet',
    name: 'Edgeless Testnet',
    nativeCurrency: {
      name: 'Edgeless Wrapped ETH',
      symbol: 'EwETH',
      decimals: 18
    },
    providerURL: 'https://edgeless-testnet.rpc.caldera.xyz/http',
    blockExplorer: {
      name: 'Edgeless Testnet Explorer',
      url: 'https://testnet.explorer.edgeless.network'
    },
    contracts: {},
    testnet: false
  },
  edgeware: {
    id: 2021n,
    label: 'edgeware',
    name: 'Edgeware EdgeEVM Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Edgeware',
      symbol: 'EDG'
    },
    providerURL: 'https://edgeware-evm.jelliedowl.net',
    blockExplorer: {
      name: 'Edgscan by Bharathcoorg',
      url: 'https://edgscan.live',
      apiUrl: 'https://edgscan.live/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 18117872
      }
    },
    testnet: false
  },
  edgewareTestnet: {
    id: 2022n,
    label: 'edgewareTestnet',
    name: 'Beresheet BereEVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Testnet EDG',
      symbol: 'tEDG'
    },
    providerURL: 'https://beresheet-evm.jelliedowl.net',
    blockExplorer: {
      name: 'Edgscan by Bharathcoorg',
      url: 'https://testnet.edgscan.live',
      apiUrl: 'https://testnet.edgscan.live/api'
    },
    contracts: {},
    testnet: false
  },
  ekta: {
    id: 1994n,
    label: 'ekta',
    name: 'Ekta',
    nativeCurrency: {
      decimals: 18,
      name: 'EKTA',
      symbol: 'EKTA'
    },
    providerURL: 'https://main.ekta.io',
    blockExplorer: {
      name: 'Ektascan',
      url: 'https://ektascan.io',
      apiUrl: 'https://ektascan.io/api'
    },
    contracts: {},
    testnet: false
  },
  ektaTestnet: {
    id: 1004n,
    label: 'ektaTestnet',
    name: 'Ekta Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'EKTA',
      symbol: 'EKTA'
    },
    providerURL: 'https://test.ekta.io:8545',
    blockExplorer: {
      name: 'Test Ektascan',
      url: 'https://test.ektascan.io',
      apiUrl: 'https://test.ektascan.io/api'
    },
    contracts: {},
    testnet: true
  },
  elastos: {
    id: 20n,
    label: 'elastos',
    name: 'Elastos Smart Chain',
    nativeCurrency: {
      name: 'ELA',
      symbol: 'ELA',
      decimals: 18
    },
    providerURL: 'https://api2.elastos.io/eth',
    blockExplorer: {
      name: 'Elastos Explorer',
      url: 'https://esc.elastos.io'
    },
    contracts: {},
    testnet: false
  },
  elastosTestnet: {
    id: 21n,
    label: 'elastosTestnet',
    name: 'Elastos Smart Chain Testnet',
    nativeCurrency: {
      name: 'tELA',
      symbol: 'tELA',
      decimals: 18
    },
    providerURL: 'https://api-testnet.elastos.io/eth',
    blockExplorer: {
      name: 'Elastos Explorer',
      url: 'https://esc-testnet.elastos.io'
    },
    contracts: {},
    testnet: true
  },
  electroneum: {
    id: 52014n,
    label: 'electroneum',
    name: 'Electroneum Mainnet',
    nativeCurrency: {
      name: 'ETN',
      symbol: 'ETN',
      decimals: 18
    },
    providerURL: 'https://rpc.electroneum.com',
    blockExplorer: {
      name: 'Electroneum Block Explorer',
      url: 'https://blockexplorer.electroneum.com'
    },
    contracts: {},
    testnet: false
  },
  electroneumTestnet: {
    id: 5201420n,
    label: 'electroneumTestnet',
    name: 'Electroneum Testnet',
    nativeCurrency: {
      name: 'ETN',
      symbol: 'ETN',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.electroneum.com',
    blockExplorer: {
      name: 'Electroneum Block Explorer',
      url: 'https://blockexplorer.thesecurityteam.rocks'
    },
    contracts: {},
    testnet: true
  },
  elysiumTestnet: {
    id: 1338n,
    label: 'elysiumTestnet',
    name: 'Elysium Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'LAVA',
      symbol: 'LAVA'
    },
    providerURL: 'https://elysium-test-rpc.vulcanforged.com',
    blockExplorer: {
      name: 'Elysium testnet explorer',
      url: 'https://elysium-explorer.vulcanforged.com'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      }
    },
    testnet: true
  },
  energy: {
    id: 246n,
    label: 'energy',
    name: 'Energy Mainnet',
    nativeCurrency: {
      name: 'EWT',
      symbol: 'EWT',
      decimals: 18
    },
    providerURL: 'https://rpc.energyweb.org',
    blockExplorer: {
      name: 'EnergyWeb Explorer',
      url: 'https://explorer.energyweb.org'
    },
    contracts: {},
    testnet: false
  },
  enuls: {
    id: 119n,
    label: 'enuls',
    name: 'ENULS Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'NULS',
      symbol: 'NULS'
    },
    providerURL: 'https://evmapi2.nuls.io',
    blockExplorer: {
      name: 'ENULS Explorer',
      url: 'https://evmscan.nuls.io'
    },
    contracts: {},
    testnet: false
  },
  eon: {
    id: 7332n,
    label: 'eon',
    name: 'Horizen EON',
    nativeCurrency: {
      decimals: 18,
      name: 'ZEN',
      symbol: 'ZEN'
    },
    providerURL: 'https://eon-rpc.horizenlabs.io/ethv1',
    blockExplorer: {
      name: 'EON Explorer',
      url: 'https://eon-explorer.horizenlabs.io'
    },
    contracts: {},
    testnet: false
  },
  eos: {
    id: 17777n,
    label: 'eos',
    name: 'EOS EVM',
    nativeCurrency: {
      decimals: 18,
      name: 'EOS',
      symbol: 'EOS'
    },
    providerURL: 'https://api.evm.eosnetwork.com',
    blockExplorer: {
      name: 'EOS EVM Explorer',
      url: 'https://explorer.evm.eosnetwork.com',
      apiUrl: 'https://explorer.evm.eosnetwork.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 7943933
      }
    },
    testnet: false
  },
  eosTestnet: {
    id: 15557n,
    label: 'eosTestnet',
    name: 'EOS EVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'EOS',
      symbol: 'EOS'
    },
    providerURL: 'https://api.testnet.evm.eosnetwork.com',
    blockExplorer: {
      name: 'EOS EVM Testnet Explorer',
      url: 'https://explorer.testnet.evm.eosnetwork.com',
      apiUrl: 'https://explorer.testnet.evm.eosnetwork.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 9067940
      }
    },
    testnet: true
  },
  etherlink: {
    id: 42793n,
    label: 'etherlink',
    name: 'Etherlink',
    nativeCurrency: {
      decimals: 18,
      name: 'Tez',
      symbol: 'XTZ'
    },
    providerURL: 'https://node.mainnet.etherlink.com',
    blockExplorer: {
      name: 'Etherlink',
      url: 'https://explorer.etherlink.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 33899
      }
    },
    testnet: false
  },
  etherlinkTestnet: {
    id: 128123n,
    label: 'etherlinkTestnet',
    name: 'Etherlink Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Tez',
      symbol: 'XTZ'
    },
    providerURL: 'https://node.ghostnet.etherlink.com',
    blockExplorer: {
      name: 'Etherlink Testnet',
      url: 'https://testnet-explorer.etherlink.com'
    },
    contracts: {},
    testnet: true
  },
  etp: {
    id: 20256789n,
    label: 'etp',
    name: 'ETP Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETP Chain Native Token',
      symbol: 'ETP'
    },
    providerURL: 'https://rpc.etpscan.xyz',
    blockExplorer: {
      name: 'ETP Scan',
      url: 'https://etpscan.xyz'
    },
    contracts: {},
    testnet: false
  },
  evmos: {
    id: 9001n,
    label: 'evmos',
    name: 'Evmos',
    nativeCurrency: {
      decimals: 18,
      name: 'Evmos',
      symbol: 'EVMOS'
    },
    providerURL: 'https://eth.bd.evmos.org:8545',
    blockExplorer: {
      name: 'Evmos Block Explorer',
      url: 'https://escan.live'
    },
    contracts: {},
    testnet: false
  },
  evmosTestnet: {
    id: 9000n,
    label: 'evmosTestnet',
    name: 'Evmos Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Evmos',
      symbol: 'EVMOS'
    },
    providerURL: 'https://eth.bd.evmos.dev:8545',
    blockExplorer: {
      name: 'Evmos Testnet Block Explorer',
      url: 'https://evm.evmos.dev/'
    },
    contracts: {},
    testnet: false
  },
  excelonMainnet: {
    id: 22052002n,
    label: 'excelonMainnet',
    name: 'Excelon Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Excelon',
      symbol: 'xlon'
    },
    providerURL: 'https://edgewallet1.xlon.org',
    blockExplorer: {
      name: 'Excelon explorer',
      url: 'https://explorer.excelon.io'
    },
    contracts: {},
    testnet: false
  },
  expanse: {
    id: 2n,
    label: 'expanse',
    name: 'Expanse Network',
    nativeCurrency: {
      decimals: 18,
      name: 'EXP',
      symbol: 'EXP'
    },
    providerURL: 'https://node.expanse.tech',
    blockExplorer: {
      name: 'Expanse Explorer',
      url: 'https://explorer.expanse.tech'
    },
    contracts: {},
    testnet: false
  },
  exsat: {
    id: 7200n,
    label: 'exsat',
    name: 'exSat Network',
    nativeCurrency: {
      decimals: 18,
      name: 'BTC',
      symbol: 'BTC'
    },
    providerURL: 'https://evm.exsat.network',
    blockExplorer: {
      name: 'exSat Explorer',
      url: 'https://scan.exsat.network',
      apiUrl: 'https://scan.exsat.network/api'
    },
    contracts: {},
    testnet: false
  },
  exsatTestnet: {
    id: 839999n,
    label: 'exsatTestnet',
    name: 'exSat Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BTC',
      symbol: 'BTC'
    },
    providerURL: 'https://evm-tst3.exsat.network',
    blockExplorer: {
      name: 'exSat Explorer',
      url: 'https://scan-testnet.exsat.network',
      apiUrl: 'https://scan-testnet.exsat.network/api'
    },
    contracts: {},
    testnet: false
  },
  fantom: {
    id: 250n,
    label: 'fantom',
    name: 'Fantom',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM'
    },
    providerURL: 'https://rpc.ankr.com/fantom',
    blockExplorer: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
      apiUrl: 'https://api.ftmscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 33001987
      }
    },
    testnet: false
  },
  fantomSonicTestnet: {
    id: 64240n,
    label: 'fantomSonicTestnet',
    name: 'Fantom Sonic Open Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM'
    },
    providerURL: 'https://rpcapi.sonic.fantom.network',
    blockExplorer: {
      name: 'Fantom Sonic Open Testnet Explorer',
      url: 'https://public-sonic.fantom.network'
    },
    contracts: {},
    testnet: true
  },
  fantomTestnet: {
    id: 4002n,
    label: 'fantomTestnet',
    name: 'Fantom Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM'
    },
    providerURL: 'https://rpc.testnet.fantom.network',
    blockExplorer: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
      apiUrl: 'https://testnet.ftmscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 8328688
      }
    },
    testnet: true
  },
  fibo: {
    id: 12306n,
    label: 'fibo',
    name: 'Fibo Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'fibo',
      symbol: 'FIBO'
    },
    providerURL: 'https://network.hzroc.art',
    blockExplorer: {
      name: 'FiboScan',
      url: 'https://scan.fibochain.org'
    },
    contracts: {},
    testnet: false
  },
  filecoin: {
    id: 314n,
    label: 'filecoin',
    name: 'Filecoin Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'filecoin',
      symbol: 'FIL'
    },
    providerURL: 'https://api.node.glif.io/rpc/v1',
    blockExplorer: {
      name: 'Filfox',
      url: 'https://filfox.info/en'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3328594
      }
    },
    testnet: false
  },
  filecoinCalibration: {
    id: 314159n,
    label: 'filecoinCalibration',
    name: 'Filecoin Calibration',
    nativeCurrency: {
      decimals: 18,
      name: 'testnet filecoin',
      symbol: 'tFIL'
    },
    providerURL: 'https://api.calibration.node.glif.io/rpc/v1',
    blockExplorer: {
      name: 'Filscan',
      url: 'https://calibration.filscan.io'
    },
    contracts: {},
    testnet: true
  },
  filecoinHyperspace: {
    id: 3141n,
    label: 'filecoinHyperspace',
    name: 'Filecoin Hyperspace',
    nativeCurrency: {
      decimals: 18,
      name: 'testnet filecoin',
      symbol: 'tFIL'
    },
    providerURL: 'https://api.hyperspace.node.glif.io/rpc/v1',
    blockExplorer: {
      name: 'Filfox',
      url: 'https://hyperspace.filfox.info/en'
    },
    contracts: {},
    testnet: true
  },
  fireChain: {
    id: 995n,
    label: 'fireChain',
    name: '5ireChain',
    nativeCurrency: {
      name: '5ire Token',
      symbol: '5IRE',
      decimals: 18
    },
    providerURL: 'https://rpc.5ire.network',
    blockExplorer: {
      name: '5ireChain Mainnet Explorer',
      url: 'https://5irescan.io/'
    },
    contracts: {},
    testnet: false
  },
  flare: {
    id: 14n,
    label: 'flare',
    name: 'Flare Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Flare',
      symbol: 'FLR'
    },
    providerURL: 'https://flare-api.flare.network/ext/C/rpc',
    blockExplorer: {
      name: 'Flare Explorer',
      url: 'https://flare-explorer.flare.network',
      apiUrl: 'https://flare-explorer.flare.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3002461
      }
    },
    testnet: false
  },
  flareTestnet: {
    id: 114n,
    label: 'flareTestnet',
    name: 'Flare Testnet Coston2',
    nativeCurrency: {
      decimals: 18,
      name: 'Coston2 Flare',
      symbol: 'C2FLR'
    },
    providerURL: 'https://coston2-api.flare.network/ext/C/rpc',
    blockExplorer: {
      name: 'Coston2 Explorer',
      url: 'https://coston2-explorer.flare.network',
      apiUrl: 'https://coston2-explorer.flare.network/api'
    },
    contracts: {},
    testnet: true
  },
  flowMainnet: {
    id: 747n,
    label: 'flowMainnet',
    name: 'Flow EVM Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Flow',
      symbol: 'FLOW'
    },
    providerURL: 'https://mainnet.evm.nodes.onflow.org',
    blockExplorer: {
      name: 'Mainnet Explorer',
      url: 'https://evm.flowscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 6205
      }
    },
    testnet: false
  },
  flowPreviewnet: {
    id: 646n,
    label: 'flowPreviewnet',
    name: 'Flow EVM Previewnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Flow',
      symbol: 'FLOW'
    },
    providerURL: 'https://previewnet.evm.nodes.onflow.org',
    blockExplorer: {
      name: 'Previewnet Explorer',
      url: 'https://previewnet.flowdiver.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 6205
      }
    },
    testnet: false
  },
  flowTestnet: {
    id: 545n,
    label: 'flowTestnet',
    name: 'Flow EVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Flow',
      symbol: 'FLOW'
    },
    providerURL: 'https://testnet.evm.nodes.onflow.org',
    blockExplorer: {
      name: 'Flow Diver',
      url: 'https://evm-testnet.flowscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 137518
      }
    },
    testnet: true
  },
  fluence: {
    id: 9999999n,
    label: 'fluence',
    name: 'Fluence',
    nativeCurrency: {
      name: 'FLT',
      symbol: 'FLT',
      decimals: 18
    },
    providerURL: 'https://rpc.mainnet.fluence.dev',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://blockscout.mainnet.fluence.dev',
      apiUrl: 'https://blockscout.mainnet.fluence.dev/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 207583
      }
    },
    testnet: false
  },
  fluenceStage: {
    id: 123420000220n,
    label: 'fluenceStage',
    name: 'Fluence Stage',
    nativeCurrency: {
      name: 'tFLT',
      symbol: 'tFLT',
      decimals: 18
    },
    providerURL: 'https://rpc.stage.fluence.dev',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://blockscout.stage.fluence.dev',
      apiUrl: 'https://blockscout.stage.fluence.dev/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 83227
      }
    },
    testnet: true
  },
  fluenceTestnet: {
    id: 52164803n,
    label: 'fluenceTestnet',
    name: 'Fluence Testnet',
    nativeCurrency: {
      name: 'tFLT',
      symbol: 'tFLT',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.fluence.dev',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://blockscout.testnet.fluence.dev',
      apiUrl: 'https://blockscout.testnet.fluence.dev/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 96424
      }
    },
    testnet: true
  },
  forma: {
    id: 984122n,
    label: 'forma',
    name: 'Forma',
    nativeCurrency: {
      symbol: 'TIA',
      name: 'TIA',
      decimals: 18
    },
    providerURL: 'https://rpc.forma.art',
    blockExplorer: {
      name: 'Forma Explorer',
      url: 'https://explorer.forma.art'
    },
    contracts: {
      multicall3: {
        address: '0xd53C6FFB123F7349A32980F87faeD8FfDc9ef079',
        blockCreated: 252705
      }
    },
    testnet: false
  },
  foundry: {
    id: 31337n,
    label: 'foundry',
    name: 'Foundry',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'http://127.0.0.1:8545',
    blockExplorer: {},
    contracts: {},
    testnet: false
  },
  fraxtal: {
    id: 252n,
    label: 'fraxtal',
    name: 'Fraxtal',
    nativeCurrency: {
      name: 'Frax Ether',
      symbol: 'frxETH',
      decimals: 18
    },
    providerURL: 'https://rpc.frax.com',
    blockExplorer: {
      name: 'fraxscan',
      url: 'https://fraxscan.com',
      apiUrl: 'https://api.fraxscan.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '1': {
          address: '0x66CC916Ed5C6C2FA97014f7D1cD141528Ae171e4'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '1': {
          address: '0x36cb65c1967A0Fb0EEE11569C51C2f2aA1Ca6f6D',
          blockCreated: 19135323
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x34C0bD5877A5Ee7099D0f5688D65F4bB9158BDE2',
          blockCreated: 19135323
        }
      }
    },
    testnet: false
  },
  fraxtalTestnet: {
    id: 2522n,
    label: 'fraxtalTestnet',
    name: 'Fraxtal Testnet',
    nativeCurrency: {
      name: 'Frax Ether',
      symbol: 'frxETH',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.frax.com',
    blockExplorer: {
      name: 'fraxscan testnet',
      url: 'https://holesky.fraxscan.com',
      apiUrl: 'https://api-holesky.fraxscan.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '17000': {
          address: '0x715EA64DA13F4d0831ece4Ad3E8c1aa013167F32'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '17000': {
          address: '0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d',
          blockCreated: 318416
        }
      },
      l1StandardBridge: {
        '17000': {
          address: '0x0BaafC217162f64930909aD9f2B27125121d6332',
          blockCreated: 318416
        }
      }
    },
    testnet: false
  },
  funkiMainnet: {
    id: 33979n,
    label: 'funkiMainnet',
    name: 'Funki',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-mainnet.funkichain.com',
    blockExplorer: {
      name: 'Funki Mainnet Explorer',
      url: 'https://funkiscan.io'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      }
    },
    testnet: false
  },
  funkiSepolia: {
    id: 3397901n,
    label: 'funkiSepolia',
    name: 'Funki Sepolia Sandbox',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://funki-testnet.alt.technology',
    blockExplorer: {
      name: 'Funki Sepolia Sandbox Explorer',
      url: 'https://sepolia-sandbox.funkichain.com/'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1620204
      }
    },
    testnet: true
  },
  fuse: {
    id: 122n,
    label: 'fuse',
    name: 'Fuse',
    nativeCurrency: {
      name: 'Fuse',
      symbol: 'FUSE',
      decimals: 18
    },
    providerURL: 'https://rpc.fuse.io',
    blockExplorer: {
      name: 'Fuse Explorer',
      url: 'https://explorer.fuse.io',
      apiUrl: 'https://explorer.fuse.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 16146628
      }
    },
    testnet: false
  },
  fuseSparknet: {
    id: 123n,
    label: 'fuseSparknet',
    name: 'Fuse Sparknet',
    nativeCurrency: {
      name: 'Spark',
      symbol: 'SPARK',
      decimals: 18
    },
    providerURL: 'https://rpc.fusespark.io',
    blockExplorer: {
      name: 'Sparkent Explorer',
      url: 'https://explorer.fusespark.io',
      apiUrl: 'https://explorer.fusespark.io/api'
    },
    contracts: {},
    testnet: false
  },
  fusion: {
    id: 32659n,
    label: 'fusion',
    name: 'Fusion Mainnet',
    nativeCurrency: {
      name: 'Fusion',
      symbol: 'FSN',
      decimals: 18
    },
    providerURL: 'https://mainnet.fusionnetwork.io',
    blockExplorer: {
      name: 'FSNscan',
      url: 'https://fsnscan.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 10441605
      }
    },
    testnet: false
  },
  fusionTestnet: {
    id: 46688n,
    label: 'fusionTestnet',
    name: 'Fusion Testnet',
    nativeCurrency: {
      name: 'Fusion',
      symbol: 'FSN',
      decimals: 18
    },
    providerURL: 'https://testnet.fusionnetwork.io',
    blockExplorer: {
      name: 'FSNscan',
      url: 'https://testnet.fsnscan.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 10428309
      }
    },
    testnet: true
  },
  garnet: {
    id: 17069n,
    label: 'garnet',
    name: 'Garnet Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.garnetchain.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.garnetchain.com'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '17000': {
          address: '0x57ee40586fbE286AfC75E67cb69511A6D9aF5909',
          blockCreated: 1274684
        }
      },
      l2OutputOracle: {
        '17000': {
          address: '0xCb8E7AC561b8EF04F2a15865e9fbc0766FEF569B',
          blockCreated: 1274684
        }
      },
      l1StandardBridge: {
        '17000': {
          address: '0x09bcDd311FE398F80a78BE37E489f5D440DB95DE',
          blockCreated: 1274684
        }
      }
    },
    testnet: true
  },
  geist: {
    id: 63157n,
    label: 'geist',
    name: 'Geist Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Aavegotchi GHST Token',
      symbol: 'GHST'
    },
    providerURL: 'https://geist-mainnet.g.alchemy.com/public',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://geist-mainnet.explorer.alchemy.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 660735
      }
    },
    testnet: false
  },
  genesys: {
    id: 16507n,
    label: 'genesys',
    name: 'Genesys Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'GSYS',
      symbol: 'GSYS'
    },
    providerURL: 'https://rpc.genesys.network',
    blockExplorer: {
      name: 'Genesys Explorer',
      url: 'https://gchainexplorer.genesys.network'
    },
    contracts: {},
    testnet: false
  },
  glideL1Protocol: {
    id: 251n,
    label: 'glideL1Protocol',
    name: 'Glide L1 Protocol XP',
    nativeCurrency: {
      name: 'GLXP',
      symbol: 'GLXP',
      decimals: 18
    },
    providerURL: 'https://rpc-api.glideprotocol.xyz/l1-rpc',
    blockExplorer: {
      name: 'Glide Protocol Explore',
      url: 'https://blockchain-explorer.glideprotocol.xyz'
    },
    contracts: {},
    testnet: false
  },
  glideL2Protocol: {
    id: 253n,
    label: 'glideL2Protocol',
    name: 'Glide L2 Protocol XP',
    nativeCurrency: {
      name: 'GLXP',
      symbol: 'GLXP',
      decimals: 18
    },
    providerURL: 'https://rpc-api.glideprotocol.xyz/l2-rpc',
    blockExplorer: {
      name: 'Glide Protocol Explore',
      url: 'https://blockchain-explorer.glideprotocol.xyz'
    },
    contracts: {},
    testnet: false
  },
  gnosis: {
    id: 100n,
    label: 'gnosis',
    name: 'Gnosis',
    nativeCurrency: {
      decimals: 18,
      name: 'xDAI',
      symbol: 'XDAI'
    },
    providerURL: 'https://rpc.gnosischain.com',
    blockExplorer: {
      name: 'Gnosisscan',
      url: 'https://gnosisscan.io',
      apiUrl: 'https://api.gnosisscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 21022491
      }
    },
    testnet: false
  },
  gnosisChiado: {
    id: 10200n,
    label: 'gnosisChiado',
    name: 'Gnosis Chiado',
    nativeCurrency: {
      decimals: 18,
      name: 'Gnosis',
      symbol: 'xDAI'
    },
    providerURL: 'https://rpc.chiadochain.net',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://blockscout.chiadochain.net',
      apiUrl: 'https://blockscout.chiadochain.net/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 4967313
      }
    },
    testnet: true
  },
  goChain: {
    id: 60n,
    label: 'goChain',
    name: 'GoChain',
    nativeCurrency: {
      decimals: 18,
      name: 'GO',
      symbol: 'GO'
    },
    providerURL: 'https://rpc.gochain.io',
    blockExplorer: {
      name: 'GoChain Explorer',
      url: 'https://explorer.gochain.io'
    },
    contracts: {},
    testnet: false
  },
  goat: {
    id: 2345n,
    label: 'goat',
    name: 'GOAT',
    nativeCurrency: {
      decimals: 18,
      name: 'Bitcoin',
      symbol: 'BTC'
    },
    providerURL: 'https://rpc.goat.network',
    blockExplorer: {
      name: 'Goat Explorer',
      url: 'https://explorer.goat.network'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 0
      }
    },
    testnet: false
  },
  gobi: {
    id: 1663n,
    label: 'gobi',
    name: 'Horizen Gobi Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Test ZEN',
      symbol: 'tZEN'
    },
    providerURL: 'https://gobi-testnet.horizenlabs.io/ethv1',
    blockExplorer: {
      name: 'Gobi Explorer',
      url: 'https://gobi-explorer.horizen.io'
    },
    contracts: {},
    testnet: true
  },
  godwoken: {
    id: 71402n,
    label: 'godwoken',
    name: 'Godwoken Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'pCKB',
      symbol: 'pCKB'
    },
    providerURL: 'https://v1.mainnet.godwoken.io/rpc',
    blockExplorer: {
      name: 'GW Scan',
      url: 'https://v1.gwscan.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 15034
      }
    },
    testnet: false
  },
  goerli: {
    id: 5n,
    label: 'goerli',
    name: 'Goerli',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.ankr.com/eth_goerli',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
      apiUrl: 'https://api-goerli.etherscan.io/api'
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
      },
      ensUniversalResolver: {
        address: '0xfc4AC75C46C914aF5892d6d3eFFcebD7917293F1',
        blockCreated: 10339206
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 6507670
      }
    },
    testnet: true
  },
  gravity: {
    id: 1625n,
    label: 'gravity',
    name: 'Gravity Alpha Mainnet',
    nativeCurrency: {
      name: 'G',
      symbol: 'G',
      decimals: 18
    },
    providerURL: 'https://rpc.gravity.xyz',
    blockExplorer: {
      name: 'Gravity Explorer',
      url: 'https://explorer.gravity.xyz',
      apiUrl: 'https://explorer.gravity.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
        blockCreated: 16851
      }
    },
    testnet: false
  },
  guruNetwork: {
    id: 260n,
    label: 'guruNetwork',
    name: 'Guru Network Mainnet',
    nativeCurrency: {
      name: 'GURU Token',
      symbol: 'GURU',
      decimals: 18
    },
    providerURL: 'https://rpc.gurunetwork.ai/archive/260',
    blockExplorer: {
      name: 'Guruscan',
      url: 'https://scan.gurunetwork.ai'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 271691
      }
    },
    testnet: false
  },
  guruTestnet: {
    id: 261n,
    label: 'guruTestnet',
    name: 'Guru Network Testnet',
    nativeCurrency: {
      name: 'tGURU Token',
      symbol: 'tGURU',
      decimals: 18
    },
    providerURL: 'https://rpc.gurunetwork.ai/archive/261',
    blockExplorer: {
      name: 'Guruscan',
      url: 'https://sepolia.gurunetwork.ai'
    },
    contracts: {},
    testnet: true
  },
  ham: {
    id: 5112n,
    label: 'ham',
    name: 'Ham',
    nativeCurrency: {
      decimals: 18,
      name: 'Ham',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.ham.fun',
    blockExplorer: {
      name: 'Ham Chain Explorer',
      url: 'https://explorer.ham.fun',
      apiUrl: 'https://explorer.ham.fun/api/v2'
    },
    contracts: {},
    testnet: false
  },
  happychainTestnet: {
    id: 216n,
    label: 'happychainTestnet',
    name: 'Happychain Testnet',
    nativeCurrency: {
      symbol: 'HAPPY',
      name: 'HAPPY',
      decimals: 18
    },
    providerURL: 'https://happy-testnet-sepolia.rpc.caldera.xyz/http',
    blockExplorer: {
      name: 'Happy Chain Testnet Explorer',
      url: 'https://happy-testnet-sepolia.explorer.caldera.xyz/'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1
      }
    },
    testnet: true
  },
  haqqMainnet: {
    id: 11235n,
    label: 'haqqMainnet',
    name: 'HAQQ Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Islamic Coin',
      symbol: 'ISLM'
    },
    providerURL: 'https://rpc.eth.haqq.network',
    blockExplorer: {
      name: 'HAQQ Explorer',
      url: 'https://explorer.haqq.network',
      apiUrl: 'https://explorer.haqq.network/api'
    },
    contracts: {},
    testnet: false
  },
  haqqTestedge2: {
    id: 54211n,
    label: 'haqqTestedge2',
    name: 'HAQQ Testedge 2',
    nativeCurrency: {
      decimals: 18,
      name: 'Islamic Coin',
      symbol: 'ISLMT'
    },
    providerURL: 'https://rpc.eth.testedge2.haqq.network',
    blockExplorer: {
      name: 'HAQQ Explorer',
      url: 'https://explorer.testedge2.haqq.network',
      apiUrl: 'https://explorer.testedge2.haqq.network/api'
    },
    contracts: {},
    testnet: false
  },
  hardhat: {
    id: 31337n,
    label: 'hardhat',
    name: 'Hardhat',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'http://127.0.0.1:8545',
    blockExplorer: {},
    contracts: {},
    testnet: true
  },
  harmonyOne: {
    id: 1666600000n,
    label: 'harmonyOne',
    name: 'Harmony One',
    nativeCurrency: {
      name: 'Harmony',
      symbol: 'ONE',
      decimals: 18
    },
    providerURL: 'https://rpc.ankr.com/harmony',
    blockExplorer: {
      name: 'Harmony Explorer',
      url: 'https://explorer.harmony.one'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 24185753
      }
    },
    testnet: false
  },
  hashkeyTestnet: {
    id: 133n,
    label: 'hashkeyTestnet',
    name: 'HashKey Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'HashKey EcoPoints',
      symbol: 'HSK'
    },
    providerURL: 'https://hashkeychain-testnet.alt.technology',
    blockExplorer: {
      name: 'HashKey Chain Explorer',
      url: 'https://hashkeychain-testnet-explorer.alt.technology'
    },
    contracts: {},
    testnet: false
  },
  hedera: {
    id: 295n,
    label: 'hedera',
    name: 'Hedera Mainnet',
    nativeCurrency: {
      symbol: 'HBAR',
      name: 'HBAR',
      decimals: 18
    },
    providerURL: 'https://mainnet.hashio.io/api',
    blockExplorer: {
      name: 'Hashscan',
      url: 'https://hashscan.io/mainnet'
    },
    contracts: {},
    testnet: false
  },
  hederaPreviewnet: {
    id: 297n,
    label: 'hederaPreviewnet',
    name: 'Hedera Previewnet',
    nativeCurrency: {
      symbol: 'HBAR',
      name: 'HBAR',
      decimals: 18
    },
    providerURL: 'https://previewnet.hashio.io/api',
    blockExplorer: {
      name: 'Hashscan',
      url: 'https://hashscan.io/previewnet'
    },
    contracts: {},
    testnet: true
  },
  hederaTestnet: {
    id: 296n,
    label: 'hederaTestnet',
    name: 'Hedera Testnet',
    nativeCurrency: {
      symbol: 'HBAR',
      name: 'HBAR',
      decimals: 18
    },
    providerURL: 'https://testnet.hashio.io/api',
    blockExplorer: {
      name: 'Hashscan',
      url: 'https://hashscan.io/testnet'
    },
    contracts: {},
    testnet: true
  },
  hela: {
    id: 8668n,
    label: 'hela',
    name: 'Hela Mainnet',
    nativeCurrency: {
      name: 'HLUSD',
      symbol: 'HLUSD',
      decimals: 18
    },
    providerURL: 'https://mainnet-rpc.helachain.com',
    blockExplorer: {
      name: 'Hela explorer',
      url: 'https://mainnet-blockexplorer.helachain.com'
    },
    contracts: {},
    testnet: false
  },
  hemi: {
    id: 43111n,
    label: 'hemi',
    name: 'Hemi',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.hemi.network/rpc',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://explorer.hemi.xyz'
    },
    contracts: {},
    testnet: false
  },
  hemiSepolia: {
    id: 743111n,
    label: 'hemiSepolia',
    name: 'Hemi Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://testnet.rpc.hemi.network/rpc',
    blockExplorer: {
      name: 'Hemi Sepolia explorer',
      url: 'https://testnet.explorer.hemi.xyz'
    },
    contracts: {},
    testnet: true
  },
  holesky: {
    id: 17000n,
    label: 'holesky',
    name: 'Holesky',
    nativeCurrency: {
      name: 'Holesky Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://ethereum-holesky-rpc.publicnode.com',
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
      }
    },
    testnet: true
  },
  hpb: {
    id: 269n,
    label: 'hpb',
    name: 'High Performance Blockchain',
    nativeCurrency: {
      name: 'HPB',
      symbol: 'HPB',
      decimals: 18
    },
    providerURL: 'https://hpbnode.com',
    blockExplorer: {
      name: 'hpbScan',
      url: 'https://hscan.org'
    },
    contracts: {},
    testnet: false
  },
  huddle01Mainnet: {
    id: 12323n,
    label: 'huddle01Mainnet',
    name: 'Huddle01 dRTC Chain',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://huddle01.calderachain.xyz/http',
    blockExplorer: {
      name: 'Huddle01 Caldera Explorer',
      url: 'https://huddle01.calderaexplorer.xyz',
      apiUrl: 'https://huddle01.calderaexplorer.xyz/api'
    },
    contracts: {},
    testnet: false
  },
  huddle01Testnet: {
    id: 2524852n,
    label: 'huddle01Testnet',
    name: 'Huddle01 dRTC Chain Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://huddle-testnet.rpc.caldera.xyz/http',
    blockExplorer: {
      name: 'Huddle01 Caldera Explorer',
      url: 'https://huddle-testnet.explorer.caldera.xyz',
      apiUrl: 'https://huddle-testnet.explorer.caldera.xyz/api'
    },
    contracts: {},
    testnet: false
  },
  humanode: {
    id: 5234n,
    label: 'humanode',
    name: 'Humanode',
    nativeCurrency: {
      name: 'HMND',
      symbol: 'HMND',
      decimals: 18
    },
    providerURL: 'https://explorer-rpc-http.mainnet.stages.humanode.io',
    blockExplorer: {
      name: 'Subscan',
      url: 'https://humanode.subscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 4413097
      }
    },
    testnet: false
  },
  humanodeTestnet5: {
    id: 14853n,
    label: 'humanodeTestnet5',
    name: 'Humanode Testnet 5',
    nativeCurrency: {
      name: 'HMND',
      symbol: 'HMND',
      decimals: 18
    },
    providerURL: 'https://explorer-rpc-http.testnet5.stages.humanode.io',
    blockExplorer: {},
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      }
    },
    testnet: false
  },
  hychain: {
    id: 2911n,
    label: 'hychain',
    name: 'HYCHAIN',
    nativeCurrency: {
      name: 'HYTOPIA',
      symbol: 'TOPIA',
      decimals: 18
    },
    providerURL: 'https://rpc.hychain.com/http',
    blockExplorer: {
      name: 'HYCHAIN Explorer',
      url: 'https://explorer.hychain.com'
    },
    contracts: {},
    testnet: false
  },
  hychainTestnet: {
    id: 29112n,
    label: 'hychainTestnet',
    name: 'HYCHAIN Testnet',
    nativeCurrency: {
      name: 'HYTOPIA',
      symbol: 'TOPIA',
      decimals: 18
    },
    providerURL: 'https://rpc.hychain.com/http',
    blockExplorer: {
      name: 'HYCHAIN Explorer',
      url: 'https://testnet-rpc.hychain.com/http'
    },
    contracts: {},
    testnet: true
  },
  iSunCoin: {
    id: 8017n,
    label: 'iSunCoin',
    name: 'iSunCoin Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ISC',
      symbol: 'ISC'
    },
    providerURL: 'https://mainnet.isuncoin.com',
    blockExplorer: {
      name: 'iSunCoin Explorer',
      url: 'https://baifa.io/app/chains/8017'
    },
    contracts: {},
    testnet: false
  },
  idchain: {
    id: 74n,
    label: 'idchain',
    name: 'IDChain Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'EIDI',
      symbol: 'EIDI'
    },
    providerURL: 'https://idchain.one/rpc',
    blockExplorer: {
      name: 'IDChain Explorer',
      url: 'https://explorer.idchain.one'
    },
    contracts: {},
    testnet: false
  },
  immutableZkEvm: {
    id: 13371n,
    label: 'immutableZkEvm',
    name: 'Immutable zkEVM',
    nativeCurrency: {
      decimals: 18,
      name: 'Immutable Coin',
      symbol: 'IMX'
    },
    providerURL: 'https://rpc.immutable.com',
    blockExplorer: {
      name: 'Immutable Explorer',
      url: 'https://explorer.immutable.com',
      apiUrl: 'https://explorer.immutable.com/api'
    },
    contracts: {
      multicall3: {
        address: '0x236bdA4589e44e6850f5aC6a74BfCa398a86c6c0',
        blockCreated: 4335972
      }
    },
    testnet: false
  },
  immutableZkEvmTestnet: {
    id: 13473n,
    label: 'immutableZkEvmTestnet',
    name: 'Immutable zkEVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Immutable Coin',
      symbol: 'IMX'
    },
    providerURL: 'https://rpc.testnet.immutable.com',
    blockExplorer: {
      name: 'Immutable Testnet Explorer',
      url: 'https://explorer.testnet.immutable.com/'
    },
    contracts: {
      multicall3: {
        address: '0x2CC787Ed364600B0222361C4188308Fa8E68bA60',
        blockCreated: 5977391
      }
    },
    testnet: true
  },
  inEVM: {
    id: 2525n,
    label: 'inEVM',
    name: 'inEVM Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Injective',
      symbol: 'INJ'
    },
    providerURL: 'https://mainnet.rpc.inevm.com/http',
    blockExplorer: {
      name: 'inEVM Explorer',
      url: 'https://inevm.calderaexplorer.xyz',
      apiUrl: 'https://inevm.calderaexplorer.xyz/api/v2'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 118606
      }
    },
    testnet: false
  },
  initVerse: {
    id: 7233n,
    label: 'initVerse',
    name: 'InitVerse Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'InitVerse',
      symbol: 'INI'
    },
    providerURL: 'https://rpc-mainnet.inichain.com',
    blockExplorer: {
      name: 'InitVerseScan',
      url: 'https://www.iniscan.com',
      apiUrl: 'https://explorer-api.inichain.com/api'
    },
    contracts: {
      multicall3: {
        address: '0x83466BE48A067115FFF91f7b892Ed1726d032e47',
        blockCreated: 2318
      }
    },
    testnet: false
  },
  initVerseGenesis: {
    id: 7234n,
    label: 'initVerseGenesis',
    name: 'InitVerse Genesis Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'InitVerse',
      symbol: 'INI'
    },
    providerURL: 'https://rpc-testnet.inichain.com',
    blockExplorer: {
      name: 'InitVerseGenesisScan',
      url: 'https://genesis-testnet.iniscan.com',
      apiUrl: 'https://explorer-testnet-api.inichain.com/api'
    },
    contracts: {
      multicall3: {
        address: '0x0cF32CBDd6c437331EA4f85ed2d881A5379B5a6F',
        blockCreated: 16361
      }
    },
    testnet: true
  },
  ink: {
    id: 57073n,
    label: 'ink',
    name: 'Ink',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-gel.inkonchain.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.inkonchain.com',
      apiUrl: 'https://explorer.inkonchain.com/api/v2'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '1': {
          address: '0x10d7b35078d3baabb96dd45a9143b94be65b12cd'
        }
      },
      portal: {
        '1': {
          address: '0x5d66c1782664115999c47c9fa5cd031f495d3e4f'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x88ff1e5b602916615391f55854588efcbb7663f0'
        }
      }
    },
    testnet: false
  },
  inkSepolia: {
    id: 763373n,
    label: 'inkSepolia',
    name: 'Ink Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-gel-sepolia.inkonchain.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer-sepolia.inkonchain.com/',
      apiUrl: 'https://explorer-sepolia.inkonchain.com/api/v2'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '11155111': {
          address: '0x860e626c700af381133d9f4af31412a2d1db3d5d'
        }
      },
      portal: {
        '11155111': {
          address: '0x5c1d29c6c9c8b0800692acc95d700bcb4966a1d7'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0x33f60714bbd74d62b66d79213c348614de51901c'
        }
      }
    },
    testnet: true
  },
  iota: {
    id: 8822n,
    label: 'iota',
    name: 'IOTA EVM',
    nativeCurrency: {
      decimals: 18,
      name: 'IOTA',
      symbol: 'IOTA'
    },
    providerURL: 'https://json-rpc.evm.iotaledger.net',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://explorer.evm.iota.org',
      apiUrl: 'https://explorer.evm.iota.org/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 25022
      }
    },
    testnet: false
  },
  iotaTestnet: {
    id: 1075n,
    label: 'iotaTestnet',
    name: 'IOTA EVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'IOTA',
      symbol: 'IOTA'
    },
    providerURL: 'https://json-rpc.evm.testnet.iotaledger.net',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://explorer.evm.testnet.iotaledger.net',
      apiUrl: 'https://explorer.evm.testnet.iotaledger.net/api'
    },
    contracts: {},
    testnet: true
  },
  iotex: {
    id: 4689n,
    label: 'iotex',
    name: 'IoTeX',
    nativeCurrency: {
      decimals: 18,
      name: 'IoTeX',
      symbol: 'IOTX'
    },
    providerURL: 'https://babel-api.mainnet.iotex.io',
    blockExplorer: {
      name: 'IoTeXScan',
      url: 'https://iotexscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 22163670
      }
    },
    testnet: false
  },
  iotexTestnet: {
    id: 4690n,
    label: 'iotexTestnet',
    name: 'IoTeX Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'IoTeX',
      symbol: 'IOTX'
    },
    providerURL: 'https://babel-api.testnet.iotex.io',
    blockExplorer: {
      name: 'IoTeXScan',
      url: 'https://testnet.iotexscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xb5cecD6894c6f473Ec726A176f1512399A2e355d',
        blockCreated: 24347592
      }
    },
    testnet: true
  },
  jbc: {
    id: 8899n,
    label: 'jbc',
    name: 'JIBCHAIN L1',
    nativeCurrency: {
      name: 'JBC',
      symbol: 'JBC',
      decimals: 18
    },
    providerURL: 'https://rpc-l1.jibchain.net',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://exp-l1.jibchain.net',
      apiUrl: 'https://exp-l1.jibchain.net/api'
    },
    contracts: {
      multicall3: {
        address: '0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC',
        blockCreated: 2299048
      }
    },
    testnet: false
  },
  jbcTestnet: {
    id: 88991n,
    label: 'jbcTestnet',
    name: 'Jibchain Testnet',
    nativeCurrency: {
      name: 'tJBC',
      symbol: 'tJBC',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.jibchain.net',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://exp.testnet.jibchain.net',
      apiUrl: 'https://exp.testnet.jibchain.net/api'
    },
    contracts: {
      multicall3: {
        address: '0xa1a858ad9041B4741e620355a3F96B3c78e70ecE',
        blockCreated: 32848
      }
    },
    testnet: true
  },
  kaia: {
    id: 8217n,
    label: 'kaia',
    name: 'Kaia',
    nativeCurrency: {
      decimals: 18,
      name: 'Kaia',
      symbol: 'KAIA'
    },
    providerURL: 'https://public-en.node.kaia.io',
    blockExplorer: {
      name: 'KaiaScan',
      url: 'https://kaiascan.io',
      apiUrl: 'https://api-cypress.klaytnscope.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 96002415
      }
    },
    testnet: false
  },
  kairos: {
    id: 1001n,
    label: 'kairos',
    name: 'Kairos Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Kairos KAIA',
      symbol: 'KAIA'
    },
    providerURL: 'https://public-en-kairos.node.kaia.io',
    blockExplorer: {
      name: 'KaiaScan',
      url: 'https://kairos.kaiascan.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 123390593
      }
    },
    testnet: true
  },
  kakarotSepolia: {
    id: 1802203764n,
    label: 'kakarotSepolia',
    name: 'Kakarot Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia-rpc.kakarot.org',
    blockExplorer: {
      name: 'Kakarot Scan',
      url: 'https://sepolia.kakarotscan.org'
    },
    contracts: {},
    testnet: true
  },
  kakarotStarknetSepolia: {
    id: 920637907288165n,
    label: 'kakarotStarknetSepolia',
    name: 'Kakarot Starknet Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia-rpc.kakarot.org',
    blockExplorer: {
      name: 'Kakarot Scan',
      url: 'https://sepolia.kakarotscan.org'
    },
    contracts: {},
    testnet: true
  },
  kardiaChain: {
    id: 24n,
    label: 'kardiaChain',
    name: 'KardiaChain Mainnet',
    nativeCurrency: {
      name: 'KAI',
      symbol: 'KAI',
      decimals: 18
    },
    providerURL: 'https://rpc.kardiachain.io',
    blockExplorer: {
      name: 'KardiaChain Explorer',
      url: 'https://explorer.kardiachain.io'
    },
    contracts: {},
    testnet: false
  },
  karura: {
    id: 686n,
    label: 'karura',
    name: 'Karura',
    nativeCurrency: {
      name: 'Karura',
      symbol: 'KAR',
      decimals: 18
    },
    providerURL: 'https://eth-rpc-karura.aca-api.network',
    blockExplorer: {
      name: 'Karura Blockscout',
      url: 'https://blockscout.karura.network',
      apiUrl: 'https://blockscout.karura.network/api'
    },
    contracts: {},
    testnet: false
  },
  kava: {
    id: 2222n,
    label: 'kava',
    name: 'Kava EVM',
    nativeCurrency: {
      name: 'Kava',
      symbol: 'KAVA',
      decimals: 18
    },
    providerURL: 'https://evm.kava.io',
    blockExplorer: {
      name: 'Kava EVM Explorer',
      url: 'https://kavascan.com',
      apiUrl: 'https://kavascan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 3661165
      }
    },
    testnet: false
  },
  kavaTestnet: {
    id: 2221n,
    label: 'kavaTestnet',
    name: 'Kava EVM Testnet',
    nativeCurrency: {
      name: 'Kava',
      symbol: 'KAVA',
      decimals: 18
    },
    providerURL: 'https://evm.testnet.kava.io',
    blockExplorer: {
      name: 'Kava EVM Testnet Explorer',
      url: 'https://testnet.kavascan.com/',
      apiUrl: 'https://testnet.kavascan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xDf1D724A7166261eEB015418fe8c7679BBEa7fd6',
        blockCreated: 7242179
      }
    },
    testnet: true
  },
  kcc: {
    id: 321n,
    label: 'kcc',
    name: 'KCC Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'KCS',
      symbol: 'KCS'
    },
    providerURL: 'https://kcc-rpc.com',
    blockExplorer: {
      name: 'KCC Explorer',
      url: 'https://explorer.kcc.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 11760430
      }
    },
    testnet: false
  },
  kinto: {
    id: 7887n,
    label: 'kinto',
    name: 'Kinto Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.kinto.xyz/http',
    blockExplorer: {
      name: 'Kinto Explorer',
      url: 'https://explorer.kinto.xyz'
    },
    contracts: {},
    testnet: false
  },
  klaytn: {
    id: 8217n,
    label: 'klaytn',
    name: 'Klaytn',
    nativeCurrency: {
      decimals: 18,
      name: 'Klaytn',
      symbol: 'KLAY'
    },
    providerURL: 'https://public-en-cypress.klaytn.net',
    blockExplorer: {
      name: 'KlaytnScope',
      url: 'https://scope.klaytn.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 96002415
      }
    },
    testnet: false
  },
  klaytnBaobab: {
    id: 1001n,
    label: 'klaytnBaobab',
    name: 'Klaytn Baobab Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Baobab Klaytn',
      symbol: 'KLAY'
    },
    providerURL: 'https://public-en-baobab.klaytn.net',
    blockExplorer: {
      name: 'KlaytnScope',
      url: 'https://baobab.klaytnscope.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 123390593
      }
    },
    testnet: true
  },
  koi: {
    id: 701n,
    label: 'koi',
    name: 'Koi Network',
    nativeCurrency: {
      decimals: 18,
      name: 'Koi Network Native Token',
      symbol: 'KRING'
    },
    providerURL: 'https://koi-rpc.darwinia.network',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://koi-scan.darwinia.network'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 180001
      }
    },
    testnet: true
  },
  kroma: {
    id: 255n,
    label: 'kroma',
    name: 'Kroma',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://api.kroma.network',
    blockExplorer: {
      name: 'Kroma Explorer',
      url: 'https://blockscout.kroma.network',
      apiUrl: 'https://blockscout.kroma.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 16054868
      }
    },
    testnet: false
  },
  kromaSepolia: {
    id: 2358n,
    label: 'kromaSepolia',
    name: 'Kroma Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://api.sepolia.kroma.network',
    blockExplorer: {
      name: 'Kroma Sepolia Explorer',
      url: 'https://blockscout.sepolia.kroma.network',
      apiUrl: 'https://blockscout.sepolia.kroma.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 8900914
      }
    },
    testnet: true
  },
  l3x: {
    id: 12324n,
    label: 'l3x',
    name: 'L3X Protocol',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-mainnet.l3x.com',
    blockExplorer: {
      name: 'L3X Mainnet Explorer',
      url: 'https://explorer.l3x.com',
      apiUrl: 'https://explorer.l3x.com/api/v2'
    },
    contracts: {},
    testnet: false
  },
  l3xTestnet: {
    id: 12325n,
    label: 'l3xTestnet',
    name: 'L3X Protocol Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-testnet.l3x.com',
    blockExplorer: {
      name: 'L3X Testnet Explorer',
      url: 'https://explorer-testnet.l3x.com',
      apiUrl: 'https://explorer-testnet.l3x.com/api/v2'
    },
    contracts: {},
    testnet: true
  },
  lavita: {
    id: 360890n,
    label: 'lavita',
    name: 'LAVITA Mainnet',
    nativeCurrency: {
      name: 'vTFUEL',
      symbol: 'vTFUEL',
      decimals: 18
    },
    providerURL: 'https://tsub360890-eth-rpc.thetatoken.org/rpc',
    blockExplorer: {
      name: 'LAVITA Explorer',
      url: 'https://tsub360890-explorer.thetatoken.org'
    },
    contracts: {},
    testnet: false
  },
  lensTestnet: {
    id: 37111n,
    label: 'lensTestnet',
    name: 'Lens Testnet',
    nativeCurrency: {
      name: 'GRASS',
      symbol: 'GRASS',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.lens.dev',
    blockExplorer: {
      name: 'Lens Block Explorer',
      url: 'https://block-explorer.testnet.lens.dev',
      apiUrl: 'https://block-explorer-api.staging.lens.dev/api'
    },
    contracts: {},
    testnet: true
  },
  lightlinkPegasus: {
    id: 1891n,
    label: 'lightlinkPegasus',
    name: 'LightLink Pegasus Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://replicator.pegasus.lightlink.io/rpc/v1',
    blockExplorer: {
      name: 'LightLink Pegasus Explorer',
      url: 'https://pegasus.lightlink.io'
    },
    contracts: {},
    testnet: true
  },
  lightlinkPhoenix: {
    id: 1890n,
    label: 'lightlinkPhoenix',
    name: 'LightLink Phoenix Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://replicator.phoenix.lightlink.io/rpc/v1',
    blockExplorer: {
      name: 'LightLink Phoenix Explorer',
      url: 'https://phoenix.lightlink.io'
    },
    contracts: {},
    testnet: false
  },
  linea: {
    id: 59144n,
    label: 'linea',
    name: 'Linea Mainnet',
    nativeCurrency: {
      name: 'Linea Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.linea.build',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://lineascan.build',
      apiUrl: 'https://api.lineascan.build/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 42
      }
    },
    testnet: false
  },
  lineaGoerli: {
    id: 59140n,
    label: 'lineaGoerli',
    name: 'Linea Goerli Testnet',
    nativeCurrency: {
      name: 'Linea Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.goerli.linea.build',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.lineascan.build',
      apiUrl: 'https://api-goerli.lineascan.build/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 498623
      }
    },
    testnet: true
  },
  lineaSepolia: {
    id: 59141n,
    label: 'lineaSepolia',
    name: 'Linea Sepolia Testnet',
    nativeCurrency: {
      name: 'Linea Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.sepolia.linea.build',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia.lineascan.build',
      apiUrl: 'https://api-sepolia.lineascan.build/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 227427
      }
    },
    testnet: true
  },
  lineaTestnet: {
    id: 59140n,
    label: 'lineaTestnet',
    name: 'Linea Goerli Testnet',
    nativeCurrency: {
      name: 'Linea Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.goerli.linea.build',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.lineascan.build',
      apiUrl: 'https://goerli.lineascan.build/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 498623
      }
    },
    testnet: true
  },
  lisk: {
    id: 1135n,
    label: 'lisk',
    name: 'Lisk',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.api.lisk.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://blockscout.lisk.com',
      apiUrl: 'https://blockscout.lisk.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xA9d71E1dd7ca26F26e656E66d6AA81ed7f745bf0'
      },
      l2OutputOracle: {
        '1': {
          address: '0x113cB99283AF242Da0A0C54347667edF531Aa7d6'
        }
      },
      portal: {
        '1': {
          address: '0x26dB93F8b8b4f7016240af62F7730979d353f9A7'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x2658723Bf70c7667De6B25F99fcce13A16D25d08'
        }
      }
    },
    testnet: false
  },
  liskSepolia: {
    id: 4202n,
    label: 'liskSepolia',
    name: 'Lisk Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.sepolia-api.lisk.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://sepolia-blockscout.lisk.com',
      apiUrl: 'https://sepolia-blockscout.lisk.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '11155111': {
          address: '0xA0E35F56C318DE1bD5D9ca6A94Fe7e37C5663348'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '11155111': {
          address: '0xe3d90F21490686Ec7eF37BE788E02dfC12787264'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0x1Fb30e446eA791cd1f011675E5F3f5311b70faF5'
        }
      }
    },
    testnet: true
  },
  localhost: {
    id: 1337n,
    label: 'localhost',
    name: 'Localhost',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'http://127.0.0.1:8545',
    blockExplorer: {},
    contracts: {},
    testnet: true
  },
  loop: {
    id: 15551n,
    label: 'loop',
    name: 'LoopNetwork Mainnet',
    nativeCurrency: {
      name: 'LOOP',
      symbol: 'LOOP',
      decimals: 18
    },
    providerURL: 'https://api.mainnetloop.com',
    blockExplorer: {
      name: 'LoopNetwork Blockchain Explorer',
      url: 'https://explorer.mainnetloop.com/'
    },
    contracts: {},
    testnet: false
  },
  lukso: {
    id: 42n,
    label: 'lukso',
    name: 'LUKSO',
    nativeCurrency: {
      name: 'LUKSO',
      symbol: 'LYX',
      decimals: 18
    },
    providerURL: 'https://rpc.mainnet.lukso.network',
    blockExplorer: {
      name: 'LUKSO Mainnet Explorer',
      url: 'https://explorer.execution.mainnet.lukso.network',
      apiUrl: 'https://api.explorer.execution.mainnet.lukso.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 468183
      }
    },
    testnet: false
  },
  luksoTestnet: {
    id: 4201n,
    label: 'luksoTestnet',
    name: 'LUKSO Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'LUKSO Testnet',
      symbol: 'LYXt'
    },
    providerURL: 'https://rpc.testnet.lukso.network',
    blockExplorer: {
      name: 'LUKSO Testnet Explorer',
      url: 'https://explorer.execution.testnet.lukso.network',
      apiUrl: 'https://api.explorer.execution.testnet.lukso.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 605348
      }
    },
    testnet: true
  },
  lumiaMainnet: {
    id: 994873017n,
    label: 'lumiaMainnet',
    name: 'Lumia Mainnet',
    nativeCurrency: {
      name: 'Lumia',
      symbol: 'LUMIA',
      decimals: 18
    },
    providerURL: 'https://mainnet-rpc.lumia.org',
    blockExplorer: {
      name: 'Lumia Explorer',
      url: 'https://explorer.lumia.org/'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3975939
      }
    },
    testnet: false
  },
  lumiaTestnet: {
    id: 1952959480n,
    label: 'lumiaTestnet',
    name: 'Lumia Testnet',
    nativeCurrency: {
      name: 'Lumia',
      symbol: 'LUMIA',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.lumia.org',
    blockExplorer: {
      name: 'Lumia Testnet Explorer',
      url: 'https://testnet-explorer.lumia.org/'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 2235063
      }
    },
    testnet: true
  },
  lycan: {
    id: 721n,
    label: 'lycan',
    name: 'Lycan',
    nativeCurrency: {
      decimals: 18,
      name: 'Lycan',
      symbol: 'LYC'
    },
    providerURL: 'https://rpc.lycanchain.com',
    blockExplorer: {
      name: 'Lycan Explorer',
      url: 'https://explorer.lycanchain.com'
    },
    contracts: {},
    testnet: false
  },
  lyra: {
    id: 957n,
    label: 'lyra',
    name: 'Lyra Chain',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.lyra.finance',
    blockExplorer: {
      name: 'Lyra Explorer',
      url: 'https://explorer.lyra.finance',
      apiUrl: 'https://explorer.lyra.finance/api/v2'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1935198
      }
    },
    testnet: false
  },
  mainnet: {
    id: 1n,
    label: 'mainnet',
    name: 'Ethereum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://eth.merkle.io',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api'
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
      },
      ensUniversalResolver: {
        address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67',
        blockCreated: 19258213
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14353601
      }
    },
    testnet: false
  },
  mandala: {
    id: 595n,
    label: 'mandala',
    name: 'Mandala TC9',
    nativeCurrency: {
      name: 'Mandala',
      symbol: 'mACA',
      decimals: 18
    },
    providerURL: 'https://eth-rpc-tc9.aca-staging.network',
    blockExplorer: {
      name: 'Mandala Blockscout',
      url: 'https://blockscout.mandala.aca-staging.network',
      apiUrl: 'https://blockscout.mandala.aca-staging.network/api'
    },
    contracts: {},
    testnet: true
  },
  manta: {
    id: 169n,
    label: 'manta',
    name: 'Manta Pacific Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://pacific-rpc.manta.network/http',
    blockExplorer: {
      name: 'Manta Explorer',
      url: 'https://pacific-explorer.manta.network',
      apiUrl: 'https://pacific-explorer.manta.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 332890
      }
    },
    testnet: false
  },
  mantaSepoliaTestnet: {
    id: 3441006n,
    label: 'mantaSepoliaTestnet',
    name: 'Manta Pacific Sepolia Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://pacific-rpc.sepolia-testnet.manta.network/http',
    blockExplorer: {
      name: 'Manta Sepolia Testnet Explorer',
      url: 'https://pacific-explorer.sepolia-testnet.manta.network',
      apiUrl: 'https://pacific-explorer.sepolia-testnet.manta.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xca54918f7B525C8df894668846506767412b53E3',
        blockCreated: 479584
      }
    },
    testnet: true
  },
  mantaTestnet: {
    id: 3441005n,
    label: 'mantaTestnet',
    name: 'Manta Pacific Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://manta-testnet.calderachain.xyz/http',
    blockExplorer: {
      name: 'Manta Testnet Explorer',
      url: 'https://pacific-explorer.testnet.manta.network',
      apiUrl: 'https://pacific-explorer.testnet.manta.network/api'
    },
    contracts: {
      multicall3: {
        address: '0x211B1643b95Fe76f11eD8880EE810ABD9A4cf56C',
        blockCreated: 419915
      }
    },
    testnet: true
  },
  mantle: {
    id: 5000n,
    label: 'mantle',
    name: 'Mantle',
    nativeCurrency: {
      decimals: 18,
      name: 'MNT',
      symbol: 'MNT'
    },
    providerURL: 'https://rpc.mantle.xyz',
    blockExplorer: {
      name: 'Mantle Explorer',
      url: 'https://mantlescan.xyz/',
      apiUrl: 'https://api.mantlescan.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 304717
      }
    },
    testnet: false
  },
  mantleSepoliaTestnet: {
    id: 5003n,
    label: 'mantleSepoliaTestnet',
    name: 'Mantle Sepolia Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'MNT',
      symbol: 'MNT'
    },
    providerURL: 'https://rpc.sepolia.mantle.xyz',
    blockExplorer: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.sepolia.mantle.xyz/',
      apiUrl: 'https://explorer.sepolia.mantle.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 4584012
      }
    },
    testnet: true
  },
  mantleTestnet: {
    id: 5001n,
    label: 'mantleTestnet',
    name: 'Mantle Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'MNT',
      symbol: 'MNT'
    },
    providerURL: 'https://rpc.testnet.mantle.xyz',
    blockExplorer: {
      name: 'Mantle Testnet Explorer',
      url: 'https://explorer.testnet.mantle.xyz',
      apiUrl: 'https://explorer.testnet.mantle.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 561333
      }
    },
    testnet: true
  },
  mapProtocol: {
    id: 22776n,
    label: 'mapProtocol',
    name: 'MAP Protocol',
    nativeCurrency: {
      decimals: 18,
      name: 'MAPO',
      symbol: 'MAPO'
    },
    providerURL: 'https://rpc.maplabs.io',
    blockExplorer: {
      name: 'MAPO Scan',
      url: 'https://maposcan.io'
    },
    contracts: {},
    testnet: false
  },
  matchain: {
    id: 698n,
    label: 'matchain',
    name: 'Matchain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    providerURL: 'https://rpc.matchain.io',
    blockExplorer: {
      name: 'Matchain Scan',
      url: 'https://matchscan.io'
    },
    contracts: {},
    testnet: false
  },
  matchainTestnet: {
    id: 699n,
    label: 'matchainTestnet',
    name: 'Matchain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.matchain.io',
    blockExplorer: {
      name: 'Matchain Scan',
      url: 'https://testnet.matchscan.io'
    },
    contracts: {},
    testnet: true
  },
  mchVerse: {
    id: 29548n,
    label: 'mchVerse',
    name: 'MCH Verse',
    nativeCurrency: {
      name: 'Oasys',
      symbol: 'OAS',
      decimals: 18
    },
    providerURL: 'https://rpc.oasys.mycryptoheroes.net',
    blockExplorer: {
      name: 'MCH Verse Explorer',
      url: 'https://explorer.oasys.mycryptoheroes.net',
      apiUrl: 'https://explorer.oasys.mycryptoheroes.net/api'
    },
    contracts: {},
    testnet: false
  },
  mekong: {
    id: 7078815900n,
    label: 'mekong',
    name: 'Mekong Pectra Devnet',
    nativeCurrency: {
      name: 'eth',
      symbol: 'eth',
      decimals: 18
    },
    providerURL: 'https://rpc.mekong.ethpandaops.io',
    blockExplorer: {
      name: 'Block Explorer',
      url: 'https://explorer.mekong.ethpandaops.io'
    },
    contracts: {},
    testnet: true
  },
  meld: {
    id: 333000333n,
    label: 'meld',
    name: 'Meld',
    nativeCurrency: {
      decimals: 18,
      name: 'Meld',
      symbol: 'MELD'
    },
    providerURL: 'https://rpc-1.meld.com',
    blockExplorer: {
      name: 'MELDscan',
      url: 'https://meldscan.io'
    },
    contracts: {
      multicall3: {
        address: '0x769ee5a8e82c15c1b6e358f62ac8eb6e3abe8dc5',
        blockCreated: 360069
      }
    },
    testnet: false
  },
  merlin: {
    id: 4200n,
    label: 'merlin',
    name: 'Merlin',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://rpc.merlinchain.io',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://scan.merlinchain.io',
      apiUrl: 'https://scan.merlinchain.io/api'
    },
    contracts: {},
    testnet: false
  },
  metachain: {
    id: 571n,
    label: 'metachain',
    name: 'MetaChain Mainnet',
    nativeCurrency: {
      name: 'Metatime Coin',
      symbol: 'MTC',
      decimals: 18
    },
    providerURL: 'https://rpc.metatime.com',
    blockExplorer: {
      name: 'MetaExplorer',
      url: 'https://explorer.metatime.com'
    },
    contracts: {
      multicall3: {
        address: '0x0000000000000000000000000000000000003001',
        blockCreated: 0
      }
    },
    testnet: false
  },
  metachainIstanbul: {
    id: 1453n,
    label: 'metachainIstanbul',
    name: 'MetaChain Istanbul',
    nativeCurrency: {
      name: 'Metatime Coin',
      symbol: 'MTC',
      decimals: 18
    },
    providerURL: 'https://istanbul-rpc.metachain.dev',
    blockExplorer: {
      name: 'MetaExplorer',
      url: 'https://istanbul-explorer.metachain.dev'
    },
    contracts: {
      multicall3: {
        address: '0x0000000000000000000000000000000000003001',
        blockCreated: 0
      }
    },
    testnet: true
  },
  metadium: {
    id: 11n,
    label: 'metadium',
    name: 'Metadium Network',
    nativeCurrency: {
      decimals: 18,
      name: 'META',
      symbol: 'META'
    },
    providerURL: 'https://api.metadium.com/prod',
    blockExplorer: {
      name: 'Metadium Explorer',
      url: 'https://explorer.metadium.com'
    },
    contracts: {},
    testnet: false
  },
  metalL2: {
    id: 1750n,
    label: 'metalL2',
    name: 'Metal L2',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.metall2.com',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://explorer.metall2.com',
      apiUrl: 'https://explorer.metall2.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '1': {
          address: '0x3B1F7aDa0Fcc26B13515af752Dd07fB1CAc11426'
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 0
      },
      portal: {
        '1': {
          address: '0x3F37aBdE2C6b5B2ed6F8045787Df1ED1E3753956'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x6d0f65D59b55B0FEC5d2d15365154DcADC140BF3'
        }
      }
    },
    testnet: false
  },
  meter: {
    id: 82n,
    label: 'meter',
    name: 'Meter',
    nativeCurrency: {
      decimals: 18,
      name: 'MTR',
      symbol: 'MTR'
    },
    providerURL: 'https://rpc.meter.io',
    blockExplorer: {
      name: 'MeterScan',
      url: 'https://scan.meter.io'
    },
    contracts: {},
    testnet: false
  },
  meterTestnet: {
    id: 83n,
    label: 'meterTestnet',
    name: 'Meter Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'MTR',
      symbol: 'MTR'
    },
    providerURL: 'https://rpctest.meter.io',
    blockExplorer: {
      name: 'MeterTestnetScan',
      url: 'https://scan-warringstakes.meter.io'
    },
    contracts: {},
    testnet: false
  },
  metis: {
    id: 1088n,
    label: 'metis',
    name: 'Metis',
    nativeCurrency: {
      decimals: 18,
      name: 'Metis',
      symbol: 'METIS'
    },
    providerURL: 'https://andromeda.metis.io/?owner=1088',
    blockExplorer: {
      name: 'Metis Explorer',
      url: 'https://explorer.metis.io',
      apiUrl: 'https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 2338552
      }
    },
    testnet: false
  },
  metisGoerli: {
    id: 599n,
    label: 'metisGoerli',
    name: 'Metis Goerli',
    nativeCurrency: {
      decimals: 18,
      name: 'Metis Goerli',
      symbol: 'METIS'
    },
    providerURL: 'https://goerli.gateway.metisdevops.link',
    blockExplorer: {
      name: 'Metis Goerli Explorer',
      url: 'https://goerli.explorer.metisdevops.link',
      apiUrl: 'https://goerli.explorer.metisdevops.link/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1006207
      }
    },
    testnet: false
  },
  mev: {
    id: 7518n,
    label: 'mev',
    name: 'MEVerse Chain Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'MEVerse',
      symbol: 'MEV'
    },
    providerURL: 'https://rpc.meversemainnet.io',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://www.meversescan.io'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 86881340
      }
    },
    testnet: false
  },
  mevTestnet: {
    id: 4759n,
    label: 'mevTestnet',
    name: 'MEVerse Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'MEVerse',
      symbol: 'MEV'
    },
    providerURL: 'https://rpc.meversetestnet.io',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://testnet.meversescan.io/'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 64371115
      }
    },
    testnet: true
  },
  mint: {
    id: 185n,
    label: 'mint',
    name: 'Mint Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.mintchain.io',
    blockExplorer: {
      name: 'Mintchain explorer',
      url: 'https://explorer.mintchain.io'
    },
    contracts: {},
    testnet: false
  },
  mintSepoliaTestnet: {
    id: 1686n,
    label: 'mintSepoliaTestnet',
    name: 'Mint Sepolia Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.mintchain.io',
    blockExplorer: {
      name: 'Mintchain Testnet explorer',
      url: 'https://testnet-explorer.mintchain.io'
    },
    contracts: {},
    testnet: true
  },
  mitosisTestnet: {
    id: 124832n,
    label: 'mitosisTestnet',
    name: 'Mitosis Testnet',
    nativeCurrency: {
      name: 'MITO',
      symbol: 'MITO',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.mitosis.org',
    blockExplorer: {
      name: 'Mitosis testnet explorer',
      url: 'https://testnet.mitosiscan.xyz'
    },
    contracts: {},
    testnet: true
  },
  mode: {
    id: 34443n,
    label: 'mode',
    name: 'Mode Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.mode.network',
    blockExplorer: {
      name: 'Modescan',
      url: 'https://modescan.io'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 2465882
      },
      l2OutputOracle: {
        '1': {
          address: '0x4317ba146D4933D889518a3e5E11Fe7a53199b04'
        }
      },
      portal: {
        '1': {
          address: '0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x735aDBbE72226BD52e818E7181953f42E3b0FF21'
        }
      }
    },
    testnet: false
  },
  modeTestnet: {
    id: 919n,
    label: 'modeTestnet',
    name: 'Mode Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.mode.network',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://sepolia.explorer.mode.network',
      apiUrl: 'https://sepolia.explorer.mode.network/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x2634BD65ba27AB63811c74A63118ACb312701Bfa',
          blockCreated: 3778393
        }
      },
      portal: {
        '11155111': {
          address: '0x320e1580effF37E008F1C92700d1eBa47c1B23fD',
          blockCreated: 3778395
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xbC5C679879B2965296756CD959C3C739769995E2',
          blockCreated: 3778392
        }
      },
      multicall3: {
        address: '0xBAba8373113Fb7a68f195deF18732e01aF8eDfCF',
        blockCreated: 3019007
      }
    },
    testnet: true
  },
  moonbaseAlpha: {
    id: 1287n,
    label: 'moonbaseAlpha',
    name: 'Moonbase Alpha',
    nativeCurrency: {
      decimals: 18,
      name: 'DEV',
      symbol: 'DEV'
    },
    providerURL: 'https://rpc.api.moonbase.moonbeam.network',
    blockExplorer: {
      name: 'Moonscan',
      url: 'https://moonbase.moonscan.io',
      apiUrl: 'https://moonbase.moonscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1850686
      }
    },
    testnet: true
  },
  moonbeam: {
    id: 1284n,
    label: 'moonbeam',
    name: 'Moonbeam',
    nativeCurrency: {
      decimals: 18,
      name: 'GLMR',
      symbol: 'GLMR'
    },
    providerURL: 'https://moonbeam.public.blastapi.io',
    blockExplorer: {
      name: 'Moonscan',
      url: 'https://moonscan.io',
      apiUrl: 'https://api-moonbeam.moonscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 609002
      }
    },
    testnet: false
  },
  moonbeamDev: {
    id: 1281n,
    label: 'moonbeamDev',
    name: 'Moonbeam Development Node',
    nativeCurrency: {
      decimals: 18,
      name: 'DEV',
      symbol: 'DEV'
    },
    providerURL: 'http://127.0.0.1:9944',
    blockExplorer: {},
    contracts: {},
    testnet: false
  },
  moonriver: {
    id: 1285n,
    label: 'moonriver',
    name: 'Moonriver',
    nativeCurrency: {
      decimals: 18,
      name: 'MOVR',
      symbol: 'MOVR'
    },
    providerURL: 'https://moonriver.public.blastapi.io',
    blockExplorer: {
      name: 'Moonscan',
      url: 'https://moonriver.moonscan.io',
      apiUrl: 'https://api-moonriver.moonscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1597904
      }
    },
    testnet: false
  },
  morph: {
    id: 2818n,
    label: 'morph',
    name: 'Morph',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.morphl2.io',
    blockExplorer: {
      name: 'Morph Explorer',
      url: 'https://explorer.morphl2.io'
    },
    contracts: {},
    testnet: false
  },
  morphHolesky: {
    id: 2810n,
    label: 'morphHolesky',
    name: 'Morph Holesky',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-quicknode-holesky.morphl2.io',
    blockExplorer: {
      name: 'Morph Holesky Explorer',
      url: 'https://explorer-holesky.morphl2.io',
      apiUrl: 'https://explorer-api-holesky.morphl2.io/api?'
    },
    contracts: {},
    testnet: true
  },
  morphSepolia: {
    id: 2710n,
    label: 'morphSepolia',
    name: 'Morph Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-testnet.morphl2.io',
    blockExplorer: {
      name: 'Morph Testnet Explorer',
      url: 'https://explorer-testnet.morphl2.io',
      apiUrl: 'https://explorer-api-testnet.morphl2.io/api'
    },
    contracts: {},
    testnet: true
  },
  nahmii: {
    id: 5551n,
    label: 'nahmii',
    name: 'Nahmii 2 Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://l2.nahmii.io',
    blockExplorer: {
      name: 'Nahmii 2 Explorer',
      url: 'https://explorer.n2.nahmii.io'
    },
    contracts: {},
    testnet: false
  },
  nautilus: {
    id: 22222n,
    label: 'nautilus',
    name: 'Nautilus Mainnet',
    nativeCurrency: {
      name: 'ZBC',
      symbol: 'ZBC',
      decimals: 9
    },
    providerURL: 'https://api.nautilus.nautchain.xyz',
    blockExplorer: {
      name: 'NautScan',
      url: 'https://nautscan.com'
    },
    contracts: {},
    testnet: false
  },
  near: {
    id: 397n,
    label: 'near',
    name: 'NEAR Protocol',
    nativeCurrency: {
      decimals: 18,
      name: 'NEAR',
      symbol: 'NEAR'
    },
    providerURL: 'https://eth-rpc.mainnet.near.org',
    blockExplorer: {
      name: 'NEAR Explorer',
      url: 'https://eth-explorer.near.org'
    },
    contracts: {},
    testnet: false
  },
  nearTestnet: {
    id: 398n,
    label: 'nearTestnet',
    name: 'NEAR Protocol Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'NEAR',
      symbol: 'NEAR'
    },
    providerURL: 'https://eth-rpc.testnet.near.org',
    blockExplorer: {
      name: 'NEAR Explorer',
      url: 'https://eth-explorer-testnet.near.org'
    },
    contracts: {},
    testnet: true
  },
  neonDevnet: {
    id: 245022926n,
    label: 'neonDevnet',
    name: 'Neon EVM DevNet',
    nativeCurrency: {
      name: 'NEON',
      symbol: 'NEON',
      decimals: 18
    },
    providerURL: 'https://devnet.neonevm.org',
    blockExplorer: {
      name: 'Neonscan',
      url: 'https://devnet.neonscan.org'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 205206112
      }
    },
    testnet: true
  },
  neonMainnet: {
    id: 245022934n,
    label: 'neonMainnet',
    name: 'Neon EVM MainNet',
    nativeCurrency: {
      name: 'NEON',
      symbol: 'NEON',
      decimals: 18
    },
    providerURL: 'https://neon-proxy-mainnet.solana.p2p.org',
    blockExplorer: {
      name: 'Neonscan',
      url: 'https://neonscan.org'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 206545524
      }
    },
    testnet: false
  },
  neoxMainnet: {
    id: 47763n,
    label: 'neoxMainnet',
    name: 'Neo X Mainnet',
    nativeCurrency: {
      name: 'Gas',
      symbol: 'GAS',
      decimals: 18
    },
    providerURL: 'https://mainnet-1.rpc.banelabs.org',
    blockExplorer: {
      name: 'Neo X - Explorer',
      url: 'https://xexplorer.neo.org'
    },
    contracts: {},
    testnet: false
  },
  neoxT4: {
    id: 12227332n,
    label: 'neoxT4',
    name: 'Neo X Testnet T4',
    nativeCurrency: {
      name: 'Gas',
      symbol: 'GAS',
      decimals: 18
    },
    providerURL: 'https://testnet.rpc.banelabs.org/',
    blockExplorer: {
      name: 'neox-scan',
      url: 'https://xt4scan.ngd.network'
    },
    contracts: {},
    testnet: true
  },
  nexi: {
    id: 4242n,
    label: 'nexi',
    name: 'Nexi',
    nativeCurrency: {
      name: 'Nexi',
      symbol: 'NEXI',
      decimals: 18
    },
    providerURL: 'https://rpc.chain.nexi.technology',
    blockExplorer: {
      name: 'NexiScan',
      url: 'https://www.nexiscan.com',
      apiUrl: 'https://www.nexiscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0x0277A46Cc69A57eE3A6C8c158bA874832F718B8E',
        blockCreated: 25770160
      }
    },
    testnet: false
  },
  nexilix: {
    id: 240n,
    label: 'nexilix',
    name: 'Nexilix Smart Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'Nexilix',
      symbol: 'NEXILIX'
    },
    providerURL: 'https://rpcurl.pos.nexilix.com',
    blockExplorer: {
      name: 'NexilixScan',
      url: 'https://scan.nexilix.com'
    },
    contracts: {
      multicall3: {
        address: '0x58381c8e2BF9d0C2C4259cA14BdA9Afe02831244',
        blockCreated: 74448
      }
    },
    testnet: false
  },
  oasisTestnet: {
    id: 4090n,
    label: 'oasisTestnet',
    name: 'Oasis Testnet',
    nativeCurrency: {
      name: 'Fasttoken',
      symbol: 'FTN',
      decimals: 18
    },
    providerURL: 'https://rpc1.oasis.bahamutchain.com',
    blockExplorer: {
      name: 'Ftnscan',
      url: 'https://oasis.ftnscan.com',
      apiUrl: 'https://oasis.ftnscan.com/api'
    },
    contracts: {},
    testnet: true
  },
  oasys: {
    id: 248n,
    label: 'oasys',
    name: 'Oasys',
    nativeCurrency: {
      name: 'Oasys',
      symbol: 'OAS',
      decimals: 18
    },
    providerURL: 'https://rpc.mainnet.oasys.games',
    blockExplorer: {
      name: 'OasysScan',
      url: 'https://scan.oasys.games',
      apiUrl: 'https://scan.oasys.games/api'
    },
    contracts: {},
    testnet: false
  },
  odysseyTestnet: {
    id: 911867n,
    label: 'odysseyTestnet',
    name: 'Odyssey Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://odyssey.ithaca.xyz',
    blockExplorer: {
      name: 'Odyssey Explorer',
      url: 'https://odyssey-explorer.ithaca.xyz',
      apiUrl: 'https://odyssey-explorer.ithaca.xyz/api'
    },
    contracts: {},
    testnet: true
  },
  okc: {
    id: 66n,
    label: 'okc',
    name: 'OKC',
    nativeCurrency: {
      decimals: 18,
      name: 'OKT',
      symbol: 'OKT'
    },
    providerURL: 'https://exchainrpc.okex.org',
    blockExplorer: {
      name: 'oklink',
      url: 'https://www.oklink.com/okc'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 10364792
      }
    },
    testnet: false
  },
  omax: {
    id: 311n,
    label: 'omax',
    name: 'Omax Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OMAX',
      symbol: 'OMAX'
    },
    providerURL: 'https://mainapi.omaxray.com',
    blockExplorer: {
      name: 'Omax Explorer',
      url: 'https://omaxscan.com'
    },
    contracts: {},
    testnet: false
  },
  oneWorld: {
    id: 309075n,
    label: 'oneWorld',
    name: 'One World Chain Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OWCT',
      symbol: 'OWCT'
    },
    providerURL: 'https://mainnet-rpc.oneworldchain.org',
    blockExplorer: {
      name: 'One World Explorer',
      url: 'https://mainnet.oneworldchain.org'
    },
    contracts: {},
    testnet: false
  },
  oortMainnetDev: {
    id: 9700n,
    label: 'oortMainnetDev',
    name: 'OORT MainnetDev',
    nativeCurrency: {
      decimals: 18,
      name: 'OORT',
      symbol: 'OORT'
    },
    providerURL: 'https://dev-rpc.oortech.com',
    blockExplorer: {
      name: 'OORT MainnetDev Explorer',
      url: 'https://dev-scan.oortech.com'
    },
    contracts: {},
    testnet: false
  },
  opBNB: {
    id: 204n,
    label: 'opBNB',
    name: 'opBNB',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    providerURL: 'https://opbnb-mainnet-rpc.bnbchain.org',
    blockExplorer: {
      name: 'opBNB (BSCScan)',
      url: 'https://opbnb.bscscan.com',
      apiUrl: 'https://api-opbnb.bscscan.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 512881
      },
      l2OutputOracle: {
        '56': {
          address: '0x153CAB79f4767E2ff862C94aa49573294B13D169'
        }
      },
      portal: {
        '56': {
          address: '0x1876EA7702C0ad0C6A2ae6036DE7733edfBca519'
        }
      },
      l1StandardBridge: {
        '56': {
          address: '0xF05F0e4362859c3331Cb9395CBC201E3Fa6757Ea'
        }
      }
    },
    testnet: false
  },
  opBNBTestnet: {
    id: 5611n,
    label: 'opBNBTestnet',
    name: 'opBNB Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'tBNB',
      symbol: 'tBNB'
    },
    providerURL: 'https://opbnb-testnet-rpc.bnbchain.org',
    blockExplorer: {
      name: 'opbnbscan',
      url: 'https://testnet.opbnbscan.com'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3705108
      },
      l2OutputOracle: {
        '97': {
          address: '0xFf2394Bb843012562f4349C6632a0EcB92fC8810'
        }
      },
      portal: {
        '97': {
          address: '0x4386C8ABf2009aC0c263462Da568DD9d46e52a31'
        }
      },
      l1StandardBridge: {
        '97': {
          address: '0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840'
        }
      }
    },
    testnet: true
  },
  optimism: {
    id: 10n,
    label: 'optimism',
    name: 'OP Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.optimism.io',
    blockExplorer: {
      name: 'Optimism Explorer',
      url: 'https://optimistic.etherscan.io',
      apiUrl: 'https://api-optimistic.etherscan.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '1': {
          address: '0xe5965Ab5962eDc7477C8520243A95517CD252fA9'
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0xdfe97868233d1aa22e815a266982f2cf17685a27'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 4286263
      },
      portal: {
        '1': {
          address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1'
        }
      }
    },
    testnet: false
  },
  optimismGoerli: {
    id: 420n,
    label: 'optimismGoerli',
    name: 'Optimism Goerli',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://goerli.optimism.io',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli-optimism.etherscan.io',
      apiUrl: 'https://goerli-optimism.etherscan.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '5': {
          address: '0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 49461
      },
      portal: {
        '5': {
          address: '0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383'
        }
      },
      l1StandardBridge: {
        '5': {
          address: '0x636Af16bf2f682dD3109e60102b8E1A089FedAa8'
        }
      }
    },
    testnet: true
  },
  optimismSepolia: {
    id: 11155420n,
    label: 'optimismSepolia',
    name: 'OP Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.optimism.io',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://optimism-sepolia.blockscout.com',
      apiUrl: 'https://optimism-sepolia.blockscout.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '11155111': {
          address: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1'
        }
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1620204
      },
      portal: {
        '11155111': {
          address: '0x16Fc5058F25648194471939df75CF27A2fdC48BC'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1'
        }
      }
    },
    testnet: true
  },
  optopia: {
    id: 62050n,
    label: 'optopia',
    name: 'Optopia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-mainnet.optopia.ai',
    blockExplorer: {
      name: 'Optopia Explorer',
      url: 'https://scan.optopia.ai'
    },
    contracts: {},
    testnet: false
  },
  optopiaTestnet: {
    id: 62049n,
    label: 'optopiaTestnet',
    name: 'Optopia Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-testnet.optopia.ai',
    blockExplorer: {
      name: 'Optopia Explorer',
      url: 'https://scan-testnet.optopia.ai'
    },
    contracts: {},
    testnet: true
  },
  orderly: {
    id: 291n,
    label: 'orderly',
    name: 'Orderly',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.orderly.network',
    blockExplorer: {
      name: 'Orderly Explorer',
      url: 'https://explorer.orderly.network'
    },
    contracts: {},
    testnet: false
  },
  orderlySepolia: {
    id: 4460n,
    label: 'orderlySepolia',
    name: 'Orderly Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://l2-orderly-l2-4460-sepolia-8tc3sd7dvy.t.conduit.xyz',
    blockExplorer: {
      name: 'Orderly Explorer',
      url: 'https://explorerl2new-orderly-l2-4460-sepolia-8tc3sd7dvy.t.conduit.xyz'
    },
    contracts: {},
    testnet: true
  },
  otimDevnet: {
    id: 41144114n,
    label: 'otimDevnet',
    name: 'Otim Devnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'http://devnet.otim.xyz',
    blockExplorer: {},
    contracts: {
      batchInvoker: {
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
      }
    },
    testnet: false
  },
  palm: {
    id: 11297108109n,
    label: 'palm',
    name: 'Palm',
    nativeCurrency: {
      decimals: 18,
      name: 'PALM',
      symbol: 'PALM'
    },
    providerURL: 'https://palm-mainnet.public.blastapi.io',
    blockExplorer: {
      name: 'Chainlens',
      url: 'https://palm.chainlens.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 15429248
      }
    },
    testnet: false
  },
  palmTestnet: {
    id: 11297108099n,
    label: 'palmTestnet',
    name: 'Palm Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'PALM',
      symbol: 'PALM'
    },
    providerURL: 'https://palm-mainnet.public.blastapi.io',
    blockExplorer: {
      name: 'Chainlens',
      url: 'https://palm.chainlens.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 15429248
      }
    },
    testnet: true
  },
  pgn: {
    id: 424n,
    label: 'pgn',
    name: 'PGN',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.publicgoods.network',
    blockExplorer: {
      name: 'PGN Explorer',
      url: 'https://explorer.publicgoods.network',
      apiUrl: 'https://explorer.publicgoods.network/api'
    },
    contracts: {
      l2OutputOracle: {
        '1': {
          address: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c'
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3380209
      },
      portal: {
        '1': {
          address: '0xb26Fd985c5959bBB382BAFdD0b879E149e48116c'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0xD0204B9527C1bA7bD765Fa5CCD9355d38338272b'
        }
      }
    },
    testnet: false
  },
  pgnTestnet: {
    id: 58008n,
    label: 'pgnTestnet',
    name: 'PGN ',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.publicgoods.network',
    blockExplorer: {
      name: 'PGN Testnet Explorer',
      url: 'https://explorer.sepolia.publicgoods.network',
      apiUrl: 'https://explorer.sepolia.publicgoods.network/api'
    },
    contracts: {
      l2OutputOracle: {
        '11155111': {
          address: '0xD5bAc3152ffC25318F848B3DD5dA6C85171BaEEe'
        }
      },
      portal: {
        '11155111': {
          address: '0xF04BdD5353Bb0EFF6CA60CfcC78594278eBfE179'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xFaE6abCAF30D23e233AC7faF747F2fC3a5a6Bfa3'
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3754925
      }
    },
    testnet: true
  },
  phoenix: {
    id: 13381n,
    label: 'phoenix',
    name: 'Phoenix Blockchain',
    nativeCurrency: {
      name: 'Phoenix',
      symbol: 'PHX',
      decimals: 18
    },
    providerURL: 'https://rpc.phoenixplorer.com',
    blockExplorer: {
      name: 'Phoenixplorer',
      url: 'https://phoenixplorer.com',
      apiUrl: 'https://phoenixplorer.com/api'
    },
    contracts: {
      multicall3: {
        address: '0x498cF757a575cFF2c2Ed9f532f56Efa797f86442',
        blockCreated: 5620192
      }
    },
    testnet: false
  },
  planq: {
    id: 7070n,
    label: 'planq',
    name: 'Planq Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'PLQ',
      symbol: 'PLQ'
    },
    providerURL: 'https://evm-rpc.planq.network',
    blockExplorer: {
      name: 'Planq Explorer',
      url: 'https://evm.planq.network'
    },
    contracts: {},
    testnet: false
  },
  playfiAlbireo: {
    id: 1612127n,
    label: 'playfiAlbireo',
    name: 'PlayFi Albireo Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://albireo-rpc.playfi.ai',
    blockExplorer: {
      name: 'PlayFi Albireo Explorer',
      url: 'https://albireo-explorer.playfi.ai'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963'
      }
    },
    testnet: true
  },
  plinga: {
    id: 242n,
    label: 'plinga',
    name: 'Plinga',
    nativeCurrency: {
      name: 'Plinga',
      symbol: 'PLINGA',
      decimals: 18
    },
    providerURL: 'https://rpcurl.mainnet.plgchain.com',
    blockExplorer: {
      name: 'Plgscan',
      url: 'https://www.plgscan.com'
    },
    contracts: {
      multicall3: {
        address: '0x0989576160f2e7092908BB9479631b901060b6e4',
        blockCreated: 204489
      }
    },
    testnet: false
  },
  plume: {
    id: 98865n,
    label: 'plume',
    name: 'Plume Mainnet',
    nativeCurrency: {
      name: 'Plume Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.plumenetwork.xyz',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.plumenetwork.xyz',
      apiUrl: 'https://explorer.plumenetwork.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 48577
      }
    },
    testnet: false
  },
  plumeDevnet: {
    id: 98864n,
    label: 'plumeDevnet',
    name: 'Plume Devnet',
    nativeCurrency: {
      name: 'Plume Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://test-rpc.plumenetwork.xyz',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://test-explorer.plumenetwork.xyz',
      apiUrl: 'https://test-explorer.plumenetwork.xyz/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 481948
      }
    },
    testnet: true
  },
  plumeTestnet: {
    id: 161221135n,
    label: 'plumeTestnet',
    name: 'Plume Testnet',
    nativeCurrency: {
      name: 'Plume Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.plumenetwork.xyz/http',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://testnet-explorer.plumenetwork.xyz',
      apiUrl: 'https://testnet-explorer.plumenetwork.xyz/api'
    },
    contracts: {},
    testnet: true
  },
  polterTestnet: {
    id: 631571n,
    label: 'polterTestnet',
    name: 'Polter Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Polter GHST',
      symbol: 'GHST'
    },
    providerURL: 'https://geist-polter.g.alchemy.com/public',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://polter-testnet.explorer.alchemy.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 11245
      }
    },
    testnet: true
  },
  polygon: {
    id: 137n,
    label: 'polygon',
    name: 'Polygon',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18
    },
    providerURL: 'https://polygon-rpc.com',
    blockExplorer: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
      apiUrl: 'https://api.polygonscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 25770160
      }
    },
    testnet: false
  },
  polygonAmoy: {
    id: 80002n,
    label: 'polygonAmoy',
    name: 'Polygon Amoy',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18
    },
    providerURL: 'https://rpc-amoy.polygon.technology',
    blockExplorer: {
      name: 'PolygonScan',
      url: 'https://amoy.polygonscan.com',
      apiUrl: 'https://api-amoy.polygonscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 3127388
      }
    },
    testnet: true
  },
  polygonMumbai: {
    id: 80001n,
    label: 'polygonMumbai',
    name: 'Polygon Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    providerURL: 'https://rpc.ankr.com/polygon_mumbai',
    blockExplorer: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
      apiUrl: 'https://api-testnet.polygonscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 25770160
      }
    },
    testnet: true
  },
  polygonZkEvm: {
    id: 1101n,
    label: 'polygonZkEvm',
    name: 'Polygon zkEVM',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://zkevm-rpc.com',
    blockExplorer: {
      name: 'PolygonScan',
      url: 'https://zkevm.polygonscan.com',
      apiUrl: 'https://api-zkevm.polygonscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 57746
      }
    },
    testnet: false
  },
  polygonZkEvmCardona: {
    id: 2442n,
    label: 'polygonZkEvmCardona',
    name: 'Polygon zkEVM Cardona',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.cardona.zkevm-rpc.com',
    blockExplorer: {
      name: 'PolygonScan',
      url: 'https://cardona-zkevm.polygonscan.com',
      apiUrl: 'https://cardona-zkevm.polygonscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 114091
      }
    },
    testnet: true
  },
  polygonZkEvmTestnet: {
    id: 1442n,
    label: 'polygonZkEvmTestnet',
    name: 'Polygon zkEVM Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.public.zkevm-test.net',
    blockExplorer: {
      name: 'PolygonScan',
      url: 'https://testnet-zkevm.polygonscan.com',
      apiUrl: 'https://testnet-zkevm.polygonscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 525686
      }
    },
    testnet: true
  },
  premiumBlockTestnet: {
    id: 23023n,
    label: 'premiumBlockTestnet',
    name: 'PremiumBlock Testnet',
    nativeCurrency: {
      name: 'Premium Block',
      symbol: 'PBLK',
      decimals: 18
    },
    providerURL: 'https://rpc.premiumblock.org',
    blockExplorer: {
      name: 'PremiumBlocks Explorer',
      url: 'https://scan.premiumblock.org'
    },
    contracts: {},
    testnet: true
  },
  pulsechain: {
    id: 369n,
    label: 'pulsechain',
    name: 'PulseChain',
    nativeCurrency: {
      name: 'Pulse',
      symbol: 'PLS',
      decimals: 18
    },
    providerURL: 'https://rpc.pulsechain.com',
    blockExplorer: {
      name: 'PulseScan',
      url: 'https://scan.pulsechain.com',
      apiUrl: 'https://api.scan.pulsechain.com/api'
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14353601
      }
    },
    testnet: false
  },
  pulsechainV4: {
    id: 943n,
    label: 'pulsechainV4',
    name: 'PulseChain V4',
    nativeCurrency: {
      name: 'V4 Pulse',
      symbol: 'v4PLS',
      decimals: 18
    },
    providerURL: 'https://rpc.v4.testnet.pulsechain.com',
    blockExplorer: {
      name: 'PulseScan',
      url: 'https://scan.v4.testnet.pulsechain.com',
      apiUrl: 'https://scan.v4.testnet.pulsechain.com/api'
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14353601
      }
    },
    testnet: true
  },
  qMainnet: {
    id: 35441n,
    label: 'qMainnet',
    name: 'Q Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Q',
      symbol: 'Q'
    },
    providerURL: 'https://rpc.q.org',
    blockExplorer: {
      name: 'Q Mainnet Explorer',
      url: 'https://explorer.q.org',
      apiUrl: 'https://explorer.q.org/api'
    },
    contracts: {},
    testnet: false
  },
  qTestnet: {
    id: 35443n,
    label: 'qTestnet',
    name: 'Q Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Q',
      symbol: 'Q'
    },
    providerURL: 'https://rpc.qtestnet.org',
    blockExplorer: {
      name: 'Q Testnet Explorer',
      url: 'https://explorer.qtestnet.org',
      apiUrl: 'https://explorer.qtestnet.org/api'
    },
    contracts: {},
    testnet: true
  },
  ql1: {
    id: 766n,
    label: 'ql1',
    name: 'QL1',
    nativeCurrency: {
      decimals: 18,
      name: 'QOM',
      symbol: 'QOM'
    },
    providerURL: 'https://rpc.qom.one',
    blockExplorer: {
      name: 'Ql1 Explorer',
      url: 'https://scan.qom.one'
    },
    contracts: {
      multicall3: {
        address: '0x7A52370716ea730585884F5BDB0f6E60C39b8C64'
      }
    },
    testnet: false
  },
  real: {
    id: 111188n,
    label: 'real',
    name: 're.al',
    nativeCurrency: {
      name: 'reETH',
      decimals: 18,
      symbol: 'reETH'
    },
    providerURL: 'https://real.drpc.org',
    blockExplorer: {
      name: 're.al Explorer',
      url: 'https://explorer.re.al',
      apiUrl: 'https://explorer.re.al/api/v2'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 695
      }
    },
    testnet: false
  },
  redbellyMainnet: {
    id: 151n,
    label: 'redbellyMainnet',
    name: 'Redbelly Network Mainnet',
    nativeCurrency: {
      name: 'Redbelly Native Coin',
      symbol: 'RBNT',
      decimals: 18
    },
    providerURL: 'https://governors.mainnet.redbelly.network',
    blockExplorer: {
      name: 'Routescan',
      url: 'https://redbelly.routescan.io',
      apiUrl: 'https://api.routescan.io/v2/network/mainnet/evm/151/etherscan/api'
    },
    contracts: {},
    testnet: false
  },
  redbellyTestnet: {
    id: 153n,
    label: 'redbellyTestnet',
    name: 'Redbelly Network Testnet',
    nativeCurrency: {
      name: 'Redbelly Native Coin',
      symbol: 'RBNT',
      decimals: 18
    },
    providerURL: 'https://governors.testnet.redbelly.network',
    blockExplorer: {
      name: 'Routescan',
      url: 'https://redbelly.testnet.routescan.io',
      apiUrl: 'https://api.routescan.io/v2/network/testnet/evm/153_2/etherscan/api'
    },
    contracts: {},
    testnet: true
  },
  reddioSepolia: {
    id: 50341n,
    label: 'reddioSepolia',
    name: 'Reddio Sepolia',
    nativeCurrency: {
      name: 'Reddio',
      symbol: 'RED',
      decimals: 18
    },
    providerURL: 'https://reddio-dev.reddio.com',
    blockExplorer: {
      name: 'Reddioscan',
      url: 'https://reddio-devnet.l2scan.co',
      apiUrl: 'https://reddio-devnet.l2scan.co/api'
    },
    contracts: {},
    testnet: true
  },
  redstone: {
    id: 690n,
    label: 'redstone',
    name: 'Redstone',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.redstonechain.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.redstone.xyz'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '1': {
          address: '0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae',
          blockCreated: 19578329
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0xa426A052f657AEEefc298b3B5c35a470e4739d69',
          blockCreated: 19578337
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0xc473ca7E02af24c129c2eEf51F2aDf0411c1Df69',
          blockCreated: 19578331
        }
      }
    },
    testnet: false
  },
  rei: {
    id: 47805n,
    label: 'rei',
    name: 'REI Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'REI',
      symbol: 'REI'
    },
    providerURL: 'https://rpc.rei.network',
    blockExplorer: {
      name: 'REI Scan',
      url: 'https://scan.rei.network'
    },
    contracts: {},
    testnet: false
  },
  reyaNetwork: {
    id: 1729n,
    label: 'reyaNetwork',
    name: 'Reya Network',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.reya.network',
    blockExplorer: {
      name: 'Reya Network Explorer',
      url: 'https://explorer.reya.network'
    },
    contracts: {},
    testnet: false
  },
  rivalz: {
    id: 753n,
    label: 'rivalz',
    name: 'Rivalz',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rivalz.calderachain.xyz/http',
    blockExplorer: {
      name: 'Rivalz Caldera Explorer',
      url: 'https://rivalz.calderaexplorer.xyz'
    },
    contracts: {},
    testnet: false
  },
  rollux: {
    id: 570n,
    label: 'rollux',
    name: 'Rollux Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Syscoin',
      symbol: 'SYS'
    },
    providerURL: 'https://rpc.rollux.com',
    blockExplorer: {
      name: 'RolluxExplorer',
      url: 'https://explorer.rollux.com',
      apiUrl: 'https://explorer.rollux.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 119222
      }
    },
    testnet: false
  },
  rolluxTestnet: {
    id: 57000n,
    label: 'rolluxTestnet',
    name: 'Rollux Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Syscoin',
      symbol: 'SYS'
    },
    providerURL: 'https://rpc-tanenbaum.rollux.com/',
    blockExplorer: {
      name: 'RolluxTestnetExplorer',
      url: 'https://rollux.tanenbaum.io',
      apiUrl: 'https://rollux.tanenbaum.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1813675
      }
    },
    testnet: false
  },
  ronin: {
    id: 2020n,
    label: 'ronin',
    name: 'Ronin',
    nativeCurrency: {
      name: 'RON',
      symbol: 'RON',
      decimals: 18
    },
    providerURL: 'https://api.roninchain.com/rpc',
    blockExplorer: {
      name: 'Ronin Explorer',
      url: 'https://app.roninchain.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 26023535
      }
    },
    testnet: false
  },
  root: {
    id: 7668n,
    label: 'root',
    name: 'The Root Network',
    nativeCurrency: {
      decimals: 18,
      name: 'XRP',
      symbol: 'XRP'
    },
    providerURL: 'https://root.rootnet.live/archive',
    blockExplorer: {
      name: 'Rootscan',
      url: 'https://rootscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xc9C2E2429AeC354916c476B30d729deDdC94988d',
        blockCreated: 9218338
      }
    },
    testnet: false
  },
  rootPorcini: {
    id: 7672n,
    label: 'rootPorcini',
    name: 'The Root Network - Porcini',
    nativeCurrency: {
      decimals: 18,
      name: 'XRP',
      symbol: 'XRP'
    },
    providerURL: 'https://porcini.rootnet.app/archive',
    blockExplorer: {
      name: 'Rootscan',
      url: 'https://porcini.rootscan.io'
    },
    contracts: {
      multicall3: {
        address: '0xc9C2E2429AeC354916c476B30d729deDdC94988d',
        blockCreated: 10555692
      }
    },
    testnet: true
  },
  rootstock: {
    id: 30n,
    label: 'rootstock',
    name: 'Rootstock Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Rootstock Bitcoin',
      symbol: 'RBTC'
    },
    providerURL: 'https://public-node.rsk.co',
    blockExplorer: {
      name: 'RSK Explorer',
      url: 'https://explorer.rsk.co'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 4249540
      }
    },
    testnet: false
  },
  rootstockTestnet: {
    id: 31n,
    label: 'rootstockTestnet',
    name: 'Rootstock Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Rootstock Bitcoin',
      symbol: 'tRBTC'
    },
    providerURL: 'https://public-node.testnet.rsk.co',
    blockExplorer: {
      name: 'RSK Explorer',
      url: 'https://explorer.testnet.rootstock.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 2771150
      }
    },
    testnet: true
  },
  rss3: {
    id: 12553n,
    label: 'rss3',
    name: 'RSS3 VSL Mainnet',
    nativeCurrency: {
      name: 'RSS3',
      symbol: 'RSS3',
      decimals: 18
    },
    providerURL: 'https://rpc.rss3.io',
    blockExplorer: {
      name: 'RSS3 VSL Mainnet Scan',
      url: 'https://scan.rss3.io',
      apiUrl: 'https://scan.rss3.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '1': {
          address: '0xE6f24d2C32B3109B18ed33cF08eFb490b1e09C10'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14193
      },
      portal: {
        '1': {
          address: '0x6A12432491bbbE8d3babf75F759766774C778Db4',
          blockCreated: 19387057
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x4cbab69108Aa72151EDa5A3c164eA86845f18438'
        }
      }
    },
    testnet: false
  },
  rss3Sepolia: {
    id: 2331n,
    label: 'rss3Sepolia',
    name: 'RSS3 VSL Sepolia Testnet',
    nativeCurrency: {
      name: 'RSS3',
      symbol: 'RSS3',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.rss3.io',
    blockExplorer: {
      name: 'RSS3 VSL Sepolia Testnet Scan',
      url: 'https://scan.testnet.rss3.io',
      apiUrl: 'https://scan.testnet.rss3.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '11155111': {
          address: '0xDb5c46C3Eaa6Ed6aE8b2379785DF7dd029C0dC81'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 55697
      },
      portal: {
        '11155111': {
          address: '0xcBD77E8E1E7F06B25baDe67142cdE82652Da7b57',
          blockCreated: 5345035
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xdDD29bb63B0839FB1cE0eE439Ff027738595D07B'
        }
      }
    },
    testnet: true
  },
  saakuru: {
    id: 7225878n,
    label: 'saakuru',
    name: 'Saakuru Mainnet',
    nativeCurrency: {
      name: 'OAS',
      symbol: 'OAS',
      decimals: 18
    },
    providerURL: 'https://rpc.saakuru.network',
    blockExplorer: {
      name: 'Saakuru Explorer',
      url: 'https://explorer.saakuru.network'
    },
    contracts: {},
    testnet: false
  },
  saga: {
    id: 5464n,
    label: 'saga',
    name: 'Saga',
    nativeCurrency: {
      decimals: 18,
      name: 'gas',
      symbol: 'GAS'
    },
    providerURL: 'http://sagaevm-5464-1.jsonrpc.sagarpc.io',
    blockExplorer: {
      name: 'Saga Explorer',
      url: 'https://sagaevm-5464-1.sagaexplorer.io'
    },
    contracts: {
      multicall3: {
        address: '0x864DDc9B50B9A0dF676d826c9B9EDe9F8913a160',
        blockCreated: 467530
      }
    },
    testnet: false
  },
  saigon: {
    id: 2021n,
    label: 'saigon',
    name: 'Saigon Testnet',
    nativeCurrency: {
      name: 'RON',
      symbol: 'RON',
      decimals: 18
    },
    providerURL: 'https://saigon-testnet.roninchain.com/rpc',
    blockExplorer: {
      name: 'Saigon Explorer',
      url: 'https://saigon-app.roninchain.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 18736871
      }
    },
    testnet: true
  },
  sanko: {
    id: 1996n,
    label: 'sanko',
    name: 'Sanko',
    nativeCurrency: {
      name: 'DMT',
      symbol: 'DMT',
      decimals: 18
    },
    providerURL: 'https://mainnet.sanko.xyz',
    blockExplorer: {
      name: 'Sanko Explorer',
      url: 'https://explorer.sanko.xyz'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 37
      }
    },
    testnet: false
  },
  sapphire: {
    id: 23294n,
    label: 'sapphire',
    name: 'Oasis Sapphire',
    nativeCurrency: {
      name: 'Sapphire Rose',
      symbol: 'ROSE',
      decimals: 18
    },
    providerURL: 'https://sapphire.oasis.io',
    blockExplorer: {
      name: 'Oasis Explorer',
      url: 'https://explorer.oasis.io/mainnet/sapphire'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 734531
      }
    },
    testnet: false
  },
  sapphireTestnet: {
    id: 23295n,
    label: 'sapphireTestnet',
    name: 'Oasis Sapphire Testnet',
    nativeCurrency: {
      name: 'Sapphire Test Rose',
      symbol: 'TEST',
      decimals: 18
    },
    providerURL: 'https://testnet.sapphire.oasis.dev',
    blockExplorer: {
      name: 'Oasis Explorer',
      url: 'https://explorer.oasis.io/testnet/sapphire'
    },
    contracts: {},
    testnet: true
  },
  satoshiVM: {
    id: 3109n,
    label: 'satoshiVM',
    name: 'SatoshiVM Alpha Mainnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://alpha-rpc-node-http.svmscan.io',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://svmscan.io',
      apiUrl: 'https://svmscan.io/api'
    },
    contracts: {},
    testnet: false
  },
  satoshiVMTestnet: {
    id: 3110n,
    label: 'satoshiVMTestnet',
    name: 'SatoshiVM Testnet',
    nativeCurrency: {
      name: 'BTC',
      symbol: 'BTC',
      decimals: 18
    },
    providerURL: 'https://test-rpc-node-http.svmscan.io',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://testnet.svmscan.io',
      apiUrl: 'https://testnet.svmscan.io/api'
    },
    contracts: {},
    testnet: true
  },
  scroll: {
    id: 534352n,
    label: 'scroll',
    name: 'Scroll',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.scroll.io',
    blockExplorer: {
      name: 'Scrollscan',
      url: 'https://scrollscan.com',
      apiUrl: 'https://api.scrollscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14
      }
    },
    testnet: false
  },
  scrollSepolia: {
    id: 534351n,
    label: 'scrollSepolia',
    name: 'Scroll Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia-rpc.scroll.io',
    blockExplorer: {
      name: 'Scrollscan',
      url: 'https://sepolia.scrollscan.com',
      apiUrl: 'https://api-sepolia.scrollscan.com/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 9473
      }
    },
    testnet: true
  },
  sei: {
    id: 1329n,
    label: 'sei',
    name: 'Sei Network',
    nativeCurrency: {
      name: 'Sei',
      symbol: 'SEI',
      decimals: 18
    },
    providerURL: 'https://evm-rpc.sei-apis.com/',
    blockExplorer: {
      name: 'Seitrace',
      url: 'https://seitrace.com',
      apiUrl: 'https://seitrace.com/pacific-1/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11'
      }
    },
    testnet: false
  },
  seiDevnet: {
    id: 713715n,
    label: 'seiDevnet',
    name: 'Sei Devnet',
    nativeCurrency: {
      name: 'Sei',
      symbol: 'SEI',
      decimals: 18
    },
    providerURL: 'https://evm-rpc-arctic-1.sei-apis.com',
    blockExplorer: {
      name: 'Seitrace',
      url: 'https://seitrace.com'
    },
    contracts: {},
    testnet: true
  },
  seiTestnet: {
    id: 1328n,
    label: 'seiTestnet',
    name: 'Sei Testnet',
    nativeCurrency: {
      name: 'Sei',
      symbol: 'SEI',
      decimals: 18
    },
    providerURL: 'https://evm-rpc-testnet.sei-apis.com',
    blockExplorer: {
      name: 'Seitrace',
      url: 'https://seitrace.com'
    },
    contracts: {},
    testnet: true
  },
  sepolia: {
    id: 11155111n,
    label: 'sepolia',
    name: 'Sepolia',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.drpc.org',
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
      }
    },
    testnet: true
  },
  shape: {
    id: 360n,
    label: 'shape',
    name: 'Shape',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.shape.network',
    blockExplorer: {
      name: 'shapescan',
      url: 'https://shapescan.xyz',
      apiUrl: 'https://shapescan.xyz/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '1': {
          address: '0x6Ef8c69CfE4635d866e3E02732068022c06e724D',
          blockCreated: 20369940
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1
      },
      portal: {
        '1': {
          address: '0xEB06fFa16011B5628BaB98E29776361c83741dd3',
          blockCreated: 20369933
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x62Edd5f4930Ea92dCa3fB81689bDD9b9d076b57B',
          blockCreated: 20369935
        }
      }
    },
    testnet: false
  },
  shapeSepolia: {
    id: 11011n,
    label: 'shapeSepolia',
    name: 'Shape Sepolia Testnet',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.shape.network',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://explorer-sepolia.shape.network/',
      apiUrl: 'https://explorer-sepolia.shape.network/api/v2'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 1
      }
    },
    testnet: true
  },
  shardeumSphinx: {
    id: 8082n,
    label: 'shardeumSphinx',
    name: 'Shardeum Sphinx',
    nativeCurrency: {
      name: 'SHARDEUM',
      symbol: 'SHM',
      decimals: 18
    },
    providerURL: 'https://sphinx.shardeum.org',
    blockExplorer: {
      name: 'Shardeum Explorer',
      url: 'https://explorer-sphinx.shardeum.org'
    },
    contracts: {},
    testnet: true
  },
  shibarium: {
    id: 109n,
    label: 'shibarium',
    name: 'Shibarium',
    nativeCurrency: {
      name: 'Bone',
      symbol: 'BONE',
      decimals: 18
    },
    providerURL: 'https://rpc.shibrpc.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://shibariumscan.io'
    },
    contracts: {
      multicall3: {
        address: '0x864Bf681ADD6052395188A89101A1B37d3B4C961',
        blockCreated: 265900
      }
    },
    testnet: false
  },
  shibariumTestnet: {
    id: 157n,
    label: 'shibariumTestnet',
    name: 'Puppynet Shibarium',
    nativeCurrency: {
      decimals: 18,
      name: 'Bone',
      symbol: 'BONE'
    },
    providerURL: 'https://puppynet.shibrpc.com',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://puppyscan.shib.io',
      apiUrl: 'https://puppyscan.shib.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xA4029b74FBA366c926eDFA7Dd10B21C621170a4c',
        blockCreated: 3035769
      }
    },
    testnet: true
  },
  shiden: {
    id: 336n,
    label: 'shiden',
    name: 'Shiden',
    nativeCurrency: {
      decimals: 18,
      name: 'SDN',
      symbol: 'SDN'
    },
    providerURL: 'https://shiden.public.blastapi.io',
    blockExplorer: {
      name: 'Shiden Scan',
      url: 'https://shiden.subscan.io'
    },
    contracts: {},
    testnet: false
  },
  shimmer: {
    id: 148n,
    label: 'shimmer',
    name: 'Shimmer',
    nativeCurrency: {
      decimals: 18,
      name: 'Shimmer',
      symbol: 'SMR'
    },
    providerURL: 'https://json-rpc.evm.shimmer.network',
    blockExplorer: {
      name: 'Shimmer Network Explorer',
      url: 'https://explorer.evm.shimmer.network',
      apiUrl: 'https://explorer.evm.shimmer.network/api'
    },
    contracts: {},
    testnet: false
  },
  shimmerTestnet: {
    id: 1073n,
    label: 'shimmerTestnet',
    name: 'Shimmer Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Shimmer',
      symbol: 'SMR'
    },
    providerURL: 'https://json-rpc.evm.testnet.shimmer.network',
    blockExplorer: {
      name: 'Shimmer Network Explorer',
      url: 'https://explorer.evm.testnet.shimmer.network',
      apiUrl: 'https://explorer.evm.testnet.shimmer.network/api'
    },
    contracts: {},
    testnet: true
  },
  silicon: {
    id: 2355n,
    label: 'silicon',
    name: 'Silicon zkEVM',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.silicon.network',
    blockExplorer: {
      name: 'SiliconScope',
      url: 'https://scope.silicon.network'
    },
    contracts: {},
    testnet: false
  },
  siliconSepolia: {
    id: 1722641160n,
    label: 'siliconSepolia',
    name: 'Silicon Sepolia zkEVM',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc-sepolia.silicon.network',
    blockExplorer: {
      name: 'SiliconSepoliaScope',
      url: 'https://scope-sepolia.silicon.network'
    },
    contracts: {},
    testnet: true
  },
  sixProtocol: {
    id: 98n,
    label: 'sixProtocol',
    name: 'Six Protocol',
    nativeCurrency: {
      decimals: 18,
      name: 'SIX',
      symbol: 'SIX'
    },
    providerURL: 'https://sixnet-rpc-evm.sixprotocol.net',
    blockExplorer: {
      name: 'Six Protocol Scan',
      url: 'https://sixscan.io/sixnet'
    },
    contracts: {},
    testnet: false
  },
  skaleBlockBrawlers: {
    id: 391845894n,
    label: 'skaleBlockBrawlers',
    name: 'SKALE | Block Brawlers',
    nativeCurrency: {
      name: 'BRAWL',
      symbol: 'BRAWL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/frayed-decent-antares',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://frayed-decent-antares.explorer.mainnet.skalenodes.com'
    },
    contracts: {},
    testnet: false
  },
  skaleCalypso: {
    id: 1564830818n,
    label: 'skaleCalypso',
    name: 'SKALE | Calypso NFT Hub',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3107626
      }
    },
    testnet: false
  },
  skaleCalypsoTestnet: {
    id: 974399131n,
    label: 'skaleCalypsoTestnet',
    name: 'SKALE Calypso Testnet',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://testnet.skalenodes.com/v1/giant-half-dual-testnet',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://giant-half-dual-testnet.explorer.testnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 103220
      }
    },
    testnet: true
  },
  skaleCryptoBlades: {
    id: 1026062157n,
    label: 'skaleCryptoBlades',
    name: 'SKALE | CryptoBlades',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com'
    },
    contracts: {},
    testnet: false
  },
  skaleCryptoColosseum: {
    id: 1032942172n,
    label: 'skaleCryptoColosseum',
    name: 'SKALE | Crypto Colosseum',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/haunting-devoted-deneb',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com'
    },
    contracts: {},
    testnet: false
  },
  skaleEuropa: {
    id: 2046399126n,
    label: 'skaleEuropa',
    name: 'SKALE | Europa Liquidity Hub',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/elated-tan-skat',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://elated-tan-skat.explorer.mainnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 3113495
      }
    },
    testnet: false
  },
  skaleEuropaTestnet: {
    id: 1444673419n,
    label: 'skaleEuropaTestnet',
    name: 'SKALE Europa Testnet',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://testnet.skalenodes.com/v1/juicy-low-small-testnet',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://juicy-low-small-testnet.explorer.testnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 110858
      }
    },
    testnet: true
  },
  skaleExorde: {
    id: 2139927552n,
    label: 'skaleExorde',
    name: 'SKALE | Exorde',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/light-vast-diphda',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://light-vast-diphda.explorer.mainnet.skalenodes.com'
    },
    contracts: {},
    testnet: false
  },
  skaleHumanProtocol: {
    id: 1273227453n,
    label: 'skaleHumanProtocol',
    name: 'SKALE | Human Protocol',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/wan-red-ain',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://wan-red-ain.explorer.mainnet.skalenodes.com'
    },
    contracts: {},
    testnet: false
  },
  skaleNebula: {
    id: 1482601649n,
    label: 'skaleNebula',
    name: 'SKALE | Nebula Gaming Hub',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/green-giddy-denebola',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://green-giddy-denebola.explorer.mainnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 2372986
      }
    },
    testnet: false
  },
  skaleNebulaTestnet: {
    id: 37084624n,
    label: 'skaleNebulaTestnet',
    name: 'SKALE Nebula Testnet',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 105141
      }
    },
    testnet: true
  },
  skaleRazor: {
    id: 278611351n,
    label: 'skaleRazor',
    name: 'SKALE | Razor Network',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/turbulent-unique-scheat',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com'
    },
    contracts: {},
    testnet: false
  },
  skaleTitan: {
    id: 1350216234n,
    label: 'skaleTitan',
    name: 'SKALE | Titan Community Hub',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://mainnet.skalenodes.com/v1/parallel-stormy-spica',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://parallel-stormy-spica.explorer.mainnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 2076458
      }
    },
    testnet: false
  },
  skaleTitanTestnet: {
    id: 1020352220n,
    label: 'skaleTitanTestnet',
    name: 'SKALE Titan Hub',
    nativeCurrency: {
      name: 'sFUEL',
      symbol: 'sFUEL',
      decimals: 18
    },
    providerURL: 'https://testnet.skalenodes.com/v1/aware-fake-trim-testnet',
    blockExplorer: {
      name: 'SKALE Explorer',
      url: 'https://aware-fake-trim-testnet.explorer.testnet.skalenodes.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 104072
      }
    },
    testnet: true
  },
  sketchpad: {
    id: 984123n,
    label: 'sketchpad',
    name: 'Forma Sketchpad',
    nativeCurrency: {
      symbol: 'TIA',
      name: 'TIA',
      decimals: 18
    },
    providerURL: 'https://rpc.sketchpad-1.forma.art',
    blockExplorer: {
      name: 'Sketchpad Explorer',
      url: 'https://explorer.sketchpad-1.forma.art'
    },
    contracts: {},
    testnet: true
  },
  snax: {
    id: 2192n,
    label: 'snax',
    name: 'SnaxChain',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.snaxchain.io',
    blockExplorer: {
      name: 'Snax Explorer',
      url: 'https://explorer.snaxchain.io',
      apiUrl: 'https://explorer.snaxchain.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '1': {
          address: '0x472562Fcf26D6b2793f8E0b0fB660ba0E5e08A46'
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0x2172e492Fc807F5d5645D0E3543f139ECF539294'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '1': {
          address: '0x79f446D024d74D0Bb6E699C131c703463c5D65E9'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x6534Bdb6b5c060d3e6aa833433333135eFE8E0aA'
        }
      }
    },
    testnet: false
  },
  snaxTestnet: {
    id: 13001n,
    label: 'snaxTestnet',
    name: 'SnaxChain Testnet',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://testnet.snaxchain.io',
    blockExplorer: {
      name: 'Snax Explorer',
      url: 'https://testnet-explorer.snaxchain.io',
      apiUrl: 'https://testnet-explorer.snaxchain.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '11155111': {
          address: '0x206a75d89d45F146C54020F132FF93bEDD09f55E'
        }
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x60e3A368a4cdCEf85ffB964e372726F56A46221e'
        }
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11'
      },
      portal: {
        '11155111': {
          address: '0xb5afdd0E8dDF081Ef90e8A3e0c7b5798e66E954E'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xbd37E1a59D4C00C9A46F75018dffd84061bC5f74'
        }
      }
    },
    testnet: true
  },
  soneium: {
    id: 1868n,
    label: 'soneium',
    name: 'Soneium Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.soneium.org',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://soneium.blockscout.com',
      apiUrl: 'https://soneium.blockscout.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '1': {
          address: '0x512a3d2c7a43bd9261d2b8e8c9c70d4bd4d503c0'
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0x0000000000000000000000000000000000000000'
        }
      },
      portal: {
        '1': {
          address: '0x88e529a6ccd302c948689cd5156c83d4614fae92',
          blockCreated: 7061266
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0xeb9bf100225c214efc3e7c651ebbadcf85177607',
          blockCreated: 7061266
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1
      }
    },
    testnet: false
  },
  soneiumMinato: {
    id: 1946n,
    label: 'soneiumMinato',
    name: 'Soneium Minato Testnet',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.minato.soneium.org',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://soneium-minato.blockscout.com',
      apiUrl: 'https://soneium-minato.blockscout.com/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '11155111': {
          address: '0xB3Ad2c38E6e0640d7ce6aA952AB3A60E81bf7a01'
        }
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x710e5286C746eC38beeB7538d0146f60D27be343'
        }
      },
      portal: {
        '11155111': {
          address: '0x65ea1489741A5D72fFdD8e6485B216bBdcC15Af3',
          blockCreated: 6466136
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0x5f5a404A5edabcDD80DB05E8e54A78c9EBF000C2',
          blockCreated: 6466136
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1
      }
    },
    testnet: true
  },
  songbird: {
    id: 19n,
    label: 'songbird',
    name: 'Songbird Canary-Network',
    nativeCurrency: {
      decimals: 18,
      name: 'Songbird',
      symbol: 'SGB'
    },
    providerURL: 'https://songbird-api.flare.network/ext/C/rpc',
    blockExplorer: {
      name: 'Songbird Explorer',
      url: 'https://songbird-explorer.flare.network',
      apiUrl: 'https://songbird-explorer.flare.network/api'
    },
    contracts: {},
    testnet: false
  },
  songbirdTestnet: {
    id: 16n,
    label: 'songbirdTestnet',
    name: 'Songbird Testnet Coston',
    nativeCurrency: {
      decimals: 18,
      name: 'Coston Flare',
      symbol: 'CFLR'
    },
    providerURL: 'https://coston-api.flare.network/ext/C/rpc',
    blockExplorer: {
      name: 'Coston Explorer',
      url: 'https://coston-explorer.flare.network',
      apiUrl: 'https://coston-explorer.flare.network/api'
    },
    contracts: {},
    testnet: true
  },
  sonic: {
    id: 146n,
    label: 'sonic',
    name: 'Sonic',
    nativeCurrency: {
      decimals: 18,
      name: 'Sonic',
      symbol: 'S'
    },
    providerURL: 'https://rpc.soniclabs.com',
    blockExplorer: {
      name: 'Sonic Explorer',
      url: 'https://sonicscan.org/'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 60
      }
    },
    testnet: false
  },
  sonicTestnet: {
    id: 64165n,
    label: 'sonicTestnet',
    name: 'Sonic Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Sonic',
      symbol: 'S'
    },
    providerURL: 'https://rpc.testnet.soniclabs.com',
    blockExplorer: {
      name: 'Sonic Testnet Explorer',
      url: 'https://testnet.soniclabs.com/'
    },
    contracts: {},
    testnet: true
  },
  sophon: {
    id: 50104n,
    label: 'sophon',
    name: 'Sophon',
    nativeCurrency: {
      decimals: 18,
      name: 'Sophon',
      symbol: 'SOPH'
    },
    providerURL: 'https://rpc.sophon.xyz',
    blockExplorer: {
      name: 'Sophon Block Explorer',
      url: 'https://explorer.sophon.xyz'
    },
    contracts: {
      multicall3: {
        address: '0x5f4867441d2416cA88B1b3fd38f21811680CD2C8',
        blockCreated: 116
      }
    },
    testnet: false
  },
  sophonTestnet: {
    id: 531050104n,
    label: 'sophonTestnet',
    name: 'Sophon Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Sophon',
      symbol: 'SOPH'
    },
    providerURL: 'https://rpc.testnet.sophon.xyz',
    blockExplorer: {
      name: 'Sophon Block Explorer',
      url: 'https://explorer.testnet.sophon.xyz'
    },
    contracts: {
      multicall3: {
        address: '0x83c04d112adedA2C6D9037bb6ecb42E7f0b108Af',
        blockCreated: 15642
      }
    },
    testnet: true
  },
  spicy: {
    id: 88882n,
    label: 'spicy',
    name: 'Chiliz Spicy Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CHZ',
      symbol: 'CHZ'
    },
    providerURL: 'https://spicy-rpc.chiliz.com',
    blockExplorer: {
      name: 'Chiliz Explorer',
      url: 'http://spicy-explorer.chiliz.com',
      apiUrl: 'http://spicy-explorer.chiliz.com/api'
    },
    contracts: {},
    testnet: true
  },
  step: {
    id: 1234n,
    label: 'step',
    name: 'Step Network',
    nativeCurrency: {
      name: 'FITFI',
      symbol: 'FITFI',
      decimals: 18
    },
    providerURL: 'https://rpc.step.network',
    blockExplorer: {
      name: 'Step Scan',
      url: 'https://stepscan.io'
    },
    contracts: {},
    testnet: false
  },
  storyOdyssey: {
    id: 1516n,
    label: 'storyOdyssey',
    name: 'Story Odyssey',
    nativeCurrency: {
      decimals: 18,
      name: 'IP',
      symbol: 'IP'
    },
    providerURL: 'https://rpc.odyssey.storyrpc.io',
    blockExplorer: {
      name: 'Story Odyssey Explorer',
      url: 'https://odyssey.storyscan.xyz'
    },
    contracts: {},
    testnet: true
  },
  storyTestnet: {
    id: 1513n,
    label: 'storyTestnet',
    name: 'Story Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'IP',
      symbol: 'IP'
    },
    providerURL: 'https://testnet.storyrpc.io',
    blockExplorer: {
      name: 'Story Testnet Explorer',
      url: 'https://testnet.storyscan.xyz'
    },
    contracts: {},
    testnet: true
  },
  stratis: {
    id: 105105n,
    label: 'stratis',
    name: 'Stratis Mainnet',
    nativeCurrency: {
      name: 'Stratis',
      symbol: 'STRAX',
      decimals: 18
    },
    providerURL: 'https://rpc.stratisevm.com',
    blockExplorer: {
      name: 'Stratis Explorer',
      url: 'https://explorer.stratisevm.com'
    },
    contracts: {},
    testnet: false
  },
  superlumio: {
    id: 8866n,
    label: 'superlumio',
    name: 'SuperLumio',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.lumio.io',
    blockExplorer: {
      name: 'Lumio explorer',
      url: 'https://explorer.lumio.io'
    },
    contracts: {},
    testnet: false
  },
  superposition: {
    id: 55244n,
    label: 'superposition',
    name: 'Superposition',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.superposition.so',
    blockExplorer: {
      name: 'Superposition Explorer',
      url: 'https://explorer.superposition.so'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 39
      }
    },
    testnet: false
  },
  superseed: {
    id: 5330n,
    label: 'superseed',
    name: 'Superseed',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet.superseed.xyz',
    blockExplorer: {
      name: 'Superseed Explorer',
      url: 'https://explorer.superseed.xyz',
      apiUrl: 'https://explorer.superseed.xyz/api/v2'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      disputeGameFactory: {
        '1': {
          address: '0x8b097CF1f9BbD9cbFD0DD561858a1FCbC8857Be0',
          blockCreated: 20737481
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0x693A0F8854F458D282DE3C5b69E8eE5EEE8aA949',
          blockCreated: 20737481
        }
      },
      portal: {
        '1': {
          address: '0x2c2150aa5c75A24fB93d4fD2F2a895D618054f07',
          blockCreated: 20737481
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x8b0576E39F1233679109F9b40cFcC2a7E0901Ede',
          blockCreated: 20737481
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11'
      }
    },
    testnet: false
  },
  superseedSepolia: {
    id: 53302n,
    label: 'superseedSepolia',
    name: 'Superseed Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.superseed.xyz',
    blockExplorer: {
      name: 'Superseed Sepolia Explorer',
      url: 'https://sepolia-explorer.superseed.xyz',
      apiUrl: 'https://sepolia-explorer.superseed.xyz/api/v2'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11'
      },
      portal: {
        '11155111': {
          address: '0x7A0db8C51432d2C3eb4e8f360a2EeB26FF2809fB',
          blockCreated: 5523438
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0x2B227A603fAAdB3De0ED050b63ADD232B5f2c28C',
          blockCreated: 5523442
        }
      }
    },
    testnet: true
  },
  swan: {
    id: 254n,
    label: 'swan',
    name: 'Swan Chain Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://mainnet-rpc.swanchain.org',
    blockExplorer: {
      name: 'Swan Explorer',
      url: 'https://swanscan.io'
    },
    contracts: {},
    testnet: false
  },
  swanProximaTestnet: {
    id: 20241133n,
    label: 'swanProximaTestnet',
    name: 'Swan Proxima Testnet',
    nativeCurrency: {
      name: 'Swan Ether',
      symbol: 'sETH',
      decimals: 18
    },
    providerURL: 'https://rpc-proxima.swanchain.io\t',
    blockExplorer: {
      name: 'Swan Explorer',
      url: 'https://proxima-explorer.swanchain.io'
    },
    contracts: {},
    testnet: true
  },
  swanSaturnTestnet: {
    id: 2024n,
    label: 'swanSaturnTestnet',
    name: 'Swan Saturn Testnet',
    nativeCurrency: {
      name: 'Swan Ether',
      symbol: 'sETH',
      decimals: 18
    },
    providerURL: 'https://saturn-rpc.swanchain.io',
    blockExplorer: {
      name: 'Swan Explorer',
      url: 'https://saturn-explorer.swanchain.io'
    },
    contracts: {},
    testnet: true
  },
  swellchain: {
    id: 1923n,
    label: 'swellchain',
    name: 'Swellchain',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://swell-mainnet.alt.technology',
    blockExplorer: {
      name: 'Swell Explorer',
      url: 'https://explorer.swellnetwork.io',
      apiUrl: 'https://explorer.swellnetwork.io/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1
      }
    },
    testnet: false
  },
  swissdlt: {
    id: 94n,
    label: 'swissdlt',
    name: 'SwissDLT Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BCTS',
      symbol: 'BCTS'
    },
    providerURL: 'https://rpc.swissdlt.ch',
    blockExplorer: {
      name: 'SwissDLT Explorer',
      url: 'https://explorer.swissdlt.ch'
    },
    contracts: {},
    testnet: false
  },
  syscoin: {
    id: 57n,
    label: 'syscoin',
    name: 'Syscoin Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Syscoin',
      symbol: 'SYS'
    },
    providerURL: 'https://rpc.syscoin.org',
    blockExplorer: {
      name: 'SyscoinExplorer',
      url: 'https://explorer.syscoin.org',
      apiUrl: 'https://explorer.syscoin.org/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 287139
      }
    },
    testnet: false
  },
  syscoinTestnet: {
    id: 5700n,
    label: 'syscoinTestnet',
    name: 'Syscoin Tanenbaum Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Syscoin',
      symbol: 'SYS'
    },
    providerURL: 'https://rpc.tanenbaum.io',
    blockExplorer: {
      name: 'SyscoinTestnetExplorer',
      url: 'https://tanenbaum.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 271288
      }
    },
    testnet: false
  },
  taiko: {
    id: 167000n,
    label: 'taiko',
    name: 'Taiko Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.mainnet.taiko.xyz',
    blockExplorer: {
      name: 'Taikoscan',
      url: 'https://taikoscan.io',
      apiUrl: 'https://api.taikoscan.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xcb2436774C3e191c85056d248EF4260ce5f27A9D'
      }
    },
    testnet: false
  },
  taikoHekla: {
    id: 167009n,
    label: 'taikoHekla',
    name: 'Taiko Hekla L2',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.hekla.taiko.xyz',
    blockExplorer: {
      name: 'Taikoscan',
      url: 'https://hekla.taikoscan.network'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 59757
      }
    },
    testnet: true
  },
  taikoJolnir: {
    id: 167007n,
    label: 'taikoJolnir',
    name: 'Taiko Jolnir (Alpha-5 Testnet)',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.jolnir.taiko.xyz',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://explorer.jolnir.taiko.xyz'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 732706
      }
    },
    testnet: true
  },
  taikoKatla: {
    id: 167008n,
    label: 'taikoKatla',
    name: 'Taiko Katla (Alpha-6 Testnet)',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.katla.taiko.xyz',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://explorer.katla.taiko.xyz'
    },
    contracts: {},
    testnet: false
  },
  taikoTestnetSepolia: {
    id: 167005n,
    label: 'taikoTestnetSepolia',
    name: 'Taiko (Alpha-3 Testnet)',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://rpc.test.taiko.xyz',
    blockExplorer: {
      name: 'blockscout',
      url: 'https://explorer.test.taiko.xyz'
    },
    contracts: {},
    testnet: false
  },
  taraxa: {
    id: 841n,
    label: 'taraxa',
    name: 'Taraxa Mainnet',
    nativeCurrency: {
      name: 'Tara',
      symbol: 'TARA',
      decimals: 18
    },
    providerURL: 'https://rpc.mainnet.taraxa.io',
    blockExplorer: {
      name: 'Taraxa Explorer',
      url: 'https://explorer.mainnet.taraxa.io'
    },
    contracts: {},
    testnet: false
  },
  taraxaTestnet: {
    id: 842n,
    label: 'taraxaTestnet',
    name: 'Taraxa Testnet',
    nativeCurrency: {
      name: 'Tara',
      symbol: 'TARA',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.taraxa.io',
    blockExplorer: {
      name: 'Taraxa Explorer',
      url: 'https://explorer.testnet.taraxa.io'
    },
    contracts: {},
    testnet: true
  },
  telcoinTestnet: {
    id: 2017n,
    label: 'telcoinTestnet',
    name: 'Telcoin Adiri Testnet',
    nativeCurrency: {
      name: 'Telcoin',
      symbol: 'TEL',
      decimals: 18
    },
    providerURL: 'https://rpc.telcoin.network',
    blockExplorer: {
      name: 'telscan',
      url: 'https://telscan.io'
    },
    contracts: {},
    testnet: true
  },
  telos: {
    id: 40n,
    label: 'telos',
    name: 'Telos',
    nativeCurrency: {
      decimals: 18,
      name: 'Telos',
      symbol: 'TLOS'
    },
    providerURL: 'https://mainnet.telos.net/evm',
    blockExplorer: {
      name: 'Teloscan',
      url: 'https://www.teloscan.io/'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 246530709
      }
    },
    testnet: false
  },
  telosTestnet: {
    id: 41n,
    label: 'telosTestnet',
    name: 'Telos',
    nativeCurrency: {
      decimals: 18,
      name: 'Telos',
      symbol: 'TLOS'
    },
    providerURL: 'https://testnet.telos.net/evm',
    blockExplorer: {
      name: 'Teloscan (testnet)',
      url: 'https://testnet.teloscan.io/'
    },
    contracts: {},
    testnet: true
  },
  tenet: {
    id: 1559n,
    label: 'tenet',
    name: 'Tenet',
    nativeCurrency: {
      name: 'TENET',
      symbol: 'TENET',
      decimals: 18
    },
    providerURL: 'https://rpc.tenet.org',
    blockExplorer: {
      name: 'TenetScan Mainnet',
      url: 'https://tenetscan.io',
      apiUrl: 'https://tenetscan.io/api'
    },
    contracts: {},
    testnet: false
  },
  ternoa: {
    id: 752025n,
    label: 'ternoa',
    name: 'Ternoa',
    nativeCurrency: {
      name: 'Capsule Coin',
      symbol: 'CAPS',
      decimals: 18
    },
    providerURL: 'https://rpc-mainnet.zkevm.ternoa.network',
    blockExplorer: {
      name: 'Ternoa Explorer',
      url: 'https://explorer-mainnet.zkevm.ternoa.network'
    },
    contracts: {},
    testnet: false
  },
  thaiChain: {
    id: 7n,
    label: 'thaiChain',
    name: 'ThaiChain',
    nativeCurrency: {
      name: 'TCH',
      symbol: 'TCH',
      decimals: 18
    },
    providerURL: 'https://rpc.thaichain.org',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://exp.thaichain.org',
      apiUrl: 'https://exp.thaichain.org/api'
    },
    contracts: {
      multicall3: {
        address: '0x0DaD6130e832c21719C5CE3bae93454E16A84826',
        blockCreated: 4806386
      }
    },
    testnet: false
  },
  that: {
    id: 8428n,
    label: 'that',
    name: 'THAT Mainnet',
    nativeCurrency: {
      name: 'THAT',
      symbol: 'THAT',
      decimals: 18
    },
    providerURL: 'https://api.thatchain.io/mainnet',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://that.blockscout.com'
    },
    contracts: {},
    testnet: false
  },
  theta: {
    id: 361n,
    label: 'theta',
    name: 'Theta Mainnet',
    nativeCurrency: {
      name: 'TFUEL',
      symbol: 'TFUEL',
      decimals: 18
    },
    providerURL: 'https://eth-rpc-api.thetatoken.org/rpc',
    blockExplorer: {
      name: 'Theta Explorer',
      url: 'https://explorer.thetatoken.org'
    },
    contracts: {},
    testnet: false
  },
  thetaTestnet: {
    id: 365n,
    label: 'thetaTestnet',
    name: 'Theta Testnet',
    nativeCurrency: {
      name: 'TFUEL',
      symbol: 'TFUEL',
      decimals: 18
    },
    providerURL: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
    blockExplorer: {
      name: 'Theta Explorer',
      url: 'https://testnet-explorer.thetatoken.org'
    },
    contracts: {},
    testnet: true
  },
  thunderCore: {
    id: 108n,
    label: 'thunderCore',
    name: 'ThunderCore Mainnet',
    nativeCurrency: {
      name: 'TT',
      symbol: 'TT',
      decimals: 18
    },
    providerURL: 'https://mainnet-rpc.thundercore.com',
    blockExplorer: {
      name: 'ThunderCore Explorer',
      url: 'https://explorer-mainnet.thundercore.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 0
      }
    },
    testnet: false
  },
  thunderTestnet: {
    id: 997n,
    label: 'thunderTestnet',
    name: '5ireChain Thunder Testnet',
    nativeCurrency: {
      name: '5ire Token',
      symbol: '5IRE',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.5ire.network',
    blockExplorer: {
      name: '5ireChain Thunder Explorer',
      url: 'https://testnet.5irescan.io/'
    },
    contracts: {},
    testnet: true
  },
  tiktrixTestnet: {
    id: 62092n,
    label: 'tiktrixTestnet',
    name: 'TikTrix Testnet',
    nativeCurrency: {
      name: 'tTTX',
      symbol: 'tTTX',
      decimals: 18
    },
    providerURL: 'https://tiktrix-rpc.xyz',
    blockExplorer: {
      name: 'TikTrix Testnet Explorer',
      url: 'https://tiktrix.xyz'
    },
    contracts: {},
    testnet: true
  },
  tomb: {
    id: 6969n,
    label: 'tomb',
    name: 'Tomb Mainnet',
    nativeCurrency: {
      name: 'TOMB',
      symbol: 'TOMB',
      decimals: 18
    },
    providerURL: 'https://rpc.tombchain.com',
    blockExplorer: {
      name: 'Tomb Explorer',
      url: 'https://tombscout.com'
    },
    contracts: {},
    testnet: false
  },
  treasure: {
    id: 61166n,
    label: 'treasure',
    name: 'Treasure',
    nativeCurrency: {
      decimals: 18,
      name: 'MAGIC',
      symbol: 'MAGIC'
    },
    providerURL: 'https://rpc.treasure.lol',
    blockExplorer: {
      name: 'Treasure Block Explorer',
      url: 'https://treasurescan.io'
    },
    contracts: {
      multicall3: {
        address: '0x2e29fe39496a56856D8698bD43e1dF4D0CE6266a',
        blockCreated: 101
      }
    },
    testnet: false
  },
  treasureTopaz: {
    id: 978658n,
    label: 'treasureTopaz',
    name: 'Treasure Topaz Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'MAGIC',
      symbol: 'MAGIC'
    },
    providerURL: 'https://rpc.topaz.treasure.lol',
    blockExplorer: {
      name: 'Treasure Topaz Block Explorer',
      url: 'https://topaz.treasurescan.io'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
        blockCreated: 108112
      }
    },
    testnet: true
  },
  tron: {
    id: 728126428n,
    label: 'tron',
    name: 'Tron',
    nativeCurrency: {
      name: 'TRON',
      symbol: 'TRX',
      decimals: 6
    },
    providerURL: 'https://api.trongrid.io/jsonrpc',
    blockExplorer: {
      name: 'Tronscan',
      url: 'https://tronscan.org',
      apiUrl: 'https://apilist.tronscanapi.com/api'
    },
    contracts: {},
    testnet: false
  },
  ubiq: {
    id: 8n,
    label: 'ubiq',
    name: 'Ubiq Mainnet',
    nativeCurrency: {
      name: 'UBQ',
      symbol: 'UBQ',
      decimals: 18
    },
    providerURL: 'https://pyrus2.ubiqscan.io',
    blockExplorer: {
      name: 'Ubiq Scan',
      url: 'https://ubiqscan.io'
    },
    contracts: {},
    testnet: false
  },
  ultra: {
    id: 19991n,
    label: 'ultra',
    name: 'Ultra EVM',
    nativeCurrency: {
      decimals: 18,
      name: 'Ultra Token',
      symbol: 'UOS'
    },
    providerURL: 'https://evm.ultra.eosusa.io',
    blockExplorer: {
      name: 'Ultra EVM Explorer',
      url: 'https://evmexplorer.ultra.io'
    },
    contracts: {},
    testnet: false
  },
  ultraTestnet: {
    id: 18881n,
    label: 'ultraTestnet',
    name: 'Ultra EVM Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ultra Token',
      symbol: 'UOS'
    },
    providerURL: 'https://evm.test.ultra.eosusa.io',
    blockExplorer: {
      name: 'Ultra EVM Testnet Explorer',
      url: 'https://evmexplorer.testnet.ultra.io'
    },
    contracts: {},
    testnet: true
  },
  ultron: {
    id: 1231n,
    label: 'ultron',
    name: 'Ultron Mainnet',
    nativeCurrency: {
      name: 'ULX',
      symbol: 'ULX',
      decimals: 18
    },
    providerURL: 'https://ultron-rpc.net',
    blockExplorer: {
      name: 'Ultron Scan',
      url: 'https://ulxscan.com'
    },
    contracts: {},
    testnet: false
  },
  ultronTestnet: {
    id: 1230n,
    label: 'ultronTestnet',
    name: 'Ultron Testnet',
    nativeCurrency: {
      name: 'ULX',
      symbol: 'ULX',
      decimals: 18
    },
    providerURL: 'https://ultron-dev.io',
    blockExplorer: {
      name: 'Ultron Scan',
      url: 'https://explorer.ultron-dev.io'
    },
    contracts: {},
    testnet: true
  },
  unichainSepolia: {
    id: 1301n,
    label: 'unichainSepolia',
    name: 'Unichain Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.unichain.org',
    blockExplorer: {
      name: 'Uniscan',
      url: 'https://sepolia.uniscan.xyz',
      apiUrl: 'https://api-sepolia.uniscan.xyz/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 0
      },
      portal: {
        '11155111': {
          address: '0x0d83dab629f0e0F9d36c0Cbc89B69a489f0751bD'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xea58fcA6849d79EAd1f26608855c2D6407d54Ce2'
        }
      },
      disputeGameFactory: {
        '11155111': {
          address: '0xeff73e5aa3B9AEC32c659Aa3E00444d20a84394b'
        }
      }
    },
    testnet: true
  },
  unique: {
    id: 8880n,
    label: 'unique',
    name: 'Unique Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'UNQ',
      symbol: 'UNQ'
    },
    providerURL: 'https://rpc.unique.network',
    blockExplorer: {
      name: 'Unique Subscan',
      url: 'https://unique.subscan.io/'
    },
    contracts: {},
    testnet: false
  },
  uniqueOpal: {
    id: 8882n,
    label: 'uniqueOpal',
    name: 'Opal Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OPL',
      symbol: 'OPL'
    },
    providerURL: 'https://rpc-opal.unique.network',
    blockExplorer: {
      name: 'Opal Subscan',
      url: 'https://opal.subscan.io/'
    },
    contracts: {},
    testnet: true
  },
  uniqueQuartz: {
    id: 8881n,
    label: 'uniqueQuartz',
    name: 'Quartz Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'QTZ',
      symbol: 'QTZ'
    },
    providerURL: 'https://rpc-quartz.unique.network',
    blockExplorer: {
      name: 'Quartz Subscan',
      url: 'https://quartz.subscan.io/'
    },
    contracts: {},
    testnet: false
  },
  unreal: {
    id: 18233n,
    label: 'unreal',
    name: 'Unreal',
    nativeCurrency: {
      name: 'reETH',
      decimals: 18,
      symbol: 'reETH'
    },
    providerURL: 'https://rpc.unreal-orbit.gelato.digital',
    blockExplorer: {
      name: 'Unreal Explorer',
      url: 'https://unreal.blockscout.com',
      apiUrl: 'https://unreal.blockscout.com/api/v2'
    },
    contracts: {
      multicall3: {
        address: '0x8b6B0e60D8CD84898Ea8b981065A12F876eA5677',
        blockCreated: 1745
      }
    },
    testnet: true
  },
  vanar: {
    id: 2040n,
    label: 'vanar',
    name: 'Vanar Mainnet',
    nativeCurrency: {
      name: 'VANRY',
      symbol: 'VANRY',
      decimals: 18
    },
    providerURL: 'https://rpc.vanarchain.com',
    blockExplorer: {
      name: 'Vanar Mainnet Explorer',
      url: 'https://explorer.vanarchain.com/'
    },
    contracts: {},
    testnet: false
  },
  vechain: {
    id: 100009n,
    label: 'vechain',
    name: 'Vechain',
    nativeCurrency: {
      name: 'VeChain',
      symbol: 'VET',
      decimals: 18
    },
    providerURL: 'https://mainnet.vechain.org',
    blockExplorer: {
      name: 'Vechain Explorer',
      url: 'https://explore.vechain.org'
    },
    contracts: {},
    testnet: false
  },
  velas: {
    id: 106n,
    label: 'velas',
    name: 'Velas EVM Mainnet',
    nativeCurrency: {
      name: 'VLX',
      symbol: 'VLX',
      decimals: 18
    },
    providerURL: 'https://evmexplorer.velas.com/rpc',
    blockExplorer: {
      name: 'Velas Explorer',
      url: 'https://evmexplorer.velas.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 55883577
      }
    },
    testnet: false
  },
  viction: {
    id: 88n,
    label: 'viction',
    name: 'Viction',
    nativeCurrency: {
      name: 'Viction',
      symbol: 'VIC',
      decimals: 18
    },
    providerURL: 'https://rpc.viction.xyz',
    blockExplorer: {
      name: 'VIC Scan',
      url: 'https://vicscan.xyz'
    },
    contracts: {},
    testnet: false
  },
  victionTestnet: {
    id: 89n,
    label: 'victionTestnet',
    name: 'Viction Testnet',
    nativeCurrency: {
      name: 'Viction',
      symbol: 'VIC',
      decimals: 18
    },
    providerURL: 'https://rpc-testnet.viction.xyz',
    blockExplorer: {
      name: 'VIC Scan',
      url: 'https://testnet.vicscan.xyz'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 12170179
      }
    },
    testnet: true
  },
  vision: {
    id: 888888n,
    label: 'vision',
    name: 'Vision',
    nativeCurrency: {
      name: 'VISION',
      symbol: 'VS',
      decimals: 18
    },
    providerURL: 'https://infragrid.v.network/ethereum/compatible',
    blockExplorer: {
      name: 'Vision Scan',
      url: 'https://visionscan.org'
    },
    contracts: {},
    testnet: false
  },
  visionTestnet: {
    id: 666666n,
    label: 'visionTestnet',
    name: 'Vision Testnet',
    nativeCurrency: {
      name: 'VISION',
      symbol: 'VS',
      decimals: 18
    },
    providerURL: 'https://vpioneer.infragrid.v.network/ethereum/compatible',
    blockExplorer: {
      name: 'Vision Scan',
      url: 'https://visionscan.org/?chain=vpioneer'
    },
    contracts: {},
    testnet: true
  },
  wanchain: {
    id: 888n,
    label: 'wanchain',
    name: 'Wanchain',
    nativeCurrency: {
      name: 'WANCHAIN',
      symbol: 'WAN',
      decimals: 18
    },
    providerURL: 'https://gwan-ssl.wandevs.org:56891',
    blockExplorer: {
      name: 'WanScan',
      url: 'https://wanscan.org'
    },
    contracts: {
      multicall3: {
        address: '0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB',
        blockCreated: 25312390
      }
    },
    testnet: false
  },
  wanchainTestnet: {
    id: 999n,
    label: 'wanchainTestnet',
    name: 'Wanchain Testnet',
    nativeCurrency: {
      name: 'WANCHAIN',
      symbol: 'WANt',
      decimals: 18
    },
    providerURL: 'https://gwan-ssl.wandevs.org:46891',
    blockExplorer: {
      name: 'WanScanTest',
      url: 'https://wanscan.org'
    },
    contracts: {
      multicall3: {
        address: '0x11c89bF4496c39FB80535Ffb4c92715839CC5324',
        blockCreated: 24743448
      }
    },
    testnet: true
  },
  weaveVMAlphanet: {
    id: 9496n,
    label: 'weaveVMAlphanet',
    name: 'WeaveVM Alphanet',
    nativeCurrency: {
      name: 'Testnet WeaveVM',
      symbol: 'tWVM',
      decimals: 18
    },
    providerURL: 'https://testnet-rpc.wvm.dev',
    blockExplorer: {
      name: 'WeaveVM Alphanet Explorer',
      url: 'https://explorer.wvm.dev'
    },
    contracts: {},
    testnet: true
  },
  wemix: {
    id: 1111n,
    label: 'wemix',
    name: 'WEMIX',
    nativeCurrency: {
      name: 'WEMIX',
      symbol: 'WEMIX',
      decimals: 18
    },
    providerURL: 'https://api.wemix.com',
    blockExplorer: {
      name: 'wemixExplorer',
      url: 'https://explorer.wemix.com'
    },
    contracts: {},
    testnet: false
  },
  wemixTestnet: {
    id: 1112n,
    label: 'wemixTestnet',
    name: 'WEMIX Testnet',
    nativeCurrency: {
      name: 'WEMIX',
      symbol: 'tWEMIX',
      decimals: 18
    },
    providerURL: 'https://api.test.wemix.com',
    blockExplorer: {
      name: 'wemixExplorer',
      url: 'https://testnet.wemixscan.com',
      apiUrl: 'https://testnet.wemixscan.com/api'
    },
    contracts: {},
    testnet: true
  },
  worldLand: {
    id: 103n,
    label: 'worldLand',
    name: 'WorldLand Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'WLC',
      symbol: 'WLC'
    },
    providerURL: 'https://seoul.worldland.foundation',
    blockExplorer: {
      name: 'WorldLand Scan',
      url: 'https://scan.worldland.foundation'
    },
    contracts: {},
    testnet: false
  },
  worldchain: {
    id: 480n,
    label: 'worldchain',
    name: 'World Chain',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://worldchain-mainnet.g.alchemy.com/public',
    blockExplorer: {
      name: 'Worldscan',
      url: 'https://worldscan.org',
      apiUrl: 'https://api.worldscan.org/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 0
      },
      disputeGameFactory: {
        '1': {
          address: '0x0E90dCAFBC242D2C861A20Bb20EC8E7182965a52'
        }
      },
      l2OutputOracle: {
        '1': {
          address: '0x19A6d1E9034596196295CF148509796978343c5D'
        }
      },
      portal: {
        '1': {
          address: '0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x470458C91978D2d929704489Ad730DC3E3001113'
        }
      }
    },
    testnet: false
  },
  worldchainSepolia: {
    id: 4801n,
    label: 'worldchainSepolia',
    name: 'World Chain Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://worldchain-sepolia.g.alchemy.com/public',
    blockExplorer: {
      name: 'Worldscan Sepolia',
      url: 'https://sepolia.worldscan.org'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 0
      },
      disputeGameFactory: {
        '11155111': {
          address: '0x8cF97Ee616C986a070F5020d973b456D0120C253'
        }
      },
      l2OutputOracle: {
        '11155111': {
          address: '0xc8886f8BAb6Eaeb215aDB5f1c686BF699248300e'
        }
      },
      portal: {
        '11155111': {
          address: '0xFf6EBa109271fe6d4237EeeD4bAb1dD9A77dD1A4'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0xd7DF54b3989855eb66497301a4aAEc33Dbb3F8DE'
        }
      }
    },
    testnet: true
  },
  x1Testnet: {
    id: 195n,
    label: 'x1Testnet',
    name: 'X1 Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OKB',
      symbol: 'OKB'
    },
    providerURL: 'https://xlayertestrpc.okx.com',
    blockExplorer: {
      name: 'OKLink',
      url: 'https://www.oklink.com/xlayer-test'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 624344
      }
    },
    testnet: true
  },
  xLayer: {
    id: 196n,
    label: 'xLayer',
    name: 'X Layer Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OKB',
      symbol: 'OKB'
    },
    providerURL: 'https://rpc.xlayer.tech',
    blockExplorer: {
      name: 'OKLink',
      url: 'https://www.oklink.com/xlayer',
      apiUrl: 'https://www.oklink.com/api/v5/explorer/xlayer/api'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 47416
      }
    },
    testnet: false
  },
  xLayerTestnet: {
    id: 195n,
    label: 'xLayerTestnet',
    name: 'X1 Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'OKB',
      symbol: 'OKB'
    },
    providerURL: 'https://xlayertestrpc.okx.com',
    blockExplorer: {
      name: 'OKLink',
      url: 'https://www.oklink.com/xlayer-test'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 624344
      }
    },
    testnet: true
  },
  xai: {
    id: 660279n,
    label: 'xai',
    name: 'Xai Mainnet',
    nativeCurrency: {
      name: 'Xai',
      symbol: 'XAI',
      decimals: 18
    },
    providerURL: 'https://xai-chain.net/rpc',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://explorer.xai-chain.net'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 222549
      }
    },
    testnet: false
  },
  xaiTestnet: {
    id: 37714555429n,
    label: 'xaiTestnet',
    name: 'Xai Testnet',
    nativeCurrency: {
      name: 'sXai',
      symbol: 'sXAI',
      decimals: 18
    },
    providerURL: 'https://testnet-v2.xai-chain.net/rpc',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://testnet-explorer-v2.xai-chain.net'
    },
    contracts: {},
    testnet: true
  },
  xdc: {
    id: 50n,
    label: 'xdc',
    name: 'XinFin Network',
    nativeCurrency: {
      decimals: 18,
      name: 'XDC',
      symbol: 'XDC'
    },
    providerURL: 'https://rpc.xdcrpc.com',
    blockExplorer: {
      name: 'XDCScan',
      url: 'https://xdcscan.com'
    },
    contracts: {
      multicall3: {
        address: '0x0B1795ccA8E4eC4df02346a082df54D437F8D9aF',
        blockCreated: 75884020
      }
    },
    testnet: false
  },
  xdcTestnet: {
    id: 51n,
    label: 'xdcTestnet',
    name: 'Apothem Network',
    nativeCurrency: {
      decimals: 18,
      name: 'TXDC',
      symbol: 'TXDC'
    },
    providerURL: 'https://erpc.apothem.network',
    blockExplorer: {
      name: 'XDCScan',
      url: 'https://testnet.xdcscan.com'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 59765389
      }
    },
    testnet: false
  },
  xrOne: {
    id: 273n,
    label: 'xrOne',
    name: 'XR One',
    nativeCurrency: {
      decimals: 18,
      name: 'XR',
      symbol: 'XR'
    },
    providerURL: 'https://xr-one.calderachain.xyz/http',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://xr-one.calderaexplorer.xyz'
    },
    contracts: {},
    testnet: false
  },
  xrSepolia: {
    id: 2730n,
    label: 'xrSepolia',
    name: 'XR Sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'tXR',
      symbol: 'tXR'
    },
    providerURL: 'https://xr-sepolia-testnet.rpc.caldera.xyz/http',
    blockExplorer: {
      name: 'Blockscout',
      url: 'https://xr-sepolia-testnet.explorer.caldera.xyz'
    },
    contracts: {},
    testnet: true
  },
  yooldoVerse: {
    id: 50005n,
    label: 'yooldoVerse',
    name: 'Yooldo Verse',
    nativeCurrency: {
      name: 'OAS',
      symbol: 'OAS',
      decimals: 18
    },
    providerURL: 'https://rpc.yooldo-verse.xyz',
    blockExplorer: {
      name: 'Yooldo Verse Explorer',
      url: 'https://explorer.yooldo-verse.xyz'
    },
    contracts: {},
    testnet: false
  },
  yooldoVerseTestnet: {
    id: 50006n,
    label: 'yooldoVerseTestnet',
    name: 'Yooldo Verse Testnet',
    nativeCurrency: {
      name: 'OAS',
      symbol: 'OAS',
      decimals: 18
    },
    providerURL: 'https://rpc.testnet.yooldo-verse.xyz',
    blockExplorer: {
      name: 'Yooldo Verse Testnet Explorer',
      url: 'https://explorer.testnet.yooldo-verse.xyz'
    },
    contracts: {},
    testnet: true
  },
  zenchainTestnet: {
    id: 8408n,
    label: 'zenchainTestnet',
    name: 'Zenchain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ZCX',
      symbol: 'ZCX'
    },
    providerURL: 'https://zenchain-testnet.api.onfinality.io/public',
    blockExplorer: {
      name: 'Zentrace',
      url: 'https://zentrace.io'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 230019
      }
    },
    testnet: true
  },
  zeniq: {
    id: 383414847825n,
    label: 'zeniq',
    name: 'Zeniq Mainnet',
    nativeCurrency: {
      name: 'ZENIQ',
      symbol: 'ZENIQ',
      decimals: 18
    },
    providerURL: 'https://api.zeniq.network',
    blockExplorer: {
      name: 'Zeniq Explorer',
      url: 'https://zeniqscan.com'
    },
    contracts: {},
    testnet: false
  },
  zetachain: {
    id: 7000n,
    label: 'zetachain',
    name: 'ZetaChain',
    nativeCurrency: {
      decimals: 18,
      name: 'Zeta',
      symbol: 'ZETA'
    },
    providerURL: 'https://zetachain-evm.blockpi.network/v1/rpc/public',
    blockExplorer: {
      name: 'ZetaScan',
      url: 'https://explorer.zetachain.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 1632781
      }
    },
    testnet: false
  },
  zetachainAthensTestnet: {
    id: 7001n,
    label: 'zetachainAthensTestnet',
    name: 'ZetaChain Athens Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Zeta',
      symbol: 'aZETA'
    },
    providerURL: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
    blockExplorer: {
      name: 'ZetaScan',
      url: 'https://athens.explorer.zetachain.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 2715217
      }
    },
    testnet: true
  },
  zhejiang: {
    id: 1337803n,
    label: 'zhejiang',
    name: 'Zhejiang',
    nativeCurrency: {
      name: 'Zhejiang Ether',
      symbol: 'ZhejETH',
      decimals: 18
    },
    providerURL: 'https://rpc.zhejiang.ethpandaops.io',
    blockExplorer: {
      name: 'Beaconchain',
      url: 'https://zhejiang.beaconcha.in'
    },
    contracts: {},
    testnet: true
  },
  zilliqa: {
    id: 32769n,
    label: 'zilliqa',
    name: 'Zilliqa',
    nativeCurrency: {
      name: 'Zilliqa',
      symbol: 'ZIL',
      decimals: 18
    },
    providerURL: 'https://api.zilliqa.com',
    blockExplorer: {
      name: 'Ethernal',
      url: 'https://evmx.zilliqa.com'
    },
    contracts: {},
    testnet: false
  },
  zilliqaTestnet: {
    id: 33101n,
    label: 'zilliqaTestnet',
    name: 'Zilliqa Testnet',
    nativeCurrency: {
      name: 'Zilliqa',
      symbol: 'ZIL',
      decimals: 18
    },
    providerURL: 'https://dev-api.zilliqa.com',
    blockExplorer: {
      name: 'Ethernal',
      url: 'https://evmx.testnet.zilliqa.com'
    },
    contracts: {},
    testnet: true
  },
  zircuit: {
    id: 48900n,
    label: 'zircuit',
    name: 'Zircuit Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://zircuit1-mainnet.p2pify.com',
    blockExplorer: {
      name: 'Zircuit Explorer',
      url: 'https://explorer.zircuit.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11'
      },
      l2OutputOracle: {
        '1': {
          address: '0x92Ef6Af472b39F1b363da45E35530c24619245A4'
        }
      },
      portal: {
        '1': {
          address: '0x17bfAfA932d2e23Bd9B909Fd5B4D2e2a27043fb1'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x386B76D9cA5F5Fb150B6BFB35CF5379B22B26dd8'
        }
      }
    },
    testnet: false
  },
  zircuitTestnet: {
    id: 48899n,
    label: 'zircuitTestnet',
    name: 'Zircuit Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://zircuit1-testnet.p2pify.com',
    blockExplorer: {
      name: 'Zircuit Testnet Explorer',
      url: 'https://explorer.testnet.zircuit.com'
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 6040287
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x740C2dac453aEf7140809F80b72bf0e647af8148'
        }
      },
      portal: {
        '11155111': {
          address: '0x787f1C8c5924178689E0560a43D848bF8E54b23e'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0x0545c5fe980098C16fcD0eCB5E79753afa6d9af9'
        }
      }
    },
    testnet: true
  },
  zkFair: {
    id: 42766n,
    label: 'zkFair',
    name: 'ZKFair Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'USD Coin',
      symbol: 'USDC'
    },
    providerURL: 'https://rpc.zkfair.io',
    blockExplorer: {
      name: 'zkFair Explorer',
      url: 'https://scan.zkfair.io',
      apiUrl: 'https://scan.zkfair.io/api'
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 6090959
      }
    },
    testnet: false
  },
  zkFairTestnet: {
    id: 43851n,
    label: 'zkFairTestnet',
    name: 'ZKFair Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'USD Coin',
      symbol: 'USDC'
    },
    providerURL: 'https://testnet-rpc.zkfair.io',
    blockExplorer: {
      name: 'zkFair Explorer',
      url: 'https://testnet-scan.zkfair.io'
    },
    contracts: {},
    testnet: true
  },
  zkLinkNova: {
    id: 810180n,
    label: 'zkLinkNova',
    name: 'zkLink Nova',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.zklink.io',
    blockExplorer: {
      name: 'zkLink Nova Block Explorer',
      url: 'https://explorer.zklink.io'
    },
    contracts: {},
    testnet: false
  },
  zkLinkNovaSepoliaTestnet: {
    id: 810181n,
    label: 'zkLinkNovaSepoliaTestnet',
    name: 'zkLink Nova Sepolia Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    providerURL: 'https://sepolia.rpc.zklink.io',
    blockExplorer: {
      name: 'zkLink Nova Block Explorer',
      url: 'https://sepolia.explorer.zklink.io'
    },
    contracts: {},
    testnet: false
  },
  zkSync: {
    id: 324n,
    label: 'zkSync',
    name: 'ZKsync Era',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://mainnet.era.zksync.io',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://era.zksync.network/',
      apiUrl: 'https://api-era.zksync.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963'
      },
      universalSignatureVerifier: {
        address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
        blockCreated: 45659388
      }
    },
    testnet: false
  },
  zkSyncInMemoryNode: {
    id: 260n,
    label: 'zkSyncInMemoryNode',
    name: 'ZKsync InMemory Node',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:8011',
    blockExplorer: {},
    contracts: {},
    testnet: true
  },
  zkSyncLocalNode: {
    id: 270n,
    label: 'zkSyncLocalNode',
    name: 'ZKsync CLI Local Node',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:3050',
    blockExplorer: {},
    contracts: {},
    testnet: true
  },
  zkSyncSepoliaTestnet: {
    id: 300n,
    label: 'zkSyncSepoliaTestnet',
    name: 'ZKsync Sepolia Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.era.zksync.dev',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia-era.zksync.network/',
      apiUrl: 'https://api-sepolia-era.zksync.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963'
      },
      universalSignatureVerifier: {
        address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
        blockCreated: 3855712
      }
    },
    testnet: true
  },
  zksync: {
    id: 324n,
    label: 'zksync',
    name: 'ZKsync Era',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://mainnet.era.zksync.io',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://era.zksync.network/',
      apiUrl: 'https://api-era.zksync.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963'
      },
      universalSignatureVerifier: {
        address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
        blockCreated: 45659388
      }
    },
    testnet: false
  },
  zksyncInMemoryNode: {
    id: 260n,
    label: 'zksyncInMemoryNode',
    name: 'ZKsync InMemory Node',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:8011',
    blockExplorer: {},
    contracts: {},
    testnet: true
  },
  zksyncLocalCustomHyperchain: {
    id: 272n,
    label: 'zksyncLocalCustomHyperchain',
    name: 'ZKsync CLI Local Custom Hyperchain',
    nativeCurrency: {
      name: 'BAT',
      symbol: 'BAT',
      decimals: 18
    },
    providerURL: 'http://localhost:15200',
    blockExplorer: {
      name: 'ZKsync explorer',
      url: 'http://localhost:15005/',
      apiUrl: 'http://localhost:15005/api'
    },
    contracts: {},
    testnet: true
  },
  zksyncLocalHyperchain: {
    id: 270n,
    label: 'zksyncLocalHyperchain',
    name: 'ZKsync CLI Local Hyperchain',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:15100',
    blockExplorer: {
      name: 'ZKsync explorer',
      url: 'http://localhost:15005/',
      apiUrl: 'http://localhost:15005/api'
    },
    contracts: {},
    testnet: true
  },
  zksyncLocalHyperchainL1: {
    id: 9n,
    label: 'zksyncLocalHyperchainL1',
    name: 'ZKsync CLI Local Hyperchain L1',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:15045',
    blockExplorer: {
      name: 'Blockscout',
      url: 'http://localhost:15001/',
      apiUrl: 'http://localhost:15001/api/v2'
    },
    contracts: {},
    testnet: true
  },
  zksyncLocalNode: {
    id: 270n,
    label: 'zksyncLocalNode',
    name: 'ZKsync CLI Local Node',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'http://localhost:3050',
    blockExplorer: {},
    contracts: {},
    testnet: true
  },
  zksyncSepoliaTestnet: {
    id: 300n,
    label: 'zksyncSepoliaTestnet',
    name: 'ZKsync Sepolia Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    providerURL: 'https://sepolia.era.zksync.dev',
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia-era.zksync.network/',
      apiUrl: 'https://api-sepolia-era.zksync.network/api'
    },
    contracts: {
      multicall3: {
        address: '0xF9cda624FBC7e059355ce98a31693d299FACd963'
      },
      universalSignatureVerifier: {
        address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
        blockCreated: 3855712
      }
    },
    testnet: true
  },
  zora: {
    id: 7777777n,
    label: 'zora',
    name: 'Zora',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    providerURL: 'https://rpc.zora.energy',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://explorer.zora.energy',
      apiUrl: 'https://explorer.zora.energy/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '1': {
          address: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c'
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 5882
      },
      portal: {
        '1': {
          address: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054'
        }
      },
      l1StandardBridge: {
        '1': {
          address: '0x3e2Ea9B92B7E48A52296fD261dc26fd995284631'
        }
      }
    },
    testnet: false
  },
  zoraSepolia: {
    id: 999999999n,
    label: 'zoraSepolia',
    name: 'Zora Sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Zora Sepolia',
      symbol: 'ETH'
    },
    providerURL: 'https://sepolia.rpc.zora.energy',
    blockExplorer: {
      name: 'Zora Sepolia Explorer',
      url: 'https://sepolia.explorer.zora.energy/',
      apiUrl: 'https://sepolia.explorer.zora.energy/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      l2OutputOracle: {
        '11155111': {
          address: '0x2615B481Bd3E5A1C0C7Ca3Da1bdc663E8615Ade9'
        }
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 83160
      },
      portal: {
        '11155111': {
          address: '0xeffE2C6cA9Ab797D418f0D91eA60807713f3536f'
        }
      },
      l1StandardBridge: {
        '11155111': {
          address: '0x5376f1D543dcbB5BD416c56C189e4cB7399fCcCB'
        }
      }
    },
    testnet: true
  },
  zoraTestnet: {
    id: 999n,
    label: 'zoraTestnet',
    name: 'Zora Goerli Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Zora Goerli',
      symbol: 'ETH'
    },
    providerURL: 'https://testnet.rpc.zora.energy',
    blockExplorer: {
      name: 'Explorer',
      url: 'https://testnet.explorer.zora.energy',
      apiUrl: 'https://testnet.explorer.zora.energy/api'
    },
    contracts: {
      gasPriceOracle: {
        address: '0x420000000000000000000000000000000000000F'
      },
      l1Block: {
        address: '0x4200000000000000000000000000000000000015'
      },
      l2CrossDomainMessenger: {
        address: '0x4200000000000000000000000000000000000007'
      },
      l2Erc721Bridge: {
        address: '0x4200000000000000000000000000000000000014'
      },
      l2StandardBridge: {
        address: '0x4200000000000000000000000000000000000010'
      },
      l2ToL1MessagePasser: {
        address: '0x4200000000000000000000000000000000000016'
      },
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 189123
      },
      portal: {
        '5': {
          address: '0xDb9F51790365e7dc196e7D072728df39Be958ACe'
        }
      }
    },
    testnet: true
  }
}