import * as React from 'react';

interface Props {
  name: string;
  onClick ( event: { name: string } ): void;
  active?: boolean;
}

export default class Item extends React.PureComponent<Props> {
  handleClick = () => {
    typeof this.props.onClick === 'function' &&
    this.props.onClick( { name: this.props.name } );
  };
  render() {
    let {
      name,
      active,
    } = this.props;
    
    return <div
      className={
        `map-menu__item${
          active === true
            ? ' map-menu__item_active'
            : ''
        }`
      }
      onClick={this.handleClick}
    >
      {name}
    </div>;
  }
}
