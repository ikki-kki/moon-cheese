import { Counter } from '@/ui-lib';

export function QuantitiyCounter({
  min,
  max,
  disabled,
  quantity,
  increase,
  decrease,
}: {
  min: number;
  max: number;
  disabled?: boolean;
  quantity: number;
  increase: () => void;
  decrease: () => void;
}) {
  const isMinusDisabled = disabled || quantity <= min;
  const isPlusDisabled = disabled || quantity >= max;

  return (
    <Counter.Root>
      <Counter.Minus onClick={decrease} disabled={isMinusDisabled} />
      <Counter.Display value={quantity} />
      <Counter.Plus onClick={increase} disabled={isPlusDisabled} />
    </Counter.Root>
  );
}
