import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import TextField from '@material-ui/core/TextField'
import { handleNewQuestion } from '../actions/shared'

class AddQuestion extends Component{
    state={
        option1:'',
        option2:'',
        done:false
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.dispatch(handleNewQuestion(this.state.option1,this.state.option2,this.props.authedUser))
        //this.state.done=true;
        this.setState({done:true})
    }
    render(){
        if(this.state.done===true){
            return <Redirect to='/' />
        }
        return(
            <div>
                <NavigationBar />
                <div className="addQues-card">
                    <h4>NEW QUESTION</h4>
                    <h5>Would You Rather...</h5>
                    <TextField value={this.state.option1} onChange={(e)=>{
                        this.setState({option1:e.target.value})
                    }} label="Option 1"/>
                    <p>OR</p>
                    <TextField value={this.state.option2} onChange={(e)=>{
                        this.setState({option2:e.target.value})
                    }} label="Option 2"/>
                    <button onClick={this.handleSubmit}
                    disabled={this.state.option1===''&&this.state.option2===''}>SUBMIT</button>
                </div>
            </div>
          
        )
    }
}

function mapStateToProps({authedUser,users}){
    return{
      authedUser,
      users
    }
  }

export default connect (mapStateToProps)(AddQuestion)