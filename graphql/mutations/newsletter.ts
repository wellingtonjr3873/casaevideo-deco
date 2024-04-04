export const newslettterMutation = (email: string) =>
  `mutation { subscribeNewsletter(email: "${email}")}`;
