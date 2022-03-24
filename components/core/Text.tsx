import { styled } from 'stitches.config';

export const Text = styled('p', {
  color: '$gray12',
  variants: {
    type: {
      body: {
        fontSize: '$body',
        color: '$gray11',
      },
      title: {
        fontSize: '$body',
        color: '$gray12',
        fontWeight: "bold",
      }
    }
  }
});

Text.defaultProps = {
  type: "body",
}

