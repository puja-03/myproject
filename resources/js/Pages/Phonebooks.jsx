import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ phonebooks, filters = {} }) {

    const list = Array.isArray(phonebooks) ? phonebooks : (phonebooks.data || []);
    const currentPage = phonebooks.current_page || phonebooks.meta?.current_page || 1;
    const perPage = phonebooks.per_page || phonebooks.meta?.per_page || list.length || 10;

    const [search, setSearch] = useState(filters.search || '');
    const [hasPhoto, setHasPhoto] = useState(!!filters.has_photo);
    const [perPageSelect, setPerPageSelect] = useState(filters.per_page || perPage);

    const deletePhonebook = (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            router.delete(route('phonebooks.destroy', id));
        }
    };

    const submitFilters = (e) => {
        e && e.preventDefault();
        router.get(route('phonebooks.index'), { search: search || undefined, has_photo: hasPhoto ? 1 : undefined, per_page: perPageSelect }, { preserveState: true });
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

                {/* Filters */}
                <form onSubmit={submitFilters} className="mb-4 flex gap-3 items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search name or phone..."
                        className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 flex-1"
                    />

                    <label className="flex items-center gap-2 text-sm text-gray-300">
                        <input type="checkbox" checked={hasPhoto} onChange={e => setHasPhoto(e.target.checked)} />
                        Has photo
                    </label>

                    <select value={perPageSelect} onChange={e => setPerPageSelect(e.target.value)} className="bg-gray-700 text-white px-2 py-1 rounded">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>

                    <button type="submit" className="bg-green-600 px-3 py-1 rounded text-white">Apply</button>
                </form>

                {list.length === 0 ? (
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
                                {list.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-3">{(currentPage - 1) * perPage + (index + 1)}</td>
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

                        {/* Pagination */}
                        {phonebooks.links && (
                            <div className="mt-4 flex justify-center space-x-2">
                                {phonebooks.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}