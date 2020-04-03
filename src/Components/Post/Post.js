import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './post.css'

class Post extends Component {
    constructor(){
        super()
        this.state = {
            postTitle: '',
            postImage: '',
            postContent: '',
            postUsername: '',
            profilePicture: '' 
        }
    }

    componentDidMount = () => {
        this.getPostInfo()
    }

    getPostInfo = () => {
        axios.get(`/api/post/${this.props.match.params.postid}`)
        .then(res => {
            // console.log(res.data)
            this.setState({
            postTitle: res.data[0].title,
            postImage: res.data[0].img,
            postContent: res.data[0].content,
            postUsername: res.data[0].username,
            profilePicture: res.data[0].profile_pic
         })
        }).catch(err => console.log(err))
    }



    render(){
        // console.log('props', this.props)
        // console.log(this.props.location.state)
        // console.log(this.props.match.params.postid)
        const {postTitle, postImage, postContent, postUsername, profilePicture} = this.state
        return(
            <div className='Post'>
                <div className='post-display'>
                    <p>{postTitle}</p>
                    <img src={profilePicture} alt={postUsername} />
                    <img src={postImage} alt={postTitle} />
                    <p>{postUsername}</p>
                    <p>{postContent}</p>
                    {this.props.id === this.props.location.state.id ? (<>
                    <button onClick={() => this.props.location.state.func(this.props.match.params.postid)}>Delete</button>
                    </>) : (<></>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Post)