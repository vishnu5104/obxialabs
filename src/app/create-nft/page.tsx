'use client';

import React, { useEffect, useState } from 'react';
import type { GranteeSignerClient } from '@burnt-labs/abstraxion-core';
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
  useModal,
} from '@burnt-labs/abstraxion';
import type { ExecuteResult } from '@cosmjs/cosmwasm-stargate';

import { CONTRACTS, TOKEN_ID, TREASURY } from '@/lib/constants';

type ExecuteResultOrUndefined = ExecuteResult | string | undefined;

async function read(
  client: GranteeSignerClient | undefined,
  msg: unknown,
  contract: string
) {
  if (!client) return;
  return client.queryContractSmart(contract, msg);
}

const CreateNFT = () => {
  const { client } = useAbstraxionSigningClient();
  const [ownerOfNFT, setOwnerOfNFT] = useState<string | undefined>();

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
  const getNFTOwner = async () => {
    setOwnerOfNFT('Loading...');
    const msg = { owner_of: { token_id: TOKEN_ID } };
    try {
      const res = await read(client, msg, CONTRACTS.contract_address);
      setOwnerOfNFT(res['owner']);
    } catch (err) {
      console.log(err);
      setOwnerOfNFT(undefined);
    }
  };

  useEffect(() => {
    if (!client) return;
    getNFTOwner();
  }, [client, executeResult]);
  return (
    <>
      <div>NFT Current Owner</div>
      <pre>
        {ownerOfNFT || 'Owner undefined'}
        {ownerOfNFT === bech32Address && ` (You! 🫵)`}
      </pre>
    </>
  );
};

export default CreateNFT;
