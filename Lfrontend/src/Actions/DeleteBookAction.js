import Swal from "sweetalert2";
import axios from "axios";

export async function DeleteBookAction(id, deleteToken) {
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
      // Supprimez l'image de Cloudinary si nécessaire
      // await deleteCloudinaryImage(deleteToken);

      // Envoyer une requête DELETE à votre backend pour supprimer le livre
      const response = await axios.delete(`http://localhost:8000/api/books/${id}`);

      if (response.status === 200) {
        Swal.fire("Deleted!", "Your book has been deleted.", "success").then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire("Error!", "An error occurred while deleting the book.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "An error occurred while deleting the book.", "error");
    }
  }
}
