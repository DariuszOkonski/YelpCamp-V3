const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected for seed...');
});

const seeDB = async () => {
  await Campground.deleteMany({});
  // const c = new Campground({ title: 'purple field' });
  // await c.save();

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random * cities.length);
    new Campground({
      location: `${cities[random1000].city}, ${cities[random].state}`,
    });
  }
};

seeDB();
