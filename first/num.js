import React, { useEffect, useState } from 'react';

const NumberSortingComponent = () => {
  const [sortedNumbers, setSortedNumbers] = useState([]);

  useEffect(() => {
    const urls = ['http://104.211.219.98/numbers/primes', 'http://104.211.219.98/numbers/fibo', 'http://104.211.219.98/numbers/odd', 'http://104.211.219.98/numbers/rand'];

    const fetchNumbers = async () => {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        const numbers = data.reduce((result, current) => result.concat(current), []);
        const sortedUniqueNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);
        setSortedNumbers(sortedUniqueNumbers);
      } catch (error) {
    //  console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <h2>Sorted and Deduplicated Numbers:</h2>
      <ul>
        {sortedNumbers.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberSortingComponent;