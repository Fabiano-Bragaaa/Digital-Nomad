import { Screen } from "@/src/ui/components/Screen";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Screen>
      <SafeAreaView>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input}/>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button onPress={() => {}} title="Sign in" />
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#fff",
    borderWidth: 1,
    height: 60,
    color: "#fff",
    fontSize: 20,
    marginVertical: 16,
  },
});
