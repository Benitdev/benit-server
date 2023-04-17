import "./pre-start" // Must be the first import
import logger from "jet-logger"
import { exit } from "process"

import EnvVars from "@src/declarations/major/EnvVars"
import server from "./server"
import mongoose from "mongoose"

// **** Start server **** //

const msg = "Express server started on port: " + EnvVars.port.toString()

mongoose
  .connect(EnvVars.mongodbURI)
  .then(() => {
    server.listen(EnvVars.port, () => logger.info(msg))
  })
  .catch((err) => {
    logger.err(err)
    exit(1)
  })
