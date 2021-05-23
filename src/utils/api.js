import {_getUsers,_getQuestions,_saveQuestion,_saveQuestionAnswer} from "./_DATA";

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, ques]) => ({
    users,
    ques,
  }))
}


export function getUsers() {
    return _getUsers();
}
export function getQuestions() {
    return _getQuestions();
}
export function saveQuestion (ques) {
    return _saveQuestion(ques);
}
export function saveQuestionAnswer (ans) {
    return _saveQuestionAnswer(ans);
}