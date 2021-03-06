import '@babel/polyfill';
import express from 'express';

import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

// Routes
import userRoutes from './v1/routes/user.route';
import messageRoutes from './v1/routes/message.route';

import userRoutesV2 from './v2/routes/user.route';
import messageRoutesV2 from './v2/routes/message.route';
import groupRoutes from './v2/routes/group.route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.send({
    status: 200,
    message: 'Welcome To EPIC-Mail'
  });
});

// Handles
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v2/messages', messageRoutesV2);
app.use('/api/v2/auth', userRoutesV2);
app.use('/api/v2/groups', groupRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port:${PORT}`);
});

export default app;
