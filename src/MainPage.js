import "./App.css";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { getAll } from "./BooksAPI";
import Book from "./Book";

function MainPage() {
    const [allShelfBook, setAllShelfBook] = useState([]);  
    const [reloadPage, setReloadPage] = useState('');

    const handleReload = (reloadPage) => {
        setReloadPage(reloadPage);
    }

    useEffect(() => {
            setReloadPage(reloadPage);
            const dogetAllShelfBooks = async () =>{
                const res = await getAll();
                setAllShelfBook(res);
            };
            dogetAllShelfBooks();
    }, [reloadPage])

    return (
        <div className="app">
            <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                            {allShelfBook.filter((bookShelf) => bookShelf.shelf === 'currentlyReading').map((book) =>
                                <Book book={book} key={book.id} handleReload={handleReload}></Book>
                            )}
                            </ol>
                        </div>
                    </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {allShelfBook.filter((bookShelf) => bookShelf.shelf === 'wantToRead').map((book) =>
                            <Book book={book} key={book.id} handleReload={handleReload}></Book>
                        )}
                    </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {allShelfBook.filter((bookShelf) => bookShelf.shelf === 'read').map((book) =>
                            <Book book={book} key={book.id} handleReload={handleReload}></Book>
                        )}
                    </ol>
                    </div>
                </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                Add a book
                </Link>
            </div>
            </div>
        </div>
    );
}

export default MainPage;