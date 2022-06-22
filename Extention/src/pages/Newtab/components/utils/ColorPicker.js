import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';

function ColorPicker({ color, setColor }) {
  const colors = [
    { name: 'gray', color: 'gray' },
    { name: 'green', color: 'green' },
    { name: 'blue', color: 'blue' },
    { name: 'orange', color: 'orange' },
    { name: 'purple', color: 'purple' },
    { name: 'pink', color: 'pink' },
    { name: 'yellow', color: 'yellow' },
    // { name: 'red', color: 'red' },
    { name: 'teal', color: 'teal' },
  ];

  return (
    <>
      <Box marginTop={4}>
        <SimpleGrid columns={8}>
          {colors.map((c) => (
            <Box key={c.color}>
              <Button
                rounded={'lg'}
                key={c.color}
                background={`${c.color}.300`}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: `${c.color}.400` }}
                onClick={() => {
                  setColor(c.color);
                }}
              ></Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default ColorPicker;
