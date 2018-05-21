import * as ol from 'openlayers';
import {
  DEFAULT_STROKE,
  DEFAULT_IMAGE,
  DEFAULT_TEXT_FILL,
  HOVERED_STROKE,
  SELECTED_STROKE,
} from '../utils/styles';

export interface ILayer {
  name: string;
  type: 'XYZ' | 'GeoJSON';
  data_source: string;
}

export function getOlLayer ( layer: ILayer ): ol.layer.Base {
  const {
    name,
    type,
    data_source,
  } = layer;

  let result: ol.layer.Base;
  switch ( type ) {
    case 'XYZ':
      result = new ol.layer.Tile( {
        source: new ol.source.XYZ( {
          url: data_source,
        } ),
      } );
      break;
    
    case 'GeoJSON':
      const format = new ol.format.GeoJSON();
      const features = format.readFeatures( data_source );
      result = new ol.layer.Vector( {
        source: new ol.source.Vector( {
          features,
        } ),
      } );
      break;

    default:
      throw new Error( `Unexpected layer type: ${type}` );
  }

  result.setProperties( layer );

  return result;
}

function getFeatureFromPixel (
  map: ol.Map,
  pixel: ol.Pixel,
  vectorLayer: ol.layer.Vector,
): ol.Feature | undefined {
  let feature: ol.Feature | undefined;

  if ( vectorLayer.getVisible() ) {
    map.forEachFeatureAtPixel(
      pixel,
      ( _feature: ol.Feature ) => {
        feature = _feature; //getting the first feature found

        return true; //stop forEachFeatureAtPixel cycle
      },
      {
        layerFilter: ( layer: ol.layer.Base ) => layer === vectorLayer,
      }
    );
  }

  return feature;
}

const HOVERED_PROPERTY_NAME = '__hovered';
const SELECTED_PROPERTY_NAME = '__selected';

export function addLayerInteraction (
  layer: ol.layer.Vector,
  map: ol.Map,
  featureSelectCallback?: ( feature?: ol.Feature ) => void,
): void {
  let
    hoveredFeature: ol.Feature | undefined,
    selectedFeature: ol.Feature | undefined;

  map.on( 'pointermove', ( event: any ) => {
    const feature = getFeatureFromPixel( map, event.pixel, layer );

    if ( hoveredFeature !== feature ) {
      if ( hoveredFeature !== undefined ) {
        hoveredFeature.set( HOVERED_PROPERTY_NAME, false );
      }

      const viewport = map.getViewport() as HTMLElement;
      if ( feature !== undefined ) {
        feature.set( HOVERED_PROPERTY_NAME, true );
        viewport.style.cursor = 'pointer';
      }
      else {
        viewport.style.cursor = '';
      }
      hoveredFeature = feature;
    }
  } );

  if ( typeof featureSelectCallback === 'function' ) {
    map.on( 'click', ( event : any ) => {
      const feature = hoveredFeature;
  
      if ( selectedFeature !== feature ) {
        if ( selectedFeature !== undefined ) {
          selectedFeature.set( SELECTED_PROPERTY_NAME, false );
        }
        if ( feature !== undefined ) {
          feature.set( SELECTED_PROPERTY_NAME, true );
        }
        selectedFeature = feature;
  
        featureSelectCallback( feature );
      }
    } );
  }
}

export function setLayerStyle ( layer: ol.layer.Vector ) {
  // vector layer style function
  layer.setStyle( ( feature: ol.Feature ) => {
    let stroke = feature.get( SELECTED_PROPERTY_NAME )
      ? SELECTED_STROKE
      : feature.get( HOVERED_PROPERTY_NAME )
        ? HOVERED_STROKE
        : DEFAULT_STROKE;

    // text-label features using their ID's (country codes for countries)
    const label = String( feature.getId() );

    let textStyle: ol.style.Text;
    if ( label !== undefined ) {
      textStyle = new ol.style.Text( {
        text: label,
        fill: DEFAULT_TEXT_FILL,
        stroke: stroke,
        scale: 1.5,
      } );
    }

    return new ol.style.Style( {
      // no fill style - completely transparent except for the borders
      stroke,
      image: DEFAULT_IMAGE,
      text: textStyle, // may be undefined and it's fine
      // hovered feature overlaps selected feature
      // selected feature overlaps other features
      zIndex: feature.get( HOVERED_PROPERTY_NAME )
        ? Number.MAX_SAFE_INTEGER
        : feature.get( SELECTED_PROPERTY_NAME )
          ? Number.MAX_SAFE_INTEGER - 1
          : undefined,
    } );
  } );
}
