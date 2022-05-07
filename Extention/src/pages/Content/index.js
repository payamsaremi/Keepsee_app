import React from 'react';
import { render } from 'react-dom';
import Content from './Content';
const body = document.querySelector('body');
const app = document.createElement('div');
app.id = 'content-container';
if (body) {
  body.prepend(app);
}




render(
  <React.StrictMode>
     <Content title={'Hello from Content'} />
  </React.StrictMode>,
  window.document.querySelector('#content-container')
);

if (module.hot) module.hot.accept();



















// import React from "react";
// import ReactDOM from "react-dom";

// console.log(('hello from content'))

// class MainApp extends React.Component {
//   render() {
//     return (
//       <div className="content">
//         <h1>Hello World</h1>
//       </div>
//     );
//   }
// }
// const body = document.querySelector('body');
// const app = document.createElement('div');
// app.id = 'content-container';
// if (body) {
//   body.prepend(app);
// }
// ReactDOM.render(<MainApp />, document.getElementById("content-container"));