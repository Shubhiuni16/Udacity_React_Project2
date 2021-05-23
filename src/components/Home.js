import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import {AppBar,Tab,Tabs} from '@material-ui/core'
import ShortQuestionCard from './ShortQuestionCard'

class Home extends Component{
    state={
        value:0
    }
    render(){
        const {authedUser,users,questions}=this.props;
        if(!authedUser){
            return <Redirect to="/login" />
        }
        //console.log("TRY",Object.keys(users[authedUser].answers));
        const answeredIDS=Object.keys(users[authedUser].answers);
        const answeredQuesIDS=Object.values(questions).filter((ques)=>answeredIDS.includes(ques.id)).sort((a,b)=>b.timestamp-a.timestamp).map((q)=>q.id);
        const unansweredQuesIDS=Object.values(questions).filter((ques)=>!answeredIDS.includes(ques.id)).sort((a,b)=>b.timestamp-a.timestamp).map((q)=>q.id);

        //console.log("ansed",answeredQuesIDS,"unansed",unansweredQuesIDS);
         const handleChange=(event,newValue)=>{
             this.setState({value:newValue});
         }
        return(
            <div>
                <NavigationBar />
                <AppBar position='static'>
                    <Tabs value={this.state.value} onChange={handleChange} >
                        <Tab label="UNANSWERED QUESTIONS"
                        />
                        <Tab label="ANSWERED QUESTIONS"
                        />
                    </Tabs>
                </AppBar>
                
                <TabPanel value={this.state.value} index={0}>
                    <div>{unansweredQuesIDS.map((id)=>(
                        <ShortQuestionCard key={id} id={id} />
                    ))}</div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <div>{answeredQuesIDS.map((id)=>(
                        <ShortQuestionCard key={id} id={id}/>
                    ))}</div>
                </TabPanel>

            </div>
            
        )
    }
}

function TabPanel(props){
    const{children,value,index}=props;
    return(
        <div>
            {value===index&&<h1>{children}</h1>}
        </div>
    )
}

function mapStateToProps({authedUser,users,questions}){
    //console.log("ans",answeredQues,"unans",unansweredQues);

    return{
      authedUser,
      users,
      questions,
    }
  }

export default connect (mapStateToProps)(Home)