import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { RunnerProps } from '../types';

const RunnerCard = (props: RunnerProps) => {
  const { team, runnerPhoto, price, runner, teamPhoto, points } = props;
  return (
    <Center py={3}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('whitesmoke', 'dimgray')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        h={'full'}
      >
        <Image h={'120px'} w={'full'} src={teamPhoto} objectFit={'cover'} />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={runnerPhoto}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={8}>
            <Heading
              textAlign={'center'}
              fontSize={'1.75rem'}
              fontWeight={500}
              fontFamily={'body'}
            >
              {runner}
            </Heading>
            <Text color={useColorModeValue('gray.500', 'whitesmoke')}>
              {team}
            </Text>
          </Stack>

          <Box bottom={'0px'} p={'absolute'}>
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{points}</Text>
                <Text
                  fontSize={'sm'}
                  color={useColorModeValue('gray.500', 'whitesmoke')}
                >
                  Kerätyt pisteet
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{price}</Text>
                <Text
                  fontSize={'sm'}
                  color={useColorModeValue('gray.500', 'whitesmoke')}
                >
                  Hinta
                </Text>
              </Stack>
            </Stack>
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Lisää joukkueeseen
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default RunnerCard;
