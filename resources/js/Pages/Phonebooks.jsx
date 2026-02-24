import { Link, router } from '@inertiajs/react';

export default function Index({ phonebooks }) {

    const deletePhonebook = (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            router.delete(route('phonebooks.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        Phonebook List
                    </h1>

                    <Link
                        href={route('phonebooks.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        + Add New
                    </Link>
                </div>

                {phonebooks.length === 0 ? (
                    <p className="text-gray-400 text-center">
                        No phonebook records found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-300">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-3">#</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phonebooks.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-3">{index + 1}</td>
                                        <td className="py-3">
                                            {item.photo ? (
                                                <img
                                                    src={`/storage/${item.photo}`}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-sm text-white">
                                                    {item.name ? item.name.charAt(0).toUpperCase() : '-'}
                                                </div>
                                            )}
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.phone_number}</td>
                                        <td className="text-right space-x-2">

                                        <Link
                                            href={route('phonebooks.edit', item.id)}
                                            className="bg-yellow-500 px-3 py-1 rounded text-white"
                                        >
                                            Edit
                                        </Link>
                                            <button
                                                onClick={() => deletePhonebook(item.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}