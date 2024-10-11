<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::select('id', 'nombre', 'calle', 'numero', 'colonia', 'ciudad')->get();
        
        return response()->json([
            'count' => $contacts->count(), 
            'entries' => $contacts->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:10',
            'numero' => 'required|string|max:255',
            'calle' => 'required|string|max:255',
            'colonia' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'codigo_postal' => 'required|string|max:5',
            'estado' => 'required|string|max:255',
            'domicilio' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
        ]);

        $contact = Contact::create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $contact
        ], 201); 
    }

    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $contact
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:10',
            'numero' => 'required|string|max:255',
            'calle' => 'required|string|max:255',
            'colonia' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'codigo_postal' => 'required|string|max:5',
            'estado' => 'required|string|max:255',
            'domicilio' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $contact
        ]);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contacto eliminado correctamente.'
        ]);
    }

    public function downloadContacts()
{
    $timestamp = now()->format('Ymd_His'); 
    $filename = "agenda_{$timestamp}.csv"; 

    $headers = [
        'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
        'Content-Type'        => 'text/csv',
        'Content-Disposition' => 'attachment; filename="' . $filename . '"', 
        'Expires'             => '0',
        'Pragma'              => 'public',
    ];

        $list = Contact::all()->toArray();
    
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));
    
       $callback = function() use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $row) { 
                fputcsv($FH, $row);
            }
            fclose($FH);
        };
    
        return (new StreamedResponse($callback, 200, $headers))->sendContent();
    
}


}
