import * as React from 'react';
import * as ol from 'openlayers';
import { Button } from 'react-bootstrap';
import SETTINGS from '../../settings';
import PresetItem, { IPreset } from './PresetItem';

interface IProps {
  map?: ol.Map;
  onAnimate? (): void;
  // projection for coordinate input
  projection?: ol.ProjectionLike;
}

interface IState {
  xValue: string;
  yValue: string;
}

class MapPlaces extends React.PureComponent<IProps, IState> {
  state: IState = {
    // initialize input coordinates with current map view center's coordinates
    // presented in this.props.projection's coordinate system
    ...( () => {
      const view = this.props.map.getView();
      let center = view.getCenter();

      center = ol.proj.transform(
        center,
        view.getProjection(),
        this.props.projection
      );

      return {
        xValue: String( center[0].toFixed( 5 ) ),
        yValue: String( center[1].toFixed( 5 ) ),
      };
    } )(),
  };
  static defaultProps: Partial<IProps> = {
    projection: 'EPSG:4326',
  };
  static Presets: IPreset[] = [
    {
      name: 'London',
      coordinates: [-0.137, 51.543],
    },
    {
      name: 'New York',
      coordinates: [-74.0346, 40.72293],
    },
    {
      name: 'Moscow',
      coordinates: [37.606154, 55.7511],
    },
  ];
  protected handleInputChange = ( {
    target: {
      name,
      value,
    },
  }: any ) => this.setState( {
    [name]: value,
  } );
  handleButtonClick = () => this.goToCoordinates();
  goToCoordinates = ( preset?: IPreset ) => {
    let
      x: number,
      y: number,
      projection: ol.ProjectionLike;

    if ( preset === undefined ) {
      x = Number( this.state.xValue );
      y = Number( this.state.yValue );
      projection = this.props.projection;
    }
    else {
      [x, y] = preset.coordinates;
      projection = 'EPSG:4326';
    }

    const
      view = this.props.map.getView(),
      center = ol.proj.transform(
        [x, y],
        projection,
        view.getProjection(),
      );

    view.animate( {
      zoom: 10,
      center,
      duration: SETTINGS.MAP_ANIMATION_DURATION,
    } );

    if ( typeof this.props.onAnimate === 'function' ) {
      this.props.onAnimate();
    }
  };
  render () {
    const {
      xValue,
      yValue,
    } = this.state;

    let projection = this.props.projection;
    
    if ( projection instanceof ol.proj.Projection ) {
      projection = projection.getCode();
    }

    return <div className='map-places'>
      {
        MapPlaces.Presets.map( ( preset: IPreset ) => <PresetItem
          key={preset.name}
          preset={preset}
          onButtonClick={this.goToCoordinates}
        /> )
      }

      <h6> Enter you coordinates in {projection}: </h6>
      <div className='map-places__preset-item'>
        <div className='map-places__preset-item__name'>
          <input
            placeholder='Enter coordinates'
            type='number'
            name='xValue'
            onChange={this.handleInputChange}
            value={xValue}
          />
          &nbsp;
          <input
            placeholder='Enter coordinates'
            type='number'
            name='yValue'
            onChange={this.handleInputChange}
            value={yValue}
          />
        </div>
        <Button
          className='map-places__custom__button'
          onClick={this.handleButtonClick}
          bsStyle='primary'
        > Go
        </Button>
      </div>
    </div>;
  }
}

export default MapPlaces;
