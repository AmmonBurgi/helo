import React, {Component} from 'react'
import axios from 'axios'

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
        // const {postId} = this.props.match.params
        // console.log(this.props.match.params.postid)
        axios.get(`/api/post/${this.props.match.params.postid}`)
        .then(res => {
            console.log(res.data)
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
        console.log('props', this.props)
        const {postTitle, postImage, postContent, postUsername, profilePicture} = this.state
        return(
            <div>
                <p>{postTitle}</p>
                <img src={profilePicture} alt={postUsername} />
                <p>{postImage}</p>
                <p>{postUsername}</p>
                <p>{postContent}</p>
            </div>
        )
    }
}
export default Post