import { enrollmentServices  } from "@/API/services/enrollmentServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCheckEnrolledOrNot = () => { 
    const queryClient= useQueryClient();
    return useMutation({
      mutationFn: (adhaarNumber) => {
        return enrollmentServices.checkEnrolledOrNot(adhaarNumber);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["enrollment"]);
      },
    });
}


export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submissionData) => {
      return enrollmentServices.createStudent(submissionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentEnrollment"]);
    },
  });
};

export const useCreateEnrollmentAndStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ student, enrollmentData }) => {
      return enrollmentServices.createEnrollmentAndStudent({
        student,
        enrollmentData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentEnrollment"]);
    },
  });
};
export const useCreateEnrollmentUsingExcel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (  data ) => { 
      return enrollmentServices.createEnrollmentUsingExcel(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentEnrollment-excel"]);
    },
  });
};

export const useBulkEnrollStudents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({newStudents, pendingEnrollmentStudents, course}) => {
      return enrollmentServices.bulkEnrollStudents(
        {
          newStudents,
          pendingEnrollmentStudents,
          course
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentEnrollment-bulk"]);
    },
  });
}

