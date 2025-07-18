import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function TimePicker({type, time, setTime, label, error}) {
  const [isOpen, setIsOpen] = useState(false)
  const [hour, setHour] = useState(null)
  const [minute, setMinute] = useState(null)
  const [period, setPeriod] = useState ("AM")

  // Format the time for display
  const formattedTime = `${hour?.toString().padStart(2, "0")}:${minute?.toString().padStart(2, "0")} ${period}`

  // Refs to scroll to the selected time when opened
  const hourRef = React.useRef(null)
  const minuteRef = React.useRef(null)
  const periodRef = React.useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        hourRef.current?.scrollIntoView({ block: "center" })
        minuteRef.current?.scrollIntoView({ block: "center" })
        periodRef.current?.scrollIntoView({ block: "center" })
      }, 100)
    }
  }, [isOpen])

  const handelSetTime = () => {
  setTime((prev) => ({
    ...prev, 
    [type]: formattedTime
  }));
  setIsOpen(false)
}


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`"w-full justify-start py-5 text-left font-normal shadow-none ${error && "border-red-500"}`}>
          <Clock />
          {time? time : hour && minute != null ? formattedTime : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="start">
        <div className="grid grid-cols-2 divide-x">
          {/* Hours */}
          <div className="p-2">
            <div className="text-xs font-medium text-center text-muted-foreground mb-2">Hour</div>
            <ScrollArea className="h-60">
              <div className="flex flex-col items-center py-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const hourValue = i + 1
                  return (
                    <div
                      key={`hour-${hourValue}`}
                      ref={hourValue === hour ? hourRef : null}
                      className={cn(
                        "cursor-pointer py-1.5 rounded-md hover:bg-accent w-full text-center",
                        hourValue === hour && "bg-accent font-medium",
                      )}
                      onClick={() => {
                        if(hourValue == hour){
                          setHour(null)
                        }else{
                          setHour(hourValue)
                        }

                      }}
                    >
                      {hourValue.toString().padStart(2, "0")}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Minutes */}
          <div className="p-2">
            <div className="text-xs font-medium text-center text-muted-foreground mb-2">Minute</div>
            <ScrollArea className="h-60">
              <div className="flex flex-col items-center py-2">
                {Array.from({ length: 60 }).map((_, i) => {
                  return (
                    <div
                      key={`minute-${i}`}
                      ref={i === minute ? minuteRef : null}
                      className={cn(
                        "cursor-pointer py-1.5 rounded-md hover:bg-accent w-full text-center",
                        i === minute && "bg-accent font-medium",
                      )}
                      onClick={() => {
                        if( i == minute){
                          setMinute(null)
                        }else{
                            setMinute(i)
                        }
                        
                      }}
                    >
                      {i.toString().padStart(2, "0")}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

        </div>
          {/* AM/PM */}
          <div className="border-t ">
            {/* <div className="text-xs font-medium text-center text-muted-foreground mb-2">Period</div> */}
            <div className="flex items-center p-1">
              {["AM", "PM"].map((p) => (
                <div
                  key={`period-${p}`}
                  ref={p === period ? periodRef : null}
                  className={cn(
                    "cursor-pointer py-1  rounded-sm  w-full text-center",
                    p === period ? "bg-accent  font-medium" : "hover:bg-accent",
                  )}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

        <div className="p-1 ">
          <Button className="w-full" onClick={() => handelSetTime()}>
            Select Time
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
