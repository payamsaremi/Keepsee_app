import React from 'react';
import { Tooltip, Box, Tag } from '@chakra-ui/react';
function BasicToolTip({ children, label }) {
  return (
    <>
      <Tooltip label={label} rounded={'2xl'} placement="right">
        <CustomCard>{children}</CustomCard>
      </Tooltip>
    </>
  );
}

export default BasicToolTip;

const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
  <Box>
    <div ref={ref} {...rest}>
      {children}
    </div>
  </Box>
));
