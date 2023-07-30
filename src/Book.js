import "./App.css";
import { useEffect, useState } from "react";
import { get, update } from "./BooksAPI";

function Book({book,handleReload}) {
    const [shelf, setShelf] = useState('');

    const handleChange = (event,book) => {
        console.log("change");
        const doUpdateShelfBook = async (book,shelf) => {
            const res = await update(book,shelf);
            handleReload(Date().toLocaleString());
            console.log(res);
        }

        if (event.target.value !== 'none') {
            console.log(event.target.value);
            doUpdateShelfBook(book,event.target.value);
        }
      }

      useEffect(() => {
        const dogetShelfBook = async () =>{
            const res = await get(book.id);
            setShelf(res.shelf);
        };
        dogetShelfBook();
    }, [book])

    return (
        <li key={book.id}>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:'url(' +
                        book?.imageLinks?.thumbnail  + ')',
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => handleChange(event,book)}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="" hidden={true}></option>

                        {shelf === 'currentlyReading' ? 
                        (<option value="currentlyReading" disabled>
                            Currently Reading
                        </option>) :
                        (<option value="currentlyReading">
                            Currently Reading
                        </option>)}
                  
                        {shelf === 'wantToRead' ? 
                            (<option value="wantToRead" disabled>
                            Want to Read
                            </option>) : 
                            (<option value="wantToRead">
                            Want to Read
                            </option>)}

                        {shelf === 'read' ? (<option value="read" disabled>
                            Read
                            </option>) : (<option value="read">
                            Read
                            </option>)}

                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    </li>
    );
} 

export default Book;