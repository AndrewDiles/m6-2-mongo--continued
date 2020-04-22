const { MongoClient } = require('mongodb');

const assert = require('assert');

const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const dbDeletionFunction = async (dbName, row, i) => {
  // create a new client
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  // open the connection to the database server
  _id = `${row}-${i}`;

    await client.connect();
    const db = client.db(dbName);
    const r = await db.collection('seats').deleteOne({_id});
    assert.equal(1, r.deletedCount);
    client.close();

};

row.forEach((row)=>{
  for (i=1; i<13; i++) {
    dbDeletionFunction('theatre', row, i);
  }
});