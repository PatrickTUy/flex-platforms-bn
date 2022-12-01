import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import routes from './routes/index';
import 'dotenv/config';
import passport from './controllers/googleAuth';
import { connect } from './database/db.config';
// import schema from './schema/index';

// const app = express()

// const PORT = process.env.PORT || 4000;

// const mode = process.env.NODE_ENV || 'development';

// connect().then(()=>{
//   console.log('Database Connected');
//   app.listen({port:PORT})
//   .then(({ url }) => console.log(`Server ready at ${url}`))
// })
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));
// app.use(passport.initialize());
// app.use('/api',routes)
const app = express();

const port = 4000;
const mode = process.env.NODE_ENV || 'development';
const server = async () => {
  try {
    if (mode === 'development') {
      connect().then(() => {
        console.log('Database connected');
      });
    }
  
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'))
    app.use(passport.initialize());
    app.use('/api', routes);
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
server();

export default app;
