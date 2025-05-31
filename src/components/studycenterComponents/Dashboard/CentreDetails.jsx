import { useAuth } from "@/Context/authContext";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  User,
  Hash,
  Building2,
  CreditCard,
  Phone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

function CentreDetails() {
  const [memberData, setMemberData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user) {setMemberData(user.studycenterId);}
    console.log(user);
  }, [user]);

  const isRenewalSoon = () => {
    const renewalDate = new Date(memberData.renewalDate);
    const today = new Date();
    const daysUntilRenewal = Math.ceil(
      (renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilRenewal <= 90; 
  };

  return (
    // <div className='w-full h-full border rounded-2xl min-h-96 px-3 md:px-6 py-10'>CentreDetails</div>
    <div className="w-full h-full">
      <Card className="h-full  pt-0 overflow-hidden">
        <CardHeader className="bg-prim ary border-b py-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-700">
                {memberData.name}
              </CardTitle>
              <CardDescription>
                {memberData.state}, {memberData.district}, {memberData.place},{" "}
                {memberData.pincode}
              </CardDescription>
              <h1 className="text-sm font-medium text-muted-foreground mt-2">
                ID: {memberData.atcId}
              </h1>
            </div>
            <div className="text-right">
              <Badge variant="secondary">Reg: {memberData.regNo}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-10">
          {/* Renewal Information */}
          <div className="bg-white py-3 border-b grid md:grid-cols-2 gap-4 md:divide-x">
            <div className="md:pr-3">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">Renewal info</h3>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-gray-600">Valid Until:</span>
                <div className="flex flex-wrap">
                  <span className="font-medium text-gray-800">
                    {format(
                      new Date(memberData?.renewalDate || Date.now()),
                      "PPP"
                    )}
                  </span>
                  {isRenewalSoon() && <Badge>Renewal Due</Badge>}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">Contact info</h3>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-800">
                  {user.phoneNumber}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white py-3 border-b ">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Location Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Place:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {memberData.place}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Pincode:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {memberData.pincode}
                </span>
              </div>
              <div>
                <span className="text-gray-500">District:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {memberData.district}
                </span>
              </div>
              <div>
                <span className="text-gray-500">State:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {memberData.state}
                </span>
              </div>
            </div>
          </div>

          {/* Center Information */}
          <div className="bg-white py-3">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">
                Center Information
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Center Head:</span>
              <span className="font-medium text-gray-800 capitalize">
                {memberData.centerHead}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CentreDetails;
