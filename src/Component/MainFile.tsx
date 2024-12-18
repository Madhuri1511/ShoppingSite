import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ListItems } from './ListItems';
import { AddNewItems } from './AddNewItems';

export const MainFile = () => {
    return (
        <>
            <Router>
                {/* Navbar with Bootstrap for responsiveness */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            MyApp
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        end
                                        className={({ isActive }) =>
                                            isActive ? 'nav-link active' : 'nav-link'
                                        }
                                    >
                                        List of Items
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/add"
                                        className={({ isActive }) =>
                                            isActive ? 'nav-link active' : 'nav-link'
                                        }
                                    >
                                        Add New Item
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main content */}
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<ListItems />} />
                        <Route path="/add" element={<AddNewItems />} />
                        <Route path="/edit/:id" element={<AddNewItems />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
};
