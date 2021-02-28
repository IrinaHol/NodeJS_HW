const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    model: { type: String },
    year: { type: Number },
    price: { type: Number }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('Car', carSchema);
