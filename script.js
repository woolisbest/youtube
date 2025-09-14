const apiKey = 'YOUR_API_KEY_HERE'; // ここに自分のAPIキーを入力してください。
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');
const playerDiv = document.getElementById('player');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    searchYouTube(query);
  }
});

function searchYouTube(query) {
  resultsDiv.innerHTML = '検索中...';
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data.items);
    })
    .catch(error => {
      console.error('エラー:', error);
      resultsDiv.innerHTML = 'エラーが発生しました。';
    });
}

function displayResults(videos) {
  resultsDiv.innerHTML = '';
  videos.forEach(video => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.default.url;

    const div = document.createElement('div');
    div.className = 'video-item';
    div.innerHTML = `
      <img src="${thumbnail}" alt="${title}" />
      <span>${title}</span>
    `;
    div.addEventListener('click', () => {
      playVideo(videoId);
    });

    resultsDiv.appendChild(div);
  });
}

function playVideo(videoId) {
  playerDiv.innerHTML = `
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
  `;
}
