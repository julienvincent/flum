import { Component, createElement as $, PropTypes } from 'react'
import _ from 'lodash'

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
        validation: ''
    }

    componentWillMount() {
        this.context.form.register({
            id: this.props.id,
            validation: this.props.validation
        })
    }

    render() {
        const {id} = this.props
        const {form: {onChange, select}} = this.context

        return $('input', {..._.omit(this.props, ["validation", "id"]), onChange: e => onChange(id, e.target.value), value: select(id).value || ''})
    }
}
