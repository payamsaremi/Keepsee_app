import React, { useState }  from 'react';
import ContentModal from './components/ContentModal'
console.log('Content script Loaded!');

const Content = ({ metaTitle, metaDescription, metaImage,metaSiteName, metaCreatorTwitter, metaAuthor }) => {
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
  const [loading,setLoading] = useState(false)
  const saveData = () => {
    setLoading(true)
    console.log('data saved')
    setTimeout(() => {
      setOpened(false)
      setLoading(false)
    }, [1000]);
  }
  return(
    <>
    <ContentModal
    metaCreatorTwitter={metaCreatorTwitter}
    metaAuthor={metaAuthor}
    metaImage={metaImage}
    metaTitle={metaTitle}
    saveData={()=> saveData()}
    loading={loading}
    opened={opened}
    setOpened={setOpened}
    selectionText={selectionText} 
    setSelectionText={setSelectionText} 
    pageUrl={pageUrl} 
    setPageUrl={setPageUrl} 
    Tags={Tags} 
    setTags={setTags}
    metaSiteName={metaSiteName}
    />
    </>
  )
};

export default Content;
