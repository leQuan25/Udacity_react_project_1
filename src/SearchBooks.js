import "./App.css";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book";

function SearchBooks() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [reloadPage, setReloadPage] = useState('');

    const handleReload = (reloadPage) => {
        setReloadPage(reloadPage);
    }

    useEffect(() => {
        setSearchInput(searchInput);
        const doSearchBooks = async () =>{
            const res = await search(searchInput,'20');
            setSearchResult(res);
        };

        doSearchBooks();
    }, [searchInput,reloadPage])

    return (
        <div className="search-books">
          <div className="search-books-bar">
          <Link to="/">
            <a
              className="close-search"
            >
              Close
            </a>
          </Link>  
          <div className="search-books-input-wrapper">
                <input
                type="text"
                placeholder="Search by title, author, or ISBN new"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {Array.isArray(searchResult) ?  searchResult.map((book) =>
                                <Book book={book} key={book.id} handleReload={handleReload}></Book>     
                                ) : null}

            </ol>
          </div>
        </div>
    );
}

export default SearchBooks;