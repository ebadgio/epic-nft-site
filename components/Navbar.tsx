import React, { useContext } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { Avatar } from 'components/core/Avatar';
import { Box } from 'components/core/Box';
import { Button } from 'components/core/Button';
import { Flex } from 'components/core/Flex';

import { DarkModeContext } from 'context/DarkModeContext';

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
    <Flex width="fill" justify="between" css={{ height: '50px', padding: '0 $3', position: 'absolute', top: 0}}>
      <Flex css={{ gap: "$2"}}>
        {account?.ens?.avatar && <Avatar src={account?.ens?.avatar} />}
        <Box css={{ fontWeight: "bold"}}>
          {account?.ens?.name
            ? account?.ens?.name
            : account?.address}
        </Box>
      </Flex>
      <Flex>
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
