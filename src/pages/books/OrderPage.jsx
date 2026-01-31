import React from 'react'
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../../context/AuthContext';

const OrderPage = () => {
    const {currentUser} = useAuth();
    const { data: orders=[], isLoading, isError } = useGetOrdersByEmailQuery(currentUser.email);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading orders.</div>;
    }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4"> Orders</h2>
      {orders.length === 0 ? (<div>No orders found!</div>) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="border-b pb-4 mb-4 rounded">
              <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
              <h2 className='font-bold'>OrderId: {order?._id}</h2>
              <p className='text-gray-600'>Status: {order?.status}</p>
              <p className='text-gray-600'>Name: {order?.name}</p>
              <p className='text-gray-600'>Email: {order?.email}</p>
              <p className='text-gray-600'>Phone: {order?.phone}</p>
              <p className='text-gray-600'>Total Price: ${order?.totalPrice}</p>
              <h3 className='font-semibold mt-2'>Address:</h3>
              <p> {order?.address?.city}, {order?.address?.country}, {order?.address?.state}, {order?.address?.zipcode}</p>
              <h3 className='font-semibold mt-2'>Products Id:</h3>
              <ul>
                  {order?.productIds?.map((productId) => (<li key={productId}>{productId}</li>))}
              </ul>
              <p className='text-gray-600'>Ordered At: {new Date(order?.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage