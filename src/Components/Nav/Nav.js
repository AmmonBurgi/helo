import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './nav.css'

class Nav extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        // console.log(this.props)
        return(
            <div className='nav'>
                <div className='theImg'>
                    <img src={this.props.user.profile_pic} alt='profile' />
                    <p>{this.props.user.username}</p> 
                </div>
                <div className='home'>
                    <Link to='/dashboard'>
                        <button>Home</button>
                    </Link>
                    <Link to='/new'>
                        <button>New Post</button>
                    </Link>
                </div>
                <div className='logout'>
                    <Link to='/'>
                        <button>Logout</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Nav)