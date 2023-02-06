function getmarkup(photos) {
  const markup = photos.hits
    .map(e => {
      return `
            <div class="photo-card" >
            <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" style="width=100px"/></a>
        <div class="info">
          <p class="info-item">
            <b>Likes <span>${e.likes}</span></b>
          </p>
          <p class="info-item">
            <b>Views <span>${e.views}</span></b>
          </p>
          <p class="info-item">
            <b>Comments <span>${e.comments}</span></b>
          </p>
          <p class="info-item">
            <b>Downloads <span>${e.downloads}</span></b>
          </p>
        </div>
      </div>
       `;
    })
    .join('');
  return markup;
}

export { getmarkup };
