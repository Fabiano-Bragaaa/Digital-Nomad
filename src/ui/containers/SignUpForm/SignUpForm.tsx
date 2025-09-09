import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { SignUpSchema, signUpSchema } from "./SignUpSchema";

type SignUpFormProps = {
  onSubmit: (data: SignUpSchema) => void;
}

export function SignUpForm({onSubmit}: SignUpFormProps) {
  const { control, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  return (
    <Box>
      <Controller
        control={control}
        name="fullname"
        render={({ field, fieldState }) => (
          <TextInput
            label="Nome completo"
            placeholder="Seu nome completo"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextInput
            label="Senha"
            placeholder="Crie uma senha"
            secureTextEntry
            autoCapitalize="none"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextInput
            label="Confirmar senha"
            placeholder="Repita a senha"
            testID="confirm-password"
            secureTextEntry
            autoCapitalize="none"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} title="Criar conta" mt="s16" />
    </Box>
  )
}