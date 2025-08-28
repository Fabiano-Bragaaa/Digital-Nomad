export type FeedbackType = 'success' | 'error'

export type Feedback = {
  type: FeedbackType;
  message: string;
  description?: string;
}

export interface IFeedbackService {
  send(feedback: Feedback): void;
}