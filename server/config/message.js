var ERROR = {
    USER_FOLLOW: {
        error: {
            msg: 'FOLLOWING FAILED',
            code: 1001,
            ret: false
        },
        success: {
            msg: 'FOLLOWING SUCCESS',
            code: 1002,
            ret: true
        },
    },
    USER_UNFOLLOW: {
        error: {
            msg: 'UNFOLLOW FAILED',
            code: 1003,
            ret: false
        },
        success: {
            msg: 'UNFOLLOW SUCCESS',
            code: 1004,
            ret: true
        }
    },
    USER_LOGIN: {
        USERNAME: {
            NOT_EXISTS: {
                msg: 'USERNAME IS NOT EXISTS',
                ret: false
            }
        },
        PASSWORD: {
            INVALID: {
                msg: 'PASSWORD NOT CORRECT',
                ret: true
            }
        }
    }
}
