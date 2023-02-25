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
} from '@chakra-ui/react';

const OtherPoints = () => {
  const textColor = useColorModeValue('gray.500', 'whitesmoke');
  return (
    <Box py={2}>
      <Heading
        fontSize={'xl'}
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
            <Th>Juoksijan suoritus</Th>
            <Th>Pisteet</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Kisan nopein loppusuora</Td>
            <Td>2</Td>
          </Tr>
          <Tr>
            <Td>Hylkäys/Keskeytys</Td>
            <Td>-3</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default OtherPoints;
