const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');
const playerDiv = document.getElementById('player');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => displayResults(data.items))
      .catch(err => {
        console.error(err);
        resultsDiv.innerHTML = 'エラーが発生しました。';
      });
  }
});

function displayResults(videos) {
  resultsDiv.innerHTML = '';
  videos.forEach(video => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.default.url;

    const div = document.createElement('div');
    div.className = 'video-item';
    div.innerHTML = `<img src="${thumbnail}" alt="${title}" /><span>${title}</span>`;
    div.addEventListener('click', () => {
      playerDiv.innerHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    });

    resultsDiv.appendChild(div);
  });
}
