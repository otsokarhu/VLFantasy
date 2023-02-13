import { Collapse } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { navBarState } from '../state/navBar';
import { DropDownProps } from '../types';

const DropDownElement = ({ component, name }: DropDownProps) => {
  const isOpen = useRecoilValue(navBarState);

  return (
    <Collapse in={isOpen === name} animateOpacity>
      {component}
    </Collapse>
  );
};

export default DropDownElement;
