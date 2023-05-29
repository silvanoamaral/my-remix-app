import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCharacters } from "~/models/marvel.server";
import styled from "styled-components";

const Main = styled.main`
  background-color: hotpink;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Title = styled.h2`
  font-family: monospace;
`;

type LoaderData = {
  data: Awaited<ReturnType<typeof getCharacters>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getCharacters(),
  });
};

export default function Marvel() {
  const {
    data: { results },
  } = useLoaderData<LoaderData>();

  return (
    <Main>
      <ul>
        {results.map(({ name, thumbnail }) => (
          <li key={name}>
            <Title>{name}</Title>
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
          </li>
        ))}
      </ul>
    </Main>
  );
}
