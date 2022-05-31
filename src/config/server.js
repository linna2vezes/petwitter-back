import Fastify from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";

import routes from "../routes/routes.js";

import multer from "fastify-multer";
import fastifyStatic from "fastify-static";
import path from "path";

const fastify = Fastify({
  logger: true,
});

const __dirname = path.resolve();

fastify.register(multer.contentParser);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
});

fastify.register(helmet);
fastify.register(routes);

export default fastify;