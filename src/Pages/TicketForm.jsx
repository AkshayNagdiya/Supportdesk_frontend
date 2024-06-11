import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ticketcreate } from '../Features/Tickets/TicketSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateTicketForm = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const {users} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    product: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      name : users.username,
      userId : users._id
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch((Ticketcreate(formData)))
    setFormData({
      title: '',
      description: '',
      product: ''
    });
    Navigate("/tickets")
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 md:text-center my-8">Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
            maxLength={20}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded"
            required
            maxLength={150}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="product" className="block text-gray-700">Product</label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select a product</option>
            <option value="iphone">iphone</option>
            <option value="iPad">iPad</option>
            <option value="iWatch">iWatch</option>
            <option value="Macbook">Macbook</option>
            <option value="iPod">iPod</option>

          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicketForm;
