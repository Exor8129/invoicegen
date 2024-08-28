import { useState, useEffect } from 'react';
import axios from 'axios';

const usePartyName = () => {
  const [partyName, setPartyName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartyName = async () => {
      try {
        const { data } = await axios.get('/api/customers/first-party'); // Fetch the first party name
        setPartyName(data.PartyName);
      } catch (err) {
        console.error('Error fetching first party name:', err);
        setError('Failed to load party name');
      } finally {
        setLoading(false);
      }
    };

    fetchPartyName();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return { partyName, loading, error };
};

export default usePartyName;
