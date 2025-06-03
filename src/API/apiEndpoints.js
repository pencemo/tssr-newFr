export const API_ENDPOINTS = {
  //ADMIN API ENDPOINTS
  AUTH: {
    LOGIN: "/api/auth/login",
    ISOUTH: "/api/auth/isAuth",
    REGISTER: "/api/auth/create",
    LOGOUT: "/api/auth/logout",
  },
  STUDY_CENTERS: {
    VERIFIED: "/api/studycenter/getVerifiedStudyCenters",
    GET_ONE: "/api/studycenter/getStudyCenterById",
    CREATE: "/api/studycenter/addStudyCenter",
    UPDATE: "/api/studyCenter/updateStudyCenter",
    DELETE: "/api/studyCenters/:id",
    COURSE_OF_STUDY_CENTER: "/api/studycenter/getCoursesOfStudyCenter",
    GET_STUDYCENTER_FOR_EXCEL: "/api/studycenter/getAllStudyCenterForExcel",
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
    CREATE_SUBJECTS: '/api/subject/create',
    UPDATE_SUBJECTS:'/api/subject/update'
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

  //STUDY CENTER API ENDPOINTS
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
};
 