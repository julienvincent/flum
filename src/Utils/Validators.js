import _ from 'lodash'

export default {
    "min-length"({value, args}) {
        const [amount] = args
        if (value.length > amount) return {
            valid: true
        }

        return {
            valid: false,
            error: `Must be more than ${amount} characters`
        }
    },

    "max-length"({value, args}) {
        const [amount] = args
        if (value.length < amount) return {
            valid: true
        }

        return {
            valid: false,
            error: `Must be less than ${amount} characters`
        }
    },

    min({value, args}) {
        const [amount] = args
        if (value >= amount) return {
            valid: true
        }

        return {
            valid: false,
            error: `Cannot be less than ${amount}`
        }
    },

    max({value, args}) {
        const [amount] = args
        if (value <= amount) return {
            valid: true
        }

        return {
            valid: false,
            error: `Cannot be more than ${amount}`
        }
    },

    between({value, args}) {
        const [min, max] = args
        if (value.length < max && value.length > min) return {
            valid: true
        }

        return {
            valid: false,
            error: `Must be between ${min} and ${max}`
        }
    },

    numeric({value}) {
        if (value == '' || /^[0-9]*$/.test(value)) return {
            valid: true
        }

        return {
            valid: false,
            error: "Can only contain numbers"
        }
    },

    letters({value}) {
        if (value == '' || /^[A-z ]*$/.test(value)) return {
            valid: true
        }

        return {
            valid: false,
            error: "Cannot contain letters"
        }
    },

    alphanumeric({value}) {
        if (value == '' || /^[A-z0-9]*$/.test(value)) return {
            valid: true
        }

        return {
            valid: false,
            error: "Can only contain numbers and letters"
        }
    },

    email({value}) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(value)) return {
            valid: true
        }

        return {
            valid: false,
            error: "Must be a valid email address"
        }
    },

    equals({value, args}) {
        if (_.find(args, val => val == value)) return {
            valid: true
        }

        return {
            valid: false,
            error: "Invalid"
        }
    },

    required({value}) {
        if (value && value != "") return {
            valid: true
        }

        return {
            valid: false,
            error: "Required"
        }
    },

    matches({value, args, state}) {
        const [path] = args
        const field = _.get(state, path, {})
        if (field && value == field.value) return {valid: true}

        const split = path.split(".")
        return {
            valid: false,
            error: `Must match ${split[split.length - 1]}`
        }
    }
}