import { CurrencyInput } from "@/components/CurrencyInput";
import { PercentageInput } from "@/components/PercentageInput";
import { Button } from "@/components/ui/button";
import {
  DrawerDialogClose,
  DrawerDialogFooter,
} from "@/components/ui/drawerDialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EmptyFormFields } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SavingsAccountSchema } from "./types";
import { savingsAccountSchema } from "./schemas/savingsAccountSchema";

export type SavingsAccountFormProps = {
  onValidSubmit: (data: SavingsAccountSchema) => void;
};

export const SavingsAccountForm = ({
  onValidSubmit,
}: SavingsAccountFormProps) => {
  const form = useForm<
    EmptyFormFields<SavingsAccountSchema>,
    unknown,
    SavingsAccountSchema
  >({
    resolver: zodResolver(savingsAccountSchema),
    defaultValues: {
      name: "",
      balance: "",
      investedAmount: "",
      totalWithdrawn: "",
      ratePeriod: "",
      interestRate: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="grid grid-cols-1 gap-y-6"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Navn på sparekonto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="balance"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beholdning</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="Penger på sparekontoen i dag..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            name="investedAmount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Totalt investert</FormLabel>
                <FormControl>
                  <CurrencyInput
                    placeholder="Penger investert totalt..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="totalWithdrawn"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Totalt tatt ut fra kontoen</FormLabel>
                <FormControl>
                  <CurrencyInput
                    placeholder="Penger tatt ut totalt allerede..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-2 items-center">
          <FormField
            name="interestRate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rente på sparekontoen</FormLabel>
                <FormControl>
                  <PercentageInput
                    placeholder="Avkastning i prosent..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid h-full">
            <FormField
              name="ratePeriod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terminperiode</FormLabel>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex grow flex-row space-x-1 justify-evenly"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">Månedlig</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yearly" />
                      </FormControl>
                      <FormLabel className="font-normal">Årlig</FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormDescription>
                    Perioden renten gir avkastning på
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DrawerDialogFooter>
          <DrawerDialogClose asChild>
            <Button variant="outline">Lukk</Button>
          </DrawerDialogClose>
          <Button type="submit">Legg til sparekonto</Button>
        </DrawerDialogFooter>
      </form>
    </Form>
  );
};
