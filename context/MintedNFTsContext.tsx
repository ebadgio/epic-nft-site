import { NFTData } from 'hooks/useEpicNFTContract';
import { createContext, useState} from 'react';

export type MintedNFTsContext = [Array<NFTData>, (nft: NFTData[]) => void];

export const MintedNFTsContext = createContext<MintedNFTsContext>([[], (nfts: NFTData[]) => {}]);

export const MintedNFTsProvider: React.FC = ({ children }) => {
  const [nfts, setNfts] = useState<Array<NFTData>>([]);

  return (
    <MintedNFTsContext.Provider value={[nfts, setNfts]}>
      {children}
    </MintedNFTsContext.Provider>
  );
}
