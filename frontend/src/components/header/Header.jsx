import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/userSlice";

function Header() {
  const { isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loggedOut = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-blue-900 py-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          Book Explorer
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isLogged ? (
              <>
                <li>
                  <Link
                    to="/books"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    Books
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create_book"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    Publish Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-books"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    My Books
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={loggedOut}
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
