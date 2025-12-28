import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Mail, Phone, MapPin, Calendar, User, BookOpen, Award, Eye, EyeOff } from 'lucide-react';

const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [saving, setSaving] = useState(false);

  const API_BASE_URL = "http://localhost:5008/api";
  const token = localStorage.getItem("token"); // JWT token from login

  // Fetch student profile from backend

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/student/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();


        // Transform backend data to match frontend structure
        const transformedData = {
          personalInfo: {
            fullName: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            dateOfBirth: data.dateOfBirth || "",
            gender: data.gender || "Not specified",
            nationality: data.nationality || "Indian",
            bloodGroup: data.bloodGroup || "Not specified",
            profileImage: data.profileImage || "https://via.placeholder.com/150?text=Student",
          },
          academicInfo: {
            registrationNumber: data.regNumber || "",
            branch: data.branch || "",
            semester: data.semester || 1,
            section: data.section || "",
            currentSGPA: data.currentSGPA || 0,
            cumulativeGPA: data.cumulativeGPA || 0,
            totalCredits: data.totalCredits || 0,
          },
          parentInfo: {
            parentName: data.parentName || "",
            parentPhone: data.parentPhone || "",
            parentEmail: data.parentEmail || "",
            parentOccupation: data.parentOccupation || "",
          },
          addressInfo: {
            permanentAddress: data.permanentAddress || "",
            currentAddress: data.address || "",
            pincode: data.pincode || "",
            city: data.city || "",
            state: data.state || "",
          },
        };

        setFormData(transformedData);
        setOriginalData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to load profile");
        setLoading(false);
      }
    };

    if (token) {
      fetchStudentProfile();
    } else {
      setError("No authentication token found. Please login first.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!formData) {
    return <div>No profile data available</div>;
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

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Prepare data to send to backend
      const updateData = {
        name: formData.personalInfo.fullName,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        dateOfBirth: formData.personalInfo.dateOfBirth,
        parentName: formData.parentInfo.parentName,
        parentPhone: formData.parentInfo.parentPhone,
        parentEmail: formData.parentInfo.parentEmail,
        address: formData.addressInfo.currentAddress,
        city: formData.addressInfo.city,
        state: formData.addressInfo.state,
        pincode: formData.addressInfo.pincode,
      };

      const response = await fetch(`${API_BASE_URL}/student/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      setOriginalData(formData);
      setIsEditing(false);
      setSaving(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "Failed to save profile");
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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
            <p className="text-gray-800 font-medium">{formData.academicInfo.branch || "N/A"}</p>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
            <p className="text-gray-800 font-medium">{formData.academicInfo.semester}</p>
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <p className="text-gray-800 font-medium">{formData.academicInfo.section || "N/A"}</p>
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
              <p className="text-gray-800">{formData.parentInfo.parentName || "N/A"}</p>
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
              <p className="text-gray-800">{formData.parentInfo.parentOccupation || "N/A"}</p>
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
              <p className="text-gray-800">{formData.parentInfo.parentPhone || "N/A"}</p>
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
              <p className="text-gray-800">{formData.parentInfo.parentEmail || "N/A"}</p>
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
              <p className="text-gray-800">{formData.addressInfo.currentAddress || "N/A"}</p>
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
                <p className="text-gray-800">{formData.addressInfo.city || "N/A"}</p>
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
                <p className="text-gray-800">{formData.addressInfo.state || "N/A"}</p>
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
                <p className="text-gray-800">{formData.addressInfo.pincode || "N/A"}</p>
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
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;