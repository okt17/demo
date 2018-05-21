import * as ol from 'openlayers';

export const DEFAULT_STROKE = new ol.style.Stroke( {
  color: '#158CBA', // blue-ish border color
  width: 3,
} );

// in case we have points as vector data
export const DEFAULT_IMAGE = new ol.style.Circle( {
  radius: 5,
  stroke:DEFAULT_STROKE,
} );

export const DEFAULT_TEXT_FILL = new ol.style.Fill( {
  color: '#FFFFFF',
} );

export const HOVERED_STROKE = new ol.style.Stroke( {
  color: '#FF4500', // orangered
  width: 3,
} );

export const SELECTED_STROKE = new ol.style.Stroke( {
  color: '#00FF00', // green
  width: 3,
} );
