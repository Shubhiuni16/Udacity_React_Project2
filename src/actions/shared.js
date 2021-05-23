import {getInitialData,saveQuestion,saveQuestionAnswer} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'
import {receiveQues,addQues,addQuesAns} from './questions'
import {receiveUsers,addUserAns,addUserQues} from './users'

export function handleInitialData(){
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
        .then(({users,ques})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQues(ques))
        }).then(()=>{dispatch(hideLoading())})
    }
}

export function handleNewQuestion(optionOneText,optionTwoText,authedUser){
    return(dispatch)=>{
        dispatch(showLoading());
        return(saveQuestion({
            author:authedUser,
            optionOneText,
            optionTwoText,
        })).then((ques)=>{
            dispatch(addQues(ques))
            dispatch(addUserQues(ques))
        }).then(()=>{dispatch(hideLoading())})
    }
}

export function handleAddAnswer(answer,authedUser,qid){
    return(dispatch)=>{
        dispatch(showLoading())
        saveQuestionAnswer({authedUser,qid,answer}).then(()=>{
            dispatch(addQuesAns({authedUser,qid,answer}))
            dispatch(addUserAns({authedUser,qid,answer}))
        }).then(()=>{dispatch(hideLoading())})
    }
}