# Writing Input Components

Flum does not provide any actual input components - that's entirely up to the developer to build. There are two approaches you can take to creating a component
that can integrate with Flum - using the `FormComponent` wrapper component provided or directly hooking into Flum's context API. The first approach is the
recommended way to do things, while the second allows for _slightly_ more control.

### `Using the wrapper`

The provided wrapper component does all the work of integration and translation between Flum and your component. It gives you `data` and an `onChange` hook which
you can pass to the form component you are wrapping, the same controlled API you are used to using with react.

You will need to provide the wrapper an `id` via props. This is a string that will be used as that components key in state. For example, if you gave a component
the key `firstName` then the resulting state will look like so:

```javascript
{
    firstName: {
        value: null,
        error: null,
        ...
    }
}
```

Additionally you can provide the component a validation string and additional validation functions. The validation string is a pipe separated collection of
validators that need to be run on the components data. For example, the validation string `letters|min:10` will result in a validation function `letters` and
then a validation function called `min` being run against the component's data. Notice how the `min:10` validator has the trailing `:10` - that just means that
the value `10` will be given as arguments to the validation function.

Validation strings have been split into two separate props - `localValidation` and `globalValidation` - and are just a way to separate when validation rules are
applied. `localValidation` is applied on every state change, while `globalValidation` is applied on submit (kinda).

```javascript
import { Form, FormComponent } from 'flum'


const App = () =>
    <Form>
        <FormComponent id="name">
            {({value, onChange}) => 
                <input value={value} onChange={e => onChange(e.target.value)} />
            }
        </FormComponent>
    </Form>
```

As an alternate way of using this wrapper, you can give it a component via props instead of children. For this to work your component needs to be a react class.
Using this method means that the wrapper can grab custom validators directly from the input component.

```javascript
import { Form, FormComponent } from 'flum'

class Input extends React.Component {
    
    static validators = {
        customValidator({value}) {
            if (value) return {valid: true}
            return {valid: false, error: "Invalid"}
        }
    }
    
    render() {
        const {value, onChange} = this.props
        return <input value={value} onChange={e => onChange(e.target.value)} />
    }
}

const App = () =>
    <Form>
        <FormComponent id="name" component={Input} localValidation="customValidator" />
    </Form>
```

The wrapper does of course do more than this, check out the API docs for the fleshy details.

### `Using Context`

The context API consists of two methods - `getField(id: string)` and `onChange(field: Object, id: string)` - that are essentially getters and setters for state.
A good practice would be to use `onChange` in `componentDidMount` to set the initial state and field properties.

A field follows the following structure. This data must be given along with every `onChange` call.

```javascript
type Field = {
    value: ?any,
    error: ?string,
    valid: boolean,
    localValidation: ?string,
    globalValidation: ?string,
    validators: ?{[key: string]: Function}
}
```

Here is an example component built using context.

```javascript
import React, { Component } from 'react'

export default
class FormComponent extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    /* Our field state is initialized with validators, validation
     * strings and null data. 
     * */
    componentWillMount() {
        const {form} = this.context
        const {id, localValidation, globalValidation, validators} = this.props

        form.onChange({
            localValidation,
            globalValidation,
            validators,
            value: null,
            error: null,
            valid: true
        }, id)
    }

    /* Whenever the data changes, pass the new data
     * along with the current state of the form.
     * */
    onChange = (value: any) => {
        const {form} = this.context
        const {id} = this.props
        const data = form.getField(id)

        form.onChange({
            ...data,
            value
        }, id)
    }

    render() {
        const {form} = this.context
        const {id} = this.props

        const {value} = form.getField(id)
        
        return <input value={value} onChange={e => this.onChange(e.target.value)}/>
    }
}
```