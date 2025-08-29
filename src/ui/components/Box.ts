import { backgroundColor, BackgroundColorProps, backgroundColorShorthand, BackgroundColorShorthandProps, border, BorderProps, createBox, createRestyleComponent, layout, LayoutProps, spacing, SpacingProps, spacingShorthand, SpacingShorthandProps } from '@shopify/restyle';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Theme } from '../theme/theme';

export const Box = createBox<Theme>();

export type BoxProps = React.ComponentProps<typeof Box>

type RestyleTypes = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme> &
  BackgroundColorShorthandProps<Theme>;


export type TouchableOpacityBoxProps = RestyleTypes & TouchableOpacityProps;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [
    backgroundColor,
    spacing,
    layout,
    border,
    spacingShorthand,
    backgroundColorShorthand,
  ],
  TouchableOpacity,
);
