interface Layer {
  name: string;
  type: 'XYZ' | 'GeoJSON';
  data_source: string;
}

const LAYERS: Layer[] = [
  {
    name: 'Google Maps',
    type: 'XYZ',
    data_source: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
  },
  {
    name: '1',
    type: 'XYZ',
    data_source: '',
  },
  {
    name: '2',
    type: 'GeoJSON',
    data_source: '',
  }
];

export default LAYERS;
