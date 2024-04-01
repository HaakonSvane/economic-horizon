import { InputHTMLAttributes, forwardRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "./input";

export type CurrencyInputProps = InputHTMLAttributes<HTMLInputElement>;

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    const [value, setValue] = useState<string>("");

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = value;
      const newEvent = {
        ...event,
        target: {
          ...event.target,
          value,
        },
      };

      console.log(newEvent);
      props.onChange?.(newEvent);
    };

    return (
      //   <NumericFormat
      //     {...props}
      //     customInput={Input}
      //     onChange={handleOnChange}
      //     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      //     decimalSeparator=","
      //     getInputRef={ref}
      //     thousandSeparator=" "
      //     thousandsGroupStyle="thousand"
      //     suffix=" NOK"
      //     onValueChange={(numericProps) => setValue(numericProps.value ?? "")}
      //   />
      <Input ref={ref} {...props} />
    );
  }
);
