// @flow

export type Field = {
	value: ?any,
	error: ?string,
	valid: boolean,
	validation: ?string,
	postValidation: ?string,
	validators: ?{[key: string]: Function},
	__flum: ?boolean
}

export type State = {[id: string]: Field}