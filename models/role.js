const AccessControl = require("accesscontrol");
const User = require("./user");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant('basic')
    .readAny('post')
    .readAny('event')
    .readAny('profile')
    .updateOwn('profile')

    ac.grant('contributor')
    .extend('basic')
    .createOwn('post')
    .deleteOwn('post')
    .createOwn('event')
    .deleteOwn('event')

    ac.grant('admin')
    .extend('basic')
    .extend('contributor')
    .updateAny('post')
    .updateAny('event')
    .updateAny('profile')
    .deleteAny('profile')
    
    return ac;
})();
