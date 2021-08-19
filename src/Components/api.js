const API_KEY = '9062055-da883187fb30391728e11f5fd';

export const fetchImages = function (page, val) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${val}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        new Error('Some server issue seems to have occured. Please try again'),
      );
    }
  });
};
