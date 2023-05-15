const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/fruitDB");

const fruitSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = new mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
    name: 'Kiwi',
    rating: 1,
    review: 'Nothing!'
});

const pineapple = new Fruit({
    name: 'Pineapple',
    rating: 8,
    review: 'Pineapple so yummy'
})

pineapple.save().then(() => console.log('Pineapple is added'));
// fruit.save().then(() => console.log('Fruit added ...'));
// let res = Fruit.updateOne({_id: "642643de2b5bd378d0f7b456"}, {name: 'Peach', review: 'Peaches is so yummy!'});
// res.then((docs, err) => {
//     if (err){
//         // console.log(err);
//     } else{
//         console.log(docs);
//     }
// })
Fruit.deleteMany({name: 'Kiwi'}).then((docs, err) => {
    if (err){
        console.log(err);
    } else {
        console.log(docs);
    }
});


let callback = ((docs) => {
    //mongoose.connection.close();
    docs.forEach(element => {
        console.log(element.name);
    });
});

Fruit.find({}).exec().then(callback).catch((err) => {
    console.log(err);
});


const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    major: String,
    favoriteFood: fruitSchema
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: 'Huy',
    age: 26,
    major: 'Penetration Tester',
    favoriteFood: pineapple
});

// person.save().then(()=> console.log('1 person added!'))

// const person2 = new Person({
//     name: 'Uyen',
//     age: 21,
//     major: 'Supporter'
// });

// Person.insertMany([person, person2]).then((err) => {
//     if (err){
//         console.log(err);
//     } else{
//         console.log('Added successfully !!');
//     }
// });