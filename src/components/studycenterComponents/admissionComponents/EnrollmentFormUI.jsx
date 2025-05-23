import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datePicker";
import { states } from "@/lib/list";
import { useCreateStudent } from "@/hooks/tanstackHooks/useEnrollment";
import { toast } from "sonner";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";

export function EnrollmentFormUI({ userData, setStep, setUserData }) {
  const [user, setUser] = useState(userData);
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: new Date(),
    gender: "",
    phoneNumber: "",
    state: "",
    district: "",
    place: "",
    pincode: "",
    email: "",
    dateOfAdmission: new Date(),
    parentName: "",
    qualification: "",
    sslc: null,
    profileImage: null,
    adhaarNumber: user?.adhaarNumber || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setFormData((prev) => ({
      ...prev,
      state: value,
      district: "", // reset district when state changes
    }));
  };

  const handleDistrictChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      district: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required.";
    if (!formData.age || isNaN(formData.age) || formData.age < 1)
      newErrors.age = "Valid age is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Valid 10-digit phone number is required.";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Valid email is required.";
    if (!formData.place) newErrors.place = "Place is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.pincode.match(/^\d{6}$/))
      newErrors.pincode = "Valid 6-digit pincode is required.";
    if (!formData.parentName) newErrors.parentName = "Parent Name is required.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";
    if (!formData.sslc) newErrors.sslc = "SSLC certificate is required.";
    if (!formData.profileImage)
      newErrors.profileImage = "Profile image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setUserData(formData);
    setStep(3);
  };

  const handleBackToVerification = () => {
    // Clear all form data
    setFormData({
      name: "",
      age: "",
      dateOfBirth: new Date(),
      gender: "",
      phoneNumber: "",
      state: "",
      district: "",
      place: "",
      pincode: "",
      email: "",
      dateOfAdmission: new Date(),
      parentName: "",
      qualification: "",
      sslc: null,
      profileImage: null,
      adhaarNumber: user?.adhaarNumber || "",
    });

    // Clear errors
    setErrors({});

    // Navigate to studycenter
    setStep(1);
  };

  const districtOptions =
    states.find((s) => s.state === selectedState)?.districts || [];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Student Enrollment Form
        </h1>
        <p className="text-gray-600 mt-1">Please fill all required fields</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* PERSONAL SECTION */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age*</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                onChange={handleChange}
                value={formData.age}
              />
              {errors.age && (
                <p className="text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date of Birth*</Label>
              <DatePicker
                date={formData.dateOfBirth}
                setDate={(date) => handleDateChange(date, "dateOfBirth")}
                // onChange={(date) =>
                //   setFormData({ ...formData, dateOfBirth: date })
                // }
              />
            </div>

            <div className="space-y-2 w-full">
              <Label>Gender*</Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, gender: val })
                }
                value={formData.gender}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number*</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* ADDRESS SECTION */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Address Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="place">Place*</Label>
              <Input
                id="place"
                name="place"
                onChange={handleChange}
                value={formData.place}
              />
              {errors.place && (
                <p className="text-sm text-red-600">{errors.place}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>State*</Label>
              <Select onValueChange={handleStateChange} value={selectedState}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.state} value={s.state}>
                      {s.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-sm text-red-600 ">{errors.state}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>District*</Label>
              <Select
                onValueChange={handleDistrictChange}
                value={formData.district}
                disabled={!selectedState}
              >
                <SelectTrigger className={`w-full`}>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districtOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.district && (
                <p className="text-sm text-red-600">{errors.district}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode*</Label>
              <Input
                id="pincode"
                name="pincode"
                onChange={handleChange}
                value={formData.pincode}
              />
              {errors.pincode && (
                <p className="text-sm text-red-600">{errors.pincode}</p>
              )}
            </div>
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Education Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date of Admission*</Label>
              <DatePicker
                date={formData.dateOfAdmission}
                setDate={(date) => handleDateChange(date, "dateOfAdmission")}
                // onChange={(date) =>
                //   setFormData({ ...formData, dateOfAdmission: date })
                // }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentName">Parent Name*</Label>
              <Input
                id="parentName"
                name="parentName"
                onChange={handleChange}
                value={formData.parentName}
              />
              {errors.parentName && (
                <p className="text-sm text-red-600">{errors.parentName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification*</Label>
              <Input
                id="qualification"
                name="qualification"
                onChange={handleChange}
                value={formData.qualification}
              />
              {errors.qualification && (
                <p className="text-sm text-red-600">{errors.qualification}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sslc">SSLC Certificate*</Label>
              <Input
                id="sslc"
                name="sslc"
                type="file"
                onChange={handleChange}
              />
              {errors.sslc && (
                <p className="text-sm text-red-600">{errors.sslc}</p>
              )}
            </div>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Profile Image
          </h2>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Upload Photo*</Label>
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.profileImage && (
              <p className="text-sm text-red-600">{errors.profileImage}</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleBackToVerification}
          >
            Back to Verification
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Submit Enrollment
          </Button>
        </div>
      </form>
    </div>
  );
}
