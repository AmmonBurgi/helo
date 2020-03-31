import React, {Component} from 'react'


class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            searchVal: '',
            toggleCheck: true
        }
    }

    handleInput = (val) => {
        this.setState({
            searchVal: val
        })
    }

    handleCheck = () => {
        if(this.state.toggleCheck){
        this.setState({
            toggleCheck: false
        })} else 
        this.setState({toggleCheck: true})
    }

    render(){
        console.log(this.state.toggleCheck)
        return(
            <div>
                <input onChange={e => this.handleInput(e.target.value)} /> 
                <button>Search</button>
                <button>Reset</button>
                <p>My posts<input onClick={this.handleCheck} type='checkbox'></input></p>
            </div>
        )
    }
}
export default Dashboard