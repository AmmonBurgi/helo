import React, {Component} from 'react'
import axios from 'axios'


class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

handleUsername = (val) => {
    this.setState={
        username: val
    }
}

handlePassword = (val) => {
    this.setState({
        password: val
    })
}

register = () => {
    const {username, password} = this.state
   axios.post('/api/register', {username, password})
   .then(res => {
       this.props.history.push('/dashboard')
   }) 
}

    render(){
        console.log(this.state.username)
        return(
            <div>
                <input placeholder='Username' onChange={e => this.handleUsername(e.target.value)} />
                <input placeholder='Password' onChange={e => this.handlePassword(e.target.value)} />
                <button>Login</button>
                <button>Register</button>
            </div>
        )
    }
}
export default Auth