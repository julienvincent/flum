# flum

A forms library for react that provides its API via context

## Usage example

```javascript
import { Form, Input } from 'flum'

class App extends Component {

    onChange = state => {
        // do something with state on change
    }

    onSubmit = checkedState => {
        const {valid, state} = checkedState

        if (valid) {
            post(state.flatten())
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                onChange={this.onChange}>

                <Input
                    id="name"
                    validation="alphanumeric|min:10|required">
                </Input>
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

# Examples

```
$ npm i
$ npm start
```

navigate to `http://localhost:8080`

# License
MIT