import { styled } from 'stitches.config';

export const Tag = styled('div', {
  borderRadius: '$rounded',
  padding: '$1 $2',
  fontSize: '$body',
  fontWeight: 500,

  variants: {
    color: {
      gray: {
        backgroundColor: '$gray5',
        color: '$gray11',
      }
    }
  }
})

Tag.defaultProps = {
  color: 'gray',
}