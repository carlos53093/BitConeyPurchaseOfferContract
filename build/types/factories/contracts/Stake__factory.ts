/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Stake, StakeInterface } from "../../contracts/Stake";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_manager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bitConeyAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_BUSD",
        type: "address",
      },
      {
        internalType: "address",
        name: "_USDT",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prizeAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "CreateBlock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "coin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakedTime",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "Invest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "entrance",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "BUSD",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bitConey",
    outputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "blockInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "prizeAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pooledAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_prizeAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "createBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "entranceMulter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "getUserListFromBlock",
    outputs: [
      {
        internalType: "address[]",
        name: "userList",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_coin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "invest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxDepositMulter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPooledAmountMulter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceDecimal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_multer",
        type: "uint256",
      },
    ],
    name: "setEntranceMulter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "setLockTimeforReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_manager",
        type: "address",
      },
    ],
    name: "setManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_multer",
        type: "uint256",
      },
    ],
    name: "setMaxDepositMulter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_multer",
        type: "uint256",
      },
    ],
    name: "setMaxPooledAmountMulter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setMinStakeValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    name: "setPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "setValidTimeforNewBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakeInfo",
    outputs: [
      {
        internalType: "address",
        name: "coin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakedTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "refunded",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
    ],
    name: "widthdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c06040526008600555600a6006556019600755605a60085561012c600a55610e10600b55678ac7230489e80000600c553480156200003d57600080fd5b506040516200191c3803806200191c833981016040819052620000609162000135565b6200006b33620000c8565b6000805460ff60a01b19169055600380546001600160a01b03199081166001600160a01b03978816179091556004805482169587169590951790945560098054909416928516929092179092559082166080521660a052620001a5565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200013057600080fd5b919050565b600080600080600060a086880312156200014e57600080fd5b620001598662000118565b9450620001696020870162000118565b9350620001796040870162000118565b9250620001896060870162000118565b9150620001996080870162000118565b90509295509295909350565b60805160a051611743620001d9600039600081816103a70152610cc20152600081816102590152610cfd01526117436000f3fe608060405234801561001057600080fd5b50600436106101545760003560e01c8063065310791461015957806310e4e0191461016e5780631f10a89a146101815780632fa81a71146101945780633bcd77da146101bd5780634228e2211461022157806345c44a1b14610238578063481c6a7514610241578063484f4ea9146102545780634bcf529d1461027b5780634d9859441461028e5780635c975abb146102a157806361d027b3146102b9578063715018a6146102cc5780637584f914146102d4578063814cbf301461034c578063844ed61d1461035f5780638da5cb5b1461037f578063bc9113f014610387578063bedb86fb1461038f578063c54e44eb146103a2578063d0ebdbe7146103c9578063e0da260c146103dc578063f0f44260146103ef578063f2fde38b14610402578063f58cf3ff14610415578063fe3cde3f1461041e578063fecba3a514610431575b600080fd5b61016c61016736600461137d565b610444565b005b61016c61017c366004611396565b61045d565b61016c61018f36600461137d565b61056f565b6009546101a7906001600160a01b031681565b6040516101b491906113c2565b60405180910390f35b6101f96101cb36600461137d565b6001602081905260009182526040909120805491810154600282015460048301546005909301549192909185565b604080519586526020860194909452928401919091526060830152608082015260a0016101b4565b61022a60055481565b6040519081526020016101b4565b61022a60075481565b6004546101a7906001600160a01b031681565b6101a77f000000000000000000000000000000000000000000000000000000000000000081565b61016c61028936600461137d565b61057c565b61016c61029c36600461137d565b610589565b6102a9610596565b60405190151581526020016101b4565b6003546101a7906001600160a01b031681565b61016c6105a6565b6103206102e23660046113f2565b6002602081815260009384526040808520909152918352912080546001820154928201546003909201546001600160a01b0390911692919060ff1684565b604080516001600160a01b039095168552602085019390935291830152151560608201526080016101b4565b61016c61035a36600461137d565b6105ba565b61037261036d36600461137d565b6105c7565b6040516101b4919061141e565b6101a761068e565b61022a600881565b61016c61039d366004611479565b61069d565b6101a77f000000000000000000000000000000000000000000000000000000000000000081565b61016c6103d736600461149d565b6106be565b61016c6103ea36600461137d565b6106e8565b61016c6103fd36600461149d565b610a36565b61016c61041036600461149d565b610a60565b61022a60085481565b61016c61042c36600461137d565b610ad6565b61016c61043f3660046114b8565b610aef565b61044c610f88565b61045781603c611503565b600b5550565b610465610fe7565b6004546001600160a01b031633146104b25760405162461bcd60e51b815260206004820152600b60248201526a2737ba1036b0b730b3b2b960a91b60448201526064015b60405180910390fd5b600083815260016020526040902054156104ff5760405162461bcd60e51b815260206004820152600e60248201526d616c72656164792065786973747360901b60448201526064016104a9565b60008381526001602081905260409182902085815590810184905542600282018190556004909101839055905184917fe0676b694d0bfe16e5e764f5d05a4da18534efe97b72a21aa785e3e6767b42c19161056291868252602082015260400190565b60405180910390a2505050565b610577610f88565b600755565b610584610f88565b600555565b610591610f88565b600c55565b600054600160a01b900460ff1690565b6105ae610f88565b6105b8600061102f565b565b6105c2610f88565b600855565b6000818152600160205260409020600301546060906001600160401b038111156105f3576105f361151a565b60405190808252806020026020018201604052801561061c578160200160208202803683370190505b50600083815260016020908152604091829020600301805483518184028101840190945280845293945091929083018282801561068257602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610664575b50505050509050919050565b6000546001600160a01b031690565b6106a5610f88565b80156106b6576106b361107f565b50565b6106b36110d9565b6106c6610f88565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b600081815260026020908152604080832033845290915290206003015460ff161561074a5760405162461bcd60e51b8152602060048201526012602482015271185b1c9958591e481dda5d1a191c985dd95960721b60448201526064016104a9565b600b5460008281526002602081815260408084203385529091529091200154429161077491611530565b106107ad5760405162461bcd60e51b81526020600482015260096024820152686e6f7420726561647960b81b60448201526064016104a9565b600081815260026020908152604080832033845290915281206001015490036108025760405162461bcd60e51b81526020600482015260076024820152663737903ab9b2b960c91b60448201526064016104a9565b6000805b60008381526001602052604090206003015481101561087a57600083815260016020526040902060030180543391908390811061084557610845611543565b6000918252602090912001546001600160a01b031603610868576001915061087a565b8061087281611559565b915050610806565b5060018115151461088d5761088d611572565b6006546005546000848152600160208190526040822001549092916108b191611503565b6108bb9190611588565b6000848152600160208190526040822060048101546005909101549394509192906108e7908290611530565b6108f36008600a61168e565b600088815260026020908152604080832033845290915290206001015461091a9190611503565b6109249190611503565b61092e9190611588565b6109389190611588565b6000858152600260209081526040808320338085529252909120600301805460ff191660011790556009549192506001600160a01b03919091169063a9059cbb906109838486611530565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af11580156109ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f2919061169a565b506040805182815260208101849052339186917fb0ecf14e184effded5473bba77dcfab32b094b77ac1fbb36beec2aef55587970910160405180910390a350505050565b610a3e610f88565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b610a68610f88565b6001600160a01b038116610acd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104a9565b6106b38161102f565b610ade610f88565b610ae981603c611503565b600a5550565b610af7610fe7565b60008381526001602052604090205415801590610b2557506000838152600160208190526040909120015415155b8015610b41575060008381526001602052604090206002015415155b610b7b5760405162461bcd60e51b815260206004820152600b60248201526a139bdd081a5b9a5d1a585b60aa1b60448201526064016104a9565b600a546000848152600160205260409020600201544291610b9b91611530565b11610bd45760405162461bcd60e51b815260206004820152600960248201526874696d65206f75742160b81b60448201526064016104a9565b600083815260026020908152604080832033845290915290206001015415610c2e5760405162461bcd60e51b815260206004820152600d60248201526c63616e7420616464206d6f726560981b60448201526064016104a9565b610c388382611115565b610c755760405162461bcd60e51b815260206004820152600e60248201526d1a5b9d985b1a5908185b5bdd5b9d60921b60448201526064016104a9565b610c7f8382611224565b610cc05760405162461bcd60e51b8152602060048201526012602482015271195e18d9595908199d5b1b08185b5bdd5b9d60721b60448201526064016104a9565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316826001600160a01b03161480610d3157507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316826001600160a01b0316145b610d725760405162461bcd60e51b81526020600482015260126024820152713737ba1030bb30b4b630b136329031b7b4b760711b60448201526064016104a9565b600083815260016020818152604083206003810180549384018155845290832090910180546001600160a01b031916331790558482526005018054839290610dbb908490611530565b9091555050600083815260026020818152604080842033808652908352818520600180820188905581546001600160a01b0319166001600160a01b038a81169190911783554292909601919091556009546006546005548b89529583905293909620015494909316936323b872dd9392309291610e389190611503565b610e429190611588565b6040518463ffffffff1660e01b8152600401610e60939291906116b7565b6020604051808303816000875af1158015610e7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea3919061169a565b506003546040516323b872dd60e01b81526001600160a01b03808516926323b872dd92610ed8923392169086906004016116b7565b6020604051808303816000875af1158015610ef7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1b919061169a565b50600083815260026020818152604080842033808652908352938190209092015482516001600160a01b038716815291820185905281830152905185917f7a82030cdcb2e8909ecf6432d973748c3c907ede3a2d61ff7cc5b1c1b8de4287919081900360600190a3505050565b33610f9161068e565b6001600160a01b0316146105b85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104a9565b610fef610596565b156105b85760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104a9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b611087610fe7565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586110c23390565b6040516110cf91906113c2565b60405180910390a1565b6110e1611332565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa336110c2565b600081600c541115801561121b5750600960009054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015611177573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061119b91906116db565b6111a690600a6116fe565b6111b26008600a61168e565b600754600086815260016020819052604090912090810154600490910154606492916111dd91611503565b6111e79190611503565b6111f990670de0b6b3a7640000611503565b6112039190611588565b61120d9190611588565b6112179190611588565b8211155b90505b92915050565b6009546040805163313ce56760e01b815290516000926001600160a01b03169163313ce5679160048083019260209291908290030181865afa15801561126e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061129291906116db565b61129d90600a6116fe565b6112a96008600a61168e565b60085460008681526001602081905260409091206004810154910154606492916112d291611503565b6112dc9190611503565b6112ee90670de0b6b3a7640000611503565b6112f89190611588565b6113029190611588565b61130c9190611588565b600084815260016020526040902060050154611329908490611530565b11159392505050565b61133a610596565b6105b85760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104a9565b60006020828403121561138f57600080fd5b5035919050565b6000806000606084860312156113ab57600080fd5b505081359360208301359350604090920135919050565b6001600160a01b0391909116815260200190565b80356001600160a01b03811681146113ed57600080fd5b919050565b6000806040838503121561140557600080fd5b82359150611415602084016113d6565b90509250929050565b6020808252825182820181905260009190848201906040850190845b8181101561145f5783516001600160a01b03168352928401929184019160010161143a565b50909695505050505050565b80151581146106b357600080fd5b60006020828403121561148b57600080fd5b81356114968161146b565b9392505050565b6000602082840312156114af57600080fd5b61121b826113d6565b6000806000606084860312156114cd57600080fd5b833592506114dd602085016113d6565b9150604084013590509250925092565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761121e5761121e6114ed565b634e487b7160e01b600052604160045260246000fd5b8082018082111561121e5761121e6114ed565b634e487b7160e01b600052603260045260246000fd5b60006001820161156b5761156b6114ed565b5060010190565b634e487b7160e01b600052600160045260246000fd5b6000826115a557634e487b7160e01b600052601260045260246000fd5b500490565b600181815b808511156115e55781600019048211156115cb576115cb6114ed565b808516156115d857918102915b93841c93908002906115af565b509250929050565b6000826115fc5750600161121e565b816116095750600061121e565b816001811461161f576002811461162957611645565b600191505061121e565b60ff84111561163a5761163a6114ed565b50506001821b61121e565b5060208310610133831016604e8410600b8410161715611668575081810a61121e565b61167283836115aa565b8060001904821115611686576116866114ed565b029392505050565b600061121b83836115ed565b6000602082840312156116ac57600080fd5b81516114968161146b565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6000602082840312156116ed57600080fd5b815160ff8116811461149657600080fd5b600061121b60ff8416836115ed56fea2646970667358221220c5eee0940f72d5e415ee7e3e8b4bffb34572a3890fb0859dd15269cf65f9030964736f6c63430008110033";

type StakeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Stake__factory extends ContractFactory {
  constructor(...args: StakeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _treasury: PromiseOrValue<string>,
    _manager: PromiseOrValue<string>,
    _bitConeyAddr: PromiseOrValue<string>,
    _BUSD: PromiseOrValue<string>,
    _USDT: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Stake> {
    return super.deploy(
      _treasury,
      _manager,
      _bitConeyAddr,
      _BUSD,
      _USDT,
      overrides || {}
    ) as Promise<Stake>;
  }
  override getDeployTransaction(
    _treasury: PromiseOrValue<string>,
    _manager: PromiseOrValue<string>,
    _bitConeyAddr: PromiseOrValue<string>,
    _BUSD: PromiseOrValue<string>,
    _USDT: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _treasury,
      _manager,
      _bitConeyAddr,
      _BUSD,
      _USDT,
      overrides || {}
    );
  }
  override attach(address: string): Stake {
    return super.attach(address) as Stake;
  }
  override connect(signer: Signer): Stake__factory {
    return super.connect(signer) as Stake__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeInterface {
    return new utils.Interface(_abi) as StakeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Stake {
    return new Contract(address, _abi, signerOrProvider) as Stake;
  }
}
