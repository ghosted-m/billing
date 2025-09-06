import axios from 'axios';

const rcvData = async () => {
  try {
    const response = await axios.get('/data.json'); // NOT './data.json'
    return response.data;
  } catch (err) {
    console.log('Failed to fetch GST data.');
    console.error(err);
    throw err;
  }
};

export { rcvData };
