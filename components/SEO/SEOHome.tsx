import { Head } from "$fresh/runtime.ts";

function SEOHome() {
  return (
    <Head>
        <script
            type="application/ld+json"
            data-react-helmet="true"
            dangerouslySetInnerHTML={{
                __html: `{
                    "@context":"https://schema.org",
                    "@type":"WebSite",
                    "url":"https://casaevideo.com.br",
                    "potentialAction":{
                        "@type":"SearchAction",
                        "target":"https://casaevideo.com.br/search?q={search_term_string}",
                        "query-input":"required name=search_term_string"
                    }
                }`,
            }}
        />
    </Head>
  );
}

export default SEOHome;
