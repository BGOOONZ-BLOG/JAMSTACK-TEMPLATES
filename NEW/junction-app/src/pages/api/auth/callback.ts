import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "utils/auth0";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleCallback(req, res, { redirectTo: "/dashboard" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
