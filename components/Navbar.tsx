import React, { useContext, useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { styled } from 'stitches.config';

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

const NavbarWrapper = styled('div', {
  width: '100%',
  height: '65px',
  position: 'fixed', 
  top: 0,
  zIndex: 1000,
  transition: 'all .25s ease',
  variants: {
    active: {
      true: {
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: '$blur',
        borderColor: '$gray5',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
      }
    }
  }
})

export const Navbar: React.FC<NavbarProps> = ({ account }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    })

    return window.removeEventListener('scroll', () => {})
  }, []);

  const username = account?.ens?.name
    ? account?.ens?.name
    : displayAdddress(account?.address)

  return (
    <NavbarWrapper active={active}>
      <Flex width="fill" justify="between" css={{ height: '100%', padding: '0 $3'}}>
        <Flex css={{ gap: "$3"}} align="center">
          {account?.ens?.avatar && <Avatar src={account?.ens?.avatar} />}
          {username && <Tag>
            {username}
          </Tag>}
        </Flex>
        <Flex css={{ gap: "$3"}}>
          <Button 
            color="ghost"
            outlined={!active}
            as="a" 
            target="_blank" 
            href="https://testnets.opensea.io/collection/squarenft-duxgaleheg"
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
    </NavbarWrapper>
  )
}
