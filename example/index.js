import { Component, createElement as $ } from 'react'
import { render } from 'react-dom'

import { Form, Input } from '../src/index'

class App extends Component {

    onSubmit = fields => {
        console.log(fields.valid)
    }

    render() {
        return (
            $('div', {},
                $(Form, {onSubmit: this.onSubmit, getFields: getter => this.getFields = getter, onChange: state => {}},
                    $('div', {},
                        $(Input, {id: 'user.firstname', validation: 'numeric|required|min:20'}),

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