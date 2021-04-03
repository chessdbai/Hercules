import React, { Component } from 'react';
import { 
  Dialog,
  Button,
  Tooltip,
  Classes,
  AnchorButton,
  Intent,
  TextArea
} from '@blueprintjs/core';
import { readFile } from 'fs';

interface ImportGameDialogProps {
  isOpen: boolean,
  onClose: () => void
}

interface ImportGameDialogState {
  pgn: string
}

export class ImportGameDialog extends Component<ImportGameDialogProps, ImportGameDialogState> {

  constructor(props: ImportGameDialogProps) {
    super(props);
    this.state = {
      pgn: ''
    };
  }

  browseFile = async () => {

    var importPromise = new Promise<string>((resolve, reject) => {
    });
    
    var file : string | undefined;
    try {
      file = await importPromise;
    } catch (err) {
      // No issue, dialog closed
      return;
    }
    var readPromise = new Promise<string>((resolve, reject) => {
        readFile(file!, 'utf-8', (err, data) => {
        if(err){
            reject(err.message);
        }
        resolve(data);
      });
    });
    var fileData : string | undefined;
    try {
      fileData = await readPromise;
    } catch (err) {
      alert(err.message);
      return;
    }

    var pgn = fileData!;
    this.setState({
      pgn: pgn
    });
  }

  handleDismiss = () => {

  }

  onInputChange = (e: any) => {
    console.log(e);
  }

  handleImport = () => {

  }

  render() {
    return (
      <Dialog
        icon="info-sign"
        onClose={() => this.handleDismiss()}
        title="Import Game"
        onClosed={() => this.props.onClose()}
        isOpen={this.props.isOpen}
        {...this.state}>
          <div className={Classes.DIALOG_BODY}>
              <p>
                <TextArea fill={true} onChange={this.onInputChange} value={this.state.pgn} />
              </p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Tooltip content="Open a PGN file from your computer">
                      <Button onClick={() => this.browseFile()}>From File</Button>
                  </Tooltip>
                  <AnchorButton
                      intent={Intent.PRIMARY}
                      onClick={() => this.handleImport()}
                  >
                      Import Game
                  </AnchorButton>
              </div>
          </div>
      </Dialog>);
  }
}