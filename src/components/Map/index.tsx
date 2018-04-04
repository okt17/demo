import * as React from 'react';
import * as ol from 'openlayers';
import OlMap from '../../EnhancedOlMap';
import SETTINGS from '../../settings';

interface Props {
  olMapRef? ( olMap: ol.Map ): void;
}

export default class Map extends React.Component<Props> {
  protected mapRootElement: HTMLElement;
  protected map: ol.Map;
  protected handleRef = ( instance: HTMLElement ): void => {
    this.mapRootElement = instance;
  };
  componentDidMount() {
    const baseLayer = new ol.layer.Tile( {
      source: new ol.source.XYZ( {
        url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
      } ),
      zIndex: 0,
    } );
    baseLayer.set( 'name', 'Google Maps' );

    this.map = new OlMap( {
      target: this.mapRootElement,
      view: new ol.View( {
        projection: SETTINGS.DEFAULT_MAP_PROJECTION,
        center: SETTINGS.DEFAULT_MAP_CENTER,
        zoom: SETTINGS.DEFAULT_MAP_ZOOM,
      } ),
      layers: [
        baseLayer,
      ],
      controls: ol.control.defaults().extend( [
        new ol.control.ZoomSlider(),
        new ol.control.MousePosition(),
        new ol.control.OverviewMap( {
          collapsed: false,
        } ),
      ] ),
    } );

    if( typeof this.props.olMapRef === 'function' ) {
      this.props.olMapRef( this.map );
    }

    // dev only - console access
    Object.defineProperty( window, 'mapDev', {
      value: {
        map: this.map,
        ol,
      },
    } );
  }
  shouldComponentUpdate() {
    // Once mounted, this component doesn't have to be updated
    // due to Openlayers' map being a non-React entity
    return false;
  }
  render() {
    return <div
      className='ol-map-root'
      ref={this.handleRef}
    ></div>;
  }
}
