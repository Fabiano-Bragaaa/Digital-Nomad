import { LinkProps, router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "../components/Text";

export type TextLinkProps = {
  text: string;
  ctaText:string;
  href?: LinkProps['href'];
}

export function TextLink({text, ctaText, href}: TextLinkProps) {

  function handleOnPress() {
    if(href) {
      router.navigate(href);
    } else {
      router.back();
    }
  }

  return (
    <Pressable onPress={handleOnPress}>
      <Text alignSelf="center" mt="s16" color="gray2">
        {text}{"  "}
        <Text variant="title14" color="primary">
          {ctaText}
        </Text>
      </Text>
    </Pressable>
  );
}
