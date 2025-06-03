"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, Ban, BookText } from "lucide-react";

export default function SubjectCard({ name, code, isActive, onToggle }) {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <Card className="border border-primary bg-primary-foreground rounded-xl hover:shadow-md transition-shadow cursor-pointer w-full max-w-sm group">
      <CardHeader className="py-3 px-4 border-b relative">
        <div>
          <CardTitle className="text-base font-semibold truncate">
            {name}
          </CardTitle>
          <CardDescription className="text-xs mt-1">
            Code: <span className="font-medium text-black">{code}</span>
          </CardDescription>
        </div>
        <div className="absolute top-3 right-4 text-muted-foreground group-hover:text-primary transition-colors">
          <BookText size={18} strokeWidth={1.4} />
        </div>
      </CardHeader>

      <CardContent className="px-4 py-3 text-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {active ? (
              <>
                <BadgeCheck className="text-green-600 w-4 h-4" />
                <span className="text-green-700 font-medium">Active</span>
              </>
            ) : (
              <>
                <Ban className="text-red-600 w-4 h-4" />
                <span className="text-red-700 font-medium">Inactive</span>
              </>
            )}
          </div>
          <div
            className="flex items-center gap-2 group-hover:scale-105 transition-transform"
            title="Toggle subject status"
          >
            <span className="text-xs text-muted-foreground">Status</span>
            <Switch checked={active} onCheckedChange={handleToggle} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
