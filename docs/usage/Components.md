# Writing Form Components

Out of the box flum provides a `Form` component and an `Input` component. The Input component provided is meant as a usage example for how to use the context API, as the intention
is for the developer to write their own custom components. In this example we will re-create the `Input` component already provided by flum.

The idea is that the form components hook into the API via context. This allows the developer to structure their form components in any manner and still have access to Form hooks.

Lets create the base structure of our react input component. In its pure form, all it needs to do is return an input with props.
```javascript
import React, { Component, PropTypes } from 'react'

export default
class Input extends Component {
    render() {
        return (
            <input
                {...this.props}>
            </input>
        )
    }
}
```

Each component needs to register itself by providing in a unique id, and some meta information like validation. Lets take the `form api` from context, and define some prop types.
```javascript
class Input extends Component {

    /* ... */

    static contextTypes = {
        form: PropTypes.object
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        validation: PropTypes.string
    }

    componentWillMount() {
        const {id, validation} = this.props
        this.context.form.register({
            id,
            validation
        })
    }

    /* ... */
}
```

And lastly, we need to hook up the input element to our form. We get the inputs current value using the `select()` tool, and use the provided `onChange()` handler to update its value
when a user types.
```javascript
class Input extends Component {

    /* ... */

   render() {
        const {id} = this.props
        const {form: {onChange, select}} = this.context

        return (
            <input
                {...this.props}
                onChange={({target: {value}}) => onChange(id, value)}
                value={select(id).value}>
            </input>
        )
   }
}
```

Here is the entire component
```javascript
import React, { Component, PropTypes } from 'react'

export default
class Input extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        validation: PropTypes.string
    }

    componentWillMount() {
        const {id, validation} = this.props
        this.context.form.register({
            id,
            validation
        })
    }

    render() {
        const {id} = this.props
        const {form: {onChange, select}} = this.context

        return (
            <input
                {...this.props}
                onChange={({target: {value}}) => onChange(id, value)}
                value={select(id).value}>
            </input>
        )
    }
}
```