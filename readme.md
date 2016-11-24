# Flum

A state management and validation layer for react forms that provides an API via context.

## What?

State management and data validation are the two things that every form needs. This library provides these two basic needs without any other bloat.
Form components, their data, and the validation of their data all belong to the developer - Flum just provides a nice way of connecting these essentials
together.

## Why?

There are quite a few react forms libraries out there, but they either do too little or too much, and most force the developer to conform to their way of
doing things. Flum tries to know as little about your form and application as possible - only focusing on the two most important aspects, state management
and validation.

## Usage example

```javascript
import { Form, FormComponent, flattenState, validateState } from 'flum'

class App extends Component {

    state = {}

    onChange = state => {
        
        /* this is a validated version of user input */
        this.setState(state)
    }

    submit = () => {
        const {valid, state} = validateState(this.state)
        
        if (valid) {
            
            /* We need to flatten the state first as flum
              * stores additional field information in state
              * such as errors, validation rules and the value 
              * */
            saveData(flattenState(state))
        }
    }

    render() {
        return (
            <Form
                state={this.state}
                onChange={this.onChange}>

                <FormComponent 
                    id="name" 
                    localValidation="letters|min:5" 
                    globalValidation="required">
                    
                    {props => 
                        <input 
                            value={props.value || ""} 
                            onChange={e => props.onChange(e.target.value)} />
                    }
                </FormComponent>
                
                <button onClick={this.submit}>submit</button>
            </Form>
        )
    }
}
```

# Documentation
All documentation can be found at [julienvincent.github.io/flum](http://julienvincent.github.io/flum/)

* [Usage](http://julienvincent.github.io/flum/docs/usage)
* [API Reference](http://julienvincent.github.io/flum/docs/api)
* [Todo](http://julienvincent.github.io/flum/docs/Todo.html)
* [Changelog](http://julienvincent.github.io/flum/changelog.html)

# Example

```
$ yarn | npm i
$ npm start
```

navigate to `http://localhost:8080`

# License
MIT