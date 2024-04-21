import { Button } from "@/components/ui/button";
import {
  DrawerDialogClose,
  DrawerDialogFooter,
} from "@/components/ui/drawerDialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyFormFields } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transactionSchema } from "../transactionSchema";
import { TransactionSchema } from "../types";
import { DepositFormSheet } from "./DepositFormSheet";
import { WithdrawalFormSheet } from "./WithdrawalFormSheet";
import { useStore } from "@/lib/store";

export type TransactionFormProps = {
  onValidSubmit: (data: TransactionSchema) => void;
};

export const TransactionForm = ({ onValidSubmit }: TransactionFormProps) => {
  const { savings } = useStore();

  const form = useForm<
    EmptyFormFields<TransactionSchema>,
    unknown,
    TransactionSchema
  >({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "deposit",
      paymentFrequency: "once",
      name: "",
      amount: "",
      accountId: {
        savingsId: "",
        loanId: "",
      },
      on: null,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)}>
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Tabs
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  className="w-[300px]"
                >
                  <TabsList>
                    <TabsTrigger value="deposit">Innskudd</TabsTrigger>
                    <TabsTrigger disabled={!savings.length} value="withdrawal">
                      Uttak
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="deposit"
                    className="grid grid-cols-1 gap-y-6"
                  >
                    <DepositFormSheet form={form} />
                  </TabsContent>
                  <TabsContent
                    value="withdrawal"
                    className="grid grid-cols-1 gap-y-6"
                  >
                    <WithdrawalFormSheet form={form} />
                  </TabsContent>
                </Tabs>
              </FormControl>
            </FormItem>
          )}
        />
        <DrawerDialogFooter>
          <DrawerDialogClose asChild>
            <Button variant="outline">Lukk</Button>
          </DrawerDialogClose>
          <Button type="submit">Legg til fond</Button>
        </DrawerDialogFooter>
      </form>
    </Form>
  );
};
