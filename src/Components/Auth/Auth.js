import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import './auth.css'


class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            // userInfo: []
        }
    }

handleUsername = (val) => {
    this.setState({
        username: val
    })
}

handlePassword = (val) => {
    this.setState({
        password: val
    })
}

register = () => {
    const {username, password} = this.state
   axios.post('/api/register', {username, password})
   .then((res) => {
    //    this.setState({userInfo: res.data})
    //    console.log(res.data)
        this.props.getUser(res.data)
       this.props.history.push('/dashboard')
   }).catch(err => console.log(err))
}

login = () => {
    const {username, password} = this.state
    axios.post('/api/login', {username, password})
    .then(res => {
        // console.log(res.data)
        this.props.getUser(res.data)
        this.props.history.push('/dashboard')
    }).catch(err => console.log(err))
}

    render(){
        // console.log(this.state.userInfo)
        // console.log(this.state.username)
        return(
            <div className='auth'>
                <img className='logo' alt='logo' />
                <img className='helo' alt='helo' />
                <div className='input'>
                    <p>Username: <input className='username' placeholder='Username' onChange={e => this.handleUsername(e.target.value)} /></p> 
                    
                    <p>Password: <input className='password' type='password' placeholder='Password' onChange={e => this.handlePassword(e.target.value)} /></p>
                    
                    <div className='auth-buttons'>
                        <button className='login' onClick={this.login}>Login</button>
                        <button className='register' onClick={this.register}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, {getUser})(Auth)