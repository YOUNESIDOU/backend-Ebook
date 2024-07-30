// import Swal from "sweetalert2";
// import { deleteCloudinaryImage, uploadImage } from "../utils/Cloudinary";

// export async function EditBookAction(id, formData) {
//   const title = formData.get("title");
//   const description = formData.get("description");
//   const image = formData.get("image");

//   let imageUrl;
//   let deleteToken;

//   // Get existing books from local storage
//   let books = JSON.parse(localStorage.getItem("books"));

//   // Find the book with the given id
//   const index = books.findIndex((book) => book.id === id);

//   if (index !== -1) {
//     const existingBook = books[index];

//     // Check if there's a new image to upload
//     if (image && image.name) {
//       try {
//         // Upload new image
//         const uploadResult = await uploadImage(image, "devoir3");
//         imageUrl = uploadResult.secureUrl;
//         deleteToken = uploadResult.deleteToken;
//       } catch (error) {
//         console.error(error);
//         Swal.fire({
//           title: "Error!",
//           text: "There was an error uploading the image.",
//           icon: "error",
//         });
//         return;
//       }

//       // Delete the old image from Cloudinary
//       if (existingBook.imageDeleteToken) {
//         try {
//           await deleteCloudinaryImage(existingBook.imageDeleteToken);
//         } catch (error) {
//           console.error("Error deleting old image:", error);
//           // Handle error if needed
//         }
//       }
//     }

//     // Update title, description, and optionally image URL and delete token
//     books[index] = {
//       ...books[index],
//       title,
//       description,
//       ...(imageUrl && { image: imageUrl, imageDeleteToken: deleteToken }),
//     };

//     // Save updated books array back to local storage
//     localStorage.setItem("books", JSON.stringify(books));

//     Swal.fire({
//       title: "Good job!",
//       text: "You edited a book!",
//       icon: "success",
//     }).then(() => {
//       window.location.reload();
//     });
//   } else {
//     Swal.fire({
//       title: "Error!",
//       text: "Book not found!",
//       icon: "error",
//     });
//   }
// }



// import Swal from "sweetalert2";
// import { deleteCloudinaryImage, uploadImage } from "../utils/Cloudinary";

// // Function to edit a book in the database
// export async function EditBookAction(id, formData) {
//   const title = formData.get("title");
//   const description = formData.get("description");
//   const image = formData.get("image");

//   let imageUrl;
//   let deleteToken;

//   // Check if there's a new image to upload
//   if (image && image.name) {
//     try {
//       // Upload new image
//       const uploadResult = await uploadImage(image, "devoir3");
//       imageUrl = uploadResult.secureUrl;
//       deleteToken = uploadResult.deleteToken;
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "Error!",
//         text: "There was an error uploading the image.",
//         icon: "error",
//       });
//       return;
//     }
//   }

//   // Prepare the data to send to the backend
//   const updatedBookData = {
//     title,
//     description,
//     ...(imageUrl && { image: imageUrl, imageDeleteToken: deleteToken }),
//   };

//   try {
//     // Make the API request to update the book
//     const response = await fetch(`/api/books/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedBookData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }

//     // If there's an old image to delete
//     if (deleteToken) {
//       try {
//         await deleteCloudinaryImage(deleteToken);
//       } catch (error) {
//         console.error("Error deleting old image:", error);
//         // Handle error if needed
//       }
//     }

//     Swal.fire({
//       title: "Good job!",
//       text: "You edited a book!",
//       icon: "success",
//     }).then(() => {
//       window.location.reload();
//     });
//   } catch (error) {
//     console.error("Error updating book:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "There was an error updating the book.",
//       icon: "error",
//     });
//   }
// }


// import Swal from "sweetalert2";
// import { deleteCloudinaryImage, uploadImage } from "../utils/Cloudinary";

// // Fonction pour éditer un livre dans la base de données
// export async function EditBookAction(id, formData) {
//   const title = formData.get("title");
//   const description = formData.get("description");
//   const image = formData.get("image");

//   let imageUrl;
//   let deleteToken;

