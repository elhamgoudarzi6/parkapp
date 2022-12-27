const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UnitSchema = new Schema({
    unitType: { type: String, required: true },
    companyName: { type: String },
    ceoFullName: { type: String, required: true },
    ceoMobile: { type: String, required: true },
    ceoPhone: { type: String, required: true },
    ceoID: { type: String, required: true },
    members: [{ fullName: String, mobile: String, nationalCode: String, position: String }],
    team: [{ fullName: String, nationalCode: String, position: String }],
    idea: [{ title: String, dateIn: String, dateOut: String }],
    companyID: { type: String },
    admissionDate: { type: String },
    admissionNum: { type: String },
    unitStatus: { type: String },
    outDate: { type: String },
    outNum: { type: String },
    unitLocation: { type: String },
    address: { type: String },
});
module.exports = mongoose.model('Unit', UnitSchema);
