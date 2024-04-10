export const newslettterMutation = (email: string) =>
  `mutation @context(provider: "vtex.store-graphql") { subscribeNewsletter(email: "${email}")}`;
