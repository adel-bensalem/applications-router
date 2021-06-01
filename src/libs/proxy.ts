import { Request, response, Response } from "express";
import { Proxy } from "@core";
import axios, { Method } from "axios";

const createProxy = (req: Request, res: Response): Proxy => ({
  proxyRequest: ({ port }) =>
    axios({
      url: `${req.protocol}://${process.env.HOST}:${port}${req.originalUrl}`,
      method: req.method as Method,
      headers: req.headers,
      params: req.params,
      data: req.body,
    })
      .then((response) => {
        res
          .status(response.status)
          .header(response.headers)
          .send(response.data);
      })
      .catch(({ response }) => {
        res
          .status(response.status)
          .header(response.headers)
          .send(response.data);
      }),
});

export { createProxy };
