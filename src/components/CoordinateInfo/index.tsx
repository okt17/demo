import * as React from 'react';
import * as ol from 'openlayers';
import { ajax } from 'jquery';
import { UV_UDP_REUSEADDR } from 'constants';

interface IProps {
  map: ol.Map;
}

interface IState {
  data?: any;
}

function getUrl ( [x, y]: number[] ): string {
  return `https://geocode-maps.yandex.ru/1.x/?geocode=${x},${y}&format=json&lang=en_US`;
}

class CoordinateInfo extends React.PureComponent<IProps, IState> {
  state: IState = {};
  request: JQuery.jqXHR;
  listenerKey: ol.EventsKey;
  handleMapClick = ( event: any ) => {
    if ( this.request !== undefined ) {
      this.request.abort();
    }

    const [x, y] = [0, 0]; //todo: get coordinates from event

    this.request = ajax( getUrl( [x, y] ) )
      .done( ( result: any ) => this.setState( { data: result } ) )
      .fail( () => this.setState( { data: undefined } ) );
  };
  componentDidMount () {
    this.listenerKey = this.props.map.on( 'click', this.handleMapClick );
  }
  componentWillUnmount () {
    ol.Observable.unByKey( this.listenerKey );
  }
  render () {
    const data = this.state.data;

    if ( data === undefined ) {
      return null;
    }

    return <div></div>;
  }
}

export default CoordinateInfo;
