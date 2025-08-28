import {
  Feedback,
  FeedbackType,
  IFeedbackService,
} from "../../IFeedbackService";

const colors: Record<FeedbackType, string> = {
  success: "\x1b[32m",
  error: "\x1b[31m",
};

const resetColor = "\x1b[0m";

function send(feedback: Feedback): void {
  console.log(
    `${colors[feedback.type]}${feedback.type}${resetColor} - ${
      feedback.message
    } - ${feedback.description || ""}`
  );
}

export const consoleFeedback: IFeedbackService = {
  send,
};
