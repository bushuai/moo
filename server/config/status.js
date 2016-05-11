/*global require,module*/
var status = {
    ok: 200,
    invalid_input: 401,
    not_found: 404,
    error: {
        sig: 1001, 
        ver: 1002,
        err_client_ver: 1003, 
        invalid_token: 1004,
        permission_deny: 1005, 
        server_error: 500, 
        unknown: 404,
        unknown_format: 406
    },
    user_error: {
        invalid_user: 1001,
        check_user_err: 1002,
        invalid_name_or_password: 1003,
        name_exists: 1004,
        email_exists: 1005,
        change_user: 1006,
        invalid_password: 1007,
        get_user_err: 1008,
        update_pwd_err: 1008,
        update_error:1009
    },
    note_error: {
        add_err: 2001,
        get_list_err: 2002,
        get_err: 2003,
        update_err: 2004,
        publish_err: 2005,
        unpublish_err: 2006,
        delete_err: 2007
    }
};


exports = module.exports = status;
