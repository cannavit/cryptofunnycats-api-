import express from 'express';

import models, { connectDb } from './models';

const app = express();

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

connectDb().then(async () => {
  app.listen(3002, () => console.log(`Example app listening on port 3002`));
});
