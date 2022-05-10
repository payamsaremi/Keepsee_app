import {
  Modal,
  Button,
  Group,
  Text,
  Blockquote,
  Stack,
  Image,
  SimpleGrid,
} from '@mantine/core';
import React, { useState } from 'react';
import TagSelector from './TagSelector';

import { FaRegStickyNote } from 'react-icons/fa';
function ContentModal({
  selectionText,
  metadata,
  pageUrl,
  Tags,
  setTags,
  opened,
  setOpened,
  loading,
  saveData,
}) {
  return (
    <>
      <Modal
        zIndex={100}
        overlayBlur={3}
        centered
        size="lg"
        radius="lg"
        overlayOpacity={0.4}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Stack spacing="md">
          <Blockquote
            icon={<FaRegStickyNote size={24} />}
            color={'dark'}
            cite={`${pageUrl}`}
          >
            {selectionText}
          </Blockquote>

          <Group position="left">
            {metadata &&
              metadata.map((data, index) => (
                <div key={index}>
                  <Text>{data.metaTitle}</Text>
                  {/* <h1>{JSON.stringify(data, null, 2)}</h1> */}
                </div>
              ))}
          </Group>

          <TagSelector setTags={setTags} Tags={Tags} />
          <Group position="right">
            <Button
              variant="light"
              radius="lg"
              color="cyan"
              onClick={() => saveData()}
              loading={loading}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

export default ContentModal;
