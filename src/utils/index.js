import { galleryEl } from '../refs';
import { buttonLoadMore } from '../refs';
import Notiflix from 'notiflix';

function getGallery(markup) {
  galleryEl.style.display = 'flex';

  galleryEl.insertAdjacentHTML('beforeend', markup);
}
function resetGallery() {
  galleryEl.innerHTML = '';
}

function buttonIsHidden(bolean) {
  if (bolean) {
    buttonLoadMore.classList.add('isHidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function getCheck(value) {
  if (!value) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return false;
  }
  return true;
}
export { getGallery, resetGallery, buttonIsHidden, getCheck };
