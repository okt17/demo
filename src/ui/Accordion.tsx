import * as React from 'react';

interface Props {
  title?: string | HTMLElement | React.ReactNode;
  initialOpened?: boolean;
}

interface State {
  opened: boolean;
}

export default class Accordion extends React.Component<Props, State> {
  state: State = {
    opened: this.props.initialOpened !== undefined
      ? this.props.initialOpened
      : true,
  };
  protected handleHeaderClick = (): void => this.setState( {
    opened: !this.state.opened,
  } );
  render() {
    const {
      props: {
        children,
        title,
      },
      state: {
        opened,
      },
    } = this;

    return <div className='ui__accordion'>
      <div
        className='ui__accordion__header'
        onClick={this.handleHeaderClick}
      >
        {title}
      </div>
      <div
        className={`ui__accordion__body${
          opened == false
            ? ' hidden'
            : ''
        }`}
      >
        {children}
      </div>
    </div>;
  }
}
