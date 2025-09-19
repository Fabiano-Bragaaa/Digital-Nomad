import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, DefaultValues, useForm } from "react-hook-form";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { updateProfileSchema, UpdateProfileSchema } from "./UpdateProfileSchema";

type UpdateProfileFormProps = {
  onSubmit: (data: UpdateProfileSchema) => void;
  defaultValues: DefaultValues<UpdateProfileSchema>;
};

export function UpdateProfileForm({ onSubmit, defaultValues }: UpdateProfileFormProps) {
  const { control, handleSubmit } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
    mode: "onChange",
  });

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

      <Button onPress={handleSubmit(onSubmit)} title="Atualizar" mt="s16" />
    </Box>
  );
}
