/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PokemonHelper, PokemonHelperInterface } from "../PokemonHelper";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "level",
        type: "uint256",
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
        indexed: false,
        internalType: "struct LPokemonData.Stats",
        name: "stats",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "LevelUp",
    type: "event",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220c80408e5f1d20b728faee35c74e5ddaff0ce0349e974b57c67d7a75aa11a1dc164736f6c63430008040033";

export class PokemonHelper__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PokemonHelper> {
    return super.deploy(overrides || {}) as Promise<PokemonHelper>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PokemonHelper {
    return super.attach(address) as PokemonHelper;
  }
  connect(signer: Signer): PokemonHelper__factory {
    return super.connect(signer) as PokemonHelper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PokemonHelperInterface {
    return new utils.Interface(_abi) as PokemonHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PokemonHelper {
    return new Contract(address, _abi, signerOrProvider) as PokemonHelper;
  }
}
