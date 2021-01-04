import {
    CREATE_QUIZ_QUESTION,
    RESET_QUIZ_CREATION,
    CREATE_QUIZ_ERROR,
} from '../actions/actionTypes'

const initialState = {
    quiz: [],
    error: null,
}

export default function createQuizReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item],
            }
        case CREATE_QUIZ_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: [],
            }
        default:
            return state
    }
}
