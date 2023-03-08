import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';

const TeamBasedPoints = () => {
  const [isDesktop] = useMediaQuery('(min-width: 62em)');
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  return (
    <Box py={2}>
      <Heading
        fontSize={isDesktop ? '1.8rem' : '2.5rem'}
        color={textColor}
        textAlign={'center'}
        fontWeight={'bold'}
        pb={2}
      >
        Joukkuekohtaiset:
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={isDesktop ? '0.8rem' : '1.6rem'}>
              Joukkueen sijoitus
            </Th>
            <Th fontSize={isDesktop ? '0.8rem' : '1.6rem'}>Pisteet</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>1.</Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>10</Td>
          </Tr>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>2.</Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>8</Td>
          </Tr>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>3.</Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>6</Td>
          </Tr>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>4.</Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>4</Td>
          </Tr>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>5.</Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>2</Td>
          </Tr>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>6.</Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>1</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TeamBasedPoints;
