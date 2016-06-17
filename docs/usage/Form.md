# Implementing the Form

Once we have created our component, setting up our form is pretty straight forward. As long as the input is a child of `Form`, it will have access to its API.
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
The state given to the `onChange()` and `onSubmit()` handlers is structured according to `id`'s, and their values are objects with information about the input.
```javascript
{
    name: {
        value: "John", // the current value of the input.
        errors: [], // an array of validation errors.
        valid: true // is the input valid.
    }
}
```
One problem with this structure is that it makes working with it hard. We cannot just pass the state directly as post data without first extracting `value`. To solve this,
the state comes with a `flatten()` method which removes all meta information. For example, applying `flatten()` to the above state will result in the following:
```javascript
{
    name: "John"
}
```
This is much easier to work with.

If you want to add your own custom validators to the form, pass them in as props.
```javascript
class App extends Component {

    /* ... */

    render() {
        const validators = {
            equals: (value, match) => {
                if (value != match) {
                    return {
                        valid: false,
                        error: `Value must equal ${match}`
                    }
                }
                return true
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

And that's pretty much it.