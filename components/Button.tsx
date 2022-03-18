import { styled } from 'stitches.config';

export const Button = styled('button', {
  appearance: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all .25s ease',
  fontWeight: 'bold',
  fontSize: '$body',
  height: '$md',
  paddingRight: '$3',
  paddingLeft: '$3',
  borderRadius: '$rounded',
  gap: '$2',
  
  variants: {
    color: {
      gray: {
        color: '$gray12',
      },
      rainbow: {
        color: '$gray12',
        '&:hover': {
          borderColor: '$gray1',
          backgroundColor: '$gray1',
          boxShadow: '-10px 0 15px -5px var(--colors-indigo7), 0 0 15px -5px var(--colors-blue7), 10px 0 15px -5px var(--colors-cyan7)',
        }
      },
      ghost: {
        background: 'none',
        color: '$gray12',
        '&:hover': {
          backgroundColor: '$gray5',
        },
      }
    },
    type: {
      icon: {
        justifyContent: 'center',
        gap: 0,
        padding: '$2',
        height: '$sm',
        width: '$sm',
        borderRadius: '$roundedSquare',
      },
    },
    outlined: {
      true: {
        borderColor: '$gray5',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: 'transparent',
      }
    }
  }
})