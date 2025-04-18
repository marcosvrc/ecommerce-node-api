import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { router } from './interfaces/http/routes';
import { errorHandler } from './interfaces/http/middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.use('/api/v1', router);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});