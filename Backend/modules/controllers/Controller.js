// Model
const Admin= require(`${config.path.model}/admin`);
const User = require(`${config.path.model}/user`);
const Unit = require(`${config.path.model}/unit`);
const PaidLoan = require(`${config.path.model}/paidLoan`);

module.exports = class Controller {
    constructor() {
        this.model = { Admin,User,PaidLoan,Unit
    }
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
