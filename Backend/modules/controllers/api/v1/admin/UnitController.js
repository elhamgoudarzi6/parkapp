const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class UnitController extends Controller {

    advanceSearchUnit(req, res) {
        let query = {};
        let sort = '';
        let select = req.body.select;
        if (req.body.companyID) {
            query.companyID = req.body.companyID;
        }
        if (req.body.ceoID) {
            query.ceoID = req.body.ceoID;
        }
        if (req.body.ceoPhone) {
            query.ceoPhone = req.body.ceoPhone;
        }
        if (req.body.ceoFullName) {
            query.ceoFullName = req.body.ceoFullName;
        }
        if (req.body.companyName) {
            query.companyName = req.body.companyName;
        }
        if (req.body.unitType) {
            query.unitType = req.body.unitType;
        }
        if (req.body.admissionDateMin && req.body.admissionDateMax) {
            query.admissionDate = { $gte: req.body.admissionDateMin, $lte: req.body.admissionDateMax };
        }
        if (req.body.members) {
            query.members = { $elemMatch: { fullName: { $in: req.body.members } } };
        }
        if (req.body.updatedAt) {
            sort = { updatedAt: req.body.updatedAt };
        }
        this.model.Unit.find(query, { "_id": 0 }).select(select).sort(sort)
            .exec((err, result) => {
                if (err) throw err;
                if (result) {
                    return res.json({
                        data: result,
                        success: true
                    });
                }
            });
    }

    getAllUnit(req, res) {
        this.model.Unit.find({}).exec((err, Result) => {
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

    getUnit(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Unit.findById(req.params.id, (err, Result) => {
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

    registerUnit(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        let newUnit = new this.model.Unit({
            unitType: req.body.unitType,
            companyName: req.body.companyName,
            ceoFullName: req.body.ceoFullName,
            ceoMobile: req.body.ceoMobile,
            ceoPhone: req.body.ceoPhone,
            ceoID: req.body.ceoID,
            members: req.body.members,
            idea: req.body.idea,
            companyID: req.body.companyID,
            admissionDate: req.body.admissionDate,
            team: req.body.team,
            admissionNum: req.body.admissionNum,
            unitStatus: req.body.unitStatus,
            outDate: req.body.outDate,
            outNum: req.body.outNum,
            unitLocation: req.body.unitLocation,
            address: req.body.address,
        })
        newUnit.save(err => {
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

    updateUnit(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Unit.findByIdAndUpdate(req.params.id, {
            unitType: req.body.unitType,
            companyName: req.body.companyName,
            ceoFullName: req.body.ceoFullName,
            ceoMobile: req.body.ceoMobile,
            ceoPhone: req.body.ceoPhone,
            ceoID: req.body.ceoID,
            members: req.body.members,
            idea: req.body.idea,
            companyID: req.body.companyID,
            admissionDate: req.body.admissionDate,
            team: req.body.team,
            admissionNum: req.body.admissionNum,
            unitStatus: req.body.unitStatus,
            outDate: req.body.outDate,
            outNum: req.body.outNum,
            unitLocation: req.body.unitLocation,
            address: req.body.address,
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

    deleteUnit(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Unit.findByIdAndRemove(req.params.id, (err, Result) => {
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
