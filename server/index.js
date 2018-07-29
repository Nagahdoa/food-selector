const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    id: Number,
    name: String,
    tpnb: Number,
    image: String,
    price: Number,
    unitprice: Number,
    department: String,
    unitOfSale: String,
    description: Array,
    unitQuantity: String,
    superDepartment: String,
    contentsQuantity: Number,
    contentsMeasureType: String,
    averageSellingUnitWeight: Number,
    productStatus: String
});

mongoose.connect('mongodb://foodman:Password1!@ds247001.mlab.com:47001/foodlists');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db opened');
});

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3131;

app.use(bodyParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const Food = mongoose.model('Food', foodSchema);

app.post('/saveFood', (req, res) => {
    const product = req.body;
    const food = new Food(product);
    food.save(
        function (err, savedFood) {
            if (err) {
                return console.error(err);
            }
            console.log('it saved', savedFood);
        }
    );
    res.send(req.body);  
});

app.get('/getFoods', (req, res) => {
    Food.find({}, function(err, foods) {
        const badFoods = foods.filter(food => food.productStatus === 'bad');
        const goodFoods = foods.filter(food => food.productStatus === 'good');
        res.send({
            badFoods,
            goodFoods
        });
    });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
