// import { Calendar01Icon } from "hugeicons-react";

// const categorys = [
//     "Exam Schedule",
//     "Settings Update",
//     "Course Updates",
//     "Admission Info",
//     "Important Dates",
//     "Faculty Information",
//     "File Upload",
//     "Others",
//   ];

// export function NotificationIcon({item, size}) {
//     switch (item) {
//       case "Exam Schedule":
//         return <div className="grid place-content-center size-9 rounded-full bg-violet-50 text-violet-600"><Calendar01Icon size={size}/></div>;
//       default:
//         return "Unknown food category";
//     }
//   }

// import { 
//     Calendar01Icon,
//     Settings01Icon,
//     BookOpen01Icon,
//     File01Icon,
//     AlertCircleIcon,
//     UserIcon,
//     CloudUploadIcon,
//     HelpCircleIcon
//   } from "hugeicons-react";
  
//   const categories = [
//     "Exam Schedule",
//     "Settings Update",
//     "Course Updates",
//     "Admission Info",
//     "Important Dates",
//     "Faculty Information",
//     "File Upload",
//     "Others",
//   ];
  
//   export function NotificationIcon({ item, size = 16 }) {
//     const iconProps = { size };
    
//     const getIcon = () => {
//       switch (item) {
//         case "Exam Schedule":
//           return <Calendar01Icon {...iconProps} />;
//         case "Settings Update":
//           return <Settings01Icon {...iconProps} />;
//         case "Course Updates":
//           return <BookOpen01Icon {...iconProps} />;
//         case "Admission Info":
//           return <File01Icon {...iconProps} />;
//         case "Important Dates":
//           return <AlertCircleIcon {...iconProps} />;
//         case "Faculty Information":
//           return <UserIcon {...iconProps} />;
//         case "File Upload":
//           return <CloudUploadIcon {...iconProps} />;
//         case "Others":
//           return <HelpCircleIcon {...iconProps} />;
//         default:
//           return <HelpCircleIcon {...iconProps} />;
//       }
//     };
  
//     const getColor = () => {
//       switch (item) {
//         case "Exam Schedule":
//           return { bg: "bg-violet-50", text: "text-violet-600" };
//         case "Settings Update":
//           return { bg: "bg-blue-50", text: "text-blue-600" };
//         case "Course Updates":
//           return { bg: "bg-green-50", text: "text-green-600" };
//         case "Admission Info":
//           return { bg: "bg-amber-50", text: "text-amber-600" };
//         case "Important Dates":
//           return { bg: "bg-red-50", text: "text-red-600" };
//         case "Faculty Information":
//           return { bg: "bg-indigo-50", text: "text-indigo-600" };
//         case "File Upload":
//           return { bg: "bg-cyan-50", text: "text-cyan-600" };
//         case "Others":
//           return { bg: "bg-gray-50", text: "text-gray-600" };
//         default:
//           return { bg: "bg-gray-50", text: "text-gray-600" };
//       }
//     };
  
//     const color = getColor();
  
//     return (
//       <div className={`grid place-content-center size-9 rounded-full ${color.bg} ${color.text}`}>
//         {getIcon()}
//       </div>
//     );
//   }

import {
    Calendar01Icon,
    Settings02Icon,
    BookOpen02Icon,
    UserCheck02Icon,
    Clock02Icon,
    UserSquareIcon,
    File01Icon,
    Notification03Icon,
    InformationCircleIcon
  } from "hugeicons-react";
  
  // const categorys = [
  //   "Exam Schedule",
  //   "Settings Update",
  //   "Course Updates",
  //   "Admission Info",
  //   "Important Dates",
  //   "Faculty Information",
  //   "File Upload",
  //   "Others",
  // ];
  
  export function NotificationIcon({ item, size = 20 }) {
    switch (item) {
      case "Exam Schedule":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-violet-50 text-violet-600">
            <Calendar01Icon size={size} />
          </div>
        );
      case "Settings Update":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-blue-50 text-blue-600">
            <Settings02Icon size={size} />
          </div>
        );
      case "Course Updates":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-green-50 text-green-600">
            <BookOpen02Icon size={size} />
          </div>
        );
      case "Admission Info":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-yellow-50 text-yellow-600">
            <UserCheck02Icon size={size} />
          </div>
        );
      case "Important Dates":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-red-50 text-red-600">
            <Clock02Icon size={size} />
          </div>
        );
      case "Faculty Information":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-teal-50 text-teal-600">
            <UserSquareIcon size={size} />
          </div>
        );
      case "File Upload":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-indigo-50 text-indigo-600">
            <File01Icon size={size} />
          </div>
        );
      case "Other Information":
        return (
          <div className="grid place-content-center size-9 rounded-full bg-gray-100 text-gray-600">
            <Notification03Icon size={size} />
          </div>
        );
        default:
          return (
            <div className="grid place-content-center size-9 rounded-full bg-slate-100 text-slate-600">
            <InformationCircleIcon size={size} />
          </div>
        );
    }
  }
  