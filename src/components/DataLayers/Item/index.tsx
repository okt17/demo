import * as React from 'react';
import { ILayer } from '../../../utils/layers';
import { Button, Label } from 'react-bootstrap';

interface IProps {
  layer: ILayer;
  disabled?: boolean;
  onClick ( layer: ILayer ): void;
}

class Item extends React.PureComponent<IProps> {
  handleClick = () => {
    this.props.disabled !== true
    &&
    this.props.onClick( this.props.layer )
  };
  render () {
    let {
      layer: {
        name,
        type,
      },
      disabled,
    } = this.props;

    return <div className='data-layers__item'>
      <p className='data-layers__item__name'>{name}</p>
      {/* <Label>{type}</Label> */}
      <Button
        bsStyle={
          disabled
            ? undefined
            : 'primary'
        }
        onClick={this.handleClick}
        title='Add this layer to map'
      > Add
      </Button>
    </div>;
  }
}

export default Item;
