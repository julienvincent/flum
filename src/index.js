import { createFactory } from 'react'
import Form from './Form'

export Form from './Form'
export Input from './Input'
export FormComponent from './FormComponent'

import _ from 'lodash'
export const flattenState = (state, search = false) => {
    if (search && state.value !== undefined) return state.value
    return _.mapValues(_.omitBy(state, val => typeof val === 'function'), val => flattenState(val, true))
}

export default createFactory(Form)