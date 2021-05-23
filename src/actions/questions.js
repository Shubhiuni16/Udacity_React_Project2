export const RECEIVE_QUES ='RECEIVE_QUES'
export const ADD_QUES='ADD_QUES'
export const ADD_QUES_ANS='ADD_QUES_ANS'

export function receiveQues(questions){
    return{
        type:RECEIVE_QUES,
        questions
    }
}
export function addQues(question){
    return{
        type:ADD_QUES,
        question
    }
}
export function addQuesAns(answer){
    return{
        type:ADD_QUES_ANS,
        answer
    }
}