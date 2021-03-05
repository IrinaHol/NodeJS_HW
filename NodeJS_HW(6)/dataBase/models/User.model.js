const { Schema, model } = require('mongoose');
const { USER, CAR } = require('../../constant/dataBaseTables.enum');

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('full_data_user').get(function() {
    return `${this.name} ${this.age}`;
});

userSchema.virtual('userCars', {
    ref: CAR,
    localField: 'cars',
    foreignField: '_id'
});

userSchema
    .pre('find', function() {
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model(USER, userSchema);
