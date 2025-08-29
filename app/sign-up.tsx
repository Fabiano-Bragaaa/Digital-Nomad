import { Screen } from "@/src/ui/components/Screen";
import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { SignUpForm } from "@/src/ui/containers/SignUpForm/SignUpForm";
import { SignUpSchema } from "@/src/ui/containers/SignUpForm/SignUpSchema";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  function handleSubmit(data: SignUpSchema) {
    // TODO: connect with auth repo
    console.log("sign up form submitted", data);
  }

  return (
    <Screen>
      <SafeAreaView>
        <Header title="criar conta" />
       <SignUpForm onSubmit={handleSubmit}/>
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
