# Form

A simple wrapper that stores Input state and provides it's API to children via context.

### State

The form stores the state of its children under `id` namespaces. The state contains the properties `value`, `errors` and `valid`. Here is an example state snapshot for a component
that registered itself with the id `user.firstName`.
```javascript
{
    user: {
        firstName: {
            value: "John",
            valid: true,
            errors: []
        }
    }
}
```

State can be flat mapped using the `state.flatten()` utility. This replaces meta data with the inputs `value` property.
```javascript
/* ... */

onChange = state => {
    console.log(state)
    // result
    {
        user: {
            firstName: {
                value: "John", // the value of the component
                valid: true, // has the value passed all validation tests
                errors: [] // Error messages from failed validators
            }
        }
    }

    console.log(state.flatten())
    // result
    {
        user: {
            firstName: "John"
        }
    }
}

/* ... */
```

### Props

#### `onChange(state)`

Called whenever one of its child components `value` changes and contains a snapshot of the forms state.

#### `onSubmit(checkedState)`

Called when the form is submitted. Contains a fully checked state. Submitting the form first checks `match` and `required` validation properties

```javascript
{
    valid: true/false,
    state: { ... }
}
```

`validators(object)`

An object containing custom validators. Check out how to create [custom validators](Validators.md).

#### `getFields(getter)`

A utility method to allow for programmatically accessing the forms state. This prop will be called with a getter function as its first argument. The getter function, when called, returns the current
state of the form.

Here is an example of its usage:
```javascript
class App extends Component {

    firstCheckState() {
        this.getFields() // The current state of the form
    }

    render() {
        return Form({getFields: getter => this.getFields = getter},
            ...
        )
    }
}
```