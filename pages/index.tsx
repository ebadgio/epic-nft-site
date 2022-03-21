import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount, useConnect, Connector } from 'wagmi';

import { Flex } from 'components/core/Flex';
import { Box } from 'components/core/Box';
import { Button } from 'components/core/Button';
import { H1 } from 'components/core/Heading';
import { Text } from 'components/core/Text';
import { Mint } from 'components/Mint';

const Home: NextPage = () => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [metaMaskConnector, setMetaMaskConnector] = useState<Connector | null>(null);

  useEffect(() => {
    setMetaMaskConnector(data.connectors[0]);
  }, [data]);

  useEffect(() => {
    console.log(window.ethereum);
  }, []);

  // console.log('provider', provider);
  //console.log(window && window.ethereum);
  // console.log(data, error, metaMaskConnector);
  // console.log(accountData);

  return (
    <Flex direction="column" align="center" css={{ paddingTop: "$6", textAlign: "center", width: "100%" }}>
      <Head>
        <title>Epic NFT</title>
        <meta name="description" content="Mint an NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1 css={{ fontSize: "$xl"}}>
        Epic NFT Collection
      </H1>
      <Text css={{ fontSize: "$h2", marginBottom: "$6"}}>
        Each unique. Each beautiful. Discover your NFT today.
      </Text>
      {!accountData ? 
        <Button 
          color="rainbow" 
          borderRadius="rounded"
          disabled={!metaMaskConnector?.ready}
          onClick={() => metaMaskConnector && connect(metaMaskConnector)}
        >
          Connect MetaMask
        </Button> : 
        <Mint accountAddress={accountData.address} />
      }
      {accountData && <Box css={{ marginTop: "$6"}}>
        {accountData.ens?.avatar && <img src={accountData.ens?.avatar} />}
        <Box css={{ fontWeight: "bold"}}>
          {accountData.ens?.name
            ? `${accountData.ens?.name} (${accountData.address})`
            : accountData.address}
        </Box>
        <Box>Connected to {accountData.connector?.name}</Box>
      </Box>}
    </Flex>
  )
}

export default Home
