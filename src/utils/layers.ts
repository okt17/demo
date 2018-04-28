import * as ol from 'openlayers';

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
