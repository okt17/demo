import * as React from 'react';
import { ILayer } from '../../../utils/layers';
import { Button, Label } from 'react-bootstrap';

interface IProps {
  layer: ILayer;
  disabled?: boolean;
  onClick ( layer: ILayer ): void;
}

class Item extends React.PureComponent<IProps> {
  protected handleButtonClick = () => {
    // only call onclick handler if 'disabled' is not true
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
      <div className='data-layers__item__name'>
        {name}
      </div>
      <div className='data-layers__item__type'>
        {type}
      </div>
      <Button
        className='data-layers__item__button'
        bsStyle={
          disabled
            ? undefined
            : 'primary'
        }
        onClick={this.handleButtonClick}
        title={
          disabled
            ? 'Unable to add this layer'
            : 'Add this layer to map'
        }
        disabled={disabled}
      >
        {
          disabled
            ? 'Already present'
            : 'Add to map'
        }
      </Button>
    </div>;
  }
}

export default Item;
