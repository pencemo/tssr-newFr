import StaffList from '@/components/admincomp/StaffComp/StaffList'
import React from 'react'

function ManageStaff() {
  return (
    <div>
        <div className="">
            <h1 className="text-2xl font-semibold ">Manage Staffs</h1>
          </div>
        <StaffList/>
    </div>
  )
}

export default ManageStaff