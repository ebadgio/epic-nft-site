import React, { useContext } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { Avatar } from 'components/core/Avatar';
import { Box } from 'components/core/Box';
import { Button } from 'components/core/Button';
import { Flex } from 'components/core/Flex';

import { DarkModeContext } from 'context/DarkModeContext';
import { displayAdddress } from 'util/helpers';
import { Tag } from './core/Tag';

interface NavbarProps {
  account?: {
    address: string;
    ens?: {
      name: string;
      avatar?: string | null;
    }
  }
}

export const Navbar: React.FC<NavbarProps> = ({ account }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <Flex width="fill" justify="between" css={{ height: '65px', padding: '0 $3', position: 'absolute', top: 0}}>
      <Flex css={{ gap: "$3"}} align="center">
        {account?.ens?.avatar && <Avatar src={account?.ens?.avatar} />}
        <Tag>
          {account?.ens?.name
            ? account?.ens?.name
            : displayAdddress(account?.address)}
        </Tag>
      </Flex>
      <Flex css={{ gap: "$3"}}>
        <Button 
          color="gray"
          outlined 
          as="a" 
          target="_blank" 
          href="https://testnets.opensea.io/collection/squarenft-rko4qhiyfy"
        >
          View Collection
        </Button>
        <Button 
          color="ghost" 
          type="icon"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
    </Flex>
  )
}
