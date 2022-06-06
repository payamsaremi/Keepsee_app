import React from 'react';
import { Box, Text, Image, SimpleGrid } from '@chakra-ui/react';
import TinyBadge from '../tabManager/components/TinyBadge';
import { Link } from 'react-router-dom';
function SpaceCard({ columnId, data }) {
  const column = data.columns[columnId];
  return (
    <>
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'space-between'}
        rounded={'2xl'}
        p={'4'}
        m={'2'}
        color={'black'}
        bg={'white'}
        maxH={'sm'}
        maxW={'sm'}
        w={'xs'}
        h={'150px'}
        // ring={'3px'}
        shadow={'sm'}
        cursor={'pointer'}
        ringColor={`${column.color}.500`}
      >
        <Box
          display={'flex'}
          flexDir={'row'}
          opacity={'0.5'}
          _hover={{ opacity: 1 }}
        >
          <SimpleGrid columns={[2, null, 10]} spacing="10px">
            {column.taskIds.map((tabId) => (
              <Box key={tabId}>
                <Image
                  mr={'2'}
                  src={data.tasks[tabId].favIconUrl}
                  fallbackSrc={
                    'https://media.istockphoto.com/photos/daisy-on-a-white-background-picture-id890573264?b=1&k=20&m=890573264&s=170667a&w=0&h=VV20bmLDeWs-Oxga3GSOLV2h48-1IoTSYer5__2AglM='
                  }
                  rounded={'full'}
                  boxSize="20px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        <Box
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Link to={'/spaceDetail'} state={{ columnId: columnId }}>
            <Box>
              <Text
                fontWeight={'bold'}
                fontSize={'xl'}
                color={`${column.color}.500`}
                noOfLines={5}
              >
                {column.title}
              </Text>
            </Box>
          </Link>

          <Box display={'flex'}>
            <TinyBadge
              text={`${column.taskIds.length} Tabs`}
              color={column.color}
            />
            {/* <TinyBadge text={'0 Notes'} color={column.color} /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SpaceCard;
