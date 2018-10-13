import React, { Component } from 'react';
import tech from './assets/tech.png';
import './App.css';
import { Router, Route} from 'react-router-dom';
import ListView from './components/ListView';
import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import * as firebase from './firebase';
import {Link} from 'react-router-dom'
import Provider from "react-redux/es/components/Provider";
import store, {checkUser, history, watchTaskChangedEvent} from "./store";
import AddView from "./components/addPeople";
import Tasks from "./components/task";
import LoginView from "./components/login";
import Feedbackview from "./components/feedback";
import Notifications from 'react-notify-toast';
import {signOut} from './store'
import ProfileView from "./components/afterLogin/profileView";
import QuestionsView from "./components/questions/questionPage";
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
        store.dispatch(checkUser())
        watchTaskChangedEvent(store.dispatch);

    }
  render() {
    return (
        <Provider store={store}>
        <Router history={history}>

            <main>
                <Notifications/>
                <Navbar color="dark" light expand="md">
                        <Link class='navbar-brand' href="/" to="/" > <img src={tech}  width="200" height="auto" alt=""/></Link>
                    <Nav className="ml-auto" navbar>
                        <NavItem >
                            <Link class="nav-link" to='/leaderboard'><p class="text-white">Leaderboard</p></Link>
                        </NavItem>
                        <NavItem >
                            <Link class="nav-link" to='/tasks'><p class="text-white">Tasks</p></Link>
                        </NavItem>
					    <NavItem >
                            <Link class="nav-link" to='/feedback'><p class="text-white">Feedback</p></Link>
                        </NavItem>
                        { !this.state.authUser ?  <NavItem> <Link class="nav-link" to='/login'><p class="text-white">Login</p></Link> </NavItem>  : ''}
                        { !this.state.authUser ?  <NavItem> <Link class="nav-link" to='/add'><p class="text-white">Register</p></Link></NavItem> : ''}

                        { this.state.authUser ?  <NavItem> <Link class="nav-link" to='/profile'><p class="text-white">Profile</p></Link></NavItem> : ''}
                        { this.state.authUser ?  <NavItem> <Link to='/' class="nav-link" onClick={signOut}> <p class="text-white">Log out</p></Link></NavItem> : ''}
                    </Nav>
                </Navbar>
                    <div className="card main">
                        <Route exact path="/" component={QuestionsView} />
                        <Route exact path="/add" component={AddView} />
                        <Route exact path="/tasks" component={Tasks} />
                        <Route exact path="/login" component={LoginView} />
						<Route exact path="/feedback" component={Feedbackview} />
                        <Route exact path="/profile" component={ProfileView} />
                        <Route exact path="/leaderboard" component={ListView} />
						
                    </div>
            </main>
        </Router>
        </Provider>
    );
  }
}

export default App;
