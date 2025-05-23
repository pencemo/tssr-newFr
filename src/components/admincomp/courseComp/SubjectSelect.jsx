"use client"

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubjectSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items",
  className,
  error,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const selectedItems = options.filter((option) =>
    selected.includes(option._id)
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className={cn(
          "w-full justify-between font-normal h-auto min-h-10",
          error && "border-red-500",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center justify-start w-full">
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <Badge key={item._id} variant="secondary" className="mr-1 mb-1">
                {item.name}
                <div
                  className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item._id);
                  }}
                >
                  <X className="h-3 w-3" />
                </div>
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
      </Button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <div className="p-1 border-b">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 text-sm outline-none"
              autoFocus={false}
            />
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-3 text-center text-sm text-muted-foreground">
                No item found.
              </div>
            ) : (
              <ul className="py-1">
                {filteredOptions.map((option) => (
                  <li
                    key={option._id}
                    className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent flex items-center"
                    onClick={() => {
                      handleSelect(option._id);
                      setInputValue("");
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-[18px] items-center justify-center rounded-md border transition-all border-input",
                        selected.includes(option._id)
                          ? "bg-primary text-white"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="text-white size-3.5" />
                    </div>
                    <span>{option.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}