import _ from 'lodash'

const reply = error => {
    if (error) {
        return {
            valid: false,
            error
        }
    }

    return true
}

const validators = {
    min: (value, amount) => {
        if (!amount) {
            throw new Error("The min validator requires a parameter")
        }

        if (value.length > amount) {
            return reply()
        } else {
            return reply(`Must be greater than ${amount} characters`)
        }
    },

    max: (value, amount) => {
        if (!amount) {
            throw new Error("The max validator requires a parameter")
        }

        if (value.length < amount) {
            return reply()
        } else {
            return reply(`Must be less than ${amount} characters`)
        }
    },

    between: (value, min, max) => {
        if (!max) {
            throw new Error("The between validator requires two parameters")
        }

        if (value.length < max && value.length > min) {
            return reply()
        } else {
            return reply(`Must be between the amounts ${min} and ${max}`)
        }
    },

    numeric: value => {
        if (value == '' || /^[0-9]*$/.test(value)) {
            return reply()
        } else {
            return reply("Can only contain numbers")
        }
    },
    
    string: value => {
        if (value == '' || /[A-z !@#$%¨&*()-=+/*.]/.test(value)) {
            return reply()
        } else {
            return reply("Cannot contain numbers")
        }
    },

    alphanumeric: value => {
        if (value == '' || /^[A-z0-9]*$/.test(value)) {
            return reply()
        } else {
            return reply("Can only contain numbers and letters")
        }
    },

    email: value => {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(value)) {
            return reply()
        } else {
            return reply("Must be a valid email")
        }
    },
    
    equals: (value, ...values) => {
        if (_.find(values, val => val == value)) {
            return reply()
        } else {
            return reply("Invalid")
        }
    }
}

export { validators }