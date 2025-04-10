import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const params = useParams();
    const bookID = params.id;
    const [book, setBook] = useState({
        title: '',
        content: '',
        price: '',
        coverImg: ''
    });
    const fetchBookById = async () => {
        try {
            const response = await axios.get('http://localhost:8000/books/' + bookID);
            setBook({
                title: response.data[0].title,
                content: response.data[0].content,
                price: response.data[0].price,
                coverImg: response.data[0].coverImg
            });
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    useEffect(() => {
        fetchBookById();
    }, [bookID]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/books/' + bookID, book)
            alert(response.data);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <section>
            <h1 className='text-2xl font-bold text-orange-400 text-center mb-3'>Update book</h1>
            {
                !book ? (<span>Loading...</span>) : (
                    <div className='w-full display flex flex-col items-center mt-5'>
                        <form onSubmit={handleSubmit} className='flex flex-col p-3 gap-2 w-[700px]'>
                            <input type="text" name="title" id="title" value={book.title} onChange={handleChange} placeholder='Title' className='border p-1' />
                            <input type="text" name="content" id="content" value={book.content} onChange={handleChange} placeholder='Content' className='border p-1' />
                            <input type="number" name="price" id="price" value={book.price} onChange={handleChange} placeholder='Selling Price' className='border p-1' />
                            <input type="text" name="coverImg" id="coverImd" value={book.coverImg} onChange={handleChange} placeholder='cover image link' className='border p-1' />
                            <button type='submit' className='py-1 bg-orange-400 text-white'>Update</button>
                        </form>
                    </div>

                )
            }

        </section>
    )
}

export default Update
