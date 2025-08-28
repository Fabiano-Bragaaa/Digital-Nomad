import { Pressable, PressableProps } from "react-native";
import { Box, BoxProps } from "./Box";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean;
  onPress?: PressableProps["onPress"];
};

export function Pill({ active, iconName, label, onPress }: PillProps) {
  return (
    <Pressable onPress={onPress}>
      <Box {...boxStyle} backgroundColor={active ? "gray1" : "transparent"}>
        <Icon name={iconName} size={16} color={active ? "primary" : "gray2"} />
        <Text ml="s4" variant="text12">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
}

const boxStyle: BoxProps = {
  flexDirection: "row",
  alignItems: "center",
  borderRadius: "rounded",
  borderWidth: 2,
  borderColor: "gray1",
  paddingVertical: "s8",
  paddingHorizontal: "s12",
};
