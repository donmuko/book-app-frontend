import React from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseUrl';

const UpdateBook = () => {
    const { id } = useParams();
    const { data: bookData, isLoading, isError } = useFetchBookByIdQuery(id);
    const [UpdateBook] = useUpdateBookMutation();
    const { register, handleSubmit, setValue, reset } = useForm();
    useEffect(() => {
      if (bookData) {
        const fields = ['title', 'description', 'category', 'trending', 'oldPrice', 'newPrice', 'coverImage'];
        fields.forEach(field => setValue(field, bookData[field]));
      } 
    }, [bookData, setValue]);

    const onSubmit = async(data) => {
      const updatedBook = {
        title: data.title,
        description: data.description,
        category: data.category,
        trending: data.trending,
        oldPrice: data.oldPrice,
        newPrice: data.newPrice,
        coverImage: data.coverImage || bookData.coverImage,
      };
      try {
        await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updatedBook, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        Swal.fire({
            icon: 'success',
            title: 'Book Updated',
            text: 'Your book is updated successfully!',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to Update Book',
            text: error.message || 'An error occurred while updating the book.'
        });
    }
    };

    if (isLoading) {
      return <Loading/>;
    }
    if (isError) {
      return <div>Error loading book data.</div>;
    } 
 
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Select category" },
            { value: "fiction", label: "Fiction" },
            { value: "non-fiction", label: "Non-Fiction" },
            { value: "science", label: "Science" },
            { value: "history", label: "History" },
            { value: "biography", label: "Biography" },
            { value: "fantasy", label: "Fantasy" },
            { value: "self-help", label: "Self-Help" },
            { value: "horror", label: "Horror" },
            { value: "technology", label: "Technology" },
            { value: "business", label: "Business" },
            { value: "art", label: "Art" },
            { value: "children", label: "Children" },
            { value: "romance", label: "Romance" },
            { value: "mystery", label: "Mystery" },
            { value: "thriller", label: "Thriller" },
            { value: "comics", label: "Comics" },
            { value: "poetry", label: "Poetry" },
            { value: "adventure", label: "Adventure" },
            { value: "health", label: "Health" },
            { value: "travel", label: "Travel" },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook