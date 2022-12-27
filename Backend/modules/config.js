const path = require('path');
const bcrypt = require('bcrypt');
module.exports = {
    port :3368,
    host:'http://localhost:',
	uploadUrl:'http://localhost:3368/',
	deleteUrl:'',
    secret :'sadas@!$@#%!^#!GSDGETWT@#OI%J@#%!*#)^U#)^U!@)U',
    path : {
        controllers : {
            api : path.resolve('./modules/controllers/api'),
            web : path.resolve('./modules/controllers/web')
        },
        model : path.resolve('./modules/models'),
        transform : path.resolve('./modules/transforms'),
        controller : path.resolve('./modules/controllers'),
    }
}
