export const API_ENDPOINTS = {
  //ADMIN API ENDPOINTS
  AUTH: {
    LOGIN: "/api/auth/login",
    ISOUTH: "/api/auth/isAuth",
    LOGOUT: "/api/auth/logout",
    FORGOT_PASSWORD: "/api/auth/sendOtp",
    VERIFY_OTP: "/api/auth/verifyOtp",
    RESET_PASSWORD: "/api/auth/resetPassword",
  },
  STUDY_CENTERS: {
    VERIFIED: "/api/studycenter/getVerifiedStudyCenters",
    GET_ONE: "/api/studycenter/getStudyCenterById",
    CREATE: "/api/studycenter/addStudyCenter",
    UPDATE: "/api/studyCenter/updateStudyCenter",
    DELETE: "/api/studyCenters/:id",
    COURSE_OF_STUDY_CENTER: "/api/studycenter/getCoursesOfStudyCenter",
    GET_STUDYCENTER_FOR_EXCEL: "/api/studycenter/getAllStudyCenterForExcel",
    GET_REQ_CENTER: "/api/externalApi/getNotApprovedStudyCenter",
    UPDATE_CENTER: "/api/externalApi/updateAtcRequest",
  },
  COURSE: {
    GET_ALL: "/api/course/getAllCourses",
    ADD_COURSE: "/api/course/create",
    EDIT: "/api/course/update",
    GET_SUB: "/api/subject/getAllSubjects",
    GET_ADMOPENED_COURSE_AND_BATCH_OF_STUDY_CENTER:
      "/api/course/getAllOpenedCourseAndBatchOfStudycenter",
  },
  SUBJECTS: {
    GET_ALL_SUBJECTS: "/api/subject/getAlltrueAndfalseSubjects",
    CREATE_SUBJECTS: "/api/subject/create",
    UPDATE_SUBJECTS: "/api/subject/update",
  },
  BATCH: {
    CREATE: "api/batch/createBatch",
    UPDATE_STATUS: "api/batch/editAdmissionStatus",
    GET_COURSE: "api/batch/getBatchesOfCourse",
    GET_OPEN_BATCHES_OF_COURSE: "api/batch/admissionOpenedBatchesOfCourse",
    GET_OPEN_BATCHES_OF_STUDY_CENTER:
      "api/batch/getAdmissionOpenBatchesByStudyCenter",
  },
  ADMISSION: {
    OPEN_ADMISSION: "api/batch/editBatchDate",
    OPENED_ADMISSION: "api/batch/admissionOpened",
    CLOSED_ADMISSION: "api/batch/admissionNotOpen",
    SHEDULED_ADMISSION: "api/batch/admissionScheduled",
    CHANGE_ADMISSION_STATUS: "api/batch/toggleBatchStatus",
  },
  ENROLLMENT: {
    CHECK_ENROLLED: "/api/enrollment/checkEnrolledOrNot",
    CREATE_STUDENT: "/api/enrollment/createStudent",
    CREATE_STUDENT_AND_ENROLLMENT:
      "/api/enrollment/createStudentWithEnrollment",
    EXCEL_ENROLLMENT: "/api/enrollment/EnrollmentUsingExcel",
    BULK_ENROLL: "/api/enrollment/bulkEnrollStudents",
  },
  STUDENTS: {
    ALL_STUDENTS_OF_STUDY_CENTER: "/api/students/getAllStudents",
    STUDENT_FOR_DL: "/api/students/getStudentsForDl",
    GET_ONE_STUDENT: "/api/students/getOneStudent",
    UPDATE_STUDENT_DATA: "/api/students/editStudentDetails",
  },
  RESULT: {
    GET_STUDETN_FOR_RESULT: "/api/students/getStudentDetailsForResultUploadExcel",
    UPLOAD_RESULT: "/api/result/storeResultFromExcel",
    GET_ALL_RESULT: "/api/result/getAllResults",
    DELETE_RESULT: "/api/result/deleteResult",
    RESULT_CHECK: "/api/result/fetchResult",
  },
  SETTINGS: {
    GET_SETTINGS: "/api/settings/getSettings",
    UPDATE_ACCOUNT_INFO: "/api/settings/updateAdminAndUserField",
    TOGGLE_SETTINGS: "/api/settings/toggleSettingsField",
    EDIT_STUDY_CENTER: "/api/studycenter/editStudyCenterFields",
  },
  PRODUCT: {
    ADD_PRODUCT: "/api/products/addProduct",
    GET_ALL_PRODUCTS: "/api/products/getAllProducts",
    GET_ONE_PRODUCT: "/api/products/getProduct",
    UPDATE_PRODUCT: "/api/products/updateProduct",
  },
  ORDER: {
    CREATE_ORDER: "/api/orders/createOrder",
    GET_ALL_ORDERS: "/api/orders/getAllOrders",
    UPDATE_ORDER_STATUS: "/api/orders/updateStatus",
    GET_ORDER_OF_A_USER: "/api/orders/getOrderOfUser",
    GET_ORDER_BY_STATUS: "/api/orders/getOrdersByStatus",
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: "/api/notifications/getNotificationsOfEachUser",
    CREATE_NOTIFICATION: "/api/notifications/createNotification",
    GET_NOTIFICATIONS_FOR_EDIT: "/api/notifications/getNoficationsForEdit",
    DELETE_NOTIFICATION: "/api/notifications/deleteNotification",
  },
  DASHBOARD: {
    GET_DATA: "/api/dashboard/getDashboardData",
    GET_DATA_CENTER: "/api/dashboard/getDashboardDataOfStudycenter",
  },
  EXAM: {
    SCHEDULE_EXAM: "/api/exam/scheduleExam",
    GET_ALL_EXAMS: "/api/exam/getAllExamSchedules",
    DELETE_SCHEDULED_EXAM: "/api/exam/deleteExamSchedule",
    GET_SCHEDULED_EXAMS: "/api/exam/getScheduledExamBatches",
    CLOSE_SCHEDULED_EXAM: "/api/exam/closeScheduledExam",
    GET_EXAM_OF_STUDY_CENTER: "/api/exam/getScheduledExamBatchesOfStudyCenter",
    DOWNLOAD_HALL_TICKET: "/api/hallticket/DownloadhallTicket",
  },
  REQUEST_COURSE: {
    GET_COURSE_FOR_REQUEST: "/api/request/getNotBookedCourses",
    GET_REQUEST_COURSE_FOR_CENTER: "/api/request/getRequestedCoursesOfStudycenter",
    GET_REQUEST_COURSE_FOR_ADMIN: "/api/request/getRequestedCoursesForAdmin",
    CHENGE_STATUS_OF_REQUEST_COURSE: "/api/request/changeStatus",
    REQUEST_COURSE: "/api/request/requestACourse",
  },
  VERIFICATION_STUDENT: {
    GET_VERIFICATION_STUDENT: "/api/approval/getPendingAndRejectedStudents",
    UPDATE_STATUS_OF_VERIFICATION: "/api/approval/updateStatusOfPendingApproval",
    DELETE_REJECT_STUDENT: "/api/approval/deleteApproval",
  },
  STAFF: {
    CREATE_STAFF: "/api/staff/createStaff",
    GET_ALL_STAFF: "/api/staff/getAllStaff",
    UPDATE_STAFF: "/api/staff/updateStaff",
    DELETE_STAFF: "/api/staff/deleteStaff",
    GET_ALL_STAFF_FOR_DL: "/api/staff/getAllStaffForDl",
  },
  GALLERY: {
    GET_ALL_POST: "/api/gallery/fetchAllGalleryPosts",
    CREATE_POST: "/api/gallery/addGallery",
    EDIT_POST: "/api/gallery/editGallery",
    DELETE_POST: "/api/gallery/deleteGallery",
  },
  PDF: {
    DL_PDF: "/api/pdf/generate-pdf",
  }
};
 