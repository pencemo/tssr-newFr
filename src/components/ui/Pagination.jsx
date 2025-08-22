import React from "react";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "./input";
import { useState } from "react";

function Pagination({ currentPage, setCurrentPage, totalPage, totalData = 0 }) {
  // const { currentPage, setCurrentPage, totalPage, totalData=0 } = props

  const [pageInput, setPageInput] = useState("")

  const handlePageJump = () => {
    const pageNumber = Number.parseInt(pageInput)
    if (pageNumber >= 1 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber)
      setPageInput("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageJump()
    }
  }
  return (
    <div className="flex items-center py-4 px-3 justify-between">
      <div>
        {totalData > 0 && (
          <h1 className="text-sm ">
            Total -<span className="font-semibold"> {totalData}</span>
          </h1>
        )}
      </div>
      {Number.parseInt(totalPage) > 1&&<div className="flex items-center space-x-2 ml-4 max-md:hidden">
          <Input
            type="number"
            min="1"
            max={totalPage}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Page"
            className="w-20 h-8 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handlePageJump}
            disabled={!pageInput || Number.parseInt(pageInput) < 1 || Number.parseInt(pageInput) > totalPage}
          >
            Go
          </Button>
        </div>}
      <div className=" space-x-2 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={"max-sm:hidden"}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPage}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPage))
          }
          disabled={currentPage === totalPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPage)}
          disabled={currentPage === totalPage}
          className={"max-sm:hidden"}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
