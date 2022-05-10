import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';
console.log('hello from content');

function MainApp() {
  useEffect(() => {
    try {
      setMetadata([
        {
          metaTitle: document.querySelector('meta[property="og:title"]')
            .content,
        },
        {
          metaDescription: document.querySelector(
            'meta[property="og:description"]'
          ).content,
        },
        {
          metaImage: document.querySelector('meta[property="og:image"]')
            .content,
        },
        {
          metaSiteName: document.querySelector('meta[property="og:site_name"]')
            .content,
        },
        {
          metaAuthor: document.querySelector('meta[name="author"]').content,
        },
        {
          metaCreatorTwitter: document.querySelector(
            'meta[name="twitter:creator"]'
          ).content,
        },
      ]);
    } catch (err) {
      console.log('no info found');
    }
  }, []);
  const [metadata, setMetadata] = useState(null);
  return (
    <React.StrictMode>
      <Content metadata={metadata} />
    </React.StrictMode>
  );
}
const body = document.querySelector('body');
const app = document.createElement('div');
app.id = 'content-container';
if (body) {
  body.prepend(app);
}
ReactDOM.render(<MainApp />, document.getElementById('content-container'));
