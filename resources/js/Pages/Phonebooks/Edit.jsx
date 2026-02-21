import { useForm } from '@inertiajs/react';

export default function Edit({ phonebook }) {

    const { data, setData, put, processing, errors } = useForm({
        name: phonebook.name || '',
        phone_number: phonebook.phone_number || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('phonebooks.update', phonebook.id));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-white text-center mb-6">
                    Edit Phonebook
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={data.phone_number}
                            onChange={e => setData('phone_number', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone_number && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.phone_number}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>

                </form>
            </div>
        </div>
    );
}