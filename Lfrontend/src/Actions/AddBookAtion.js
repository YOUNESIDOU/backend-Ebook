import axios from 'axios';
import Swal from 'sweetalert2'; // Ensure you have this imported if you use Swal
import { uploadImage } from "../utils/Cloudinary";

export async function AddBookAction(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  console.log("title", title, "description", description);

  let imageUrl;
  try {
    imageUrl = await uploadImage(image, "devoir3");
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error!",
      text: "There was an error uploading the image.",
      icon: "error",
    });
    return;
  }

  const newBook = {
    title,
    description,
    image: imageUrl.secureUrl,
    imageDeleteToken: imageUrl.deleteToken,
  };

  try {
    const response = await axios.post('http://localhost:8000/api/books', newBook);
    if (response.status === 201) {
      Swal.fire({
        title: "Good job!",
        text: "You added a book!",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } else {
      throw new Error('Failed to add book');
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error!",
      text: "There was an error adding the book.",
      icon: "error",
    });
  }
}
