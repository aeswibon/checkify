import {
  FormControl,
  FormField,
  FormItem,
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

export function IdentityVerification() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="idType"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>ID Type</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              required
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="driving_license">Driving License</SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="idNumber"
        render={({ field }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>ID Number</span>
              <span className="text-sm text-red-500">* </span>
            </div>
            <FormControl>
              <Input placeholder="Enter ID number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="idDocument"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Upload ID Document</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <FormControl>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  console.log(e.target.files);
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                }}
                {...field}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="selfie"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <div className="flex space-x-1">
              <span>Upload Selfie</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                }}
                {...field}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
