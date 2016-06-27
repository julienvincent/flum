# Context

The component facing API is provided via context. Children have access to it by adding `form` to their components contextTypes.

### `register(object)`

Allows the component to register itself with the Form
```javascript
componentWillMount() {
    this.context.form.register({
        id: "name",
        validators: { ... },
        validation: "required"
    })
}
```

##### id `[string]`
The id of the components. This `required` property is used to identify the component in the forms state and must be unique. The form will namespace state according to the id provided,
for example - the id `name` will result in this state tree:
```javascript
{
    name: {
        value: ""
    }
}
```
While the id `user.firstName` will result in a nested tree:
```javascript
{
    user: {
        firstName: {
            value: ""
        }
    }
}
```

##### validation `[string]`
The validation rules that should be applied to the component. Multiple validation rules can be separated with `|`, and validation parameters can be passed with `rule:param`.

##### validators `[object]`
A collection of custom validators that the component might want to provide. These validators take preference over the default, and are only available to the component registering them.

##### isEmpty `[function]`
A function that must return `true` or `false` depending weather the component has been completed or has a value. When validating the form, the Form API expects field values
to be strings or integers. If your custom components provides some other value type, like an array or object, then you will need implement this function in order to make use of the `required`
validator.

### `onChange(id, value)`
Notify the Form that the components value has changed. This tries the provided value against any validation rules specified and then updates the Forms state.

### `select(id)`
Get the meta information of the component matching the provided `id`. meta: (`value`, `valid`, `errors`)

### `validate(id, value)`
Validate some value according to the component matching the provided id's validation pattern. Returns a meta state.

### `getState()`
Fetch the forms entire state.

### `submit()`
Submit the form