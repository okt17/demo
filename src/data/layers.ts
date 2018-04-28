import { ILayer } from '../utils/layers';
import countries from './countries';

// this project is intended to be frontend-only
// therefore we have to store our data like this 

const LAYERS: ILayer[] = [
  {
    name: 'Stamen Watercolor',
    type: 'XYZ',
    data_source: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  },
  {
    name: 'Google Maps',
    type: 'XYZ',
    data_source: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
  },
  {
    name: 'Countries of the world',
    type: 'GeoJSON',
    data_source: countries,
  }
];

export default LAYERS;
