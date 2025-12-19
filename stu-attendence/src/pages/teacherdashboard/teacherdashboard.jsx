import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/teachercomponents/sidebar';
import Navbar from '../../components/teachercomponents/navbar';

// ============================================================================
// Main Dashboard Layout
// ============================================================================
// This component establishes the primary layout structure for the teacher's
// dashboard, including a collapsible sidebar and a main content area.
// State is managed here to coordinate the sidebar and navbar components.
// ============================================================================

const TeacherDashboardLayout = () => {
    // State to manage the visibility of the sidebar.
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Memoized toggle function to prevent unnecessary re-renders of child components.
    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar: Fixed position, toggles visibility */}
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

            {/* Content Area: Adjusts margin based on sidebar state */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'ml-64' : 'ml-0'
                }`}
            >
                {/* Top Navbar */}
                <Navbar toggle={toggleSidebar} />

                {/* Main Content: Renders child routes and is scrollable */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboardLayout;
