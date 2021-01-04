import {
    CREATE_QUIZ_QUESTION,
    CREATE_QUIZ_ERROR,
    RESET_QUIZ_CREATION,
} from './actionTypes'
import http from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item,
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        try {
            const response = await http.post(
                '/quizzes.json',
                getState().createQuiz.quiz
            )

            if (response) {
                dispatch(resetQuizCreation())
                alert('Quiz created')
            } else {
                dispatch(createQuizError('Try again or check form values'))
            }
        } catch (e) {
            dispatch(createQuizError(e))
        }
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION,
    }
}

export function createQuizError(error) {
    return {
        type: CREATE_QUIZ_ERROR,
        error,
    }
}
