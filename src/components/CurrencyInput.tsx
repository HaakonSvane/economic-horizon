import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./ui/input";

export type CurrencyInputProps = Omit<NumericFormatProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    return (
      <NumericFormat
        {...props}
        customInput={Input}
        onChange={() => null}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        decimalSeparator=","
        getInputRef={ref}
        thousandSeparator=" "
        thousandsGroupStyle="thousand"
        suffix=" NOK"
        onValueChange={(value) => props.onChange?.(value.value)}
      />
    );
  }
);
