# react-basic-forms

Yep. Another forms library for react. I just had to add my own to the never ending list of form libraries. This one aims at solving the very basics
problem of a form - validation, and only validation - while giving the developer full control over the form components. The only form component
provided is a simple Input component, and is only meant as an example of how to use the Form API.

## Usage example

```javascript
import {Form, Input} from 'forms'

class App extends Component {

    render() {
        return Form({onSubmit: checkedState => {}, onChange: state => {}, validators: {
            equals: (value, pattern) => {
                if (value == pattern) {
                    return {valid: true}
                }
                return {
                    valid: false,
                    error: `must equal ${pattern}`
                }
            }
        }},
            Input({id: 'name', validation: 'alphanumeric|min:10|equals:John|required'})
        )
    }
}
```

## API

### Form

Wraps children in a `form` DOM element and provides its API via context to children components.

#### Props

##### `onChange(state)`

Called when any of the fields under the form change. The state of all fields is given as the first parameter. Fields will formatted as
an object containing the following properties.

+ `valid [boolean]` - Weather the field has passed its validation or not.
+ `errors [array]` - An array of validation errors. Empty if all validation has passed.
+ `value [any]` - The input components proposed value.

Fields will be in a namespace according to their `id`. For instance, a field with an id of `user.firstname` will yield a state tree of:

```javascript
{
    user: {
        firstname: {
            valid: false/false,
            errors: [...],
            value: ''
        }
    }
}
```


##### `onSubmit(checkedState)`

Called when the form is submitted. Submitting the form first checks each fields `match` and `required` validation properties (If specified) and then
returns an object with the following properties:

+ `valid [boolean]` - Weather all fields in the form have passed their respective validation requirements or not.
+ `state [object]` - The state of the form. Follows the above specified pattern.

##### `validators(validators)`

If you would like to specify your own validators, then you can provide them here. Accepts an object whose keys are the names of the validators and whose values are functions that must
return a validation object. The validators get given a `value` as the first argument, and component specified validator properties as all following parameters. For instance `min:20` will call
the `min` validator with the fields `value` as the first argument and `20` as its second argument. The returned validation object should have the following properties:

+ `valid [boolean]` - Weather or not the validation passed.
+ `error [string]` - The error to give to add to state.

##### `getFields(getter)`

A utility method to allow access to the forms fields on call. Accepts a getter function which provides a function to fetch the forms state as its first parameter.

Here is an example of its usage:
```javascript
class App extends Component {

    someMethod() {
        this.getFields() // The state of the form at this moment
    }

    render() {
        return Form({getFields: getter => this.getFields = getter},
            ...
        )
    }
}
```

#### Context

The component facing API is provided via context. Children have access to it via a `form` context of type object.

##### `register(component)`

Allows the component to register itself with the parent form so that the form is aware of its fields. Must provide an object containing the following properties:

+ `id [string]` - The id of the components. This property is used to identify the component in the forms state and must be unique. `Required`
+ `validation [string]` - The validation rules that should be applied to the component. `Optional`
+ `validators [object]` - A collection of custom validators that the component might want to provide. These validators take preference over the default. `Optional`
+ `isEmpty [function]` - A function that must return `true` or `false` depending weather the field component has a value. When validating the form, the Form API expects field values
to be `strings`. If your custom components provides some other value type, like an array or object, then you will need implement this function. `Optional`

##### `onChange(id, value)`

Notify the Form that the components value has changed. This validates the new value according to the validation pattern provided for the component and then updates the Forms state.

+ `id` - The unique id of the component.
+ `value` - The new value of the component.

##### `select(id)`

Returns the formatted value of the component matching the provided `id`. (`valid`, `errors`, `value`)

##### `validate(id, value)`

Validate some value according to the component matching the provided id's validation pattern.

##### `state()`

Fetch the forms entire field state.

##### `submit()`

Submit the form

### Component

Here is a basic example of a custom component and how to use the context API. This component is also provided along with the library.

```javascript
import { Component, createElement as $, PropTypes } from 'react'

export default
class Input extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        validation: PropTypes.string
    }

    static defaultProps = {
        validation: ''
    }

    componentWillMount() {
        this.context.form.register({
            id: this.props.id,
            validation: this.props.validation
        })
    }

    render() {
        const {id} = this.props
        const {form: {onChange, select}} = this.context

        return $('input', {...this.props, onChange: e => onChange(id, e.target.value), value: select(id).value || ''})
    }
}
```

# Example

```
$ npm i
$ npm start
```

navigate to `http://localhost:8080`