import * as ol from 'openlayers';
import SETTINGS from '../settings';

export default class EnhancedOlMap extends ol.Map {
  zoomIn = (): void => {
    const view = this.getView();
    view.animate( {
      zoom: view.getZoom() + 1,
      duration: SETTINGS.MAP_ANIMATION_DURATION,
    } );
  };
  zoomOut = (): void => {
    const view = this.getView();
    view.animate( {
      zoom: view.getZoom() - 1,
      duration: SETTINGS.MAP_ANIMATION_DURATION,
    } );
  };
  getProjection = (): ol.proj.Projection => this.getView().getProjection();
  setProjection = ( projection: ol.ProjectionLike ): void => {
    const oldView = this.getView();
    const oldProj = oldView.getProjection();

    this.setView( new ol.View( {
      center: ol.proj.transform(
        oldView.getCenter(),
        oldProj,
        projection,
      ),
      zoom: oldView.getZoom(),
    } ) );

    this.dispatchEvent( {
      type: 'change:projection',
      oldProj: oldProj,
      newProj: projection,
    } );
  };
}
