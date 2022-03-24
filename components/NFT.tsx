import React from 'react';

import { Box } from 'components/core/Box';
import { Flex } from 'components/core/Flex';
import { Text } from 'components/core/Text';
import { Image } from 'components/core/Image';

import { NFTData } from 'hooks/useEpicNFTContract';
import { Avatar } from './core/Avatar';
import { MAX_TOKENS } from './Mint';

const BASE_OPENSEA_URL = "https://testnets.opensea.io/assets";

interface NFTProps {
  contractAddress: string;
  data: NFTData;
}

export const NFT: React.FC<NFTProps> = ({ contractAddress, data }) => {
  return (
    <Flex 
      direction="column" 
      align="start"
      css={{ 
        gap: "$2",
        borderRadius: "$roundedSquare",
        padding: '$3',
        background: '$gray3'
      }}
    >
      <Image src={data.metadata.image} />
      <Text type="title">{data.metadata.name}</Text>
      <Flex width="fill" justify="between">
        <Text type="title">{`#${data.tokenId + 1}/${MAX_TOKENS}`}</Text>
        <Box as="a" target="_blank" href={[BASE_OPENSEA_URL, contractAddress, data.tokenId].join('/')}>
          <Avatar 
            src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg" 
          />
        </Box>
      </Flex>
    </Flex>
  )
}
