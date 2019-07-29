// import Layer from './components/layer/layer.js'

// var app = document.getElementById('app');
// console.log(Layer())
// app.innerHTML = Layer().tpl


import ReactDOM from 'react-dom';
import routes from './routes.js';


ReactDOM.render(
    routes,
    document.getElementById('app')
)

