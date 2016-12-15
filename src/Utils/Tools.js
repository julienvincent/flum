// @flow
import _ from 'lodash'

import type { State, Field } from '../types'

/* Utility that flattens a piece of state by
 * selecting each keys 'value' property.
 * */
export const flattenState = (state: State) =>
   _.mapValues(state, (piece: Field | any): any => {
      if (typeof piece !== 'object') return piece
      if (piece.__flum) return piece.value
      return flattenState(piece)
   })

export const buildState = (state: State, field: Field, path: string): State => {
   if (path) {
      const keys: Array<string> = path.split(".")

      const setIn = (state: State = {}): State => {
         if (keys.length == 1) return field
         keys.splice(0, 1)
         return {
            ...state,
            [keys[0]]: setIn(state[keys[0]])
         }
      }

      return {
         ...state,
         [keys[0]]: setIn(state[keys[0]])
      }
   }
   return field
}