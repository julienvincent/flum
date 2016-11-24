// @flow

export type Field = {
    value: ?any,
    error: ?string,
    valid: boolean,
    localValidation: ?string,
    globalValidation: ?string,
    validators: ?{[key: string]: Function},
    __flum: ?boolean
}

export type State = {[id: string]: Field}