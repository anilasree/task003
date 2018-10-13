import React, { Component } from 'react';
import FormElement from './FormElement';
import './login.css'

import {login} from '../store'
import * as firebase from "../firebase";

class LoginView extends Component {
    constructor(props) {
        super();
        this.state = {
            fields: {
               email : '',
                password : ''
            },
            btnState: false
        }

        this.onSubmit = (e) => {
            login(this.state.fields.email, this.state.fields.password)
        }
        this.onChange = (id, field, val) => {
            this.state.fields[field] = val;
            let state  = (this.state.fields.email !== '' && this.state.fields.password !== '')
            this.setState({"btnState" : state});
        }

    }
    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.props.history.push('/')
                : '';
        });
    }
    render() {
        return (
		<div class="container">
  <div class="row">
    <div class="col-sm">
	</div>
    <div class="col-sm">
	            <div className='container'>
			
                <h3 className='heading'> Personal Login page </h3>
                <div className="card-body">
                   <div align="center"> <FormElement name="email" inputType="email" fullName="Enter your email Id" action={this.onChange} /></div>
                    <div align="center"><FormElement name="password" inputType="password" fullName="Enter your password" action={this.onChange} /></div>
                    {this.state.btnState ? <button className="btn btn-outline-success" onClick={this.onSubmit}>Login</button> : ''}
                </div>
            </div>
    </div>
   <div class="col-sm">
   </div>
  </div>
</div>

        )
    }
}
export default LoginView;
