import * as React from 'react';
import * as ol from 'openlayers';
import EnhancedOlMap from '../../EnhancedOlMap';
import SETTINGS from '../../settings';
import LAYERS from '../../data/layers';
import { getOlLayer } from '../../utils/layers';

interface IProps {
  olMapRef? ( olMap: ol.Map ): void;
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

    // get all layers from data/layers
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

    if ( vectorLayer !== undefined ) {
      // if there is a vector layer present,
      // add an interaction for it
      const interaction = new ol.interaction.Modify( {
        source: vectorLayer.getSource(),
      } );

      map.addInteraction( interaction );

      // disable interaction on chaning layer visibility to false
      // and the other way around
      const changeEventListenerKey = vectorLayer.on( 'change:visible', () => {
        if (
          vectorLayer.getVisible()
          &&
          interaction.getActive() == false
        ) {
          interaction.setActive( true );
        }
        else if ( interaction.getActive() ) {
          interaction.setActive( false );
        }
      } );

      // remove this interaction if the vector layer is removed from the map
      const removeEventListenerKey = map.getLayers().on(
        'remove',
        ( event: any ) => {
          if ( event.element === vectorLayer ) {
            map.removeInteraction( interaction );
            ol.Observable.unByKey( removeEventListenerKey );
            ol.Observable.unByKey( changeEventListenerKey );
          }
        },
      );
    }

    if ( typeof this.props.olMapRef === 'function' ) {
      // passing the map object to upper component's state
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
