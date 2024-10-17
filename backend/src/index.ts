import Fastify from "fastify";
import formbody from "@fastify/formbody";
import logger, { LOG_LEVEL } from "./logger";
import { getServer } from "./graphql";

export const fastify = Fastify({
  logger,
  bodyLimit: 10 * 1024 * 1024, // 10 MB
  keepAliveTimeout: 30_000,
  requestIdHeader: "request-id",
});

const start = async () => {
  fastify.register(formbody);

  const yoga = getServer();

  fastify.addContentTypeParser("multipart/form-data", {}, (_, __, done) =>
    done(null)
  );

  fastify.route({
    url: "/api/graphql",
    method: ["GET", "POST", "OPTIONS"],
    handler: async (req, reply) => {
      // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      return reply.send(response.body);
    },
  });

  fastify.listen(
    {
      port: 8001,
      host: "0.0.0.0",
    },
    async (error, address) => {
      if (error) {
        return logger.error(error);
      }

      return logger.info(
        `🚀🚀🚀 Server ready. Node: ${process.version}. Address: ${address}. Log level: ${LOG_LEVEL}`
      );
    }
  );
};

start();
