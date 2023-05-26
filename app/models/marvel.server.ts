import md5 from "js-md5";

export async function getCharacters() {
  const timestamp = Number(new Date());
  const hash = md5.create();
  hash.update(timestamp + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY);

  const limit = 20;
  const currentOffset = 0;
  const orderBy = "name";

  const res = await fetch(
    `${process.env.MARVEL_BASE_URL}/characters?limit=${limit}&ts=${timestamp}&offset=${currentOffset}&orderBy=${orderBy}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`,
  ).then((res) => res.json());

  console.log(res)

  return res.data;
}