import { config } from 'dotenv';
export default class UserControllers {
  async authGoogleLogin(req, res, next) {
    try {
      
      const params = new URLSearchParams();
      params.set('email', req.user.email);
      params.set('names', req.user.names);
      params.set('firstSignIn', req.user.firstSignIn);
     
      res.status(201).send(
        `<script>
          window.location.href = "${process.env.FRONTEND_URL}/?${params}"
        </script>`
      );
    } catch (err) {
      next(err);
    }
  }
}
