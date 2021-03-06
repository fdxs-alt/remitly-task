import { NextApiResponse, NextApiRequest } from "next";
import fetch from "node-fetch";

const urls = [
  "http://api.nbp.pl/api/exchangerates/tables/a",
  "http://api.nbp.pl/api/exchangerates/tables/b",
];
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  const response = await Promise.all(
    urls.map(async (el) => {
      const res = await fetch(el);

      return res.json();
    })
  );

  const data = [...response[0][0].rates, ...response[1][0].rates].filter(
    (el) => el.code.toLowerCase() === (code as string).toLowerCase()
  );

  res.json(data[0]);
};
