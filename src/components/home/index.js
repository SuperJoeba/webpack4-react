import React, { Component } from 'react';

class Index extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    componentDidMount() {
        console.error('this is an error')
    }

    handleLogin() {
        console.log(this)
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                hello React HotOnly
                <button onClick={this.handleLogin}>去登陆</button>
            </div>
        )
    }
}

export default Index;