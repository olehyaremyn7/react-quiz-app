import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../core/redux/actions/authActions'
import { submitHandler } from '../../shared/utils/formsUtils'
import Button from '../../shared/components/UI/Button/Button'
import Input from '../../shared/components/UI/Input/Input'
import classes from './Auth.module.scss'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Enter valid email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true,
                    },
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Enter valid password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                },
            },
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        let isFormValid = true

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,
            isFormValid,
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName]
                return (
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={(event) =>
                            this.onChangeHandler(event, controlName)
                        }
                    />
                )
            }
        )
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign in
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) =>
            dispatch(auth(email, password, isLogin)),
    }
}

export default connect(null, mapDispatchToProps)(Auth)
