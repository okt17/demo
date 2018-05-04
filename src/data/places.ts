interface IPlace {
  name: string;
  coordinates: [number, number];
}

const PLACES: IPlace[] = [
  {
    name: 'London',
    coordinates: [-0.137, 51.543],
  },
  {
    name: 'New York',
    coordinates: [-74.0346, 40.72293],
  },
  {
    name: 'Moscow',
    coordinates: [37.606154, 55.7511],
  },
  {
    name: 'Rio de Janeiro',
    coordinates: [-43.19519, -22.88838],
  },
  // {
  //   name: 'Rostov-on-Don',
  //   coordinates: [39.70193, 47.24855],
  // },
  {
    name: 'Tokyo',
    coordinates: [139.571, 35.6186],
  },
  {
    name: 'Sydney',
    coordinates: [151.19735, -33.8606],
  },
];

export default PLACES;
