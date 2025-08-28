import { Alert } from "react-native";
import { Feedback, IFeedbackService } from "../../IFeedbackService";

function send(feedback: Feedback):void {
  Alert.alert(
    feedback.type === "success" ? "Sucesso" : "Erro",
    feedback.message,
    feedback.description ? [
      {text: 'OK'}
    ] : []
  )
}

export const alertFeedback:IFeedbackService = {
  send
}