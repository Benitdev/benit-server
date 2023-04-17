/* eslint-disable node/no-process-env */

export default {
  nodeEnv: process.env.NODE_ENV ?? "",
  port: process.env.PORT ?? 0,
  mongodbURI: process.env.MONGODB_URI ?? "",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleSecretId: process.env.GOOGLE_SECRET_ID ?? "",
  facebookClientId: process.env.FACEBOOK_CLIENT_ID ?? "",
  facebookSecretId: process.env.FACEBOOK_SECRET_ID ?? "",
  githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
  githubSecretId: process.env.GITHUB_SECRET_ID ?? "",
  cookieProps: {
    key: "ExpressGeneratorTs",
    secret: process.env.COOKIE_SECRET ?? "",
    options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? "",
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: process.env.COOKIE_DOMAIN ?? "",
      secure: process.env.SECURE_COOKIE === "true",
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    exp: process.env.JWT_EXP ?? "", // exp at the same time as the cookie
  },
} as const
