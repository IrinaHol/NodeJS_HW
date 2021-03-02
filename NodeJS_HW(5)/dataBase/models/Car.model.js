const { Schema, model } = require('mongoose');
const { CAR } = require('../../constant/dataBaseTables.enum');

const carSchema = new Schema({
    model: { type: String },
    year: { type: Number },
    price: { type: Number }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(CAR, carSchema);
