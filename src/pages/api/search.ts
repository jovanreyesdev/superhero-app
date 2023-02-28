import { NextApiRequest, NextApiResponse } from "next";
import { Hero } from '@types';

const token = process.env.SUPERHERO_API_TOKEN;

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<Hero[]>
) {
  try {
    const { name } = req.query;

    const response = await fetch(
      `https://superheroapi.com/api/${token}/search/${name}`
    );

    if (!response.ok) {
      res.status(500).json([]);
      return;
    }

    const data = await response.json();

    res.status(200).json(data.results || []);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
}