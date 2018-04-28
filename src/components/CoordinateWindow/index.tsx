import * as React from 'react';
import * as ol from 'openlayers';
import SETTINGS from '../../settings';

interface IProps {
  map: ol.Map;
  projection?: ol.ProjectionLike;
}

interface IState {
  xValue: string;
  yValue: string;
}

class CoordinateWindow extends React.PureComponent<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    projection: ol.proj.get( 'EPSG:4326' ),
  };
  goToCoordinates = () => {
    const
      view = this.props.map.getView(),
      {
        xValue,
        yValue
      } = this.state,
      center = ol.proj.transform(
        [
          Number( xValue ),
          Number( yValue ),
        ],
        this.props.projection,
        view.getProjection(),
      );

    view.animate( {
      center,
      duration: SETTINGS.MAP_ANIMATION_DURATION,
      zoom: 10,
    } );
  };
  handleInputChange = ( event: any ) => this.setState( {
    [event.target.name]: event.target.value,
  } );
  handleInputKeyDown = ( event: { key: string; } ) => {
    if ( event.key === 'Enter' ) {
      this.goToCoordinates();
    }
  };
  render () {
    return <div className='coordinate-window'>
      <div className='coordinate-window__line'>
        <input
          className='coordinate-window__input'
          type='number'
          name='xValue'
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
      </div>
      <div className='coordinate-window__line'>
        <input
          className='coordinate-window__input'
          type='number'
          name='yValue'
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
      </div>
    </div>;
  }
}

export default CoordinateWindow;
