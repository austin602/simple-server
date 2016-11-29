//load in the mongoose nodejs package.
var mongoose = require ('mongoose');

//grab the schema object from mongoose.
var Schema = mongoose.Schema;

//create the model schema.
var productSchema = new Schema ({
    name: String,
    description: String,
    price: Number,
    imageUrl: String
});

//create the model object.
var Product = mongoose.model ('Product' , productSchema);

//make the model object available to
//other NodeJs modules.
module.exports = Product;
