import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  correct: boolean;
  status: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { code } = req.query;
}
