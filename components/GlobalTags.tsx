import { asset, Head } from "$fresh/runtime.ts";

export interface Props {
  url: string;
}

function GlobalTags({ url }: Props) {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Disable auto Zoom on input in safari iphone */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

      {/* Enable canonical tag */}
      <link rel="canonical" href={url || ""} />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
