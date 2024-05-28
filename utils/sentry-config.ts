import * as Sentry from "@sentry/react";

export const sentryConfig = () => {
  Sentry.init({
    dsn: "https://ab0262a61336b289e990da5a59b2786d@o1306693.ingest.us.sentry.io/4507260284436480",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [
      "localhost", /^https:\/\/casaevideo\.deco\.site/, 
      /^https:\/\/casaevideo\.com/, /^https:\/\/casaevideo\.com\.br/,
      /^https:\/\/www\.casaevideo\.com/, /^https:\/\/www\.casaevideo\.com\.br/
    ],
    // Session Replay
    replaysSessionSampleRate: 0.01, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}