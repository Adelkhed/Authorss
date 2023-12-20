import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthorForm = () => {
    const [author, setAuthor] = useState('');
    const [serverErr, setErr] = useState(null);
    const [path, setPath] = useState('');
    const [authors, setAuthors] = useState(null); // Manage authors state locally
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [data, setData] = useState({
        name: { value: '', error: false },
    });

    useEffect(() => {
        setPath(location.pathname.split('/')[1]);
    }, [location]);

    useEffect(() => {
        if (id) {
            setAuthor(authors?.filter((author) => author._id === id)[0].name);
        }
    }, [id, authors]);

    const changeHandler = (e) => {
        setErr(null);
        const { name, value } = e.target;
        setData({ ...data, [name]: { value: value, error: validation(name, value) } });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (path === 'new') {
            axios
                .post('http://localhost:8000/authors', { name: data.name.value })
                .then((res) => {
                    if (res.data.err) {
                        setErr(res.data.err.name);
                    } else {
                        navigate('/');
                        setAuthors(res.data.authors); // Update authors state locally
                    }
                });
        } else if (path === 'edit') {
            axios
                .put(`http://localhost:8000/authors/${id}`, { name: data.name.value })
                .then((res) => {
                    if (res.data.err) {
                        setErr(res.data.err.name);
                    } else {
                        navigate('/');
                        setAuthors(res.data.authors); // Update authors state locally
                    }
                });
        }
    };

    const validation = (name, value) => {
        switch (name) {
            case 'name':
                if (value.length < 3) return true;
                break;
            default:
                break;
        }
        return false;
    };

    return (
        <div className="container my-4">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="author-name" className="form-label">
                        Author Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="author-name"
                        placeholder={path === 'edit' ? author : 'Add an author'}
                        onChange={changeHandler}
                    />
                    {serverErr?.name && <h6 className="text-danger">{serverErr.name}</h6>}
                </div>

                <div className="d-flex gap-2">
                    <Link to="/" className="btn btn-primary">
                        Cancel
                    </Link>
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};