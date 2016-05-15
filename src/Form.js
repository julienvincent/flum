import { Component, PropTypes, createElement as $ } from 'react'
import _ from 'lodash'

import { validators } from './validators'

export default
class Form extends Component {

    static childContextTypes = {
        form: PropTypes.object
    }

    getChildContext() {
        return {
            form: {
                submit: this.submit,
                onChange: this.onChange,
                select: this.select,
                state: () => this.state,
                validate: this.validate,
                register: this.register
            }
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        validators: PropTypes.objectOf(PropTypes.func)
    }

    static defaultProps = {
        onChange: () => {
        },
        onSubmit: () => {
        }
    }

    constructor() {
        super()

        this.state = {}
        this.validators = validators
        this.registeredComponents = []
    }

    componentWillMount() {
        this.updateValidators()
    }

    updateValidators(props) {
        props = props || this.props

        this.validators = {
            ...this.validators,
            ...props.validators
        }
    }

    componentWillReceiveProps(props) {
        if (props.validators !== this.props.validators) {
            this.updateValidators(props)
        }
    }

    submit = e => {
        e.preventDefault()

        let valid = true

        let state = this.state

        _.forEach(this.registeredComponents, component => {
            _.forEach(component.validation.split("|"), requirement => {
                requirement = requirement.split(":")

                const changeState = (id, error) => {
                    state = this.setInputState(id, {
                        ...this.select(id),
                        valid: false,
                        errors: [error]
                    })

                    valid = false
                }

                switch (requirement[0]) {
                    case "matches":
                    {
                        if (this.select(requirement[1]).value != this.select(component.id).value) {
                            changeState(component.id, `Must match ${requirement[2] || requirement[1]}`)
                        }

                        break;
                    }

                    case "required":
                    {
                        if (typeof component.isEmpty === 'function') {
                            if (component.isEmpty()) {
                                changeState(component.id, "Required")
                            }
                        } else {
                            const state = this.select(component.id)
                            if (!state.value || state.value == '') {
                                changeState(component.id, "Required")
                            }
                        }

                        break;
                    }

                    default:
                        if (!this.select(component.id).valid) {
                            valid = false
                        }

                        break;
                }
            })
        })

        this.props.onSubmit({
            valid,
            state
        })
    }

    select = id => _.get(this.state, id, {value: null, errors: [], valid: true})

    setInputState(id, value, cb) {
        id = id.split(".")

        const state = this.state

        const set = (state, i = 1) => {
            if (i == id.length) {
                return value
            }

            const _state = state || {}

            return {
                ..._state,
                [id[i]]: set(_state[id[i]], i + 1)
            }
        }

        const subState = {[id[0]]: set(state[id[0]])}

        this.setState(subState, cb)

        return {
            ...state,
            ...subState
        }
    }

    onChange = (id, value) => {
        const {onChange} = this.props
        const component = _.find(this.registeredComponents, comp => comp.id == id)
        const validation = this.validate(component, value)

        this.setInputState(id, {
            ...validation,
            value
        }, () => onChange(this.state))
    }

    validate = (component, value) => {
        let valid = true
        const errors = []

        _.forEach(component.validation.split("|"), requirement => {
            requirement = requirement.split(":")

            let validator = _.find(this.validators, (validator, key) => key == requirement[0])

            const componentValidator = _.find(component.validators, (validator, key) => key == requirement[0])
            if (componentValidator) validator = componentValidator

            if (validator) {
                const _res = validator(value, ..._.without(requirement, requirement[0]))
                if (!_res.valid) {
                    valid = false
                    errors.push(_res.error)
                }
            }
        })

        return {
            errors,
            valid
        }
    }

    register = opts => this.registeredComponents.push(opts)

    render() {
        return $('form', {onSubmit: this.submit},
            this.props.children
        )
    }
}