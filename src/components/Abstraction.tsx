import React from 'react';
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from '@burnt-labs/abstraxion';
import { Button } from '@burnt-labs/ui';
import { useEffect } from 'react';

const Abstraction = () => {
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();

  const [, setShow] = useModal();

  useEffect(() => {}, [isConnected, isConnecting]);

  return (
    <main className="m-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
        Abstraxion
      </h1>
      <Button
        fullWidth
        onClick={() => {
          setShow(true);
        }}
        structure="base"
      >
        {bech32Address ? (
          <div className="flex items-center justify-center">VIEW ACCOUNT</div>
        ) : (
          'CONNECT'
        )}
      </Button>
      {bech32Address && (
        <div className="border-2 border-primary rounded-md p-4 flex flex-row gap-4">
          <div className="flex flex-row gap-6">
            <div>address</div>
            <div>{bech32Address}</div>
          </div>
        </div>
      )}
      <Abstraxion onClose={() => setShow(false)} />
    </main>
  );
};

export default Abstraction;
