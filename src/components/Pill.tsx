import { Box, BoxProps } from "./Box";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean
}

export function Pill({active, iconName, label}:PillProps) {
  
  
  return (
    <Box {...boxStyle} backgroundColor={active ? 'gray1' : 'transparent'}>
      <Icon name={iconName} size={16} color={active ? 'primary' : 'gray2'}/>
      <Text ml="s4" variant="text12">{label}</Text>
    </Box>
  )
}

const boxStyle:BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 'rounded',
  borderWidth: 2,
  borderColor: 'gray1',
  paddingVertical: 's8',
  paddingHorizontal: 's12'
}