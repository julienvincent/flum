import { Component, PropTypes, createElement } from 'react'
import { validators } from './validators'
import _ from 'lodash'

const isReactNative = (a, b) => (typeof navigator === 'undefined' || navigator.product != 'ReactNative') ? b() : a()
const CheckChildren = (props, name, component) => {
    if (isReactNative(() => true)) {
        if (Array.isArray(props[name])) {
            return new Error(
                `${name}. When using flum in react-native, ${component} should be given a single child only. It is recommended to wrap multiple components in a View`
            )
        }
    }
}

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
                getState: this.getCurrentState,
                validate: (id, value) => this.validate(_.find(this.registeredComponents, comp => comp.id == id), value),
                register: this.register
            }
        }
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        validators: PropTypes.objectOf(PropTypes.func),
        getContext: PropTypes.func,
        state: PropTypes.object,
        children: CheckChildren
    }

    static defaultProps = {
        onChange: () => {
        },
        onSubmit: () => {
        },
        getFields: () => {
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

        this.props.getContext(this.getChildContext().form)
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
        let state = this.getCurrentState()
        let nextState

        _.forEach(this.registeredComponents, component => {
            if (component.validation) {
                _.forEach(component.validation.split("|"), requirement => {
                    requirement = requirement.split(":")

                    const changeState = (id, error) => {
                        nextState = this.createNextState(id, {
                            ...this.select(id),
                            valid: false,
                            errors: [error]
                        }, nextState || state)

                        valid = false
                    }

                    switch (requirement[0]) {
                        case "matches": {
                            if (this.select(requirement[1]).value != this.select(component.id).value) {
                                changeState(component.id, `Must match ${requirement[2] || requirement[1]}`)
                            }

                            break;
                        }

                        case "required": {
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
            }
        })
        if (nextState) state = nextState
        state.flatten = this.flatten.bind(this, state)
        if (this.props.state && nextState) this.props.onChange(state)

        this.props.onSubmit({valid, state})
    }

    flatten(state, search = false) {
        if (search && state.value !== undefined) return state.value
        return _.mapValues(_.omitBy(state, val => typeof val === 'function'), val => this.flatten(val, true))
    }

    select = id => _.get(this.getCurrentState(), id, {value: null, errors: [], valid: true})

    getCurrentState = () => {
        const {state} = this.props
        return {...state ? state : this.state}
    }

    createNextState = (id, statePiece, vState) => {
        id = id.split(".")
        const state = vState || this.getCurrentState()

        const set = (state, i = 1) => {
            if (i == id.length) return statePiece
            const _state = {...state || {}}

            return {
                ..._state,
                [id[i]]: set(_state[id[i]], i + 1)
            }
        }

        const subState = {[id[0]]: set(state[id[0]])}
        return {...state, ...subState}
    }

    onChange = (id, value) => {
        const {onChange, state} = this.props
        const component = _.find(this.registeredComponents, comp => comp.id == id)
        const validation = this.validate(component, value)

        const nextState = this.createNextState(id, {
            ...validation,
            value
        })

        if (state) {
            nextState.flatten = this.flatten.bind(this, nextState)
            onChange(nextState)
        } else {
            this.setState(nextState, () => {
                nextState.flatten = this.flatten.bind(this, nextState)
                onChange(nextState)
            })
        }
    }

    validate = ({validation, validators}, value) => {
        let valid = true
        const errors = []

        if (validation) {
            _.forEach(validation.split("|"), requirement => {
                requirement = requirement.split(":")

                let validator = _.find(this.validators, (validator, key) => key == requirement[0])

                const componentValidator = _.find(validators, (validator, key) => key == requirement[0])
                if (componentValidator) validator = componentValidator

                if (validator) {
                    const _res = validator(value, ..._.without(requirement, requirement[0]))
                    if (!_res) {
                        valid = false
                        errors.push(requirement[0])
                    } else if (_res !== true && !_res.valid) {
                        valid = false
                        errors.push(_res.error)
                    }
                }
            })
        }

        return {
            errors,
            valid
        }
    }

    register = opts => {
        _.forEach(this.registeredComponents, ({id}, i) => {
            if (id == opts.id) this.registeredComponents.splice(i, 1)
        })
        this.registeredComponents.push(opts)
    }

    render() {
        const {children} = this.props
        const props = _.omit(this.props, ["onSubmit", "onChange", "validators", "getContext", "state"])

        return isReactNative(
            () => children,
            () => createElement('form', {...this.props, onSubmit: this.submit}, children)
        )
    }
}