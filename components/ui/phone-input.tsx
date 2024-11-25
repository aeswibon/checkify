"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const countries = [
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "India", code: "IN", dial: "+91" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, "");
    if (selectedCountry.code === "US") {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6)
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] justify-between"
          >
            <Image
              src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              width={24}
              height={16}
              className="h-4 w-6 object-contain"
            />
            <span>{selectedCountry.dial}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  onSelect={() => {
                    setSelectedCountry(country);
                    setOpen(false);
                  }}
                >
                  <Image
                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="mr-2 h-4 w-6 object-contain"
                    width={24}
                    height={16}
                  />
                  <span>{country.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCountry.code === country.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex-1">
        <Input
          type="tel"
          value={value}
          onChange={handleChange}
          className={cn(error && "border-red-500")}
          placeholder="(555) 555-5555"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
