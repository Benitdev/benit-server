/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import passport from "passport"
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as GitHubStrategy } from "passport-github2"
import EnvVars from "@src/declarations/major/EnvVars"
import { User } from "@src/models/User"
import { VerifyCallback } from "jsonwebtoken"

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: EnvVars.jwt.secret,
}

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const user: typeof User | null = await User.findById(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        payload.userId
      )
      // .populate("courseLearned.course")
      // .populate("courseLearned.lessons")
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      return done(err, false)
    }
  })
)

passport.use(
  new GitHubStrategy(
    {
      clientID: EnvVars.githubClientId,
      clientSecret: EnvVars.githubSecretId,
      callbackURL: `http://localhost:${EnvVars.port}/api/v1/auth/github/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: VerifyCallback
    ) => {
      const defaultUser = {
        username: profile.emails?.[0].value,
        password: "",
        email: profile.emails?.[0].value,
        fullName: profile.displayName,
        avatar: profile.photos?.[0].value,
      }
      const user = await User.findOneAndUpdate(
        { email: profile.emails?.[0].value },
        defaultUser,
        { upsert: true, new: true }
      )
      if (user) cb(null, user)
      else cb(null, undefined)
    }
  )
)

passport.use(
  new GoogleStrategy(
    {
      clientID: EnvVars.googleClientId,
      clientSecret: EnvVars.googleSecretId,
      callbackURL: `http://localhost:${EnvVars.port}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        username: profile.emails?.[0].value,
        password: "",
        email: profile.emails?.[0].value,
        fullName: profile.displayName,
        avatar: profile.photos?.[0].value,
      }
      const user = await User.findOneAndUpdate(
        { email: profile.emails?.[0].value },
        defaultUser,
        { upsert: true, new: true }
      )
      if (user) cb(null, user)
      else cb(null, undefined)
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      clientID: EnvVars.facebookClientId,
      clientSecret: EnvVars.facebookSecretId,
      callbackURL: `http://localhost:${EnvVars.port}/api/v1/auth/facebook/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        username: profile.emails?.[0].value,
        password: "",
        email: profile.emails?.[0].value,
        fullName: profile.displayName,
        avatar: profile.photos?.[0].value,
      }
      const user = await User.findOneAndUpdate(
        { email: profile.emails?.[0].value },
        defaultUser,
        { upsert: true, new: true }
      )
      if (user) cb(null, user)
      else cb(null, undefined)
    }
  )
)

/* passport.serializeUser((user: any, cb) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id)
  if (user) cb(null, user)
})
 */
