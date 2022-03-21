import React from 'react';

import { Box } from 'components/core/Box';
import { Flex } from 'components/core/Flex';
import { Text } from 'components/core/Text';

import { NFTData } from 'hooks/useEpicNFTContract';

const BASE_OPENSEA_URL = "https://testnets.opensea.io/assets";

interface NFTProps {
  contractAddress: string;
  data: NFTData;
}

export const NFT: React.FC<NFTProps> = ({ contractAddress, data }) => {
  return (
    <Flex direction="column" css={{ boxShadow: "$1", gap: "$2", padding: "$3 $2", borderRadius: "$roundedSquare"}}>
      <Box as="img" src={data.metadata.image} />
      <Text css={{ fontWeight: "bold" }}>{data.metadata.name}</Text>
      <a>{[BASE_OPENSEA_URL, contractAddress, data.tokenId].join('/')}</a>
    </Flex>
  )
}
