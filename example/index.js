import React, { Component } from 'react'
import { render } from 'react-dom'

import { Form, FormComponent, ValidationWrapper, validateState, flattenState } from '../src'

class Input extends Component {

   static validators = {
      is5({value}) {
         if (parseInt(value) == 5) return {valid: true}
         return {valid: false, error: "is not 5"}
      }
   }

   render() {
      return <input value={this.props.value || ""} onChange={e => this.props.onChange(e.target.value)} />
   }
}

class App extends Component {

   state = {}

   onChange = state => {
      console.log(state)
      console.log(flattenState(state))
      console.log(validateState(state))
      this.setState(state)
   }

   render() {
      return (
         <div>
            <Form state={this.state} onChange={this.onChange}>
               <div>
                  <FormComponent id="firstName" validation="letters" postValidation="required">
                     {({value, onChange}) => <input value={value || ""} onChange={e => onChange(e.target.value)} />}
                  </FormComponent>

                  <FormComponent
                     id="confirm" globalValidation="matches:firstName"
                     component={Input} />
               </div>
            </Form>

            <ValidationWrapper state={this.state.lastneem} onChange={state => this.onChange({...this.state, lastneem: state})} validation="awesome">
               {({value, onChange}) =>
                  <input type="text" onChange={e => onChange(e.target.value)} value={value || ""} />
               }
            </ValidationWrapper>
         </div>
      )
   }
}

window.onload = () => {
   render(<App />, document.getElementById('root'))
}