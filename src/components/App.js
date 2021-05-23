import '../App.css';
import React,{Component, Fragment} from 'react'
import {Route,Switch,} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import {handleInitialData}  from '../actions/shared'
import Login from './Login'
import Home from './Home'
import Leaderboard from './Leaderboard'
import QuestionView from './QuestionView'
import AddQuestion from './AddQuestion'
import Error from './Error'

class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    return(   
      <div>
        <LoadingBar />
          {!this.props.authedUser? (
                <Login />
              ):
            (<Fragment>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/leaderboard'>
                  <Leaderboard />
                </Route>
                <Route path='/questions/:id'>
                  <QuestionView />
                </Route>
                <Route exact path='/add'>
                  <AddQuestion />
                </Route>
                <Route>
                  <Error />
                </Route>
              </Switch>
            </Fragment>)
          }    
      </div>
    )
  }
}

function mapStateToProps({authedUser}){
  return{
    authedUser,
  }
}

export default connect(mapStateToProps)(App);
