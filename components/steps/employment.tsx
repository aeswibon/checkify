import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export function EmploymentInfo() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Occupation</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <FormControl>
              <Input {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="employerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employer Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="annualIncome"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Annual Income</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <FormControl>
              <Input type="number" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="sourceOfFunds"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Source Funds</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              required
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select source of funds" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="business">Business Income</SelectItem>
                <SelectItem value="investments">Investments</SelectItem>
                <SelectItem value="inheritance">Inheritance</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
