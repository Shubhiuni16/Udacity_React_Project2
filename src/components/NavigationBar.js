import React,{Component} from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {changeAuthedUser} from '../actions/authedUser'
import Avatar from '@material-ui/core/Avatar'


class NavigationBar extends Component{
    logout=(e)=>{
        this.props.dispatch(changeAuthedUser())
    }
    render(){
        const {name,user}=this.props;
        var icon;
        if(user)
        { icon=user.avatarURL;}
        return(
            <div className="nav-whole">
                <div className="nav-pg">
                    <ul className="nav-items">
                        <NavLink className="nav-link" activeClassName="nav-link-active" exact to='/'>HOME</NavLink>
                        <NavLink className="nav-link" activeClassName="nav-link-active" exact to='/add'>ADD-QUESTION</NavLink>
                        <NavLink className="nav-link" activeClassName="nav-link-active" exact to='/leaderboard'>LEADERBOARD</NavLink>
                    </ul>
                </div>
                {user?(
                <div className="loggedUser">
                    <Avatar className= "nav-avatar" src={icon} alt={name} />
                    <b>Hello {name}</b>
                    <div>
                        <button onClick={this.logout}>LOGOUT</button>
                    </div>
                </div>)
                :null}
            </div>
        )
    }
}
function mapStateToProps({authedUser,users}){
    const user=authedUser?users[authedUser]:null;
    return{
      name:authedUser,
      user
    }
  }
export default connect(mapStateToProps)(NavigationBar)