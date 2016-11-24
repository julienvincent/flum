# Implementing the Form

Now that we understand how data is passed up to the form, we can setup a basic form. Flum's `Form` component is just another controlled component which means the
developer will always have control of the state. 

State validation is only _partly_ handled by the `Form` component. Flum is not actually a 'form' in the general sense and so we do not have a `submit` hook. 
This means there is no logical way to automatically run a `globalValidation` process on state - only `localValidation` is automatically applied, and is applied
during the `onChange` call.

Here is how we would go about implementing some basic form logic.

```javascript
import React, { Component } from 'react'
import { Form, FormComponent, validateState, flattenState } from 'react-context-form'

class App extends Component {
    
    state = {}

    onChange = state =>
        /* This is our validated state (localValidation) */
        this.setState(state)

    submit = () => {
            
        /* When the form is 'submitted' we want to validate
         * out state. calling validateState will apply 
         * all globalValidators to our fields.
         * */
        const {valid, state} = validateState(this.state)

        if (valid) {
            
            /* At the moment our state is made up of Fields,
             * which is hard to work with. calling flattenState()
             * will convert our state from Fields to key => value
             * */
            post(flattenState(state))
        }
    }

    render() {
        return (
            <Form state={this.state} onChange={this.onChange}>
                <div className="form">
                    <FormComponent id="firstName" localValidation="letters" globalValidation="required">
                        {({value, onChange}) => 
                            <input value={value || ""} onChange={e => onChange(e.target.value)} />
                        }
                    </FormComponent>
                    
                    <FormComponent id="password" localValidation="min:10" globalValidation="required" >
                        {({value, onChange}) => 
                            <input value={value || ""} onChange={e => onChange(e.target.value)} />
                        }
                    </FormComponent>
                                        
                    <FormComponent id="confirm_password" globalValidation="required|matches:password" >
                        {({value, onChange}) => 
                            <input value={value || ""} onChange={e => onChange(e.target.value)} />
                        }
                    </FormComponent>
                    
                    <button onClick={this.submit}>Register</button>
                </div>
            </Form>
        )
    }
}
```