import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { PhoneInput } from "../ui/phone-input";

export function PersonalInfo() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="flex space-x-1">
                <span>First Name</span>
                <span className="text-sm text-red-500">* </span>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <div className="flex space-x-1">
                <span>Last Name</span>
                <span className="text-sm text-red-500">* </span>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Email Address</span>
              <span className="text-sm text-red-500">* </span>
            </div>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Phone Number</span>
              <span className="text-sm text-red-500">* </span>
            </div>
            <FormControl>
              <PhoneInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Date of birth</span>
              <span className="text-sm text-red-500">* </span>
            </div>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
