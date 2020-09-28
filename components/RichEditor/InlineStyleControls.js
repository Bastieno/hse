import { Icon } from 'antd';
import StyleButton from './StyleButton';
import './RichEditor.css';

var INLINE_STYLES = [
  {
    label: <Icon type="bold" style={{ fontSize: '0.8em' }} />,
    style: 'BOLD',
    title: 'Bold (Ctrl+B)'
  },
  {
    label: <Icon type="italic" style={{ fontSize: '0.8em' }} />,
    style: 'ITALIC',
    title: 'Italic (Ctrl+I)'
  },
  {
    label: <Icon type="underline" style={{ fontSize: '0.8em' }} />,
    style: 'UNDERLINE',
    title: 'Underline (Ctrl+U)'
  }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <span>
      {INLINE_STYLES.map((type, idx) => (
        <StyleButton
          key={idx}
          active={currentStyle.has(type.style)}
          label={type.label}
          title={type.title}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </span>
  );
};

export default InlineStyleControls;
