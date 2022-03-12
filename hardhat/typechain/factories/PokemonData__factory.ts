/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PokemonData, PokemonDataInterface } from "../PokemonData";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxHp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
        ],
        internalType: "struct LPokemonData.Stats",
        name: "stats_",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attack",
        type: "uint256",
      },
    ],
    name: "changeAttack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "experience",
        type: "uint256",
      },
    ],
    name: "changeExperience",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "hp",
        type: "uint256",
      },
    ],
    name: "changeHp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
    ],
    name: "changeLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxHp",
        type: "uint256",
      },
    ],
    name: "changeMaxHp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxHp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
        ],
        internalType: "struct LPokemonData.Stats",
        name: "stats_",
        type: "tuple",
      },
    ],
    name: "changeStats",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "totalExperience",
        type: "uint256",
      },
    ],
    name: "changeTotalExperience",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxHp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
        ],
        internalType: "struct LPokemonData.Stats",
        name: "stats_",
        type: "tuple",
      },
    ],
    name: "createPokemonData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "data",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct LPokemonData.Info",
        name: "info",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxHp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
        ],
        internalType: "struct LPokemonData.Stats",
        name: "stats",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "experience",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalExperience",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAttack",
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
    name: "getData",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "imageURI",
                type: "string",
              },
            ],
            internalType: "struct LPokemonData.Info",
            name: "info",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "hp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxHp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "attack",
                type: "uint256",
              },
            ],
            internalType: "struct LPokemonData.Stats",
            name: "stats",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "level",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "experience",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalExperience",
            type: "uint256",
          },
        ],
        internalType: "struct LPokemonData.Data",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExperience",
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
    name: "getHp",
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
    name: "getId",
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
    name: "getImageUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct LPokemonData.Info",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLevel",
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
    name: "getMaxHp",
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
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStats",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxHp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
        ],
        internalType: "struct LPokemonData.Stats",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalExperience",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620017e9380380620017e9833981810160405281019062000037919062000297565b6200004b848484846200005560201b60201c565b50505050620004c9565b836000800160000181905550826000800160010190805190602001906200007e929190620000f5565b50816000800160020190805190602001906200009c929190620000f5565b508060000151600060030160000181905550806040015160006003016002018190555080602001516000600301600101819055506001600060060181905550600080600701819055506000806008018190555050505050565b8280546200010390620003d4565b90600052602060002090601f01602090048101928262000127576000855562000173565b82601f106200014257805160ff191683800117855562000173565b8280016001018555821562000173579182015b828111156200017257825182559160200191906001019062000155565b5b50905062000182919062000186565b5090565b5b80821115620001a157600081600090555060010162000187565b5090565b6000620001bc620001b6846200035e565b62000335565b905082815260208101848484011115620001d557600080fd5b620001e28482856200039e565b509392505050565b600082601f830112620001fc57600080fd5b81516200020e848260208601620001a5565b91505092915050565b6000606082840312156200022a57600080fd5b62000236606062000335565b90506000620002488482850162000280565b60008301525060206200025e8482850162000280565b6020830152506040620002748482850162000280565b60408301525092915050565b6000815190506200029181620004af565b92915050565b60008060008060c08587031215620002ae57600080fd5b6000620002be8782880162000280565b945050602085015167ffffffffffffffff811115620002dc57600080fd5b620002ea87828801620001ea565b935050604085015167ffffffffffffffff8111156200030857600080fd5b6200031687828801620001ea565b9250506060620003298782880162000217565b91505092959194509250565b60006200034162000354565b90506200034f82826200040a565b919050565b6000604051905090565b600067ffffffffffffffff8211156200037c576200037b6200046f565b5b62000387826200049e565b9050602081019050919050565b6000819050919050565b60005b83811015620003be578082015181840152602081019050620003a1565b83811115620003ce576000848401525b50505050565b60006002820490506001821680620003ed57607f821691505b6020821081141562000404576200040362000440565b5b50919050565b62000415826200049e565b810181811067ffffffffffffffff821117156200043757620004366200046f565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b620004ba8162000394565b8114620004c657600080fd5b50565b61131080620004d96000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c80638ce802e0116100b8578063c59d48471161007c578063c59d4847146102f6578063cdb986cc14610314578063e2b7673614610332578063ed73fc4b1461034e578063ede641a41461036c578063f6a0e8671461038857610137565b80638ce802e0146102665780639be55e0014610282578063a5985e8c1461029e578063abd708ef146102bc578063c57e4a99146102da57610137565b806346bd9a66116100ff57806346bd9a66146101ce5780635143e01a146101ec5780635a9b0b89146102085780635d1ca6311461022657806373d4a13a1461024457610137565b806306d8652f1461013c5780630b5270a71461015857806317d7de7c14610174578063296f23f9146101925780633bc5de30146101b0575b600080fd5b61015660048036038101906101519190610d38565b6103a6565b005b610172600480360381019061016d9190610d38565b6103b6565b005b61017c6103c3565b604051610189919061102c565b60405180910390f35b61019a61045a565b6040516101a79190611107565b60405180910390f35b6101b8610469565b6040516101c5919061104e565b60405180910390f35b6101d6610615565b6040516101e3919061102c565b60405180910390f35b61020660048036038101906102019190610d38565b6106ac565b005b6102106106bc565b60405161021d9190611070565b60405180910390f35b61022e610806565b60405161023b9190611107565b60405180910390f35b61024c610815565b60405161025d959493929190611092565b60405180910390f35b610280600480360381019061027b9190610d0f565b610999565b005b61029c60048036038101906102979190610d38565b6109cf565b005b6102a66109dc565b6040516102b39190611107565b60405180910390f35b6102c46109e8565b6040516102d19190611107565b60405180910390f35b6102f460048036038101906102ef9190610d61565b6109f7565b005b6102fe610a93565b60405161030b91906110ec565b60405180910390f35b61031c610ace565b6040516103299190611107565b60405180910390f35b61034c60048036038101906103479190610d38565b610ada565b005b610356610aea565b6040516103639190611107565b60405180910390f35b61038660048036038101906103819190610d38565b610af6565b005b610390610b03565b60405161039d9190611107565b60405180910390f35b8060006003016001018190555050565b8060006006018190555050565b60606000800160010180546103d7906111f1565b80601f0160208091040260200160405190810160405280929190818152602001828054610403906111f1565b80156104505780601f1061042557610100808354040283529160200191610450565b820191906000526020600020905b81548152906001019060200180831161043357829003601f168201915b5050505050905090565b60008060030160010154905090565b610471610b12565b60006040518060a001604052908160008201604051806060016040529081600082015481526020016001820180546104a8906111f1565b80601f01602080910402602001604051908101604052809291908181526020018280546104d4906111f1565b80156105215780601f106104f657610100808354040283529160200191610521565b820191906000526020600020905b81548152906001019060200180831161050457829003601f168201915b5050505050815260200160028201805461053a906111f1565b80601f0160208091040260200160405190810160405280929190818152602001828054610566906111f1565b80156105b35780601f10610588576101008083540402835291602001916105b3565b820191906000526020600020905b81548152906001019060200180831161059657829003601f168201915b505050505081525050815260200160038201604051806060016040529081600082015481526020016001820154815260200160028201548152505081526020016006820154815260200160078201548152602001600882015481525050905090565b6060600080016002018054610629906111f1565b80601f0160208091040260200160405190810160405280929190818152602001828054610655906111f1565b80156106a25780601f10610677576101008083540402835291602001916106a2565b820191906000526020600020905b81548152906001019060200180831161068557829003601f168201915b5050505050905090565b8060006003016002018190555050565b6106c4610b4d565b60008001604051806060016040529081600082015481526020016001820180546106ed906111f1565b80601f0160208091040260200160405190810160405280929190818152602001828054610719906111f1565b80156107665780601f1061073b57610100808354040283529160200191610766565b820191906000526020600020905b81548152906001019060200180831161074957829003601f168201915b5050505050815260200160028201805461077f906111f1565b80601f01602080910402602001604051908101604052809291908181526020018280546107ab906111f1565b80156107f85780601f106107cd576101008083540402835291602001916107f8565b820191906000526020600020905b8154815290600101906020018083116107db57829003601f168201915b505050505081525050905090565b60008060000160000154905090565b60008060000160405180606001604052908160008201548152602001600182018054610840906111f1565b80601f016020809104026020016040519081016040528092919081815260200182805461086c906111f1565b80156108b95780601f1061088e576101008083540402835291602001916108b9565b820191906000526020600020905b81548152906001019060200180831161089c57829003601f168201915b505050505081526020016002820180546108d2906111f1565b80601f01602080910402602001604051908101604052809291908181526020018280546108fe906111f1565b801561094b5780601f106109205761010080835404028352916020019161094b565b820191906000526020600020905b81548152906001019060200180831161092e57829003601f168201915b50505050508152505090806003016040518060600160405290816000820154815260200160018201548152602001600282015481525050908060060154908060070154908060080154905085565b80600001516000600301600001819055508060200151600060030160010181905550806040015160006003016002018190555050565b8060006008018190555050565b60008060060154905090565b60008060030160000154905090565b83600080016000018190555082600080016001019080519060200190610a1e929190610b6e565b5081600080016002019080519060200190610a3a929190610b6e565b508060000151600060030160000181905550806040015160006003016002018190555080602001516000600301600101819055506001600060060181905550600080600701819055506000806008018190555050505050565b610a9b610bf4565b60006003016040518060600160405290816000820154815260200160018201548152602001600282015481525050905090565b60008060070154905090565b8060006003016000018190555050565b60008060080154905090565b8060006007018190555050565b60008060030160020154905090565b6040518060a00160405280610b25610b4d565b8152602001610b32610bf4565b81526020016000815260200160008152602001600081525090565b60405180606001604052806000815260200160608152602001606081525090565b828054610b7a906111f1565b90600052602060002090601f016020900481019282610b9c5760008555610be3565b82601f10610bb557805160ff1916838001178555610be3565b82800160010185558215610be3579182015b82811115610be2578251825591602001919060010190610bc7565b5b509050610bf09190610c15565b5090565b60405180606001604052806000815260200160008152602001600081525090565b5b80821115610c2e576000816000905550600101610c16565b5090565b6000610c45610c4084611147565b611122565b905082815260208101848484011115610c5d57600080fd5b610c688482856111af565b509392505050565b600082601f830112610c8157600080fd5b8135610c91848260208601610c32565b91505092915050565b600060608284031215610cac57600080fd5b610cb66060611122565b90506000610cc684828501610cfa565b6000830152506020610cda84828501610cfa565b6020830152506040610cee84828501610cfa565b60408301525092915050565b600081359050610d09816112c3565b92915050565b600060608284031215610d2157600080fd5b6000610d2f84828501610c9a565b91505092915050565b600060208284031215610d4a57600080fd5b6000610d5884828501610cfa565b91505092915050565b60008060008060c08587031215610d7757600080fd5b6000610d8587828801610cfa565b945050602085013567ffffffffffffffff811115610da257600080fd5b610dae87828801610c70565b935050604085013567ffffffffffffffff811115610dcb57600080fd5b610dd787828801610c70565b9250506060610de887828801610c9a565b91505092959194509250565b6000610dff82611178565b610e098185611183565b9350610e198185602086016111be565b610e22816112b2565b840191505092915050565b6000610e3882611178565b610e428185611194565b9350610e528185602086016111be565b610e5b816112b2565b840191505092915050565b600060e0830160008301518482036000860152610e838282610edc565b9150506020830151610e986020860182610f8a565b506040830151610eab608086018261100e565b506060830151610ebe60a086018261100e565b506080830151610ed160c086018261100e565b508091505092915050565b6000606083016000830151610ef4600086018261100e565b5060208301518482036020860152610f0c8282610df4565b91505060408301518482036040860152610f268282610df4565b9150508091505092915050565b6000606083016000830151610f4b600086018261100e565b5060208301518482036020860152610f638282610df4565b91505060408301518482036040860152610f7d8282610df4565b9150508091505092915050565b606082016000820151610fa0600085018261100e565b506020820151610fb3602085018261100e565b506040820151610fc6604085018261100e565b50505050565b606082016000820151610fe2600085018261100e565b506020820151610ff5602085018261100e565b506040820151611008604085018261100e565b50505050565b611017816111a5565b82525050565b611026816111a5565b82525050565b600060208201905081810360008301526110468184610e2d565b905092915050565b600060208201905081810360008301526110688184610e66565b905092915050565b6000602082019050818103600083015261108a8184610f33565b905092915050565b600060e08201905081810360008301526110ac8188610f33565b90506110bb6020830187610fcc565b6110c8608083018661101d565b6110d560a083018561101d565b6110e260c083018461101d565b9695505050505050565b60006060820190506111016000830184610fcc565b92915050565b600060208201905061111c600083018461101d565b92915050565b600061112c61113d565b90506111388282611223565b919050565b6000604051905090565b600067ffffffffffffffff82111561116257611161611283565b5b61116b826112b2565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000819050919050565b82818337600083830152505050565b60005b838110156111dc5780820151818401526020810190506111c1565b838111156111eb576000848401525b50505050565b6000600282049050600182168061120957607f821691505b6020821081141561121d5761121c611254565b5b50919050565b61122c826112b2565b810181811067ffffffffffffffff8211171561124b5761124a611283565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6112cc816111a5565b81146112d757600080fd5b5056fea2646970667358221220d8654f20dfda0d252b4378063cb4a616cbf5ca2a8e3d8461c5d7018628c1e86f64736f6c63430008040033";

export class PokemonData__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    id: BigNumberish,
    name: string,
    imageURI: string,
    stats_: { hp: BigNumberish; maxHp: BigNumberish; attack: BigNumberish },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PokemonData> {
    return super.deploy(
      id,
      name,
      imageURI,
      stats_,
      overrides || {}
    ) as Promise<PokemonData>;
  }
  getDeployTransaction(
    id: BigNumberish,
    name: string,
    imageURI: string,
    stats_: { hp: BigNumberish; maxHp: BigNumberish; attack: BigNumberish },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      id,
      name,
      imageURI,
      stats_,
      overrides || {}
    );
  }
  attach(address: string): PokemonData {
    return super.attach(address) as PokemonData;
  }
  connect(signer: Signer): PokemonData__factory {
    return super.connect(signer) as PokemonData__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PokemonDataInterface {
    return new utils.Interface(_abi) as PokemonDataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PokemonData {
    return new Contract(address, _abi, signerOrProvider) as PokemonData;
  }
}
