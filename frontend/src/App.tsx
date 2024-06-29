import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider, ColorModeScript, Flex, Heading, Text, Spinner } from '@chakra-ui/react';
import { theme } from './theme';
import { getManifestation } from './api';
import { Manifestation } from './types';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [manifestation, setManifestation] = useState<Manifestation>();
  
  useEffect(() => {
    const load = async () => {
      const mani = await getManifestation();
      setManifestation(mani);
      setIsLoading(false);
    };
    load();
  }, [])

  if (isLoading){
    return (
      <>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
          <Box bg={'brand.cornsilk'} minHeight={'100vh'}>
            <Flex
              direction={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              px={4}
              py={10}
            >
              <Spinner color={'brand.dark_green'}/>
            </Flex>
          </Box>
        </ChakraProvider>
      </>
    );
  }

  return (
    <>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Box bg={'brand.cornsilk'} minHeight={'100vh'}>
        <Flex
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          px={4}
          py={10}
        >
          <Heading as='h1' color={'brand.deep_green'} size={'3xl'}>Your Daily Manifestation:</Heading>
          <br/>
          <Heading as='h2' color={'brand.tigers_eye'} size={'2xl'}>{manifestation?.content}</Heading>
          <br />
          <Text as='h3' color={'brand.deep_green'} fontSize={'xl'}>- {manifestation?.credit}</Text>
        </Flex>
      </Box>
    </ChakraProvider>
    </>
  );
}

export default App;
