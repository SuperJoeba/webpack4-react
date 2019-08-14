import React, { Component } from 'react';
import './index.css';

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
                <div className='bottom-box'>
                    <input className="bottom-input" type="text" placeholder="请输入姓名"/>
                    <p>这是底部文字</p>
                </div>
            </div>
        )
    }
}

export default Index;