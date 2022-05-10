import React from 'react';

import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';

function SnippetCard({ snippet }) {
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }
  return (
    <>
      <div>
        <Card
          shadow="sm"
          p="xl"
          component="a"
          radius={'lg'}
          href={snippet.pageUrl}
          target="_blank"
        >
          <Card.Section>
            {/* <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem perspiciatis, quibusdam libero earum facilis a laborum autem corrupti sapiente! In similique facere officia laudantium sunt vitae aspernatur, provident necessitatibus.</Text> */}
          </Card.Section>
          <Text weight={500} size="lg">
            {snippet.title}
          </Text>
          <Text size="sm">{truncateString(snippet.content, 200)}</Text>
        </Card>
      </div>
    </>
  );
}

export default SnippetCard;
