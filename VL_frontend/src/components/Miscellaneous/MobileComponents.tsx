import { NotAllowedIcon, InfoIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

type ToastProps = {
  fontsize: string;

  status: string;
  text: string;
};

export const MobileToast = ({ fontsize, status, text }: ToastProps) => {
  const x = () => {
    switch (status) {
      case 'error':
        return {
          color: 'red.500',
          icon: <NotAllowedIcon boxSize={10} />,
        };
      case 'success':
        return {
          color: 'green.500',
          icon: <CheckCircleIcon boxSize={10} />,
        };
      default:
        return {
          color: 'blue.500',
          icon: <InfoIcon boxSize={10} />,
        };
    }
  };
  return (
    <Flex
      color="white"
      p={3}
      opacity={0.9}
      bg={x().color}
      borderRadius="lg"
      fontSize={fontsize}
      alignItems={'center'}
      textAlign={'center'}
      justifyContent={'center'}
      fontWeight={'bold'}
    >
      {x().icon}
      {text}
    </Flex>
  );
};
