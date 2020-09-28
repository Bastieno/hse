import React, { Component } from 'react';
import './RichEditor.css';

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span
        title={this.props.title}
        className={className}
        onMouseDown={this.onToggle}
      >
        {this.props.label}
      </span>
    );
  }
}

export default StyleButton;
