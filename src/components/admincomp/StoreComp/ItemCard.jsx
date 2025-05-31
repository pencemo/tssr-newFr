import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"


export default function ItemCard({
  item, setEdit
}) {
  return (
    <Card className="w-full pt-0 overflow-hidden ">
      <CardHeader className="p-0">
        <div>
          <img
            src={"https://media.istockphoto.com/id/495477978/photo/open-book.jpg?s=612x612&w=0&k=20&c=vwJ6__M7CVPdjkQFUv9j2pr7QJiQ9bWW_5jXjR9TcjY="}
            alt={item.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover border-b"
          />
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          {item?.courseId&&<h3 className="font-medium">{item?.courseId?.name}</h3>}
          <p className="text-sm text-muted-foreground ">{item.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold ">₹{item.price.toFixed(2)} <span className="text-base font-normal">/-</span></span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="">
        <Button className="w-full rounded-full" onClick={()=>setEdit(item)}>
          <Edit  />
          Edit Product
        </Button>
      </CardFooter>
    </Card>
  )
}
