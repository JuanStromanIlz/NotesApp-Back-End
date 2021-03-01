const AccessControl = require("accesscontrol");

const roles = {
    client: {
        event: {
            "create:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
            "read:own": ["*"]
        }
    },
    admin: {
        user: {
            "delete:any": ["*"]
        },
        event: {
            "delete:any": ["*"],
            "create:any": ["*"],
            "update:any": ["*"],
            "read:any": ["*"]
        }
    }
};

    //     .createOwn("event")
    //     .updateOwn("event")
    //     .deleteOwn("event")
    //     .readOwn("event")
     
    // ac.grant("admin")
    //  .deleteAny("user")
    //  .createAny("event")
    //  .updateAny("event")
    //  .deleteAny("event")
    //  .readAny("event")
module.exports = new AccessControl(roles);