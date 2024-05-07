import { asset, Head } from "$fresh/runtime.ts";

export interface Props{
  url: string;
}

function GlobalTags({url}: Props) {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

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
