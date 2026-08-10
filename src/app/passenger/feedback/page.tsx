import { FeedbackForm } from "@/components/feedback/feedback-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PassengerFeedbackPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>
          Submit passenger feedback for routes, tickets, payments, or service.
        </CardDescription>
      </CardHeader>
      <FeedbackForm />
    </Card>
  );
}
