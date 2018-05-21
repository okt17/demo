import * as ol from 'openlayers';

// wgs 84 spheroid approximation needed to calculate measures of geometries
const WGS84_SPHERE = new ol.Sphere( 6378137 );

function getMultiPolygonGeodesicArea (
  geometry: ol.geom.MultiPolygon,
  projection: ol.ProjectionLike, // projection of geometry
): number {
  return geometry.getPolygons().reduce(
    (
      sum: number,
      polygon: ol.geom.Polygon,
    ) => sum + getPolygonGeodesicArea( polygon, projection ),
    0,
  );
}

function getPolygonGeodesicArea (
  geometry: ol.geom.Polygon,
  projection: ol.ProjectionLike, // projection of geometry
): number {
  // geometry in WGS84 (EPSG:4326) projection
  // needed to calculate its area on the sphere
  const geom4326 = geometry.clone().transform(
    projection,
    'EPSG:4326',
  ) as ol.geom.Polygon;

  /*
    any polygon can have "holes" in it,
    represented by inner circuits
    
    to calculate the area correctly,
    we will need to find the area of the largest circuit
    and subtract the sum of the areas of all other circuits
  */
  let
    maxLinearRingArea = 0,
    area = 0;

  geom4326.getLinearRings().forEach( ( lr: ol.geom.LinearRing ) => {
    const lrArea = Math.abs( WGS84_SPHERE.geodesicArea( lr.getCoordinates() ) );
    if ( lrArea > maxLinearRingArea ) {
      area += maxLinearRingArea;
      maxLinearRingArea = lrArea;
    }
    else {
      area += lrArea;
    }
  } );

  return maxLinearRingArea - area;
}

export function formatArea ( area: number ): string {
  return `${( area / 1000000 ).toFixed(2)} km²`;
}

export function getGeodesicArea (
  geometry: ol.geom.Geometry,
  projection: ol.ProjectionLike = 'EPSG:3857', // projection of geometry
): number {
  if ( geometry instanceof ol.geom.GeometryCollection ) {
    return geometry.getGeometries().reduce(
      (
        wholeArea: number,
        geometry: ol.geom.Geometry,
      ) => wholeArea + getGeodesicArea( geometry, projection ),
      0,
    );
  }
  else if ( geometry instanceof ol.geom.Polygon ) {
    return getPolygonGeodesicArea( geometry, projection );
  }
  else if ( geometry instanceof ol.geom.MultiPolygon ) {
    return getMultiPolygonGeodesicArea( geometry, projection );
  }

  return 0;
}
