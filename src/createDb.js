const { MongoClient } = require('mongodb');

const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const dbFunction = async (dbName, row, i) => {
  // create a new client
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  // open the connection to the database server
  await client.connect();
  console.log('connected!');

  const db = client.db(dbName);
  let id = `${row}-${i}`;
  await db.collection('seats').insertOne(
      seats = {[id]: { price: 225, isBooked: false }}, 
      numOfRows = 8,
      seatsPerRow = 12
  );
  client.close();
  console.log('disconnected!');
};
row.forEach((row)=>{
    for (i=1; i<13; i++) {
      dbFunction('ticketInfo', row, i);
    }
  })