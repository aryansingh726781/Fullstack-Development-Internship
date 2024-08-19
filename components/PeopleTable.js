
import { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PersonForm from '../components/PersonForm';
import SidePane from '../components/SidePane';

export default function PeopleDirectory() {
    const [people, setPeople] = useState([]);
    const [editingPerson, setEditingPerson] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    // Fetch data
    useEffect(() => {
        fetch('http://localhost:5000/api/people')
            .then(response => response.json())
            .then(data => setPeople(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //  deletion
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/people/${id}`, {
                method: 'DELETE',
            });
            setPeople(people.filter(person => person._id !== id));
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    // Handle  submission
    const handleSubmit = async (person) => {
        try {
            if (editingPerson) {
                const response = await fetch(`http://localhost:5000/api/people/${editingPerson._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(person),
                });
                const updatedPerson = await response.json();
                setPeople(people.map(p => (p._id === updatedPerson._id ? updatedPerson : p)));
                setEditingPerson(null);
            } else {
                const response = await fetch('http://localhost:5000/api/people', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(person),
                });
                const newPerson = await response.json();
                setPeople([...people, newPerson]);
            }
            setShowAddForm(false);
        } catch (error) {
            console.error('Error submitting person:', error);
        }
    };

    //  columns for the table
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                accessorKey: 'team',
                header: 'Team',
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div>
                        <button
                            onClick={() => setEditingPerson(row.original)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.original._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setSelectedPerson(row.original)}
                            className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                        >
                            View Details
                        </button>
                    </div>
                ),
            },
        ],
        [people, editingPerson]
    );

    // Create the table instance
    const table = useReactTable({
        data: people,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="flex">
            {/* <Sidebar /> */}
            <div className="flex-1">
                {/* <Navbar /> */}
                <div className="p-4">
                    <h2>People Directory</h2>
                    <button
                        onClick={() => {
                            setEditingPerson(null);
                            setShowAddForm(true);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Add Person
                    </button>
                    <table className="min-w-full bg-white">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(showAddForm || editingPerson) && (
                        <PersonForm
                            person={editingPerson}
                            onSubmit={handleSubmit}
                            onClose={() => setShowAddForm(false)}
                        />
                    )}
                    {selectedPerson && (
                        <SidePane
                            person={selectedPerson}
                            onClose={() => setSelectedPerson(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

