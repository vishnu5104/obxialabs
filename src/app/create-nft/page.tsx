'use client';

import React, { useEffect, useState } from 'react';
import type { GranteeSignerClient } from '@burnt-labs/abstraxion-core';
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from '@burnt-labs/abstraxion';
import { Button } from '@burnt-labs/ui';
import type { ExecuteResult } from '@cosmjs/cosmwasm-stargate';

import { CONTRACTS, TOKEN_ID, TREASURY } from '@/lib/constants';

type ExecuteResultOrUndefined = ExecuteResult | string | undefined;

async function write(
  client: GranteeSignerClient | undefined,
  msg: unknown,
  sender: string,
  contract: string
) {
  if (!client) return;
  return client.execute(
    sender,
    contract,
    msg,
    {
      amount: [{ amount: '1', denom: 'uxion' }],
      gas: '500000',
      granter: TREASURY.treasury,
    },
    '',
    []
  );
}

async function init(
  client: GranteeSignerClient | undefined,
  msg: unknown,
  sender: string
) {
  if (!client) return;
  try {
    const res = await client.instantiate(sender, 1596, msg, 'testnftoxt', {
      amount: [{ amount: '1', denom: 'uxion' }],
      gas: '500000',
      granter: TREASURY.treasury,
    });

    const contractAddress = res.contractAddress;
    console.log('Contract Address: before', contractAddress);
    if (contractAddress) {
      console.log('Contract Address:', contractAddress);
      localStorage.setItem(
        'contractAddress',
        JSON.stringify({ contractAddress })
      );
    }

    return res;
  } catch (err) {
    console.error('Error during contract instantiation:', err);
  }
}

async function read(
  client: GranteeSignerClient | undefined,
  msg: unknown,
  contract: string
) {
  if (!client) return;
  return client.queryContractSmart(contract, msg);
}

const Create = () => {
  const { client } = useAbstraxionSigningClient();
  const [ownerOfNFT, setOwnerOfNFT] = useState<string | undefined>();

  const createCollection = async () => {
    const msg = {
      name: 'NFT#5',
      symbol: 'OXM',
      minter: 'xion1kfrtxww2k2sjd0p8rpndjdy34etqvhkmjmvf64rhu0xp4prvcueqdee9mp',
    };

    try {
      await execute('init', msg);
    } catch (err) {
      console.log(err);
    }
  };

  const execute = async (type: 'read' | 'write' | 'init', msg: unknown) => {
    setLoading(true);
    setExecuteResult(undefined);

    try {
      if (type === 'write') {
        const res = await write(client, msg, bech32Address, CONTRACTS.potato);
        setExecuteResult(res);
      }

      if (type === 'read') {
        const res = await read(client, msg, CONTRACTS.contract_address);

        setExecuteResult(res);
      }
    } catch (err) {
      setExecuteResult('there was an error, check logs');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [executeResult, setExecuteResult] =
    useState<ExecuteResultOrUndefined>(undefined);

  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  const [, setShow] = useModal();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting]);

  //   const createNFT = async () => {
  //     console.log('test');
  //     setOwnerOfNFT('Loading...');
  //     const msg = { owner_of: { token_id: TOKEN_ID } };
  //     try {
  //       const res = await read(client, msg, CONTRACTS.contract_address);
  //       console.log('NFT created', res);
  //       setOwnerOfNFT(res['owner']);
  //     } catch (err) {
  //       console.log('nft creation error', err);
  //       setOwnerOfNFT(undefined);
  //     }
  //   };
  const getNFTOwner = async () => {
    setOwnerOfNFT('Loading...');
    const msg = { owner_of: { token_id: TOKEN_ID } };
    try {
      const res = await read(client, msg, CONTRACTS.contract_address);
      console.log('NFT owner', res);
      setOwnerOfNFT(res['owner']);
    } catch (err) {
      console.log(err);
      setOwnerOfNFT(undefined);
    }
  };

  useEffect(() => {
    if (!client) return;
    getNFTOwner();
    // createNFT()
  }, [client, executeResult]);
  return (
    <>
      <div>your account address</div>
      <pre className="w-full overflow-auto p-2 text-wrap">{bech32Address}</pre>
      <div>NFT Current Owner</div>
      <pre>
        {ownerOfNFT || 'Owner undefined'}
        {ownerOfNFT === bech32Address && ` (You! 🫵)`}
      </pre>

      <div>Create NFT</div>
      <button onClick={createCollection}>Click to Create</button>

      <div>Contract Info </div>
      <Button
        disabled={loading || !bech32Address}
        fullWidth
        onClick={() => execute('read', { contract_info: {} })}
        structure="base"
      >
        Read Contract Info
      </Button>

      <div>execution result</div>
      <pre className="w-full overflow-auto p-2 h-60 text-wrap">
        {loading
          ? 'Loading...'
          : JSON.stringify(executeResult, (_, v) =>
              typeof v === 'bigint' ? v.toString() : v
            )}
      </pre>
    </>
  );
};

export default Create;
