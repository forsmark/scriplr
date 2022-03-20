import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  code: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  res.status(200).json({ code: "qwerty" });
}
