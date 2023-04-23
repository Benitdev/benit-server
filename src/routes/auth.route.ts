import HttpStatusCodes from "@src/declarations/major/HttpStatusCodes"
import jwtUtil from "@src/utils/jwt-util"
import { Router } from "express"
import passport from "passport"

const authRoutes = Router()

const errorLoginUrl = "http://localhost:3000/login"

authRoutes.get(
  "/google",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

authRoutes.get(
  "/facebook",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("facebook")
)

authRoutes.get(
  "/google/callback",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("google", {
    failureRedirect: errorLoginUrl,
    session: false,
  }),
  async (req: any, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token = await jwtUtil.sign({ userId: req.user.id as string })
    res.cookie("x-auth-cookies", token)
    res.send("<script>window.close()</script>")
  }
)

authRoutes.get(
  "/facebook/callback",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("facebook", {
    failureRedirect: errorLoginUrl,
    session: false,
  }),
  async (req: any, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token = await jwtUtil.sign({ userId: req.user.id as string })
    res.cookie("x-auth-cookies", token)
    res.send("<script>window.close()</script>")
  }
)

export default authRoutes
