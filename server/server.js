const express = require('express');
const morgan = require('morgan');

const PORT = 5678;


const { getSeats, bookSeat } = require('./handlers');

var app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));

app.get('/getSeats', getSeats)
app.post('/bookSeat', bookSeat)

  .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'))
const server = app.listen(PORT, function () {
  console.info('🌍 Listening on port ' + server.address().port);
});