//   // Vérifiez s'il y a une nouvelle image à télécharger
//   if (image && image.name) {
//     try {
//       // Télécharger la nouvelle image
//       const uploadResult = await uploadImage(image, "devoir3");
//       imageUrl = uploadResult.secureUrl;
//       deleteToken = uploadResult.deleteToken;
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "Error!",
//         text: "There was an error uploading the image.",
//         icon: "error",
//       });
//       return;
//     }
//   }

//   // Préparez les données à envoyer au backend
//   const updatedBookData = {
//     title,
//     description,
//     ...(imageUrl && { image: imageUrl, imageDeleteToken: deleteToken }),
//   };

//   try {
//     // Faites la requête API pour mettre à jour le livre
//     const response = await fetch(`http://localhost:8000/api/books/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedBookData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }

//     // Si vous avez un ancien jeton d'image à supprimer
//     if (deleteToken) {
//       try {
//         await deleteCloudinaryImage(deleteToken);
//       } catch (error) {
//         console.error("Error deleting old image:", error);
//         // Gérez l'erreur si nécessaire
//       }
//     }

//     Swal.fire({
//       title: "Good job!",
//       text: "You edited a book!",
//       icon: "success",
//     }).then(() => {
//       window.location.reload();
//     });
//   } catch (error) {
//     console.error("Error updating book:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "There was an error updating the book.",
//       icon: "error",
//     });
//   }
// }


// import axios from 'axios';
// import Swal from "sweetalert2";
// import { deleteCloudinaryImage, uploadImage } from "../utils/Cloudinary";
// import React, { useState, useEffect } from 'react';

// const BookForm = ({ bookId, onSubmit }) => {
//   const [title, setTitle] = useState('');
//   const [description, setdescription] = useState('');
//   const [image, setimage] = useState('');
//   const [imageDeleteToken, setimageDeleteToken] = useState('');







// // Fonction pour éditer un livre dans la base de données
// export async function EditBookAction(id, formData) {
//   const title = formData.get("title");
//   const description = formData.get("description");
//   const image = formData.get("image");

//   let imageUrl;
//   let deleteToken;

//   // Vérifiez s'il y a une nouvelle image à télécharger
//   if (image && image.name) {
//     try {
//       // Télécharger la nouvelle image
//       const uploadResult = await uploadImage(image, "devoir3");
//       imageUrl = uploadResult.secureUrl;
//       deleteToken = uploadResult.deleteToken;
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "Error!",
//         text: "There was an error uploading the image.",
//         icon: "error",
//       });
//       return;
//     }
//   }

//   // Préparez les données à envoyer au backend
//   const updatedBookData = {
//     title,
//     description,
//     ...(imageUrl && { image: imageUrl, imageDeleteToken: deleteToken }),
//   };

//   try {
//     // Faites la requête API pour mettre à jour le livre
//     const response = await fetch(`http://localhost:8000/api/books/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedBookData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }

//     // Si vous avez un ancien jeton d'image à supprimer
//     if (deleteToken) {
//       try {
//         await deleteCloudinaryImage(deleteToken);
//       } catch (error) {
//         console.error("Error deleting old image:", error);
//         // Gérez l'erreur si nécessaire
//       }
//     }

//     Swal.fire({
//       title: "Good job!",
//       text: "You edited a book!",
//       icon: "success",
//     }).then(() => {
//       window.location.reload();
//     });
//   } catch (error) {
//     console.error("Error updating book:", error);
//     Swal.fire({
//       title: "Error!",
//       text: "There was an error updating the book.",
//       icon: "error",
//     }); 
//   }
// // }
// import axios from 'axios';

// export async function EditBookAction(id, formData) {
//   try {
//     const response = await axios.put(`http://localhost:8000/api/books/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (response.status === 200) {
//       alert('Book updated successfully!');
//       window.location.reload();
//     }
//   } catch (error) {
//     console.error('There was an error updating the book:', error.response || error);
//     alert('Failed to update the book. Please try again.');
//   }
// }
import axios from 'axios';

export async function EditBookAction(id, formData) {
  try {
    const response = await axios.put(`http://localhost:8000/api/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      alert('Book updated successfully!');
      window.location.reload();
    }
  } catch (error) {
    console.error('There was an error updating the book:', error.response || error);
    alert('Failed to update the book. Please try again.');
  }
}
