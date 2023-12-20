import React, {useState, useEffect, useContext} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import { AuthorContext } from '../context/author.context';

export const Dashboard = () => {
    const {authors, dispatch} = useContext(AuthorContext)
    useEffect(()=>{
        axios.get('http://localhost:8000/authors')
            .then(res => {
                if(!res.data.err){
                    dispatch({type: 'SET AUTHORS', payload: res.data.author})
                } else {
                    console.log(res.data.err)
                }
            })
    },[])

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/authors/${id}`)
            .then(res=>{
                const newAuthors = authors.filter(author => author._id !== res.data.id);
                dispatch({type: 'SET AUTHORS', payload: newAuthors});
            })
    }

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
                            <td><Link to={`/edit/${author._id}`} className='btn btn-primary'>Edit</Link> <button className='btn btn-danger' onClick={() => deleteHandler(author._id)}>Delete</button></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
