// @flow
import _ from 'lodash'

import type { State, Field } from '../types'

/* Utility that flattens a piece of state by
 * selecting each keys 'value' property.
 * */
export const flattenState = (state: State) =>
    _.mapValues(state, ({value}: Field): any => value)