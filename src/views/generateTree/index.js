import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import {
  ChevronLeft,
  ChevronRight,
  Print,
  Link,
  FileCopy
} from '@material-ui/icons';

import Tree from 'components/Tree';

import { Wrapper, Controls, Canvas, Button } from './style';

class GenerateTree extends Component {
  printDocument = async () => {
    const canvas = await html2canvas(document.querySelector('#capture'));
    const png = canvas.toDataURL('image/png');
    saveAs(png, 'tree.png');
  };

  render() {
    return (
      <Wrapper>
        {/* <Logo src={`${process.env.PUBLIC_URL}/adb_logo_outline.png`} /> */}
        <Canvas id="capture">
          <Tree forExport />
        </Canvas>
        <Controls left>
          <Button fluid onClick={() => navigate('/compose')}>
            <ChevronLeft />
            Back to Editing
          </Button>
        </Controls>
        <Controls right>
          {/*
          <Button fluid>
            DMF (.xslx file)
            <FileCopy />
          </Button>
          <Button fluid>
            Copy Link
            <Link />
          </Button>
          <Button fluid>
            Print Tree
            <Print />
          </Button>
        */}

          <Button fluid onClick={this.printDocument}>
            Export File
            <ChevronRight />
          </Button>
        </Controls>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(GenerateTree);
