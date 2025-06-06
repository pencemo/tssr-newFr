import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format, subMonths } from "date-fns"



const chartConfig = {
  Students: {
    label: "Student",
    color: "var(--chart-6)",
  }
} 

export function AdminChart({data}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrolled Students</CardTitle>
        <CardDescription>Entrollment of {format(subMonths(new Date(), 5), "MMMM")} - {format(new Date(), "MMMM yy")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="students"
              type="monotoneX"
              stroke="var(--color-Students)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-Students)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground leading-none">
          Showing total students for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
