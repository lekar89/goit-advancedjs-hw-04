import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46506725-7d59e0c0fb37faa107be781d3';

async function getPhotos(query, page, perPage) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
      },
    });

    // Проверяем статус ответа
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    // Возвращаем массив изображений
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export { getPhotos };
