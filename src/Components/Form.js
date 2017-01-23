// @flow
import { Component, PropTypes } from 'react'
import { validateField } from '../Utils/Validation'
import { buildState } from '../Utils/Tools'
import _ from 'lodash'

import type { Field, State } from '../types'

export default
class Form extends Component {

	static childContextTypes = {
		form: PropTypes.object
	}

	static propTypes = {
		state: PropTypes.object,
		onChange: PropTypes.func
	}

	static defaultProps = {
		onChange: () => {
			console.warn("No onChange handler has been provided to the Form")
		}
	}

	getChildContext() {
		return {
			form: {
				onChange: this.onChange,
				getField: this.getField
			}
		}
	}

	onChange = (field: Field, id: string) => {
		const {onChange, state}: {onChange: Function, state: State} = this.props

		onChange(buildState(state, {
				...validateField(field),
				__flum: true
			}, id)
		)
	}

	getField = (id: string): Field =>
		_.get(this.props.state, id, {value: null, error: null})

	render() {
		return this.props.children
	}
}