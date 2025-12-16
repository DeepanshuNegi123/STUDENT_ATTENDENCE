export const fetchTeacherProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5008/api/teacher/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};
