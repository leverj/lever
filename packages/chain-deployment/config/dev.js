import {merge} from 'lodash-es'
import {defaults} from './defaults.js'

export default merge(
  defaults,
  {
    chains: [ /*** mainnets ***/
      'acala',
      'ancient8',
      'ancient8Sepolia',
      'anvil',
      'arbitrum',
      'arbitrumNova',
      'areonNetwork',
      'astar',
      'astarZkEVM',
      'aurora',
      'avalanche',
      'b3',
      'bahamut',
      'base',
      'beam',
      'bearNetworkChainMainnet',
      'bevmMainnet',
      'bitTorrent',
      'bitkub',
      'blast',
      'bob',
      'boba',
      'bronos',
      'bsc',
      'bscGreenfield',
      'btr',
      'bxn',
      'canto',
      'celo',
      'chiliz',
      'chips',
      'classic',
      'confluxESpace',
      'coreDao',
      'crab',
      'cronos',
      'cronoszkEVM',
      'crossbell',
      'cyber',
      'darwinia',
      'dchain',
      'dchainTestnet',
      'defichainEvm',
      'degen',
      'dfk',
      'dogechain',
      'dreyerxMainnet',
      'edgeless',
      'edgelessTestnet',
      'edgeware',
      'edgewareTestnet',
      'ekta',
      'eon',
      'eos',
      'etherlink',
      'evmos',
      'evmosTestnet',
      'fantom',
      'fibo',
      'filecoin',
      'flare',
      'flowMainnet',
      'flowPreviewnet',
      'flowTestnet',
      'fluence',
      'forma',
      'foundry',
      'fraxtal',
      'fraxtalTestnet',
      'funkiMainnet',
      'fuse',
      'fuseSparknet',
      'gnosis',
      'gravity',
      'ham',
      'haqqMainnet',
      'haqqTestedge2',
      'harmonyOne',
      'hashkeyTestnet',
      'hedera',
      'immutableZkEvm',
      'inEVM',
      'iota',
      'iotex',
      'jbc',
      'kaia',
      'karura',
      'kava',
      'kcc',
      'klaytn',
      'kroma',
      'l3x',
      'lightlinkPhoenix',
      'linea',
      'lisk',
      'lukso',
      'lycan',
      'lyra',
      'mainnet',
      'manta',
      'mantle',
      'merlin',
      'metachain',
      'metalL2',
      'meter',
      'meterTestnet',
      'metis',
      'metisGoerli',
      'mev',
      'mode',
      'moonbeam',
      'moonbeamDev',
      'moonriver',
      'nautilus',
      'neonMainnet',
      'nexi',
      'nexilix',
      'oasys',
      'okc',
      'oortMainnetDev',
      'opBNB',
      'optimism',
      'otimDevnet',
      'palm',
      'pgn',
      'phoenix',
      'plinga',
      'polygon',
      'polygonZkEvm',
      'pulsechain',
      'qMainnet',
      'real',
      'redstone',
      'reyaNetwork',
      'rollux',
      'rolluxTestnet',
      'ronin',
      'root',
      'rootstock',
      'rss3',
      'sapphire',
      'satoshiVM',
      'scroll',
      'sei',
      'shapeSepolia',
      'shibarium',
      'shimmer',
      'skaleBlockBrawlers',
      'skaleCalypso',
      'skaleCryptoBlades',
      'skaleCryptoColosseum',
      'skaleEuropa',
      'skaleExorde',
      'skaleHumanProtocol',
      'skaleNebula',
      'skaleRazor',
      'skaleTitan',
      'songbird',
      'stratis',
      'syscoin',
      'syscoinTestnet',
      'taiko',
      'taikoKatla',
      'taikoTestnetSepolia',
      'taraxa',
      'telos',
      'tenet',
      'thaiChain',
      'tron',
      'vechain',
      'wanchain',
      'wemix',
      'xLayer',
      'xai',
      'xdc',
      'xdcTestnet',
      'yooldoVerse',
      'zetachain',
      'zilliqa',
      'zircuitTestnet',
      'zkFair',
      'zkLinkNova',
      'zkLinkNovaSepoliaTestnet',
      'zkSync',
      'zksync',
      'zora',
    ]
  },
)
