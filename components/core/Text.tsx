import { styled } from 'stitches.config';

export const Text = styled('p', {
  variants: {
    type: {
      body: {
        fontSize: '$body',
        color: '$gray11',
      },
    }
  }
});

