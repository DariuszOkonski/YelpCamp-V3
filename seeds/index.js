const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors, lorem } = require('./seedHelpers');

// https://picsum.photos/400?random=${Math.random()}

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected for seed...');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seeDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 20) + 10;
    const randomLorem = lorem[Math.floor(Math.random() * lorem.length)];

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: randomLorem,
      price,
    });

    await camp.save();
  }
};

seeDB()
  .then(() => {
    console.log('Seeded...');
  })
  .catch((e) => console.log('Error occured...'))
  .finally(() => {
    mongoose.connection.close();
    console.log('Database connection closed...');
  });
