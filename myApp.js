require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
let PersonSchema = new Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String],
});
let Person = mongoose.model("Person", PersonSchema);

const createAndSavePerson = (done) => {
  // done(null /*, data*/);
  const Tesfa = {
    name: "Tesfalidet",
    age: 26,
    favoriteFoods: ["Fish", "Burger"],
  };
  Person.create(Tesfa, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Yabsera", age: 18, favoriteFoods: ["Injera", "Pasta"] },
  { name: "Abu", age: 2, favoriteFoods: ["Pizza", "Pasta"] },
  { name: "Yabsera", age: 18, favoriteFoods: ["Injera", "Pasta"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  // done(null /*, data*/);
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  // done(null /*, data*/);
  Person.findOneByFood({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  // done(null /*, data*/);
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(er);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // done(null /*, data*/);
  Person.findById({ _id: personId }, (err, Person) => {
    if (err) return console.error(err);
    Person.favoriteFoods.push(foodToAdd);
    Person.save((err, updateDoc) => {
      if (err) return console.error(err);
      done(null, updateDoc);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // done(null /*, data*/);
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.error(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  // done(null /*, data*/);
  Person.findByIdAndRemove({ _id: personId }, (err, removeDoc) => {
    if (err) return console.error(err);
    done(null, removeDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // done(null /*, data*/);
  Person.remove({ name: nameToRemove }, (err, removeDocs) => {
    if (err) return console.error(err);
    done(null, removeDocs);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // done(null /*, data*/);
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
