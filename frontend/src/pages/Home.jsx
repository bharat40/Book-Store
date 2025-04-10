import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);
    const fetchAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/books');
            setBooks(response.data);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    useEffect(() => {
        fetchAllBooks();
    }, []);
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete('http://localhost:8000/books/' + id);
            alert(response.data);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    return (
        <section className='p-3 flex flex-col items-center'>
            <h1 className='text-center underline text-2xl text-orange-400' >Book Store</h1>
            {
                books.length === 0 ? (
                    <span>Loading...</span>
                ) : (
                    <div className='flex flex-wrap gap-3 justify-center mt-5'>
                        {
                            books.map((book) => {
                                return (
                                    <div key={book.id} className='flex flex-col gap-1 w-[200px]'>
                                        <img src={book.coverImg} alt={book.title} className='w-[200px] h-[300px] bg-gray-200' />
                                        <h1 className='font-bold'>{book.title}</h1>
                                        <p className='w-[200px] overflow-hidden'>{book.content}</p>
                                        <span className='mr-1'>₹<span className='line-through'>{book.MRP}</span></span><span>₹{book.price}</span>
                                        <div className='flex gap-2'>
                                            <button className='border border-gray-400 px-1 text-purple-400'><Link to={`/update/${book.id}`}>Edit✏️</Link></button><button className='px-1 border border-gray-400 text-red-400' onClick={() => handleDelete(book.id)}>Delete🗑️</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            <div className='w-full flex justify-center mt-5'>
                <Link to='/add'><button className='text-orange-400 border border-gray-400 px-1'>Add new book</button></Link>
            </div>

        </section>
    )
}

export default Home
