
import { useOpenBatchesOfStudyCenter } from "@/hooks/tanstackHooks/useBatch";
import { CourseCard } from "./CourseCard";
import Loader from "@/components/ui/loader";

export default function OpenBatches({ onIndividual, setCourse, onBulk }) {
  const { data, isLoading, isError } = useOpenBatchesOfStudyCenter();

  if (isLoading) return <div className="w-full h-full"><Loader  /></div>;
  if (isError) return <p className="text-center text-red-500">Failed to load batches</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Admission Open Batches</h1>

      {data?.batches?.length === 0 ? (
        <p>No open batches available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.batches.map(
            (batch) => (
              (
                <CourseCard
                  key={batch._id}
                  batch={batch}
                  onBulk={onBulk}
                  onIndividual={onIndividual}
                  setCourse={setCourse}
                />
              )
            )
          )}
        </div>
      )}
    </div>
  );
}
