import passport from "passport"

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const isAuthenticated = passport.authenticate("jwt", { session: false })
