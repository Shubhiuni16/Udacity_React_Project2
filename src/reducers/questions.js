import {RECEIVE_QUES,ADD_QUES,ADD_QUES_ANS} from '../actions/questions'

export default function questions(state={},action){
    switch(action.type){
        case RECEIVE_QUES:
            return{
                ...state,
                ...action.questions
            }

        case ADD_QUES:
            return{
                ...state,
                [action.question.id]: action.question
            }

        case ADD_QUES_ANS:
            return{
                ...state,
                [action.answer.qid]:{
                    ...state[action.answer.qid],[action.answer.answer]:{
                        ...state[action.answer.qid][action.answer.answer],
                    votes:state[action.answer.qid][action.answer.answer].votes.concat([action.answer.authedUser])
                    }
                }
            }
            
        default:
            return state 
    }
}