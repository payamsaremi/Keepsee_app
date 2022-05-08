// import React from 'react';
// import { render } from 'react-dom';
// import Content from './Content';
// const body = document.querySelector('body');
// const app = document.createElement('div');
// app.id = 'content-container';
// if (body) {
//   body.prepend(app);
// }

// const metaTitle = document.querySelector('meta[property="og:title"]').content
// const metaDescription = document.querySelector('meta[property="og:description"]').content
// const metaImage = document.querySelector('meta[property="og:image"]').content
// console.log(metaTitle, metaDescription, metaImage)
// render(
//   <React.StrictMode>
//      <Content 
//      MetaTitle={document.querySelector('meta[property="og:title"]').content} 
//      metaImage={metaImage}
//      metaDescription={metaDescription}
//      />
//   </React.StrictMode>,
//   window.document.querySelector('#content-container')
// );

// if (module.hot) module.hot.accept();



import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Content from './Content';
console.log(('hello from content'))


function MainApp() {
  useEffect(()=>{
  try {
    setMetaTitle(document.querySelector('meta[property="og:title"]').content)
    setMetaDescription(document.querySelector('meta[property="og:description"]').content)
    setMetaImage(document.querySelector('meta[property="og:image"]').content)
    setSiteName(document.querySelector('meta[property="og:site_name"]').content)
    setAuthor(document.querySelector('meta[name="author"]').content)
    setCreatorTwitter(document.querySelector('meta[name="twitter:creator"]').content)
    
  } catch(err) {
    console.log('no info found')
  }
  })
  const [metaTitle,setMetaTitle] = useState('')
  const [metaDescription,setMetaDescription] = useState('')
  const [metaImage,setMetaImage] = useState('')
  const [metaAuthor, setAuthor] =  useState('')
  const [metaCreatorTwitter, setCreatorTwitter] = useState('')
  const [metaSiteName, setSiteName] = useState('')

  return (
    <React.StrictMode>
    <Content 
    metaTitle={metaTitle}
    metaDescription={metaDescription}
    metaImage={metaImage}
    metaAuthor={metaAuthor}
    metaCreatorTwitter={metaCreatorTwitter}
    metaAuthor={metaAuthor}
    metaSiteName={metaSiteName}
    />
 </React.StrictMode>
  )
}
const body = document.querySelector('body');
const app = document.createElement('div');
app.id = 'content-container';
if (body) {
  body.prepend(app);
}
ReactDOM.render(<MainApp />, document.getElementById("content-container"));