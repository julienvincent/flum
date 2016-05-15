# forms

Yep. Another forms library for react. I just had to add my own to the never ending list of form libraries. Just finding a name took longer than the time
spent writing this library.

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

## API

