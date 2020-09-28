import React, { Component } from 'react';
import {
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertFromHTML,
} from 'draft-js';
import { Icon } from 'antd';
import BlockStyleControls, { getBlockStyle } from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import convertToHtml from '../../helpers/convertToHtml';
import {
  getSelectionRange,
  getSelectionCoords,
} from '../../helpers/selectionUtils';
import './RichEditor.css';

class RichEditor extends Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      { strategy: findLinkEntities, component: Link },
    ]);

    let editorState;

    if (this.props.abstractMarkup) {
      const blocksFromHTML = convertFromHTML(this.props.abstractMarkup);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty(decorator);
    }

    this.state = {
      editorState,
      editor: null,
      showURLInput: false,
      URLInputPosition: {},
      urlValue: '',
    };

    this.onChange = editorState => {
      const content = editorState.getCurrentContent();
      this.props.setFieldValue(this.props.name, content.getPlainText(''));
      this.props.getAbstractMarkup(convertToHtml(content));
      this.props.getWordCount(content.getPlainText(''));
      this.setState({ editorState });
    };

    this.focus = () => {
      this.refs.editor.focus();
      this.setState({ showURLInput: false });
    };
    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = e => this.setState({ urlValue: e.target.value });
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  componentDidMount() {
    this.setState({ editor: Editor });
  }

  _promptForLink(e) {
    e.preventDefault();

    const { editorState } = this.state;
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      const selectionRange = getSelectionRange();
      const selectionCoords = getSelectionCoords(selectionRange);

      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState(
        {
          showURLInput: true,
          urlValue: url,
          URLInputPosition: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft,
          },
        },
        () => {
          setTimeout(() => this.refs.url.focus(), 0);
        }
      );
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const { editorState, urlValue } = this.state;

    if (!urlValue) {
      this.setState({
        editorState: RichUtils.toggleLink(
          editorState,
          editorState.getSelection(),
          null
        ),
      });

      return 'handled';
    }

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    this.setState(
      {
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showURLInput: false,
        urlValue: '',
      },
      () => {
        setTimeout(() => this.refs.editor.focus(), 0);
      }
    );
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (!newState) return 'not-handled';

    this.onChange(newState);
    return 'handled';
  }

  _onTab(e) {
    const maxDepth = 4;
    const { editorState } = this.state;
    this.onChange(RichUtils.onTab(e, editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  render() {
    let urlInput;

    if (this.state.showURLInput) {
      urlInput = (
        <div
          className="RichEditor-URLInput-Bubble"
          style={{
            position: 'absolute',
            top: this.state.URLInputPosition.top,
            left: this.state.URLInputPosition.left,
            border: '1px solid rgb(218, 220, 224)',
            borderRadius: 2,
            boxShadow: '0 1px 3px 1px rgba(60, 64, 67, 0.15)',
            padding: '1rem',
            backgroundColor: '#fff',
            fontSize: '1.5rem',
          }}
        >
          <input
            onChange={this.onURLChange}
            ref="url"
            style={{
              minWidth: 312,
              fontFamily: "'Product Sans Regular', sans-serif",
              marginRight: 10,
              padding: '4px 8px',
              border: '1px solid rgb(218, 220, 224)',
              borderRadius: 2,
            }}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button
            className="btn--green"
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              borderRadius: 2,
              padding: '4px 8px',
              border: 'none',
              transition: 'all 500ms linear',
            }}
            onMouseDown={this.confirmLink}
          >
            Insert
          </button>
        </div>
      );
    }

    const { editorState, editor } = this.state;
    const ClientEditor = editor;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <>
        <div className="RichEditor-root" id="RichEditor-root">
          {urlInput}
          <div className="RichEditor-controls">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />

            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />

            <span
              title="Insert Link"
              className="RichEditor-styleButton"
              onMouseDown={this.promptForLink}
            >
              <Icon type="link" style={{ fontSize: '0.8em' }} />
            </span>
          </div>

          <div className={className} onClick={this.focus}>
            {editor ? (
              <ClientEditor
                editorState={editorState}
                spellCheck={true}
                placeholder={this.props.placeholder}
                ref="editor"
                blockStyleFn={getBlockStyle}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

const Link = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      href={url}
      style={{
        color: '#3b5998',
        textDecoration: 'underline',
      }}
    >
      {props.children}
    </a>
  );
};

export default RichEditor;
