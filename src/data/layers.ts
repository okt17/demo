import { ILayer } from '../utils/layers';
import countries from './countries';

// this project is intended to be frontend-only
// therefore we have to store our data like this
// instead of using a database

const LAYERS: ILayer[] = [
  {
    name: 'Stamen Terrain',
    type: 'XYZ',
    data_source: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
  },
  {
    name: 'Countries of the world',
    type: 'GeoJSON',
    data_source: countries,
  },
  {
    name: 'OpenStreetMap',
    type: 'XYZ',
    data_source: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    name: 'Google Maps',
    type: 'XYZ',
    data_source: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
  },
  {
    name: 'Stamen Watercolor',
    type: 'XYZ',
    data_source: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  },
  {
    name: 'Stamen Toner',
    type: 'XYZ',
    data_source: 'http://tile.stamen.com/toner/{z}/{x}/{y}.png',
  },
];

export default LAYERS;
