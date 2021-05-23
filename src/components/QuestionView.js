import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect,withRouter,} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import {Button,FormLabel,FormControl,FormControlLabel,RadioGroup,Radio,Avatar} from '@material-ui/core';
import {handleAddAnswer} from '../actions/shared'
import LinearProgress from '@material-ui/core/LinearProgress';


class QuestionView extends Component{
    state={
        value:""
    }
    handleRadioChange = (event) => {
        this.setState({value:event.target.value});
      };
    render(){
        if(this.props.invalid){
            return <Redirect to="/error" />
        }
        const {authedUser,question,users,id}=this.props; 
        const hasAnswered=Object.keys(users[authedUser].answers).includes(id)?true:false
        const UserAnswer=users[authedUser].answers[id]
        const date=(new Date(question.timestamp)).toLocaleDateString('en')
        const user=users[question.author]
        //console.log("haaaS",UserAnswer)
        const option1Count=question.optionOne.votes.length
        const option2Count=question.optionTwo.votes.length
        const totalCount=option1Count+option2Count
        const percent1=Math.abs(option1Count/(totalCount)*100)
        const percent2=Math.abs(option2Count/(totalCount)*100)

        const handleSubmit = (event) => {
            event.preventDefault();
            const {dispatch}=this.props
            if(this.state.value==="")
            alert("SELECT A VALUE!!!")
            else
            dispatch(handleAddAnswer(this.state.value,this.props.authedUser,this.props.id))
            
          }
        return(
            user&&id?
            <div>
                <NavigationBar />
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="ques-mid">
                                <Avatar src={user.avatarURL}
                                alt={user.name} 
                                style={{width:100, height:100}} />
                            </div>
                            <h4 className="ques-top">On {date} {user.name} asked</h4>
                            <h5>Would You Rather, and...</h5>
                        </div>
                        {hasAnswered&&<div className="poll-report">
                            <div>
                                <LinearProgress variant="determinate" value={percent1} />
                                {UserAnswer==='optionOne'?<p>you and {option1Count-1} others voted for <b>{question.optionOne.text}</b> from {totalCount} submissions</p>:
                                <p>{option1Count} voted for <b>{question.optionOne.text}</b> from {totalCount} submissions</p>}
                            </div>
                            <div>
                                <LinearProgress variant="determinate" value={percent2} />
                                {UserAnswer==='optionTwo'?<p>you and {option2Count-1} others voted for <b>{question.optionTwo.text}</b> from {totalCount} submissions</p>:
                                <p>{option2Count} voted for <b>{question.optionTwo.text}</b> from {totalCount} submissions</p>}
                            </div>
                        </div>}

                        {!hasAnswered&&<FormControl component="fieldset" >
                            <FormLabel component="legend">Would You Rather...</FormLabel>
                            <RadioGroup aria-label="quiz" name="quiz" value={this.state.value} onChange={this.handleRadioChange}>
                            <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                            <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                            </RadioGroup>
                            <Button type="submit" variant="outlined" color="primary" >
                            SUBMIT ANSWER
                            </Button>
                        </FormControl>}
                    </form>
                </div>
            </div>:null
            
        )
    }
}

const mapStateToProps=({authedUser,users,questions},props)=>{
    const {id}=props.match.params;
    const question=questions[id];
    if (questions[id] === undefined) {
        return {
          invalid: true
        }
      } 
      else{
    return{
      authedUser,
      users,
      question,
      id,
      invalid:false
    }
}
}

export default withRouter(connect(mapStateToProps)(QuestionView))