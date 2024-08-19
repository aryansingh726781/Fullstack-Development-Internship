import React from 'react';

const SidePane = ({ person, onClose }) => {
    if (!person) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-end">
            <div className="w-1/3 bg-white shadow-lg p-4 h-full overflow-y-auto">
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
                >
                    Close
                </button>
                <h3 className="text-lg font-semibold mb-4">Person Details</h3>
                <div>
                    <p><strong>Name:</strong> {person.name}</p>
                    <p><strong>Role:</strong> {person.role}</p>
                    <p><strong>Team:</strong> {person.team}</p>
                    {/* Add more fields as necessary */}
                </div>
            </div>
            <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50"
                onClick={onClose}
            />
        </div>
    );
};

export default SidePane;
