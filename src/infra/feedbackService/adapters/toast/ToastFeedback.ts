import Toast from "react-native-toast-message";
import { Feedback, IFeedbackService } from "../../IFeedbackService";

function send(feedback: Feedback): void {
  Toast.show({ props: feedback });
}

export const toastFeedback: IFeedbackService = {
  send,
};
