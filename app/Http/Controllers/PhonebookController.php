<?php

namespace App\Http\Controllers;
use App\Models\Phonebook;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhonebookController extends Controller
{
    public function index()
    {
        return Inertia::render('Phonebooks', [
            'phonebooks' => Phonebook::latest()->limit(6)->get()
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
        ]);

        Phonebook::create($request->all());

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
            'phone_number' => 'required'
        ]);

        $phonebook->update($request->all());

        return redirect()->route('phonebooks.index');
    }

    public function destroy(Phonebook $phonebook)
    {
        $phonebook->delete();
        return redirect()->route('phonebooks.index');
    }
}
