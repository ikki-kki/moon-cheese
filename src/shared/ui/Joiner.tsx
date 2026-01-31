import type { PropsWithChildren, ReactNode } from 'react';
import { Children, Fragment, isValidElement } from 'react';

type JoinerProps = { components: ReactNode; divider: ReactNode } | PropsWithChildren<{ divider: ReactNode }>;

/**
 * @name Joiner
 * @description 여러 React 요소들 사이에 구분자를 추가하는 컴포넌트.
 * @example
 * <Joiner
 *   components={[<Item1 />, <Item2 />, <Item3 />, false && <Item4 />]}
 *   divider={<Divider />}
 * />
 * @example
 * <Joiner divider={<Divider />}>
 *   <Item1 />
 *   <Item2 />
 *   <Item3 />
 *   {false && <Item4 />}
 * </Joiner>
 */
const Joiner = ({ divider, ...props }: JoinerProps) => {
  const validComponents = Children.toArray('components' in props ? props.components : props.children).filter(
    isValidElement
  );

  return (
    <>
      {validComponents.map((component, index, { length }) => (
        <Fragment key={index}>
          {component}
          {index < length - 1 && divider}
        </Fragment>
      ))}
    </>
  );
};

export default Joiner;
