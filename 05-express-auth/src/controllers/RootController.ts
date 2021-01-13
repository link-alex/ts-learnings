import { Request, Response, NextFunction } from 'express';

import { controller, get, use } from './decorators';

function requreAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
  } else {
    res.status(403);
    res.send('Not permitted');
  }
}

@controller('')
class RootController {

  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  };

  @get('/protected')
  @use(requreAuth)
  getProtected(req: Request, res: Response): void {
    res.send('You can see protected data here.');
  };
}
