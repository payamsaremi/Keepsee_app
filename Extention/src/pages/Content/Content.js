import React, { useState }  from 'react';
import ContentModal from './components/ContentModal'
console.log('Content script Loaded!');

const Content = ({ title }) => {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension?????");
      if (request)
      setOpened(true)
      setSelectionText(request.data.selectionText)
      setPageUrl(request.data.pageUrl)
      console.log(request)
    }
  );
  const [opened, setOpened] = useState(false);
  const [selectionText,setSelectionText] = useState('')
  const [pageUrl,setPageUrl] = useState()
  const [Tags, setTags] = useState(['Keepsee','Note'])
  return(
    <>
    <ContentModal 
    opened={opened}
    setOpened={setOpened}
    selectionText={selectionText} 
    setSelectionText={setSelectionText} 
    pageUrl={pageUrl} 
    setPageUrl={setPageUrl} 
    Tags={Tags} 
    setTags={setTags}
    />
    </>
  )
};

export default Content;
