# Validation

Component validation is described by validation rules. Each rule is separated by a pipe ( `rule1|rule2` ), and additional parameters can be passed to the validator via
colons ( `rule:param` ).

Here is a list of all the validators provided out of the box:
+ `numeric` - Can only contain numbers.
+ `alphanumeric` - Can contain both numbers and letters.
+ `letters` - Can only contain letters and spaces.
+ `min-length:x` - Must contain at least `x` characters.
+ `max-length:x` - Cannot contain more than `x` characters.
+ `min:x` - Cannot be less than `x`.
+ `max:x` - Cannot be more than `x`.
+ `between:x:y` - Must be between `x` and `y` characters long.
+ `matches:id` - Must contain the same value as the field belonging to `id`. (checked on form submission)
+ `required` - The field is required. (checked on form submission)
+ `email` - Must be a valid email address.
+ `equals:x1:x2:x3...` - Must contain the same value as one of the given parameters.

##### Example
```javascript
<Input id="name" validation="string|max:25|required"></Input>
```

### Custom Validators

Creating custom validators are easy. Each validator is a function that accepts a value as the first parameter and rule properties as the rest. The validator should return `true` or `false`
depending weather the given value passes the validation test. If you would like the validator to provide an error message, then you may return an object containing `valid`: false and
`error`: string.

```javascript
const validators = {
    equals: (value, ...values) => {
        if (!_.find(values, val => val == value)) {
            return {
                valid: false,
                error: `Doesn't match values: ${values}`
            }
        }
        return true
    }
}
```

```javascript
<Input id="name" validation="equals:1:3:5:7"></Input>
```