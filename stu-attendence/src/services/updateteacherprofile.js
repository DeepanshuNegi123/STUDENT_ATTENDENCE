import React, { useState } from "react";

const EditTeacherProfile = ({ teacherData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: teacherData.name,
        phone: teacherData.phone,
        bio: teacherData.bio,
        experience: teacherData.experience,
        profilePicture: teacherData.profilePicture,
    });

    const [showPhone, setShowPhone] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // send updated data to parent
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-lg"
                        required
                    />
                </div>

                {/* Permanent Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Email (Permanent)
                        </label>
                        <input
                            value={teacherData.email}
                            disabled
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Department (Permanent)
                        </label>
                        <input
                            value={teacherData.department}
                            disabled
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Joined (Permanent)
                        </label>
                        <input
                            value={teacherData.joinedDate}
                            disabled
                            className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
                        />
                    </div>

                </div>

                {/* Phone (editable + show/hide toggle) */}
                <div>
                    <label className="block text-gray-700 font-medium flex justify-between">
                        Phone
                        <span
                            onClick={() => setShowPhone(!showPhone)}
                            className="text-blue-600 cursor-pointer text-sm"
                        >
                            {showPhone ? "Hide" : "Show"}
                        </span>
                    </label>

                    <input
                        type={showPhone ? "text" : "password"}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Experience (Years)
                    </label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full mt-1 p-3 border rounded-lg"
                    ></textarea>
                </div>

                {/* Profile Picture URL */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Profile Picture URL
                    </label>
                    <input
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTeacherProfile;
