import { Box } from "../../components/Box";
import { Button } from "../../components/Button";

type SignUpFormProps = {
  onSubmit: () => void;
}

export function SignUpForm({onSubmit}: SignUpFormProps) {
  return (
    <Box>
       <Button onPress={onSubmit} title="Criar conta" />
    </Box>
  )
}