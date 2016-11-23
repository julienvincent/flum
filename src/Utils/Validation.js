// @flow
import Validators from './Validators'
import _ from 'lodash'

import type { Field, State } from '../types'

const splitValidationRule = (rule: string = "", cb: Function) => {
    _.forEach(rule.split("|"), splitRule => {
        splitRule = splitRule.split(":")
        return cb(splitRule[0], _.without(splitRule, splitRule[0]))
    })
}

export const validateField = (field: Field): Field => {
    const validators = {
        ...Validators,
        ...field.validators
    }

    let nextFieldState = {...field}

    splitValidationRule(field.localValidation, (name, args) => {
        const validator = _.find(validators, (validator, key) => key == name)

        if (validator && field.value && field.value != "") {
            const res = validator({
                value: field.value,
                args
            })

            nextFieldState = {
                ...field,
                error: null,
                ...res
            }

            return res.valid
        }
    })

    return nextFieldState
}

export const validateState = (state: State): State => {
    let valid = true

    const nextState = _.mapValues(state, (field: Field) => {
        const validators = {
            ...Validators,
            ...field.validators
        }

        const localValidatedField: Field = validateField(field)
        let globalValidatedField: Field = {...localValidatedField}
        valid = !valid ? valid : localValidatedField.valid

        splitValidationRule(field.globalValidation, (name, args) => {
            const validator = _.find(validators, (validator, key) => key == name)

            if (validator) {
                const res = validator({
                    value: field.value,
                    state,
                    args: args
                })

                globalValidatedField = {
                    ...localValidatedField,
                    ...res,
                    valid: res.valid ? localValidatedField.valid : false,
                    ...res
                }
                valid = !valid ? valid : globalValidatedField.valid

                return res.valid
            }
        })

        return globalValidatedField
    })

    return {
        valid,
        state: nextState
    }
}