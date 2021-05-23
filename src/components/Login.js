import React,{Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import NavigationBar from './NavigationBar'

class Login extends Component{
    state={
        value:null
    }
    handleChange=(e)=>{
        this.setState({value:e.target.value}); 
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {dispatch}=this.props
        dispatch(setAuthedUser(this.state.value))
    }
    render(){        
        return(
            <div className='Login-card'>
                <NavigationBar />
                <h2>LOGIN REQUIRED!!!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select User 
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value ="SELECT USER" hidden>SELECT USER</option>
                            {this.props.user.map((user)=>(
                                <option value={user.id} key={user.id}>
                                    {user.id}
                                </option>
                            ))}
                        </select>
                    </label>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}

function mapStateToProps({users,authedUser}){
    return{
        user:Object.values(users),
        authedUser

    }
}

export default connect(mapStateToProps)(Login)