import * as React from "react"
import { format, getYear, getMonth } from "date-fns"
import { CalendarIcon} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DatePicker({date, setDate}) {
  const [calendarDate, setCalendarDate] = React.useState(new Date())

  // Get current month and year from the calendar date
  const currentMonth = getMonth(calendarDate)
  const currentYear = getYear(calendarDate)

  // Generate years for the selector (10 years before and after current year)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 25 }, (_, i) => currentYear -1 + i)
  }, [])

  // Month names for the selector
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Handle month change
  const handleMonthChange = (month) => {
    const monthIndex = months.findIndex((m) => m === month)
    if (monthIndex !== -1) {
      const newDate = new Date(calendarDate)
      newDate.setMonth(monthIndex)
      setCalendarDate(newDate)
    }
  }

  // Handle year change
  const handleYearChange = (year) => {
    const newDate = new Date(calendarDate)
    newDate.setFullYear(Number.parseInt(year))
    setCalendarDate(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-2 border-b">
          <div className="grid grid-cols-2 gap-2">
            <Select value={months[currentMonth]} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={currentYear.toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          month={calendarDate}
          onMonthChange={setCalendarDate}
        />
      </PopoverContent>
    </Popover>
  )
}
