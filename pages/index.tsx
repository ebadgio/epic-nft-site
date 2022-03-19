import type { NextPage } from 'next'
import Head from 'next/head';

import { Flex } from 'components/Flex';
import { Button } from 'components/Button';
import { H1, H3 } from 'components/Heading';
import { Text } from 'components/Text';

const Home: NextPage = () => {
  return (
    <Flex direction="column" align="center" css={{ paddingTop: "$6", textAlign: "center" }}>
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
      <Button color="rainbow" borderRadius="rounded">
        Connect Wallet
      </Button>
    </Flex>
  )
}

export default Home
