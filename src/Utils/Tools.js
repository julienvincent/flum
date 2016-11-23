// @flow
import _ from 'lodash'

import type { State, Field } from '../types'

export const flattenState = (state: State) =>
    _.mapValues(state, ({value}: Field): any => value)