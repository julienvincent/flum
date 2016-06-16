# Implementing the Form

Once we have created our input component, setting up our form is pretty straight forward. As long as the input is a child of `Form`, it will have access to its API.
```javascript
import React, { Component } from 'react'
import { Form } from 'react-context-form'
import Input from './Input.js'

class App extends Component {

    onChange = state => {
        // do something with changed state
    }

    onSubmit = checkedState => {
        const {valid, state} = checkedState

        if (valid) {
            post(state.flatten())
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                onChange={this.onChange}>
                <div className="field">
                    <Input id="name" validation="alphanumeric|required"></Input>
                </div>
            </Form>
        )
    }
}
```

If you want to add your own custom validators to the form, pass them in as props.
```javascript
class App extends Component {

    /* ... */

    render() {
        const validators = {
            equals: (value, match) => {
                if (value == match) return {valid: true}
                return {
                    valid: false,
                    error: `Value must equal ${match}`
                }
            }
        }

        return (
            <Form
                validators={validators}>
                <div className="field">
                    <Input id="name" validation="equals:James|alphanumeric|required"></Input>
                </div>
            </Form>
        )
    }
}
```