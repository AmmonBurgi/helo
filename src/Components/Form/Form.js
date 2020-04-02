import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'


class Form extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            imageUrl: '',
            content: ''
        }
    }

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

createPost = () => {
    const {title, imageUrl, content} = this.state
    axios.post(`/api/createPost/${this.props.id}`, {title, imageUrl, content})
    .then((res) => {
        console.log(res)
        this.props.history.push('/dashboard')
    }).catch(err => console.log(err))
}

    render(){
        console.log(this.props)
        // console.log(this.state.content)
        // console.log(this.props.id)
        return(
            <div>
                <input name='title' onChange={e => this.handleChange(e)} placeholder='title' />
                <input name='imageUrl' onChange={e => this.handleChange(e)} placeholder='imageUrl' />
                <input name='content' onChange={e => this.handleChange(e)} placeholder='content' />
                <button onClick={this.createPost}>Post</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Form)