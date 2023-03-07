import { ScaleFade } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { navBarState } from '../../state/navBar';
import { DropDownProps } from '../../types';

const DropDownElementMobile = ({ component, name }: DropDownProps) => {
  const isOpen = useRecoilValue(navBarState);

  return (
    <ScaleFade initialScale={0.9} in={isOpen === name} unmountOnExit>
      {component}
    </ScaleFade>
  );
};

export default DropDownElementMobile;
