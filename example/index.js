import { Component, createElement as $ } from 'react'
import { render } from 'react-dom'

import { Form, Input } from '../src/index'

class App extends Component {

    onSubmit = fields => {
        console.log(fields)
        console.log(fields.state.flatten())
    }

    onChange = state => {
        console.log(state.flatten())
    }

    render() {
        return (
            $('div', {},
                $(Form, {onSubmit: this.onSubmit, getFields: getter => this.getFields = getter, onChange: this.onChange},
                    $('div', {},
                        $(Input, {id: 'user.firstName', validation: 'numeric|required|max:25', placeholder: "First Name"}),
                        $(Input, {id: 'user.lastName', validation: 'numeric|required|max:25', placeholder: "Last Name"}),

                        $('button', {type: 'submit'}, "submit")
                    )
                )
            )
        )
    }
}

window.onload = () => {
    render($(App), document.getElementById('root'))
}