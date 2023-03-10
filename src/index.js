import { formEl, buttonLoadMore } from './refs';
import { getPhotos, resetPages, resetCounter, getCounter } from './api';
import { getmarkup } from './markup';
import { getGallery, resetGallery, buttonIsHidden, getCheck } from './utils';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
import Notiflix from 'notiflix';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
let search = '';
formEl.addEventListener('submit', async e => {
  e.preventDefault();
  // buttonLoadMore.classList.add('isHidden');
  search = formEl.searchQuery.value;
  resetPages();
  resetCounter();
  resetGallery();

  try {
    let photos = await getPhotos(search);
    const total = photos.photos.totalHits;
    if (!total) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (total < 40) {
      buttonLoadMore.classList.add('isHidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else if (total > 40) {
      buttonLoadMore.classList.remove('isHidden');
    }
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);

    getCounter(photos.page, total);
    let markup = getmarkup(photos.photos);
    getGallery(markup);
    lightbox.refresh();

    
  } catch (error) {
    console.log(error.message);
  }
 
});

buttonLoadMore.addEventListener('click', async () => {
  try {
    let photos = await getPhotos(search);
    let photoIsFinished = getCounter(photos.page, photos.photos.totalHits);
    buttonIsHidden(photoIsFinished);
    let markup = getmarkup(photos.photos);
    getGallery(markup);

    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
});
