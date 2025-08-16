import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimePicker({ type, time, setTime, label, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [period, setPeriod] = useState("AM");

  const formattedTime = `${hour?.toString().padStart(2, "0")}:${minute
    ?.toString()
    .padStart(2, "0")} ${period}`;

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const periodRef = useRef(null);

  // Auto-scroll on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        hourRef.current?.scrollIntoView({ block: "center" });
        minuteRef.current?.scrollIntoView({ block: "center" });
        periodRef.current?.scrollIntoView({ block: "center" });
      }, 100);
    }
  }, [isOpen]);

  // Auto-save when both hour & minute are set
  useEffect(() => {
    if (hour !== null && minute !== null) {
      setTime((prev) => ({
        ...prev,
        [type]: formattedTime,
      }));
      // setIsOpen(false);
    }
  }, [hour, minute, period]); // Trigger when hour, minute, or period changes

  const handleHourClick = (hourValue) => {
    if (hourValue === hour) {
      setHour(null);
      return;
    }
    setHour(hourValue);
    if (minute === null) setMinute(0); // Default minute
    if (!period) setPeriod("AM"); // Default AM
  };

  const handleMinuteClick = (minuteValue) => {
    if (minuteValue === minute) {
      setMinute(null);
      return;
    }
    setMinute(minuteValue);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start py-5 text-left font-normal shadow-none",
            error && "border-red-500"
          )}
        >
          <Clock />
          {time
            ? time
            : hour !== null && minute !== null
            ? formattedTime
            : label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[180px] p-0" align="start">
        <div className="grid grid-cols-2 divide-x">
          {/* Hours */}
          <div className="p-2">
            <div className="text-xs font-medium text-center text-muted-foreground mb-2">
              Hour
            </div>
            <ScrollArea className="h-60">
              <div className="flex flex-col items-center py-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const hourValue = i + 1;
                  return (
                    <div
                      key={`hour-${hourValue}`}
                      ref={hourValue === hour ? hourRef : null}
                      className={cn(
                        "cursor-pointer py-1.5 rounded-md hover:bg-accent w-full text-center",
                        hourValue === hour && "bg-primary text-white hover:bg-primary/90 font-medium"
                      )}
                      onClick={() => handleHourClick(hourValue)}
                    >
                      {hourValue.toString().padStart(2, "0")}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Minutes */}
          <div className="p-2">
            <div className="text-xs font-medium text-center text-muted-foreground mb-2">
              Minute
            </div>
            <ScrollArea className="h-60">
              <div className="flex flex-col items-center py-2">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={`minute-${i}`}
                    ref={i === minute ? minuteRef : null}
                    className={cn(
                      "cursor-pointer py-1.5 rounded-md hover:bg-accent w-full text-center",
                      i === minute && "bg-primary text-white hover:bg-primary/90"
                    )}
                    onClick={() => handleMinuteClick(i)}
                  >
                    {i.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* AM/PM */}
        <div className="border-t">
          <div className="flex items-center p-1">
            {["AM", "PM"].map((p) => (
              <div
                key={`period-${p}`}
                ref={p === period ? periodRef : null}
                className={cn(
                  "cursor-pointer py-1 rounded-sm w-full text-center",
                  p === period ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-accent"
                )}
                onClick={() => setPeriod(p)}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
