import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import Avatar from '@material-ui/core/Avatar'

class Leaderboard extends Component{
    render(){
        const {leadSorted,authedUser,users}=this.props; 
        if(!authedUser){
          return <Redirect to="/login" />
        }       
        return(
          <div>
            <NavigationBar />
            {leadSorted.map((id)=>{
              return(<div className="leader-card" key={id}>
                      <div>
                        <Avatar style={{width:100,height:100,margin:10,alignItems:'center'}} className= "nav-avatar" src={users[id].avatarURL} alt="avatar" />
                        <h2>{authedUser===id?"YOU":users[id].name}</h2>
                      </div>
                      <div className="leader-text">
                        <p>QUESTIONS ANSWERED: {Object.keys(users[id].answers).length}</p>
                        <p>QUESTIONS ASKED: {Object.keys(users[id].questions).length}</p>
                      </div>
                    </div>)
            })}
          </div>
        )
    }
}

function mapStateToProps({users,authedUser}){
    return{
      leadSorted:Object.keys(users).sort((a,b)=>(Object.keys(users[a].answers).length+users[a].questions.length-Object.keys(users[b].answers).length-users[b].questions.length)).reverse(),
      authedUser,
      users
    }
  }

export default connect (mapStateToProps)(Leaderboard)