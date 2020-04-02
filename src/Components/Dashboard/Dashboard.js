import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            searchVal: '',
            userPosts: false,
            posts: []
        }
    }

    componentDidMount = () => {
        this.getAllPosts()
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
        // console.log(searchVal, userPosts)
        axios.get(`/api/posts/${this.props.id}?search=${searchVal}&post=${userPosts}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data
            })
        }).catch(err => console.log(err))
    }

    resetAllPosts = () => {
        axios.get(`/api/posts/${this.props.id}`)
        .then(res => {
            this.setState({
                searchVal: '',
                posts: res.data
            })
        })
    }

    render(){
        // console.log(this.props)
        // console.log(this.props.id)
        // console.log('id', this.props.id)
        const {posts} = this.state
        let postMap = posts.map((element, index) => {
            // console.log(element)
        return <Link to={`/post/${element.author_id}`} key={index}>
                    <div>
                        <p>Title: {element.title}</p>
                        <p>Username: {element.username}</p>
                        <img src={element.profilePic} alt={element.username}/>
                    </div>
                </Link>
        })
        return(
            <div>
                <input onChange={e => this.handleInput(e.target.value)} value={this.state.searchVal} /> 
                <button onClick={this.getAllPosts}>Search</button>
                <button onClick={this.resetAllPosts} >Reset</button>
                <p>My posts<input onClick={this.handleCheck} type='checkbox'></input></p>
                {postMap}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Dashboard)