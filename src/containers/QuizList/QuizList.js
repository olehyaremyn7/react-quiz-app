import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchQuizzes } from '../../core/redux/actions/quizActions'
import Loader from '../../shared/components/UI/Loader/Loader'
import classes from './QuizList.module.scss'

class QuizList extends Component {
    componentDidMount() {
        this.props.fetchQuizzes()
    }

    renderQuizzes() {
        return this.props.quizzes.map((quiz) => {
            return this.quizzesListTemplate(quiz)
        })
    }

    quizzesListTemplate(quiz) {
        return (
            <li key={quiz.id}>
                <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
            </li>
        )
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <h1>List of quizzes</h1>

                {this.props.loading ? (
                    <Loader />
                ) : (
                    <>
                        {this.props.quizzes.length ? (
                            <ul>{this.renderQuizzes()}</ul>
                        ) : (
                            <h1>No quizzes</h1>
                        )}
                    </>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.quiz.quizzes,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
