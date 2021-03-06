// @flow
import Validators from './Validators'
import _ from 'lodash'

import type { Field, State } from '../types'

/* Utility that splits a string up first by the
 * character '|' and then further more by the
 * character ':'.
 * */
const splitValidationRule = (rule: ?string, cb: Function) => {
	rule = rule || ""
	_.forEach(rule.split("|"), splitRule => {
		splitRule = splitRule.split(":")
		return cb(splitRule[0], _.without(splitRule, splitRule[0]))
	})
}

/* Given a Field, validate it based on its local
 * validation string.
 * */
export const validateField = (field: Field): Field => {
	const validators = {
		...Validators,
		...field.validators
	}

	let nextFieldState = {
		...field,
		valid: true,
		error: null
	}

	splitValidationRule(field.validation, (name, args) => {
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

	if (field.pattern) {
		if (!field.pattern.test(field.value)) {
			nextFieldState = {
				...field,
				valid: false,
				error: field.patternError || "Validation failed"
			}
		}
	}

	return nextFieldState
}

type ValidatedState = {
	valid: boolean,
	state: State
}

/* Given a Field, validate it based on its global
 * validation string. This validation property is
 * not used internally by Flum.
 * */
export const validateState = (state: State): ValidatedState => {
	let valid = true

	const validate = (field: Field) => {
		const validators = {
			...Validators,
			...field.validators
		}

		const localValidatedField: Field = validateField(field)
		let globalValidatedField: Field = {...localValidatedField}
		valid = !valid ? valid : localValidatedField.valid

		splitValidationRule(field.postValidation, (name, args) => {
			const validator = _.find(validators, (validator, key) => key == name)

			if (validator) {
				const res = validator({
					value: field.value,
					state,
					args: args
				})

				globalValidatedField = {
					...localValidatedField,
					valid: res.valid ? localValidatedField.valid : false
				}
				globalValidatedField.error = res.error ?
					res.error :
					(!globalValidatedField.valid ? localValidatedField.error : null)

				valid = !valid ? valid : globalValidatedField.valid

				return res.valid
			}
		})

		return globalValidatedField
	}

	const mapAndValidate = (state: State | Object) =>
		_.mapValues(state, (data: Field | any) => {
			if (typeof data !== 'object') return data
			if (data.__flum) return validate(data)
			return mapAndValidate(data)
		})
	const nextState = mapAndValidate(state)

	return {
		valid,
		state: nextState
	}
}