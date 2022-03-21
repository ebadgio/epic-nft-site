import { styled } from 'stitches.config';

export type AvatarProps = React.ComponentProps<typeof Avatar>;

export const Avatar = styled("img", {
  borderRadius: "100%",
  objectFit: "cover",
  flexShrink: 0,
  variants: {
    size: {
      small: {
        width: 32,
        height: 32,
      },
      medium: {
        width: 64,
        height: 64,
      },
      large: {
        width: 120,
        height: 120,
      },
    },
    flex: {
      true: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

Avatar.defaultProps = {
  size: "small",
};
