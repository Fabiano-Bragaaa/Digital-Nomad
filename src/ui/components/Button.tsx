import { ThemeColors } from "../theme/theme";
import { TouchableOpacityBox, TouchableOpacityBoxProps } from "./Box";
import { Text } from "./Text";

type ButtonVariant = "primary" | "secondary";

const buttonColors: Record<
  ButtonVariant,
  { backgroundColor: ThemeColors; TextColor: ThemeColors }
> = {
  primary: {
    backgroundColor: "primary",
    TextColor: "text",
  },
  secondary: {
    backgroundColor: "gray1",
    TextColor: "text",
  },
};

type ButtonProps = TouchableOpacityBoxProps & {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  ...touchableOpacityBoxProps
}: ButtonProps) {
  const buttonProps = buttonColors[variant];
  return (
    <TouchableOpacityBox
      onPress={onPress}
      bg={buttonProps.backgroundColor}
      borderRadius="default"
      padding="padding"
      justifyContent="center"
      alignItems="center"
      {...touchableOpacityBoxProps}>
      <Text color={buttonProps.TextColor}>{title}</Text>
    </TouchableOpacityBox>
  );
}
