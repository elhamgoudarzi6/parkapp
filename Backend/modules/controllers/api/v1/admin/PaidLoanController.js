const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class PaidLoanController extends Controller {
    getAllPaidLoan(req, res) {
        this.model.PaidLoan.find({}).populate('Unit').exec((err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: Result,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    getPaidLoan(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.PaidLoan.findById(req.params.id, (err, Result) => {
            if (Result) {
                return res.json({
                    data: Result,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    registerPaidLoan(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        let newPaidLoan = new this.model.PaidLoan({
            unitID: req.body.unitID,
            guarantors: req.body.guarantors,
            approvedAmount: req.body.approvedAmount,
            amountPayable: req.body.amountPayable,
            approvalType: req.body.approvalType,
            meetingDate: req.body.meetingDate,
            meetingNumber: req.body.meetingNumber,
            paymentDate: req.body.paymentDate,
            paymentDateFirst: req.body.paymentDateFirst,
            paymentDateSecond: req.body.paymentDateSecond,
            paymentDateThird: req.body.paymentDateThird,
            InstallmentNumber: req.body.InstallmentNumber,
            InstallmentRemainNumber: req.body.InstallmentRemainNumber,
            breathingTime: req.body.breathingTime,
            paymentPlace: req.body.paymentPlace,
        })
        newPaidLoan.save(err => {
            if (err) return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: 'با موفقیت ثبت شد',
                success: true
            });
        })
    }

    updatePaidLoan(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.PaidLoan.findByIdAndUpdate(req.params.id, {
            unitID: req.body.unitID,
            guarantors: req.body.guarantors,
            approvedAmount: req.body.approvedAmount,
            amountPayable: req.body.amountPayable,
            approvalType: req.body.approvalType,
            meetingDate: req.body.meetingDate,
            meetingNumber: req.body.meetingNumber,
            paymentDate: req.body.paymentDate,
            paymentDateFirst: req.body.paymentDateFirst,
            paymentDateSecond: req.body.paymentDateSecond,
            paymentDateThird: req.body.paymentDateThird,
            breathingTime: req.body.breathingTime,
            InstallmentNumber: req.body.InstallmentNumber,
            InstallmentRemainNumber: req.body.InstallmentRemainNumber,
            breathingTime: req.body.breathingTime,
            paymentPlace: req.body.paymentPlace,
        }, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deletePaidLoan(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.PaidLoan.findByIdAndRemove(req.params.id, (err, Result) => {
            if (err) throw err;
            if (Result) {
                return res.json({
                    data: 'با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
}
