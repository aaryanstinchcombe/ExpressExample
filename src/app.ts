import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';
import api from './api/routes';

config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	cors({
		origin: '*',
	})
);

app.use('/api', api);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));
