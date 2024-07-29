import React from 'react';
import Swal from 'sweetalert2';

const BookList = ({ books, onDelete }) => {
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/deleteBook/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire("Deleted!", "Your book has been deleted.", "success");
          onDelete(id); // Met à jour l'UI en supprimant le livre de la liste
        } else {
          const errorData = await response.json();
          Swal.fire("Error!", errorData.message, "error");
        }
      } catch (error) {
        Swal.fire("Error!", "An error occurred while deleting the book.", "error");
      }
    }
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author}
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
