import React from 'react';
import { Box } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import BasicIconButton from '../../utils/BasicIconButton';
export default function AddToColumnButton({ mouseOver }) {
  return (
    <Box display={'flex'} justifyContent={'end'} alignItems={'end'}>
      {mouseOver ? (
        <Box
          w={'full'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box>
            <BasicIconButton
              _focus={{ boxShadow: 'none' }}
              color={'gray.400'}
              rounded={'2xl'}
              size={'sm'}
              variant={'ghost'}
              icon={<BiPlus size={18} />}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box w={'full'} p={'4'}></Box>
        </Box>
      )}
    </Box>
  );
}
