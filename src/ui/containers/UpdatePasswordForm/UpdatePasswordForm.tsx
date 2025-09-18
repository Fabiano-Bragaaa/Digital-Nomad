import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { updatePasswordSchema, UpdatePasswordSchema } from "./UpdatePasswordSchema";

type UpdatePasswordFormProps = {
  onSubmit: (data: UpdatePasswordSchema) => void;
};

export function UpdatePasswordForm({ onSubmit }: UpdatePasswordFormProps) {
  const { control, handleSubmit } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
  });

  return (
    <Box>
      <Controller
        control={control}
        name="oldPassword"
        render={({ field, fieldState }) => (
          <TextInput
            label="Senha Atual"
            placeholder="********"
            secureTextEntry
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
            label="Nova Senha"
            placeholder="********"
            secureTextEntry
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
            label="Confirmar Nova Senha"
            placeholder="********"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} title="Atualizar" mt="s16" />
    </Box>
  );
}
