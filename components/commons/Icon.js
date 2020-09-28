import { Icon as EvergreenIcon } from 'evergreen-ui';
import styled from 'styled-components';

const Icon = styled(EvergreenIcon)`
  color: ${props => props.color || '#4a4a4a'} !important;
  font-size: 2.2em !important;
  cursor: pointer !important;

  &:hover {
    fill: ${props => props.hovercolor}!important;
  }
`;

export default props => <Icon icon={props.type} size={props.size} {...props} />;
