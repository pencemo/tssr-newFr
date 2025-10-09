import { ArrowUpRightIcon, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import React from 'react'
import { HiOutlineCircleStack } from "react-icons/hi2"

function NoData() {
  return (
    <div>
      <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HiOutlineCircleStack />
        </EmptyMedia>
        <EmptyTitle>No Data to Display</EmptyTitle>
        <EmptyDescription>
        We couldn't find anything matching your search. Try adjusting your filters or checking for typos.
        </EmptyDescription>
      </EmptyHeader>
      
    </Empty>
    </div>
  )
}

export default NoData
