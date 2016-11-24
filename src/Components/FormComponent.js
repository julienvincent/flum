import React, { Component, PropTypes } from 'react'

export default
class FormComponent extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        localValidation: PropTypes.string,
        globalValidation: PropTypes.string,
        validators: PropTypes.object,
        children: PropTypes.func,

        component: PropTypes.func,
        componentProps: PropTypes.object
    }

    componentWillMount() {
        const {form} = this.context
        const {id} = this.props
        if (!form) throw new Error("FormComponent must be used within the context of a Flum Form")

        form.onChange(this.getDataWithProps(), id)
    }

    getDataWithProps = () => {
        const {form} = this.context
        const {id, localValidation, globalValidation, validators, component = {}} = this.props

        const data = form.getField(id)

        return {
            localValidation,
            globalValidation,
            validators: {
                ...validators,
                ...component.validators || {}
            },
            value: null,
            error: null,
            valid: true,
            ...data
        }
    }

    onChange = (value: any) => {
        const {form} = this.context
        const {id} = this.props

        form.onChange({
            ...this.getDataWithProps(),
            value
        }, id)
    }

    render() {
        const {form} = this.context
        const {id, children, component:Component, componentProps} = this.props

        const data = form.getField(id)
        const injectedProps = {
            id,
            onChange: this.onChange,
            value: data.value,
            error: data.error
        }

        if (Component) return <Component {...componentProps} {...injectedProps} />
        return children(injectedProps)
    }
}