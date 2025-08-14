import { Alert01Icon } from "hugeicons-react";
import React from "react";

function NotAccess() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <Alert01Icon size={30} className="text-red-600" />
        <h1 className="text-xl font-medium text-red-600">Permission Denied</h1>
        <h1 className="text-muted-foreground">
          You are not authorized to access this page
        </h1>
      </div>
    </div>
  );
}

export default NotAccess;
