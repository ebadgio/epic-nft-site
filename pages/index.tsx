import type { NextPage } from 'next'
import Head from 'next/head';

import { Flex } from 'components/Flex';
import { Button } from 'components/Button';

const Home: NextPage = () => {
  return (
    <Flex justify="center" css={{ paddingTop: "$6" }}>
      <Head>
        <title>Epic NFT</title>
        <meta name="description" content="Mint an NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button color="rainbow" css={{ borderRadius: "$roundedSquare"}}>
        Connect Wallet
      </Button>
    </Flex>
  )
}

export default Home
