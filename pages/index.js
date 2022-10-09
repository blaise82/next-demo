import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COUNTRIES, DELETE_COUNTRY } from '../graphql/queries';

export default function index() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    fetchPolicy: 'network-only',
  });
  const [deleteCountry] = useMutation(DELETE_COUNTRY, {
    onCompleted: () => {
      alert('Country deleted successfully');
      // reload page
      router.reload();
    },
  });

  const onDelete = async (id) => {
    await deleteCountry({
      variables: {
        id: id,
      },
    });
  };

  const handleNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden'>
          <div className='w-full lg:w-5/6'>
            <button
              onClick={() => router.push('/add-country')}
              type='button'
              className='flex break-inside bg-black rounded-3xl px-8 py-4 mb-4 w-full dark:bg-slate-800 dark:text-white'
            >
              <div className='flex items-center justify-between flex-1'>
                <span className='text-lg font-medium text-white'>
                  Add New Country
                </span>
                <svg
                  width='17'
                  height='17'
                  viewBox='0 0 17 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z'
                    fill='white'
                  />
                </svg>
              </div>
            </button>
            <div className='bg-white shadow-md rounded my-6'>
              <table className='min-w-max w-full table-auto'>
                <thead>
                  <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>Name</th>
                    <th className='py-3 px-6 text-left'>Year</th>
                    <th className='py-3 px-6 text-center'>
                      Area (square kilometres)
                    </th>
                    <th className='py-3 px-6 text-center'>Total population</th>
                    <th className='py-3 px-6 text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {loading ? (
                    <tr>
                      <td className='py-3 px-6 text-left whitespace-nowrap'>
                        <div className='flex items-center'>
                          <span className='font-medium'>Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : data.countries.length > 0 ? 
                    data.countries.map((country) => (
                      <tr
                        className='border-b border-gray-200 hover:bg-gray-100'
                        key={country.id}
                      >
                        <td className='py-3 px-6 text-left whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='mr-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-flag-fill'
                                viewBox='0 0 16 16'
                              >
                                <path d='M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001' />
                              </svg>
                            </div>
                            <span className='font-medium'>{country.name}</span>
                          </div>
                        </td>
                        <td className='py-3 px-6 text-left'>
                          <div className='flex items-center'>
                            <span>{country.year}</span>
                          </div>
                        </td>
                        <td className='py-3 px-6 text-left'>
                          <div className='text-center'>
                            <span>{handleNumbers(country.area)}</span>
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='text-center'>
                            <span>{handleNumbers(country.population)}</span>
                          </div>
                        </td>

                        <td className='py-3 px-6 text-center'>
                          <div className='flex item-center justify-center'>
                            <div
                              onClick={() =>
                                router.push({
                                  pathname: `/edit-country`,
                                  query: {
                                    ...country,
                                  },
                                })
                              }
                              className='w-4 mr-2 transform hover:text-gray-500 hover:scale-110 cursor-pointer'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                                />
                              </svg>
                            </div>
                            <div
                              onClick={() => onDelete(country.id)}
                              className='w-4 mr-2 transform hover:text-gray-500 hover:scale-110 cursor-pointer'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : (
                    <tr>
                      <td className='py-3 px-6 text-left whitespace-nowrap'>
                        <div className='flex items-center'>
                          <span className='font-medium'>No data</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
