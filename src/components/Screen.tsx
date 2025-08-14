import React, { PropsWithChildren } from "react";
import { Box, BoxProps } from "./Box";

export function Screen({children, ...boxProps}:PropsWithChildren & BoxProps) {
  return (
    <Box bg="background" paddingHorizontal="s16" {...boxProps}>
      {children}
    </Box>
  )
}