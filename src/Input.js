import { Component, createElement as $, PropTypes } from 'react'

export default
class Input extends Component {

    static contextTypes = {
        form: PropTypes.object
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        validation: PropTypes.string
    }

    static defaultProps = {
        validation: '',
        onChange: () => {}
    }

    componentWillMount() {
        this.context.form.register({
            id: this.props.id,
            validation: this.props.validation,
            validators: {}
        })
    }

    render() {
        const {id} = this.props
        const {form: {onChange, select}} = this.context

        return $('input', {...this.props, onChange: e => onChange(id, e.target.value), value: select(id).value || ''})
    }
}
