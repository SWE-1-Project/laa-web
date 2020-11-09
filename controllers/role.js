const AccessControl = require("accesscontrol");
const ac = new AccessControl();

//Seems to define methods accessble based on User model roles
exports.roles = (function () {
    ac.grant("basic")//.grant defines role
    .readOwn("profile")
    .updateOwn("profile")

    ac.grant("contributor")
    .extend("basic")
    .readAny("profile")

    ac.grant("admin")
    .extend("basic")//meaning .grant shares aspects of roles in .extend
    .extend("contributor")
    .updateAny("profile")
    .deleteAny("profile")

    return ac;
})();
