import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    createQuizQuestion,
    finishCreateQuiz,
} from '../../core/redux/actions/createQuizActions'
import { createControl, validate, validateForm } from '../../core/form/Form'
import { submitHandler } from '../../shared/utils/formsUtils'
import Button from '../../shared/components/UI/Button/Button'
import Input from '../../shared/components/UI/Input/Input'
import Auxiliary from '../../core/hoc/Auxiliary/Auxiliary'
import Select from '../../shared/components/UI/Select/Select'
import classes from './QuizCreator.module.scss'

function createOptionControl(number) {
    return createControl(
        {
            label: `Option ${number}`,
            errorMessage: 'Option must be required',
            id: number,
        },
        { required: true }
    )
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Enter question',
                errorMessage: 'Question must be required',
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        }
    }

    addQuestionHandler = (event) => {
        event.preventDefault()
        const {
            question,
            option1,
            option2,
            option3,
            option4,
        } = this.state.formControls
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ],
        }

        if (questionItem) {
            this.props.createQuizQuestion(questionItem)
            this.setState({
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls(),
            })
            alert(`Question ${question.value} added`)
        } else {
            alert('Try again')
        }
    }

    createQuizHandler = (event) => {
        event.preventDefault()
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        })
        this.props.finishCreateQuiz()
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName]
                return (
                    <Auxiliary key={controlName + index}>
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
                        {index === 0 ? <hr /> : null}
                    </Auxiliary>
                )
            }
        )
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value,
        })
    }

    render() {
        const select = (
            <Select
                label="Choose right answer"
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />
        )

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create quiz</h1>

                    <form onSubmit={submitHandler}>
                        {this.renderControls()}

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Create quiz
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.createQuiz.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
