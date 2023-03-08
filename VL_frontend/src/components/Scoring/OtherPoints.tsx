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

const OtherPoints = () => {
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
        Muut:
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={isDesktop ? '0.8rem' : '1.6rem'}>
              Juoksijan suoritus
            </Th>
            <Th fontSize={isDesktop ? '0.8rem' : '1.6rem'}>Pisteet</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>
              Kisan nopein loppusuora
            </Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>2</Td>
          </Tr>
          <Tr>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>
              Hylkäys/Keskeytys
            </Td>
            <Td fontSize={isDesktop ? '1.4rem' : '2.3rem'}>-3</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default OtherPoints;
