# forms

Yep. Another react forms library. I just had to add my own to the list.

The main aim of this library was to provide the bare basics that you would want in a forms library. This is perfect if you want full control
of the input components and validation steps in your form.

## Usage example

Basic
```javascript
import {Form, Input} from 'forms'

class App extends Component {

    render() {
        return Form({onSubmit: fields => {}, onChange: state => {}},
            div({},
                Input({id: 'name', validation: 'alphanumeric|min:10|required'})
            )
        )
    }
}
```

For deeper component control
```javascript
import {Form} from 'forms'

class Input extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    componentWillMount() {
        this.context.form.register({
            id: this.props.id,
            validators: {},
            pattern: this.props.validation
        })
    }
}

class App extends Component {

    render() {
        return Form({onSubmit: fields => {}, onChange: state => {}},
            div({},
                Input({id: 'name', validation: 'alphanumeric|min:10|required'})
            )
        )
    }
}
```