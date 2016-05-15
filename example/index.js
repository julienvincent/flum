import { Component, createElement as $ } from 'react'
import { render } from 'react-dom'

import { Form, Input } from '../src/index'

class App extends Component {

    onSubmit(fields) {
        console.log(fields.valid)
    }

    render() {
        return (
            $('div', {},
                $(Form, {onSubmit: this.onSubmit},
                    $('div', {},
                        $(Input, {id: 'name', validation: 'numeric|required'}),

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