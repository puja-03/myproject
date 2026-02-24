<?php

namespace App\Http\Controllers;
use App\Models\Phonebook;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PhonebookController extends Controller
{
    public function index()
    {
        $request = request();

        $search = $request->input('search');
        $hasPhoto = $request->boolean('has_photo');
        $perPage = (int) $request->input('per_page', 10);

        $query = Phonebook::query();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        if ($hasPhoto) {
            $query->whereNotNull('photo');
        }

        $phonebooks = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Phonebooks', [
            'phonebooks' => $phonebooks,
            'filters' => [
                'search' => $search,
                'has_photo' => $hasPhoto,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Phonebooks/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => 'required|unique:phonebooks,phone_number',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        $data = $request->only(['name', 'phone_number']);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('phonebooks', 'public');
        }

        Phonebook::create($data);

        return redirect()->route('phonebooks.index')
            ->with('success', 'Phonebook created successfully.');
    }

    
    public function edit(Phonebook $phonebook)
    {
        return Inertia::render('Phonebooks/Edit', [
            'phonebook' => $phonebook
        ]);
    }

    public function update(Request $request, Phonebook $phonebook)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        $data = $request->only(['name', 'phone_number']);

        if ($request->hasFile('photo')) {
            // delete old photo if exists
            if ($phonebook->photo) {
                Storage::disk('public')->delete($phonebook->photo);
            }
            $data['photo'] = $request->file('photo')->store('phonebooks', 'public');
        }

        $phonebook->update($data);

        return redirect()->route('phonebooks.index');
    }

    public function destroy(Phonebook $phonebook)
    {
        if ($phonebook->photo) {
            Storage::disk('public')->delete($phonebook->photo);
        }
        $phonebook->delete();
        return redirect()->route('phonebooks.index');
    }
}
