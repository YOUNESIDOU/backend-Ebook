// import React, { useEffect, useState } from "react";
// import CardComp from "./CardComp";

// const BookList = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     async function fetchBooksFromStorage() {
//       const storedBooks = localStorage.getItem("books");
//       if (storedBooks) {
//         setBooks(JSON.parse(storedBooks));
//       }
//     }
//     fetchBooksFromStorage();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-decoration-underline text-center">
//         Books in local storage:
//       </h2>
//       {books?.length > 0 ? (
//         <div className="d-flex gap-3 justify-content-center row">
//           {books.map((book) => (
//             <CardComp
//               key={book.id}
//               id={book.id}
//               title={book.title}
//               description={book.description}
//               image={book.image}
//               imageDeleteToken={book.imageDeleteToken}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-danger">
//           <h2>No Books found in local storage</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;


//Book list 
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComp from "./CardComp";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksFromDatabase() {
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
    fetchBooksFromDatabase();
  }, []);

  return (
    <div>
      <h2 className="text-decoration-underline text-center">
        Books in Database:
      </h2>
      {books?.length > 0 ? (
        <div className="d-flex gap-3 justify-content-center row">
          {books.map((book) => (
            <CardComp
              key={book._id} // Use _id for MongoDB documents
              id={book._id}
              title={book.title}
              description={book.description}
              image={book.image}
              imageDeleteToken={book.imageDeleteToken}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-danger">
          <h2>No Books found in the database</h2>
        </div>
      )}
    </div>
  );
};

export default BookList;
