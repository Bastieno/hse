import { Icon } from 'antd';
import StyleButton from './StyleButton';
import './RichEditor.css';

const BLOCK_TYPES = [
  {
    label: <Icon type="unordered-list" style={{ fontSize: '0.8em' }} />,
    style: 'unordered-list-item',
    title: 'Bulleted List'
  },
  {
    label: <Icon type="ordered-list" style={{ fontSize: '0.8em' }} />,
    style: 'ordered-list-item',
    title: 'Numbered List'
  }
];

export const getBlockStyle = block => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
};

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <span>
      {BLOCK_TYPES.map((type, idx) => (
        <StyleButton
          key={idx}
          active={type.style === blockType}
          label={type.label}
          title={type.title}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </span>
  );
};

export default BlockStyleControls;
