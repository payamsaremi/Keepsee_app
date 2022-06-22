import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import ColorPicker from '../../utils/ColorPicker';
function ColumnSettingsMenu({
  column,
  setState,
  data,
  setIsOpen,
  isOpen,
  setColor,
  color,
  title,
  setTitle,
}) {
  const dataSetter = (column) => {
    const state = {
      ...data,
      columns: {
        ...data.columns,
        [column.id]: {
          ...data.columns[column.id],
          title: title,
          color: color,
        },
      },
    };
    setState(state);
    return state;
  };
  const saveColumnSettings = (column) => {
    dataSetter(column);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box display={'flex'} flexDir={'column'} p={2}>
        <FormControl>
          {/* <FormLabel>Name</FormLabel> */}
          <Input
            variant="filled"
            _placeholder={useColorModeValue(
              { color: 'gray.500' },
              { color: 'gray.300' }
            )}
            placeholder={'Give it a name'}
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                saveColumnSettings(column);
              }
            }}
          />
        </FormControl>

        <FormControl>
          <ColorPicker
            color={color}
            setColor={setColor}
            saveColumnSettings={() => saveColumnSettings(column)}
          />
        </FormControl>
        <Button
          mt={'2'}
          bgColor={useColorModeValue(`${color}.400`, `${color}.700`)}
          color={`${color}.50`}
          _hover={{ bgColor: `${color}.500` }}
          rounded={'xl'}
          onClick={() => {
            saveColumnSettings(column);
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}

export default ColumnSettingsMenu;
