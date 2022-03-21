import React from 'react'
import { styled } from 'stitches.config'

import { Box } from './Box';

const Wrapper: React.FC = ({children}) => (
  <Box as="span" css={{
    position: 'relative',
    overflow: 'hidden',
    width: '260px',
    height: '260px',
  }}>
    {children}
  </Box>
);

const Img = styled('img', {
  position: 'absolute',
  inset: '0px',
  padding: '0px',
  border: 'none',
  margin: 'auto',
  display: 'block',
  width: '0px',
  height: '0px',
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '100%',
  maxHeight: '100%',
  borderRadius: '$roundedSquare',
})

export type ImageProps = React.ComponentProps<typeof Img>;

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <Wrapper>
      <Img {...props} />
    </Wrapper>
  )
}
