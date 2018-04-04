import * as React from 'react';

const Button = ( {
  children,
  className,
  ...rest,
}: React.HTMLAttributes<HTMLDivElement> ) => <div
  className={`ui__button${
    className !== undefined
      ? ' ' + className
      : ''
  }`}
  {...rest}
>
  {children}
</div>;

export default Button;
