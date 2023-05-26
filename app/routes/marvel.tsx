import { json } from "@remix-run/node";

import { getCharacters } from "~/models/marvel.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getCharacters>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getCharacters(),
  });
};
