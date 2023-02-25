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

const LegBasedPoints = () => {
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
        Osuuskohtaiset:
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Juoksijan osuussijoitus</Th>
            <Th>Pisteet</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1.</Td>
            <Td>8</Td>
          </Tr>
          <Tr>
            <Td>2.</Td>
            <Td>6</Td>
          </Tr>
          <Tr>
            <Td>3.</Td>
            <Td>5</Td>
          </Tr>
          <Tr>
            <Td>4.</Td>
            <Td>4</Td>
          </Tr>
          <Tr>
            <Td>5.</Td>
            <Td>3</Td>
          </Tr>
          <Tr>
            <Td>6.</Td>
            <Td>2</Td>
          </Tr>
          <Tr>
            <Td>7-10.</Td>
            <Td>1</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default LegBasedPoints;