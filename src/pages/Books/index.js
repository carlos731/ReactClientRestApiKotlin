import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function Books() {

    const [books, setBooks] = useState([]);

    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');

    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    useEffect(() => {
        api.get('/api/book/v1', authorization)
            .then(response => {
                setBooks(response.data._embedded.bookVOList);
            });
    }, /*[accessToken]*/);


    return (
        <div className="book-container">
            <header>
                <img src={logoImage} alt="logo" />
                <span>Welcome, <strong>{username.toUpperCase()}</strong>!</span>
                <Link className="button" to="/book/new">Add New Book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Autor:</strong>
                        <p>{book.author}</p>
                        <strong>Preço:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-br').format(new Date(book.launchDate))}</p>

                        <button type="button">
                            <FiEdit size={20} color="#251FC5" />
                        </button>
                        <button type="button">
                            <FiTrash2 size={20} color="#251FC5" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}