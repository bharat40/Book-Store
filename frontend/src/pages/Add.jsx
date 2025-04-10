import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mrp, setMrp] = useState('');
    const [price, setPrice] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            content,
            coverImg,
            price,
            mrp
        }
        try {
            const response = await axios.post('http://localhost:8000/books', formData);
            alert(response.data);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    return (
        <div>
            <h1 className='text-orange-500 text-2xl text-center'>Add new book</h1>
            <form onSubmit={handleSubmit} className='w-full display flex flex-col gap-2 items-center mt-5'>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='border p-1' />
                <input type="text" name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' className='border p-1' />
                <input type="number" name="MRP" id="MRP" value={mrp} onChange={(e) => setMrp(e.target.value)} placeholder='MRP' className='border p-1' />
                <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Selling Price' className='border p-1' />
                <input type="text" name="coverImg" id="coverImd" value={coverImg} onChange={(e) => setCoverImg(e.target.value)} placeholder='cover image link' className='border p-1' />
                <button type='submit' className='p-1 bg-orange-400 text-white'>Add book</button>
            </form>

            <div className='flex justify-center'>
                <small className='text-red-400'>*You cannot change MRP later.</small>
            </div>
        </div>
    )
}

export default Add
