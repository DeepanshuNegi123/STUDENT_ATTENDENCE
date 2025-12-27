import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Mail, Phone, MapPin, Calendar, User, BookOpen, Award, Eye, EyeOff } from 'lucide-react';

const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(null);

  // Mock student data
  const mockStudentData = {
    personalInfo: {
      fullName: "Piyush Raj",
      email: "piyush@gmail.com",
      phone: "1234567890",
      dateOfBirth: "2003-05-15",
      gender: "Male",
      nationality: "Indian",
      bloodGroup: "O+",
      profileImage: "https://via.placeholder.com/150?text=Piyush",
    },
    academicInfo: {
      registrationNumber: "reg1244",
      branch: "Computer Science",
      semester: 5,
      section: "A",
      currentSGPA: 8.45,
      cumulativeGPA: 8.32,
      totalCredits: 15,
    },
    parentInfo: {
      parentName: "Raj Kumar",
      parentPhone: "9876543210",
      parentEmail: "rajkumar@gmail.com",
      parentOccupation: "Business",
    },
    addressInfo: {
      permanentAddress: "123 Main Street, New Delhi, India",
      currentAddress: "456 College Road, Delhi University, New Delhi",
      pincode: "110007",
      city: "New Delhi",
      state: "Delhi",
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData(mockStudentData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    console.log("Profile updated:", formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(mockStudentData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-blue-100">Manage your personal and academic information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isEditing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-white text-blue-600 hover:bg-blue-50"
            }`}
          >
            {isEditing ? (
              <>
                <X size={20} />
                Cancel
              </>
            ) : (
              <>
                <Edit2 size={20} />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      {/* Profile Picture & Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={formData.personalInfo.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
            />
            {isEditing && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Change Photo
              </button>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 font-medium text-lg">{formData.personalInfo.fullName}</p>
                )}
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <p className="text-gray-800 font-medium text-lg">{formData.academicInfo.registrationNumber}</p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={formData.personalInfo.gender}
                    onChange={(e) => handleInputChange("personalInfo", "gender", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{formData.personalInfo.gender}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{formData.personalInfo.dateOfBirth}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-blue-600" />
          Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
            <p className="text-gray-800 font-medium">{formData.academicInfo.branch}</p>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
            <p className="text-gray-800 font-medium">{formData.academicInfo.semester}</p>
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <p className="text-gray-800 font-medium">{formData.academicInfo.section}</p>
          </div>

          {/* Current SGPA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current SGPA</label>
            <p className="text-2xl font-bold text-blue-600">{formData.academicInfo.currentSGPA}</p>
          </div>

          {/* Cumulative GPA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cumulative GPA</label>
            <p className="text-2xl font-bold text-green-600">{formData.academicInfo.cumulativeGPA}</p>
          </div>

          {/* Total Credits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Credits</label>
            <p className="text-2xl font-bold text-purple-600">{formData.academicInfo.totalCredits}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Phone size={24} className="text-blue-600" />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center gap-2 text-gray-800">
                <Mail size={18} className="text-gray-500" />
                {formData.personalInfo.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center gap-2 text-gray-800">
                <Phone size={18} className="text-gray-500" />
                {formData.personalInfo.phone}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <User size={24} className="text-blue-600" />
          Parent/Guardian Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parent Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.parentInfo.parentName}
                onChange={(e) => handleInputChange("parentInfo", "parentName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{formData.parentInfo.parentName}</p>
            )}
          </div>

          {/* Parent Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.parentInfo.parentOccupation}
                onChange={(e) => handleInputChange("parentInfo", "parentOccupation", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{formData.parentInfo.parentOccupation}</p>
            )}
          </div>

          {/* Parent Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.parentInfo.parentPhone}
                onChange={(e) => handleInputChange("parentInfo", "parentPhone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{formData.parentInfo.parentPhone}</p>
            )}
          </div>

          {/* Parent Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.parentInfo.parentEmail}
                onChange={(e) => handleInputChange("parentInfo", "parentEmail", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{formData.parentInfo.parentEmail}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MapPin size={24} className="text-blue-600" />
          Address Information
        </h2>
        <div className="space-y-6">
          {/* Current Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
            {isEditing ? (
              <textarea
                value={formData.addressInfo.currentAddress}
                onChange={(e) => handleInputChange("addressInfo", "currentAddress", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
            ) : (
              <p className="text-gray-800">{formData.addressInfo.currentAddress}</p>
            )}
          </div>

          {/* Permanent Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address</label>
            {isEditing ? (
              <textarea
                value={formData.addressInfo.permanentAddress}
                onChange={(e) => handleInputChange("addressInfo", "permanentAddress", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
            ) : (
              <p className="text-gray-800">{formData.addressInfo.permanentAddress}</p>
            )}
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.addressInfo.city}
                  onChange={(e) => handleInputChange("addressInfo", "city", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{formData.addressInfo.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.addressInfo.state}
                  onChange={(e) => handleInputChange("addressInfo", "state", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{formData.addressInfo.state}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.addressInfo.pincode}
                  onChange={(e) => handleInputChange("addressInfo", "pincode", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{formData.addressInfo.pincode}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="bg-white rounded-lg shadow p-6 flex gap-4 justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;