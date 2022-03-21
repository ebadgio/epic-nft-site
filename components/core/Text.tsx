import { styled } from 'stitches.config';

export const Text = styled('p', {
  color: '$gray12',
  variants: {
    type: {
      body: {
        fontSize: '$body',
        color: '$gray11',
      },
    }
  }
});

