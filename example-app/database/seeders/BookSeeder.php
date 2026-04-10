<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            ['title' => 'Atomic Habits', 'author' => 'James Clear', 'category' => 'Self-Help', 'status' => 'Available'],
            ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'category' => 'Technology', 'status' => 'Available'],
            ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'category' => 'Science', 'status' => 'Borrowed'],
            ['title' => 'The Alchemist', 'author' => 'Paulo Coelho', 'category' => 'Novel', 'status' => 'Available'],
            ['title' => 'A Brief History of Time', 'author' => 'Stephen Hawking', 'category' => 'Science', 'status' => 'Available'],
            ['title' => 'Harry Potter and the Philosopher\'s Stone', 'author' => 'J.K. Rowling', 'category' => 'Novel', 'status' => 'Borrowed'],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
