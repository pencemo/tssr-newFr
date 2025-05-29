import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download04Icon } from "hugeicons-react"
import SelectDropDown from "./SelectDropDown"
import { useEffect, useState } from "react"
import { useStudentForDl } from "@/hooks/tanstackHooks/useStudents"
import { excelDownload } from "@/lib/ExcelDownload"
import { Loader2 } from "lucide-react"
import { pdf } from '@react-pdf/renderer';
import PDFView from "./PDFView"
import { toast } from "sonner"
import { useSettings } from "@/hooks/tanstackHooks/useAuth"


export function AttendanceReg({name, fields, mark}) {
  const [isOpen, setIsOpen]=useState(false)
  const [error, setError] = useState(null);
  const [isExel, setIsExel] = useState(false);
  const { isPending, mutateAsync } = useStudentForDl();
  const {data}=useSettings()
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    year: "",
  });

  useEffect(()=>{
    setFilters({
      course: "",
      batch: "",
      year: "",
    })
    setError(null)
  }, [isOpen])


  const handleGenerateAndDownloadPDF = async () => {
    setError(null)
    if (filters.course === "" || filters.batch === "" || filters.year === "") {
      setError("Please select all filters");
      return;
    }
    try {
      const data = await mutateAsync({
        courseId: filters.course,
        batchId: filters.batch,
        year: filters.year,
        fields: ['name', 'registrationNumber'],
      },{
        onSuccess: (data) => {
          if(!data.success){
            setError(data.message)
            toast.error(data.message)
          }
        }
      });
  
      if (data?.data?.length > 0) {
        const doc = (
          <PDFView
          mark={mark}
            name={name}
            data={data}
            head={fields}
          />
        );
  
        // Generate PDF and download
        const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }
      
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };
  
  const handleExelDownload = async() => {
    setError(null)
    if (filters.course === "" || filters.batch === "" || filters.year === "") {
      setError("Please select all filters");
      return;
    }
    try{
      setIsExel(true)
      const data = await mutateAsync({
        courseId: filters.course,
        batchId: filters.batch,
        year: filters.year,
        fields: ['name', 'registrationNumber']
      }, {
        onSuccess: (data) => {
          if(!data.success){
            setError(data.message)
            toast.error(data.message)
          }
        }
      });
      
      if(data && data?.data?.length > 0){
        const exelFormat = data.data.map((item) => {
          
          return {
            "Register Number": item.registrationNumber,
            "Name": item.name,
            ...Object.fromEntries(fields.map(field => [field, '']))
          };
        })
        excelDownload(exelFormat, data.studycenterName  || 'All data' );
      }
      
    }catch(err){
      console.log(err)
      setError(err)
    }finally{
      setIsExel(false)
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={!data?.data?.reportsDownload} className='w-full'>Download Doc
        <Download04Icon strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Select course, batch and year to download {name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SelectDropDown error={error} filters={filters} setFilters={setFilters} />
        </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter className='grid grid-cols-2'>

          <Button variant='outline' className='w-full' onClick={handleGenerateAndDownloadPDF}>{!isExel && isPending? <Loader2 className="animate-spin"/>:'Download PDF'}</Button>
          <Button onClick={handleExelDownload}>{isExel && isPending? <Loader2 className="animate-spin"/>:'Download Exel'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
