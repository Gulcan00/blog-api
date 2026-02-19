const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const prisma = require('../utils/prisma-client');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};


passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.id },
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        });

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        console.error('Passport JWT error:', error);
        return done(error, false);
      }
    })
);

module.exports = passport;