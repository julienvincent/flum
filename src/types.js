// @flow

export type Field = {
    value: ?any,
    error: ?string,
    valid: boolean,
    localValidation: ?string,
    globalValidation: ?string,
    validators: ?{[key: string]: Function}
}

export type State = {[id: string]: Field}