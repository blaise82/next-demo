import React from 'react';
import { useRouter } from 'next/router';
import { ADD_COUNTRY } from '../../graphql/queries';
import { useMutation } from '@apollo/client';

export default function index() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [year, setYear] = React.useState('');
  const [area, setArea] = React.useState('');
  const [population, setPopulation] = React.useState('');
  const [error, setError] = React.useState('');
  
  // getNetworkErrors as one string to show in the error message
  const getNetworkErrors = (errors) => {
    let networkErrors = '';
    errors.map((error) => {
      networkErrors += error.message + ' ';
    });
    return networkErrors;
  };

  const [addCountry] = useMutation(ADD_COUNTRY, {
    onCompleted: () => {
      router.push('/');
    },
    onError: async (error) => {
      if (error.networkError) {
        const err =
          getNetworkErrors(error.networkError.result.errors) ||
          'Something went wrong!';
        setError(err);
      } else {
        console.log(error.message);
        setError(error.message);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if none of the attribute is empty (we can have other validations)
    if (name && year && area && population) {
      await addCountry({
        variables: {
          name: name,
          year: parseInt(year),
          area: parseInt(area),
          population: parseInt(population),
        },
      });
    }
    // show error
    else {
      setError('Please fill all the fields');
    }
    // router.push('/');
  };

  return (
    <div>
      <section className='bg-gray-100 dark:bg-gray-900'>
        <div className='flex justify-center min-h-screen'>
          <div className='flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5'>
            <div className='w-full'>
              <h1 className='text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white'>
                Add New Country
              </h1>

              <p className='mt-4 text-gray-500 dark:text-gray-400'>
                Next.js is an open-source web development framework created by
                Vercel enabling React-based web applications with server-side
                rendering and generating static websites.
              </p>

              <div className='mt-3 md:flex md:items-center md:-mx-2'>
                <button
                  onClick={() => router.push('/')}
                  className='flex justify-center w-full px-7 py-2 text-white bg-black rounded-md md:w-auto md:mx-2 focus:outline-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>

                  <span className='mx-2'>Home</span>
                </button>
              </div>
              {error ? (
                <div
                  class='flex p-4 mb-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
                  role='alert'
                >
                  <svg
                    aria-hidden='true'
                    class='flex-shrink-0 inline w-5 h-5 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span class='sr-only'>Info</span>
                  <div>
                    <span class='font-medium'>{error}</span>
                  </div>
                </div>
              ) : null}

              <form className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
                <div>
                  <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                    Country
                  </label>
                  <input
                    type='text'
                    placeholder='Country'
                    className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                    Year
                  </label>
                  <select
                    id='countries'
                    className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    onChange={(e) => setYear(e.target.value)}
                    defaultValue='selected'
                  >
                    <option value='selected'>Choose a Year</option>
                    <option value='1819'>1819</option>
                    <option value='1999'>1999</option>
                    <option value='2000'>2000</option>
                    <option value='2001'>2001</option>
                    <option value='2002'>2002</option>
                    <option value='2003'>2003</option>
                  </select>
                </div>

                <div>
                  <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                    Area (square kilometres)
                  </label>
                  <input
                    type='number'
                    placeholder='287xxx'
                    className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>

                <div>
                  <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                    Total population
                  </label>
                  <input
                    type='number'
                    placeholder='3401xxx'
                    className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    onChange={(e) => setPopulation(e.target.value)}
                  />
                </div>

                <button
                  onClick={(e) => handleSubmit(e)}
                  className='flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md hover:bg-black-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                >
                  <span>Update Country </span>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 rtl:-scale-x-100'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
