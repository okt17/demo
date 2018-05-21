import * as React from 'react';
import * as ol from 'openlayers';
import EnhancedOlMap from '../../EnhancedOlMap';
import SETTINGS from '../../settings';
import LAYERS from '../../data/layers';
import {
  getOlLayer,
  addLayerInteraction,
  setLayerStyle,
} from '../../utils/layers';

interface IProps {
  olMapRef? ( olMap: ol.Map ): void;
  onFeatureSelect? ( feature?: ol.Feature ): void;
}

export default class Map extends React.Component<IProps> {
  protected mapRootElement: HTMLElement;
  protected handleRef = ( instance: HTMLElement ): void => {
    this.mapRootElement = instance;
  };
  componentDidMount() {
    // initialize a view for the map based on default settings from settings.ts
    const view = new ol.View( {
      projection: SETTINGS.DEFAULT_MAP_PROJECTION,
      center: SETTINGS.DEFAULT_MAP_CENTER,
      zoom: SETTINGS.DEFAULT_MAP_ZOOM,
    } );

    // get layers from data/layers
    const layers = LAYERS.slice(0, 2).map( getOlLayer );
    const vectorLayer = layers.find( ( layer: ol.layer.Base ) => (
      layer instanceof ol.layer.Vector
    ) ) as ol.layer.Vector;

    // initialize map controls
    const controls = ol.control.defaults().extend( [
      new ol.control.ZoomSlider(),
      new ol.control.MousePosition( {
        projection: 'EPSG:4326',
        coordinateFormat: ol.coordinate.toStringHDMS,
      } ),
      new ol.control.OverviewMap( {
        collapsed: false,
      } ),
    ] );

    // initialize the map
    const map = new EnhancedOlMap( {
      target: this.mapRootElement,
      view,
      layers,
      controls,
    } );

    // if there is a vector layer present
    if ( vectorLayer !== undefined ) {
      // add an interaction for it
      addLayerInteraction( vectorLayer, map, this.props.onFeatureSelect );

      // set specific style for this layer
      setLayerStyle( vectorLayer );

      // make this layer to be always on top of other layers
      vectorLayer.setZIndex( Number.MAX_SAFE_INTEGER );

      // make this layer non-removable
      vectorLayer.set( 'removable', false );
    }

    if ( typeof this.props.olMapRef === 'function' ) {
      // passing the map object as a reference
      // for use in other parts of the app
      this.props.olMapRef( map );
    }

    // dev only - console access
    Object.defineProperty( window, 'mapDev', {
      value: {
        map,
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
