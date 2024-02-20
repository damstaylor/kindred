import axios from '@/services/axios';

export default async function fetchJsonData(url) {
  try {
    const result = await axios.get(url)
    return result.data
  } catch(err) {
    console.error(err) // eslint-disable-line
  }
}
