import manifest from "$store/fresh.gen.ts";

export default function islands() {
  const myIslands = manifest.islands;
  return {
    name: "my-islands-plugin",
    islands: {
      baseLocation: import.meta.url,
      paths: Object.keys(myIslands),
    },
  };
}
    