/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { Users, allUsersTasks } from './assets/db';

// import * as path from 'path';

const app = express();
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept ,Authorization'
  );
  next();
});

const api = express.Router();
const auth = express.Router();

api.get('/all-tasks', (req, res) => {
  res.json(allUsersTasks);
});

api.get('/tasks/:name', (req, res) => {
  const name = req.params.name;
  const index = allUsersTasks.findIndex(
    (value) => value.name.toLowerCase() === name.toLowerCase()
  );
  res.json(allUsersTasks[index]);
});

api.post('/task/:id', (req, res) => {
  const id = +req.params.id;
  const index = allUsersTasks.findIndex((value) => value.id === id);
  allUsersTasks[index].tasks.push(req.body);
  res.json(req.body);
});
api.post('/add-new-user', (req, res) => {
  const id = allUsersTasks.length;
  const newUser = {
    id: id + 1,
    name: req.body.name,
    tasks: [],
  };
  allUsersTasks.push(newUser);
  res.json(allUsersTasks);
});

api.get('/users/me', checkAuthenticated, (req, res) => {
  res.json(Users[req.body]);
});

auth.post('/login', (req, res) => {
  const user = Users.find((user) => user.email === req.body.email);
  if (!user) sendAuthError(res);

  if (user.password === req.body.password) {
    sendTokne(user, res);
  } else {
    sendAuthError(res);
  }
});
auth.post('/register', (req, res) => {
  const index = Users.push(req.body) - 1;
  const user = Users[index];
  user.id = index;
  sendTokne(user, res);
});

function sendTokne(user, res) {
  const token = jwt.sign(user.id, '123');
  res.json({ firstName: user.name, token: token });
}

function sendAuthError(res) {
  return res.json({
    status: false,
    message: 'email or passowrd is incorrect',
  });
}

function checkAuthenticated(req, res, next) {
  if (!req.header('Authorization'))
    return res.status(401).send({
      message: 'Unauthorized requested. Missing authentication header',
    });

  const token = req.header('Authorization');

  const payload = jwt.verify(token, '123');
  if (!payload)
    return res.status(401).send({
      message: 'Unauthorized requested. Authentication header invalid',
    });

  req.body = payload;

  next();
}

app.use('/api', api);
app.use('/auth', auth);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
