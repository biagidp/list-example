import React, { Component } from 'react';
import { ContentBlock, ContentState, Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js';
import './App.css';

const startingState = ContentState.createFromBlockArray([new ContentBlock(
  {
    text: "Let's do this!",
    type: "unordered-list-item"
  }
)]);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {editorState: EditorState.createWithContent(startingState)};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={this.mapKeyToEditorCommand}
      />
    );
  }
}

export default App;
