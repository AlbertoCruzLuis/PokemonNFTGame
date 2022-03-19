/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface PokemonAttackInterface extends ethers.utils.Interface {
  functions: {
    "attackBoss(uint256,uint256)": FunctionFragment;
    "pokemonGameAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "attackBoss",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pokemonGameAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "attackBoss", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pokemonGameAddress",
    data: BytesLike
  ): Result;

  events: {
    "AttackComplete(uint256,uint256,address,uint256)": EventFragment;
    "BattleComplete(uint8,address,uint256)": EventFragment;
    "LevelUp(uint256,tuple,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AttackComplete"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BattleComplete"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LevelUp"): EventFragment;
}

export type AttackCompleteEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber] & {
    newBossHp: BigNumber;
    newPokemonHp: BigNumber;
    sender: string;
    timestamp: BigNumber;
  }
>;

export type BattleCompleteEvent = TypedEvent<
  [number, string, BigNumber] & {
    status: number;
    sender: string;
    timestamp: BigNumber;
  }
>;

export type LevelUpEvent = TypedEvent<
  [
    BigNumber,
    [BigNumber, BigNumber, BigNumber] & {
      hp: BigNumber;
      maxHp: BigNumber;
      attack: BigNumber;
    },
    string,
    BigNumber
  ] & {
    level: BigNumber;
    stats: [BigNumber, BigNumber, BigNumber] & {
      hp: BigNumber;
      maxHp: BigNumber;
      attack: BigNumber;
    };
    sender: string;
    timestamp: BigNumber;
  }
>;

export class PokemonAttack extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: PokemonAttackInterface;

  functions: {
    attackBoss(
      pokemonIndex: BigNumberish,
      bossId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pokemonGameAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  attackBoss(
    pokemonIndex: BigNumberish,
    bossId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pokemonGameAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    attackBoss(
      pokemonIndex: BigNumberish,
      bossId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    pokemonGameAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AttackComplete(uint256,uint256,address,uint256)"(
      newBossHp?: null,
      newPokemonHp?: null,
      sender?: null,
      timestamp?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, string, BigNumber],
      {
        newBossHp: BigNumber;
        newPokemonHp: BigNumber;
        sender: string;
        timestamp: BigNumber;
      }
    >;

    AttackComplete(
      newBossHp?: null,
      newPokemonHp?: null,
      sender?: null,
      timestamp?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, string, BigNumber],
      {
        newBossHp: BigNumber;
        newPokemonHp: BigNumber;
        sender: string;
        timestamp: BigNumber;
      }
    >;

    "BattleComplete(uint8,address,uint256)"(
      status?: null,
      sender?: null,
      timestamp?: null
    ): TypedEventFilter<
      [number, string, BigNumber],
      { status: number; sender: string; timestamp: BigNumber }
    >;

    BattleComplete(
      status?: null,
      sender?: null,
      timestamp?: null
    ): TypedEventFilter<
      [number, string, BigNumber],
      { status: number; sender: string; timestamp: BigNumber }
    >;

    "LevelUp(uint256,tuple,address,uint256)"(
      level?: null,
      stats?: null,
      sender?: null,
      timestamp?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber] & {
          hp: BigNumber;
          maxHp: BigNumber;
          attack: BigNumber;
        },
        string,
        BigNumber
      ],
      {
        level: BigNumber;
        stats: [BigNumber, BigNumber, BigNumber] & {
          hp: BigNumber;
          maxHp: BigNumber;
          attack: BigNumber;
        };
        sender: string;
        timestamp: BigNumber;
      }
    >;

    LevelUp(
      level?: null,
      stats?: null,
      sender?: null,
      timestamp?: null
    ): TypedEventFilter<
      [
        BigNumber,
        [BigNumber, BigNumber, BigNumber] & {
          hp: BigNumber;
          maxHp: BigNumber;
          attack: BigNumber;
        },
        string,
        BigNumber
      ],
      {
        level: BigNumber;
        stats: [BigNumber, BigNumber, BigNumber] & {
          hp: BigNumber;
          maxHp: BigNumber;
          attack: BigNumber;
        };
        sender: string;
        timestamp: BigNumber;
      }
    >;
  };

  estimateGas: {
    attackBoss(
      pokemonIndex: BigNumberish,
      bossId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pokemonGameAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    attackBoss(
      pokemonIndex: BigNumberish,
      bossId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pokemonGameAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
