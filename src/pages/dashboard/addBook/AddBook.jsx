import React from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';



const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFileName, setImageFileName] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [addBook, {isError }] = useAddBookMutation(); 

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFileName(e.target.files[0].name);
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async(data) => {
    setIsLoading(true);
    // Handle form submission logic here    
    const newBookData = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Book added successfully!',
      });
      //
      reset();
      setImageFileName("");
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Failed to add book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Book Addition Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Book Title"
          name="title"
          register={register}
          required
          errors={errors}
          placeholder="Enter book title"
        />
        {/* Reusable Text Area for Description */}
        <InputField
          label="Description"
          name="description"
          register={register}
          required
          errors={errors}
          placeholder="Enter book description"
          type="textarea"
        />
        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          register={register}
          required
          errors={errors}
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
            // Add more categories as needed
          ]}
          
        />
        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="trending"
              className="form-checkbox text-blue-600 rounded focus:ring focus:ring-offset-2 focus:ring-blue-500"              {...register("trending")}
              {...register("trending")}
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Mark as Trending</span>
          </label>
        </div>

        {/* Old Price Input */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          register={register}
          required
          errors={errors}
          placeholder="Enter old price"
        />

        {/* New Price Input */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          register={register}
          required
          errors={errors}
          placeholder="Enter new price"
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          {
            isLoading ? <span className="">Adding...</span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook