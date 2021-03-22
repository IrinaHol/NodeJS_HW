const { Schema, model } = require('mongoose');
const { O_AUTH, USER } = require('../../constant/dataBaseTables.enum');

const oAuthSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER },
}, { timestamps: true });

module.exports = model(O_AUTH, oAuthSchema);
