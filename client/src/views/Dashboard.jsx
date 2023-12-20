import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Dashboard = () => {
    const [authors, setAuthors] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/authors')
            .then(res => {
                if (!res.data.err) {
                    setAuthors(res.data.author);
                } else {
                    console.log(res.data.err);
                }
            });
    }, []);

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/authors/${id}`)
            .then(res => {
                const newAuthors = authors.filter(author => author._id !== res.data.id);
                setAuthors(newAuthors);
            });
    };

    return (
        <div className='container my-4'>
            <table className='table table-striped border'>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Author Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors?.map(author => {
                        return (
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td>
                                    <Link to={`/edit/${author._id}`} className='btn btn-primary'>
                                        Edit
                                    </Link>
                                    <button className='btn btn-danger' onClick={() => deleteHandler(author._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};