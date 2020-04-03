import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './dash.css'
import Post from '../Post/Post'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            searchVal: '',
            userPosts: true,
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
        axios.get(`/api/posts/?search=${searchVal}&post=${userPosts}`)
        .then(res => {
            console.log('dash data', res.data)
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
            this.componentDidMount()
        })
    }

    deletePost = (id) => {
        axios.delete(`/api/delete/${id}`)
        .then(res => {
            this.setState({
                posts: res.data
            })
            this.props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }


    render(){
        // console.log(this.props)
        // console.log(this.props.id)
        // console.log('id', this.props.id)
        const {posts} = this.state
        let postMap = posts.map((element, index) => {
            return <Link to={{pathname: `/post/${element.id}`, state: {id: element.author_id, func: this.deletePost}}} key={index}>
                    <div className='post-map'>
                        <p>Title: {element.title}</p>
                        <p>Username: {element.username}</p>
                        <img className='the-img' src={element.img} alt={element.username}/>
                    </div>
                </Link>
                
        })
        return(
            <div>
                <input onChange={e => this.handleInput(e.target.value)} value={this.state.searchVal} /> 
                <button onClick={this.getAllPosts}>Search</button>
                <button onClick={this.resetAllPosts} >Reset</button>
                <p>My posts<input onClick={this.handleCheck} type='checkbox' defaultChecked={this.state.userPosts}></input></p>
                <div className='all-posts'>
                    {postMap}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Dashboard)