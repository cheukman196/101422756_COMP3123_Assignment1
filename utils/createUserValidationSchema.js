const createUserValidationSchema = {
    username: {
        isString: {
            errorMessage: 'Username should be a string.'
        },
        isLength: {
            options: {min: 8, max: 25},
            errorMessage: 'Username should be between 8 - 25 characters.'
        },
        notEmpty: {
            errorMessage: 'Username should not be empty.'
        }
    },

    password: {
        isString: {
            errorMessage: 'Password should be a string.'
        },
        isLength: {
            options: {min: 8, max: 32},
            errorMessage: 'Password should be between 8 - 32 characters.'
        },
        notEmpty: {
            errorMessage: 'Password should not be empty.'
        }
    },

    email: {
        isString: {
            errorMessage: 'Email should be a string.'
        },
        isEmail: {
            errorMessage: 'Email should be between 8 - 32 characters.'
        },
        notEmpty: {
            errorMessage: 'Email should not be empty.'
        }
    }
};



