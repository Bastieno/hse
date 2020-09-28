import { Icon as AntIcon } from 'antd';
import { Icon as EvergreenIcon } from 'evergreen-ui';
import styled from 'styled-components';

export const LoadingIcon = () => (
  <AntIcon
    type="loading-3-quarters"
    spin={true}
    style={{ color: 'inherit', fontSize: 'inherit' }}
  />
);

export const EyeIcon = ({ handlePasswordVisibility }) => (
  <AntIcon
    onClick={() => handlePasswordVisibility(true)}
    type="eye"
    style={{
      color: 'inherit',
      fontSize: '2em',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  />
);

export const EyeInvisibleIcon = ({ handlePasswordVisibility }) => (
  <AntIcon
    onClick={() => handlePasswordVisibility(false)}
    type="eye-invisible"
    style={{
      color: 'inherit',
      fontSize: '2em',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  />
);

const EgIcon = styled(EvergreenIcon)`
  color: ${props => props.color || 'inherit'} !important;
  font-size: 2.2em !important;
  cursor: pointer !important;
  user-select: none !important;
  vertical-align: ${props => props.verticalalign} !important;

  &:hover {
    fill: ${props => props.hovercolor}!important;
  }
`;

export default props => (
  <EgIcon icon={props.type} size={props.size} {...props} />
);
