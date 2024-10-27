import { getPhotos } from './js/pixabay-api';
import { renderGalleryMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Создаем экземпляр SimpleLightbox для элементов галереи
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // Указываем, что подписи будут взяты из атрибута "alt" изображений
  captionDelay: 250, // Задержка перед показом подписи (в миллисекундах)
});


let searchQuery = '';
let page = 1;
const perPage = 15; // Количество изображений на одной странице


const searchForm = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

// Изначально скрываем кнопку "Load More"
loadMoreBtn.style.display = 'none';

// Добавляем обработчик событий на форму поиска, который срабатывает при отправке формы
searchForm.addEventListener('submit', async event => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  searchQuery = document.querySelector('#search-box').value.trim(); // Получаем и очищаем запрос пользователя
  page = 1; // Сбрасываем счетчик страниц

  // Проверяем, ввел ли пользователь запрос
  if (searchQuery === '') {
  
    iziToast.error({
      message: 'Please enter a search query!', 
      position: 'topRight', 
      timeout: 3000, 
    });
    return; 
  }

  // Показываем индикатор загрузки и скрываем кнопку "Load More"
  loaderElement.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  try {
    
    const data = await getPhotos(searchQuery, page, perPage);
    galleryElement.innerHTML = ''; // Очищаем галерею перед новым поиском

    // Если фотографии не найдены, выводим сообщение об ошибке
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images found. Please try again!',
        position: 'topRight',
        timeout: 3000,
      });
      return; 
    }

    // Рендерим полученные изображения в галерею
    galleryElement.innerHTML = renderGalleryMarkup(data.hits);
    lightbox.refresh(); // Обновляем SimpleLightbox для новых изображений

    // Показываем кнопку "Load More" только если количество полученных изображений равно количеству на странице
    if (data.hits.length === perPage) {
      loadMoreBtn.style.display = 'block';
    }
  } catch {
    iziToast.error({
      message: 'Sorry, something went wrong. Please try again!',
      position: 'topRight',
      timeout: 3000,
    });
  } finally {
    // Скрываем индикатор загрузки
    loaderElement.style.display = 'none';
  }
});

// Добавляем обработчик событий на кнопку "Load More", который срабатывает при нажатии на кнопку
loadMoreBtn.addEventListener('click', async () => {
  page += 1; 

  try {
    // Выполняем запрос на получение следующей страницы фотографий
    const data = await getPhotos(searchQuery, page, perPage);

    // Добавляем новые изображения в галерею
    galleryElement.insertAdjacentHTML(
      'beforeend',
      renderGalleryMarkup(data.hits)
    );
    lightbox.refresh(); // Обновляем SimpleLightbox для новых изображений

    // Если количество изображений меньше чем perPage или достигнут конец результатов, скрываем кнопку
    if (
      data.hits.length < perPage ||
      galleryElement.children.length >= data.totalHits
    ) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    }

    // Плавное прокручивание страницы вниз после загрузки новых изображений
    const { height: cardHeight } =
      galleryElement.firstElementChild.getBoundingClientRect(); // Получаем высоту первого элемента
    window.scrollBy({
      top: cardHeight * 2, // Прокручиваем на высоту двух изображений
      behavior: 'smooth', // Плавная прокрутка
    });
  } catch {
    iziToast.error({
      message: 'Sorry, something went wrong. Please try again!',
      position: 'topRight',
      timeout: 3000,
    });
  }
});
