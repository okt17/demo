import * as React from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  preset: IPreset;
  onButtonClick ( preset: IPreset ): void;
}

export interface IPreset {
  name: string;
  coordinates: [number, number];
}

class PresetItem extends React.PureComponent<IProps> {
  handleButtonClick = () => this.props.onButtonClick( this.props.preset );
  render () {
    let {
      handleButtonClick,
      props: {
        preset: {
          name,
        },
      },
    } = this;

    return <div className='map-places__preset-item'>
      <div className='map-places__preset-item__name'>
        {name}
      </div>
      <Button
        bsStyle='primary'
        onClick={this.handleButtonClick}
        title='Show this location on the map'
      > Go
      </Button>
    </div>;
  }
}

export default PresetItem;
