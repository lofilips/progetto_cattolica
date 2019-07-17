import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import axios from 'axios'
import '../css/RichTextArea.css';
import { Button } from 'react-bootstrap'

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';


class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}


class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">
          H
        </button>
      </div>
    );
  }
}


const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

let codDocente = document.location.href.split("/")[5]

if (codDocente !== undefined) {
  codDocente = codDocente.includes("#") ? document.location.href.split("/")[5].split("#")[0] :  document.location.href.split("/")[5]
}

let visiModifica = 'none'

export default class RichTextArea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: createEditorStateWithText(''),
      profilo: [],
      contenutoProfilo: '',
      currentContent: ''
    }
    this.modificaProfilo = this.modificaProfilo.bind(this)
  }

  componentDidMount() {
    fetch('/docenti/contenuto_profilo/' + codDocente)
    .then(res => {
        if (res.status !== 200) {
            console.log('ERROR. Status Code: ' + res.status)
            return
        }
        return res.json();
    })
    .then(result => {
        this.setState(() => ({ profilo: result }))
        this.setState({
          contenutoProfilo: this.state.profilo[0].contenuto_profilo
        })
        this.setState({
          editorState: createEditorStateWithText(this.state.contenutoProfilo)
        })
    })
  }

  onChange = (editorState) => {
    this.setState({ editorState })
    this.setState({ contenutoProfilo: this.state.editorState.getCurrentContent().getPlainText('\u0001') })
  }

  focus = () => {
    this.editor.focus();
  };

  modificaProfilo() {
    // console.log("contenuto profilo " + this.state.contenutoProfilo)

    axios.put(`/docenti/modifica_profilo/${codDocente}/${this.state.contenutoProfilo}`)
    .then(res => {
        console.log(res.status)
    })
    .catch(error => console.log(error))

    visiModifica = "block"

    this.forceUpdate()

    setTimeout(() => {
        visiModifica = "none"
        this.forceUpdate()
    }, 3000)
}

  render() {
    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <Toolbar as toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div className="buttons-align">
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlinesButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
        </div>
        <Button onClick={this.modificaProfilo} variant="primary">Conferma modifica</Button>
        <br/><br/>
        <div style={{color: "green", display: visiModifica}}>Modifica effettuata con successo &nbsp;<img src={require('../assets/confirm.png')} style={{width: "20px"}} alt=""/></div>
      </div>
    );
  }
}