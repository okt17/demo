import * as React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Modal from '../../ui/Modal';
import LayersList from '../LayersList';
import DataLayers from '../DataLayers';
import MapPlaces from '../MapPlaces';
import StyledMapMenu from './styled';

interface IProps {
  map: ol.Map;
  data?: any;
}

interface IState {
  activeElementName?: string;
}

// presents a set of buttons allowing the user to choose between menu entries
export default class MapMenu extends React.PureComponent<IProps, IState> {
  state: IState = {};
  static Items: {
    [key: string]: string;
  } = {
    layers: 'Manage Map',
    dataLayers: 'Add Layers',
    places: 'Places',
    about: 'About',
  };
  clearActiveElement = () => this.setState( {
    activeElementName: undefined,
  } );
  protected handleButtonClick = ( {
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
        data: {
          layers,
          places,
        }
      },
      state: {
        activeElementName,
      },
    } = this;

    return <StyledMapMenu>
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
              onClick={this.clearActiveElement}
            >
              Close
            </Button>
          }
          onBackgroundClick={this.clearActiveElement}
        >
          {
            activeElementName === 'layers'
            &&
            <LayersList map={map}/>
          }
          {
            activeElementName === 'dataLayers'
            &&
            <DataLayers map={map} layers={layers}/>
          }
          {
            activeElementName === 'places'
            &&
            <MapPlaces
              map={map}
              places={places}
              onAnimate={this.clearActiveElement}
            />
          }
          {
            activeElementName === 'about'
            &&
            <>
              <p>
                Powered by <a
                  href='http://openlayers.org/'
                  target='_blank'
                >Openlayers</a> and <a
                  href='https://react-bootstrap.github.io/'
                  target='_blank'
                >React-Bootstrap</a>.
              </p>
              <p>
                <a
                  href='https://github.com/okt17/demo'
                  target='_blank'
                >
                  View source code
                </a>
              </p>
            </>
          }
        </Modal>
      }
    </StyledMapMenu>;
  }
}
