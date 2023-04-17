import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import express, { Request, Response, NextFunction } from "express"
import session from "express-session"
import mongoStore from "connect-mongo"

import "express-async-errors"

import BaseRouter from "@src/routes"
import logger from "jet-logger"
import EnvVars from "@src/declarations/major/EnvVars"
import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes"
import { NodeEnvs } from "@src/declarations/enums"
import { RouteError } from "@src/declarations/classes"
import passport from "passport"
import cors from "cors"

import "@src/services/passport.services"
// **** Init express **** //

const app = express()

// **** Set basic express settings **** //
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(EnvVars.cookieProps.secret))
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  session({
    saveUninitialized: false,
    secret: "ahihihi",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    store: mongoStore.create({
      mongoUrl: EnvVars.mongodbURI,
      collectionName: "session",
    }),
    resave: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())
// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"))
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet())
}

// **** Add API routes **** //

// Add APIs
app.use("/api/v1", BaseRouter)

// Setup error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    logger.err(err, true)
    let status = HttpStatusCodes.BAD_REQUEST
    if (err instanceof RouteError) {
      status = err.status
    }
    return res.status(status).json({ error: err.message })
  }
)

// **** Export default **** //

export default app
