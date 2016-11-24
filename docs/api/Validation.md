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
<FormComponent id="firstName" validation="string|max:25|required" />
```

### Custom Validators

Validators are quite simple - they are just functions that need to return `{valid: boolean, error: string}`. They are given an object containing a value, validator
args and for globalValidators - the state object.

```javascript
{
    value: any,
    args: [...string],
    state: ?Object
}
```

Validators should be provided as a collection of `key` => `validator` and referenced by their `key`.

```javascript
const validators = {
    equals({value, args}) {
        if (_.find(args, val => val == value)) return {
            valid: true
        }

        return {
            valid: false,
            error: "Invalid"
        }
    },
    
    required: ({value}) => {
        if (value && value != "") return {
            valid: true
        }

        return {
            valid: false,
            error: "Required"
        }
    }
}
```

```javascript
<FormComponent 
    id="name" 
    localValidation="equals:1:3:5:7" 
    globalValidation="required" 
    validators={validators} />
```