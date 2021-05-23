import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Avatar,Button} from '@material-ui/core'

class ShortQuestionCard extends Component{
    render(){
        const {users,questions}=this.props
        const id=this.props.id
        const user=users[questions[id].author]
        const {optionOne,timestamp}=questions[id]
        const date=(new Date(timestamp)).toLocaleDateString('en')
        //console.log("try",date)
        return(
            <div className="ques-card">
                <h4 className="ques-top">On {date} {user.name} asked</h4>
                <div className="ques-mid">
                    <Avatar src={user.avatarURL}
                    alt={user.name} 
                    style={{width:100, height:100}} />
                    <div>
                        <p style={{textAlign:'center'}}>Would you rather...</p>
                        <p style={{textAlign:'center'}}>{optionOne.text} or ...</p>
                    </div>
                </div>
                <Button component={Link} to={`/questions/${id}`} color="primary" variant='outlined'>
                    VIEW
                </Button> 
            </div>
        )
    }
}

function mapStateToProps({users,questions}){
    return{
        users,
        questions,
    }
}

export default connect(mapStateToProps)(ShortQuestionCard)