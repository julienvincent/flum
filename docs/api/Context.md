# Context

The component facing API is provided via context. Children have access to it by adding `form` to their components contextTypes.

### `Field`

The data structure of Flum state.

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

### `onChange(Field: Object, id: string)`

Validate the given field and trigger a state change.

### `getField(id: string)`

Select a Field from state by `id`.