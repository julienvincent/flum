import { Component, PropTypes } from 'react'
import { validateField } from '../Utils/Validation'
import { buildState } from '../Utils/Tools'
import _ from 'lodash'

export default
class ValidationWrapper extends Component {

   static propTypes = {
      children: PropTypes.func,

      state: PropTypes.object,
      id: PropTypes.string,

      onChange: PropTypes.func,

      validation: PropTypes.string,
      postValidation: PropTypes.string,

      validators: PropTypes.object
   }

   componentDidMount() {
      this.onChange()
   }

   getDefaultState = () => ({
      value: null,
      error: null,
      valid: true
   })

   getValue = () => {
      const {state, id} = this.props
      if (id) return _.result(state, id, this.getDefaultState())
      return {
         ...this.getDefaultState(),
         ...state || {}
      }
   }

   buildField = value => {
      const {validation, validators, postValidation} = this.props

      const fieldData = this.getValue()

      return {
         ...fieldData,
         validators,
         validation,
         postValidation,
         value: value === undefined ? fieldData.value : value,
         __flum: true
      }
   }

   onChange = (value: any) => {
      const {onChange, state, id} = this.props
      const field = this.buildField(value)

      onChange(
         buildState(state, validateField(field), id)
      )
   }

   render() {
      const {children} = this.props
      const state = this.getValue()

      return children ? children({
         value: state.value,
         error: state.error,
         valid: state.valid,
         onChange: this.onChange
      }) : null
   }
}