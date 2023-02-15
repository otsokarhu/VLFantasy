import { Center, Flex, Heading } from '@chakra-ui/react';

const EmptyRunnerCard = () => {
  return (
    <Center py={3}>
      <Flex
        opacity={0.5}
        maxW={'270px'}
        w={'full'}
        bg={'gray.100'}
        rounded={'md'}
        h={'479px'}
        border={'2px dashed'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Center>
          <Heading fontSize={'1.75rem'} fontWeight={500} fontFamily={'body'}>
            Lisää juoksija
          </Heading>
        </Center>
      </Flex>
    </Center>
  );
};

export default EmptyRunnerCard;
