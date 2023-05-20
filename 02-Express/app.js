const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (_, response) => {
  response.send('Hello world express');
});

app.get('/api/users', (_, response) => {
  response.send(['Oscar', 'Juan']);
});

app.get('/api/users/:id', (request, response) => {
  response.send(request.params.id);
});

app.get('/api/users/:year/:month', (request, response) => {
  const { params, query } = request;
  response.send({ params, queryString: query });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
