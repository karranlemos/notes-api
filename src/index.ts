import cors from 'cors';
import express, { Application } from 'express';

import routes from './routes';

const PORT = process.env.PORT || 3667;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
