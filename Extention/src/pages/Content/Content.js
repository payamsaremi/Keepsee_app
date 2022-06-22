import React, { useEffect, useState } from 'react';
import ContentModal from './components/ContentModal';

import { supabase } from '../../supabaseClient';
console.log('Content script Loaded!');

const Content = ({ metadata }) => {
  const [opened, setOpened] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [Tags, setTags] = useState(['Keepsee', 'Note']);
  const [loading, setLoading] = useState(false);
  const [selectionText, setSelectionText] = useState('');
  const saveData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('snippets').insert([
        {
          title: 'title',
          content: selectionText,
          pageUrl: pageUrl,
          metadata: metadata,
        },
      ]);
      console.log('data saved', selectionText);
    } catch (err) {
      console.log(err);
      console.log(error);
    } finally {
      setOpened(false);
      setLoading(false);
    }
  };
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(
      sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension?????'
    );
    if (request) setOpened(true);
    setSelectionText(request.data.selectionText);
    setPageUrl(request.data.pageUrl);
    console.log(request);
  });

  return (
    <>
      {/* <ContentModal
        saveData={() => saveData()}
        metadata={metadata}
        loading={loading}
        opened={opened}
        setOpened={setOpened}
        selectionText={selectionText}
        setSelectionText={setSelectionText}
        pageUrl={pageUrl}
        setPageUrl={setPageUrl}
        Tags={Tags}
        setTags={setTags}
      /> */}
    </>
  );
};

export default Content;
