import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            searchVal: '',
            userPosts: true,
            posts: []
        }
    }

    handleInput = (val) => {
        this.setState({
            searchVal: val
        })
    }

    handleCheck = () => {
        if(this.state.userPosts){
        this.setState({
            userPosts: false
        })} else 
        this.setState({userPosts: true})
    }

    getAllPosts = () => {
        const {searchVal, userPosts} = this.state
        axios.get(`/api/posts/${this.props.id}`, {searchVal, userPosts})
        .then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data
            })
        }).catch(err => console.log(err))
    }

    render(){
        // console.log(this.props)
        // console.log(this.props.id)
        const {posts} = this.state
        let postMap = posts.map((element, index) => {
        return <div>
                <p>{element.title}</p>
                <p>{element.username}</p>
                <p>{element.profilePic}</p>
                </div>
        })
        return(
            <div>
                <input onChange={e => this.handleInput(e.target.value)} /> 
                <button>Search</button>
                <button>Reset</button>
                <p>My posts<input onClick={this.handleCheck} type='checkbox'></input></p>
                {postMap}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Dashboard)