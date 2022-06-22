import React, { useState } from 'react';
import { Box, Text, Image, Fade, Collapse, IconButton } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
function Note({ note, index, setState, data, column }) {
  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <>
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            p={2}
            m={1}
            rounded={'xl'}
            bgColor={'gray.50'}
            color={'gray.500'}
            cursor={'pointer'}
            border="1px"
            borderColor="gray.200"
            // borderStyle={snapshot.isDragging ? 'dashed' : 'hidden'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box
                display={'flex'}
                justifyContent={'start'}
                alignItems={'center'}
              >
                <Image
                  mr={'2'}
                  src={note.favIconUrl}
                  fallbackSrc={
                    'https://media.istockphoto.com/photos/daisy-on-a-white-background-picture-id890573264?b=1&k=20&m=890573264&s=170667a&w=0&h=VV20bmLDeWs-Oxga3GSOLV2h48-1IoTSYer5__2AglM='
                  }
                  rounded={'full'}
                  boxSize="30px"
                  objectFit="cover"
                />
                <Text fontSize={'md'} overflowWrap={'anywhere'}>
                  {note.title}
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Draggable>
  );
}

export default Note;
