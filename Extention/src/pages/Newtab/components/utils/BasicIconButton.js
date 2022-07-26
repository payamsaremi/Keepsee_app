import React from 'react';
import { IconButton, useColorModeValue, Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
function BasicIconButton({
  icon,
  onClick,
  size = 'sm',
  notification,
  isActive
}) {
  return (
    <>
      <IconButton
        css={css`
          position: relative !important;
        `}
        border={isActive ? '1px' : ''}
        borderColor={'orange.400'}
        bgColor={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.700', 'gray.300')}
        _focus={{ boxShadow: 'none' }}
        size={size}
        rounded={'xl'}
        icon={
          <>
            {icon}{' '}
            {notification && (
              <Box
                as={'span'}
                color={'white'}
                position={'absolute'}
                top={'-1'}
                right={'-5px'}
                fontSize={'0.6rem'}
                bgColor={`${'orange'}.500`}
                rounded={'full'}
                borderRadius={'full'}
                zIndex={9999}
                p={'8px'}
                maxW={'4px'}
                maxH={'4px'}
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                {notification}
              </Box>
            )}
          </>
        }
        onClick={onClick}
      />
    </>
  );
}

export default BasicIconButton;
