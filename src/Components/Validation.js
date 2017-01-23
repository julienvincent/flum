import { Component, PropTypes } from 'react'
import { validateField } from '../Utils/Validation'

export default
class Validation extends Component {

	static propTypes = {
		children: PropTypes.func,

		value: PropTypes.any,
		onChange: PropTypes.func,

		pattern: (props, propName) => {
			if (props[propName] && typeof props[propName].test !== 'function') {
				return new Error("A valid regex string must be supplied for `pattern`")
			}
		},
		patternError: PropTypes.string,

		validation: PropTypes.string,
		postValidation: PropTypes.string,

		validators: PropTypes.object,
		defaultValue: PropTypes.any
	}

	componentDidMount() {
		this.onChange()
	}

	getDefaultState = () => ({
		value: this.props.defaultValue,
		error: null,
		valid: true
	})

	getValue = () => {
		const {value} = this.props
		return {
			...this.getDefaultState(),
			...value || {}
		}
	}

	buildField = value => {
		const {validation, validators, postValidation, pattern, patternError} = this.props

		const fieldData = this.getValue()

		return {
			...fieldData,
			validators,
			validation,
			postValidation,
			pattern,
			patternError,
			value: value === undefined ? fieldData.value : value,
			__flum: true
		}
	}

	onChange = (value: any) => {
		const {onChange} = this.props
		const field = this.buildField(value)

		onChange(
			validateField(field)
		)
	}

	render() {
		const {children} = this.props
		const state = this.getValue()

		return children ? children({
				value: state.value,
				error: state.error,
				valid: state.valid,
				onChange: this.onChange
			}) : null
	}
}