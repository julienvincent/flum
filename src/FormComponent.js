import React, { Component, PropTypes } from 'react'

export default
class FormComponent extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        validation: PropTypes.string,
        validators: PropTypes.object,
        isEmpty: PropTypes.func,
        children: PropTypes.func.isRequired
    }

    componentWillMount() {
        const {form} = this.context
        const {id, validators, validation, isEmpty} = this.props

        if (!form) throw new Error("FormComponent must be used within the context of a Flum Form")

        form.register({
            id,
            validation,
            validators,
            isEmpty
        })
    }

    onChange = val => {
        const {form} = this.context
        const {id} = this.props
        form.onChange(id, val)
    }

    render() {
        const {form} = this.context
        const {id} = this.props
        const data = form.select(id)

        return children({
            id,
            onChange: this.onChange,
            value: data.value,
            error: data.errors[0]
        })
    }
}