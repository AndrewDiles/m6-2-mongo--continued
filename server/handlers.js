'use strict';

const assert = require('assert');

const { MongoClient } = require('mongodb');

const getSeats = async (req, res) => {
  console.log('YOU HAVE HIT THE GET POINT');
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('theatre');
  db.collection('seats').find().toArray((err, result)=>{
    if (result.length > 0) {
      res.status(200).json({ status: 200, data: result });
      // client.close();
    }
    else if (result.length === 0) {
      console.log('result', result, 'error', err);
      res.status(404).json({ status: 404, data: "Nothing found" });
      // client.close();
    }
    else {
      res.status(404).json({ status: 404, data: 'Not Found?' });
      // client.close();
    } 
    client.close();
  });
}

const bookSeat = async (req, res) => {
  console.log('YOU HAVE HIT THE GET POINT');
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  let fullName = req.body.fullName;
  let email = req.body.email;
  let creditCard = req.body.creditCard;
  let expiration = req.body.expiration;
  let seatId = req.body.seatId;
  console.log('seatIdseatIdseatIdseatId',seatId);

  try {
    await client.connect();
    const db = client.db('theatre');

    let found = await db.collection('seats').findOne({ _id: seatId });
      console.log('foundfoundfoundfoundfound',found);
      if (!found) {
        res.status(400).json({ status: 400, message: "seatId not found" });
      }
      else {
        found = {...found, fullName, email, creditCard, expiration, isBooked : true };

        const query = { _id : seatId };
        const newValues = { $set: { ...found } };
        const r = await db.collection('seats').updateOne(query, newValues);
        assert.equal(1, r.matchedCount);
        assert.equal(1, r.modifiedCount);
        res.status(200).json({ status: 200, success: true, data: found });
      }
    // db.collection('seats').findOne({ _id: seatId }, (err, result) => {
    //   console.log('resultresultresultresultresult', result);
    //   if (result && result.length === 0) {
    //     res.status(400).json({ status: 400, message: "seatId not found" });
    //   }
    //   else if (result && result.length) {
    //     result = {...result, fullName, email, creditCard, expiration};
    //     res.status(201).json({ status: 201, data: req.body });
    //   }
    //   else {
    //     res.status(404).json({ status: 404, message: "Not found" });
    //   }
    // })
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
    // const r = await db.collection('seats').insertOne(req.body);
    // assert.equal(1, r.insertedCount);
    // res.status(201).json({ status: 201, data: req.body });
}





module.exports = { getSeats, bookSeat };


// await client.connect();
//   const db = client.db('exercises');

//   db.collection('two').findOne({ _id: _id.toUpperCase() }, (err, result) => {
//     result
//       ? res.status(200).json({ status: 200, _id, data: result })
//       : res.status(404).json({ status: 404, _id, data: 'Not Found' });
//     client.close();
//   });