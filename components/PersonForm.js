


import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// validation
const personSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    team: z.string().min(1, "Team is required"),
});

export default function PersonForm({ person = {}, onSubmit, onClose }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(personSchema),
        defaultValues: person,
    });

    const submitHandler = (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                <h3 className="text-lg font-semibold mb-4">
                    {person && person._id ? 'Edit Person' : 'Add Person'}
                </h3>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            id="role"
                            type="text"
                            {...register('role')}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        />
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
                        <input
                            id="team"
                            type="text"
                            {...register('team')}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        />
                        {errors.team && <p className="text-red-500 text-xs mt-1">{errors.team.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

