'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the users in the DB
const cors = require('cors');

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password

passport.use(new LocalStrategy(
  function (username, password, done) {

    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express
const app = express();
const PORT = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions)); // NB: Usare solo per sviluppo e per l'esame! Altrimenti indicare dominio e porta corretti

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/*--------------------------------- APIs ----------------------------------------*/

// GET /api/anonimousRiddles
app.get('/api/AnonimousRiddles', (req, res) => {
  dao.getAllAnonimousRiddles()
    .then(riddles => res.json(riddles))
    .catch(() => res.status(500).end());
});

// GET /api/Riddles
app.get('/api/riddles', isLoggedIn, async (req, res) => {
  dao.getAllRiddles()
    .then(riddles => res.json(riddles))
    .catch(() => res.status(500).end());
});

// GET /api/classification
app.get('/api/classification', async (req, res) => {
  const top3 = await dao.getClassification();
  dao.getUsersInTop3(top3)
    .then(users => res.json(users))
    .catch(() => res.status(500).end());
});

// GET /api/riddles/<id>
app.get('/api/riddles/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getRiddle(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.code}.` }).end();
  }
});

// GET /api/riddlesClosed/<id>
app.get('/api/ClosedRiddle/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getClosedRiddle(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/responses/<id>
app.get('/api/responses/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getResponses(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/responses/
app.get('/api/responses', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getAllResponses();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/riddleText/<id>
app.get('/api/riddleText/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getRiddleText(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/riddleText/<id>
app.get('/api/riddleScadenza/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getRiddleScadenza(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/riddleResponse
app.get('/api/riddleResponse/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getRiddleResponse(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/riddleSugg1
app.get('/api/riddleSugg1/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getRiddleSugg1(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// GET /api/riddleSugg2
app.get('/api/riddleSugg2/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getRiddleSugg2(req.params.id);
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Database error while retrieving riddle ${req.params.id}.` }).end();
  }
});

// PUT /api/userPoints/:userId
app.put('/api/userPoints/:userId', isLoggedIn, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.userId;
  const pointsToAdd = req.body.pointsToAdd;

  try {
    const userInfo = await userDao.getUserById(id);
    if (userInfo.error)
      res.status(404).json(userInfo);
    else
      await userDao.updateUserPoints(id, pointsToAdd + userInfo.points)
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of user ${req.params.id}.` });
  }
});

// PUT /api/riddleState/:riddleId
app.put('/api/riddleState/:riddleId', isLoggedIn, [
  check('stato').isString(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.riddleId;
  const stato = req.body.stato;

  try {
    await dao.updateStato(id, stato)
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of riddle ${req.params.id}.` });
  }
});

// PUT /api/riddleScadenza/:riddleId
app.put('/api/riddleScadenza/:riddleId', isLoggedIn, [
  check('riddleId'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.riddleId;
  const scadenza = req.body.scadenza;

  try {
    await dao.updateScadenza(id, scadenza)
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of riddle ${req.params.riddleId}.` });
  }
});

// PUT /api/riddleVincitore/:riddleId
app.put('/api/riddleVincitore/:riddleId', isLoggedIn, [
  check('riddleId').isInt(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.riddleId;
  const vincitore = req.body.vincitore;

  try {
    await dao.addVincitore(id, vincitore)
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the update of riddle ${req.params.riddleId}.` });
  }
});

// POST /api/riddleVincitore
app.post('/api/riddle', isLoggedIn, [
  check('testo').isString(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const riddle = {
    testo: req.body.testo,
    durata: req.body.durata,
    risposta: req.body.risposta,
    suggerimento1: req.body.suggerimento1,
    suggerimento2: req.body.suggerimento2,
    stato: req.body.stato,
    difficolta: req.body.difficolta
  };

  try {
    await dao.createRiddle(riddle, req.user.id);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of riddle ${riddle.id}.` });
  }
});

// POST /api/response
app.post('/api/response', isLoggedIn, [
  check('testo').isString(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const risposta = {
    indovinello: req.body.indovinello,
    testo: req.body.testo,
    userId: req.body.userId
  };
  console.log(risposta)

  try {
    await dao.createResponse(risposta);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of response ${risposta.id}.` });
  }
});

/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => { res.end(); });
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));