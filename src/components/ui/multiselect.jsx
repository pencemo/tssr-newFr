
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MultiSelect({ options = [], selected, onChange, placeholder = "Select items", className, error, disabled = false }) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleSelect = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  // Get the selected items' names for display
  const selectedItems = React.useMemo(() => {
    return options?.filter((option) => selected?.includes(option._id))
  }, [options, selected])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger  asChild>
        <button
        disabled={disabled}
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-10 w-full disabled:opacity-40 flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className,
            error && "border-red-500",
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selectedItems?.length > 0 ? (
              <>
                {selectedItems.map((item) => (
                  <Badge key={item._id} variant="secondary" className="mr-1 mb-1">
                    {item.name}
                  </Badge>
                ))}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
              )}
          </div>
          <div className="flex shrink-0 opacity-50">
            <ChevronsUpDown className="h-4 w-4" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-w-md" align="start">
        <Command>
          <CommandInput placeholder="Search..." value={inputValue} onValueChange={setInputValue} />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option._id}
                  value={option.name}
                  onSelect={() => {
                    handleSelect(option._id)
                    setInputValue("")
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex size-[18px] items-center justify-center rounded-md border transition-all border-input",
                      selected.includes(option._id)
                        ? "bg-primary text-white"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <Check className="text-white size-3.5" />
                  </div>
                  <span>{option.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
