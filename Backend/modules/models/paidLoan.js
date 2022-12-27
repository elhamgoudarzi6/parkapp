const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaidLoanSchema = new Schema({
    unitID: { type: mongoose.Schema.ObjectId, require, ref: 'Unit' },
    guarantors: [{ fullName: String, mobile: String, nationalCode: String }],
    approvedAmount: { type: String },
    amountPayable: { type: String },
    approvalType: { type: String },
    meetingDate: { type: String },
    meetingNumber: { type: String },
    paymentDate: { type: String },
    paymentDateFirst: { type: String },
    paymentDateSecond: { type: String },
    paymentDateThird: { type: String },
    InstallmentNumber: { type: String },
    InstallmentRemainNumber: { type: String },
    breathingTime: { type: String },
    paymentPlace: { type: String },
}, { toJSON: { virtuals: true } });
PaidLoanSchema.virtual('Unit', {
    ref: 'Unit',
    localField: 'unitID',
    foreignField: '_id',
});
module.exports = mongoose.model('PaidLoan', PaidLoanSchema);
