const AccessControl = require("accesscontrol");
const ac = new AccessControl();

//Seems to define methods accessble based on User model roles
exports.roles = (function () {
    ac.grant('basic')//.grant defines role
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
