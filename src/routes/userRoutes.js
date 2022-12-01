import express from 'express';
import passport from '../controllers/googleAuth';
const router = express.Router();
import UserControllers from '../controllers/userController';
const userControllers = new UserControllers();

router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      session: false,
      scope: ['email', 'profile'],
      prompt: 'select_account',
    }
  )
);

router.get(
  '/google/login',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'google/failed',
  }),
  userControllers.authGoogleLogin
);

router.get('/google/failed', (req, res) => {
  res.send('oops!failed to login with Google');
});

export default router;
