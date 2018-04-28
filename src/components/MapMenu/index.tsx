import * as React from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import Modal from '../../ui/Modal';
import LayersList from '../LayersList';
import DataLayers from '../DataLayers';

interface IProps {
  map: ol.Map;
}

interface IState {
  activeElementName?: string;
}

export default class MapMenu extends React.PureComponent<IProps, IState> {
  state: IState = {};
  static Items: {
    [key: string]: string;
  } = {
    layers: 'Manage Layers',
    dataLayers: 'Add Layers',
    placeholder: 'Placeholder',
  };
  handleButtonClick = ( {
    target: {
      name,
    },
  }: any ) => this.setState( {
    activeElementName: name === this.state.activeElementName
      ? undefined
      : name,
  } );
  render() {
    const {
      props: {
        map,
      },
      state: {
        activeElementName,
      },
    } = this;

    return <ButtonGroup
      className='map-menu'
      bsSize='large'
    >
      {
        Object.entries( MapMenu.Items ).map(
          ( [name, alias] ) => <Button
            bsStyle={
              name === activeElementName
                ? 'success'
                : 'primary'
            }
            key={name}
            name={name}
            onClick={this.handleButtonClick}
          >
            {alias}
          </Button>,
        )
      }
      {
        activeElementName !== undefined
        &&
        <Modal
          title={MapMenu.Items[activeElementName]}
          footerContent={
            <Button
              onClick={() => this.setState( { activeElementName: undefined } )}
            >
              Close
            </Button>
          }
        >
          {
            activeElementName === 'layers'
            &&
            <LayersList map={map}/>
          }
          {
            activeElementName === 'dataLayers'
            &&
            <DataLayers map={map}/>
          }
        </Modal>
      }
    </ButtonGroup>;
  }
}
