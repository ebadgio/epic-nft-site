import { useEffect, useState, useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount, useConnect, Connector } from 'wagmi';

import { darkTheme } from 'stitches.config';

import { Flex } from 'components/core/Flex';
import { Button } from 'components/core/Button';
import { H1 } from 'components/core/Heading';
import { Text } from 'components/core/Text';
import { Mint } from 'components/Mint';
import { Navbar } from 'components/Navbar';
import { DarkModeContext } from 'context/DarkModeContext';

const Home: NextPage = () => {
  const [darkMode] = useContext(DarkModeContext);

  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [metaMaskConnector, setMetaMaskConnector] = useState<Connector | null>(null);

  useEffect(() => {
    setMetaMaskConnector(data.connectors[0]);
  }, [data]);

  return (
    <Flex 
      direction="column"
      align="center"
      className={darkMode ? darkTheme : ''}
      css={{ padding: "$6 $3", textAlign: "center", width: "100%", minHeight: '100vh', background: '$gray1' }}
    >
      <Head>
        <title>Epic NFT</title>
        <meta name="description" content="Mint an NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar account={accountData} />
      <H1 css={{ fontSize: "$xl", marginBottom: "$2"}}>
        Epic NFT Collection
      </H1>
      <Text css={{ fontSize: "$h2", marginBottom: "$6"}}>
        Each unique. Each beautiful. Discover your NFT today.
      </Text>
      {!accountData ? 
        <Button 
          color="rainbow" 
          borderRadius="rounded"
          onClick={() => metaMaskConnector && connect(metaMaskConnector)}
        >
          Connect MetaMask Wallet
        </Button> : 
        <Mint accountAddress={accountData.address} />
      }
    </Flex>
  )
}

export default Home
