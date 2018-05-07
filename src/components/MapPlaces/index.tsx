import * as React from 'react';
import * as ol from 'openlayers';
import { Button } from 'react-bootstrap';
import SETTINGS from '../../settings';
import PresetItem, { IPreset } from './PresetItem';

interface IProps {
  map?: ol.Map;
  places: IPreset[];
  onAnimate? (): void;
  // projection for coordinate input
  projection?: ol.ProjectionLike;
}

interface IState {
  xValue: string;
  yValue: string;
}

function getCurrentCenterInProjection (
  view: ol.View,
  projection: ol.ProjectionLike,
): Pick<IState, 'xValue' | 'yValue'> {
  const center = ol.proj.transform(
    view.getCenter(),
    view.getProjection(),
    projection,
  );

  return {
    xValue: center[0].toFixed( 5 ),
    yValue: center[1].toFixed( 5 ),
  };
}

class MapPlaces extends React.PureComponent<IProps, IState> {
  state: IState = {
    // initialize input coordinates with current map view center's coordinates
    // presented in this.props.projection's coordinate system
    ...getCurrentCenterInProjection(
      this.props.map.getView(),
      this.props.projection,
    ),
  };
  static defaultProps: Partial<IProps> = {
    projection: 'EPSG:4326',
  };
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
      ),
      duration = SETTINGS.MAP_ANIMATION_DURATION * 2;

    view.animate(
      {
        zoom: 3,
        duration,
      },
      {
        center,
        duration,
      },
      {
        zoom: 10,
        duration,
      },
    );

    if ( typeof this.props.onAnimate === 'function' ) {
      this.props.onAnimate();
    }
  };
  render () {
    const {
      state: {
        xValue,
        yValue,
      },
      props: {
        places,
      }
    } = this;

    let projection = this.props.projection;
    
    if ( projection instanceof ol.proj.Projection ) {
      projection = projection.getCode();
    }

    return <div className='map-places'>
      {
        places.map( ( preset: IPreset ) => <PresetItem
          key={preset.name}
          preset={preset}
          onButtonClick={this.goToCoordinates}
        /> )
      }

      <h5><b> Enter you coordinates in {projection}: </b></h5>
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
