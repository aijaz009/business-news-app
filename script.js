$(document).ready(function() {
    const apiKey = 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO';
    const apiUrl = 'https://google-news13.p.rapidapi.com/business?lr=en-US';
    let page = 1;

    function fetchNews(query = '') {
        const settings = {
            async: true,
            crossDomain: true,
            url: `${apiUrl}&page=${page}${query ? `&q=${query}` : ''}`,
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'google-news13.p.rapidapi.com'
            }
        };

        $.ajax(settings).done(function(response) {
            if (response.articles && response.articles.length > 0) {
                displayNews(response.articles);
            } else {
                $('#news-container').append('<p>No articles found.</p>');
            }
        }).fail(function(xhr, status, error) {
            console.error('Error fetching news:', error);
            alert('Failed to fetch news articles. Please try again later.');
        });
    }

    function displayNews(articles) {
        articles.forEach(article => {
            const newsItem = `
                <div class="news-item">
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
            $('#news-container').append(newsItem);
        });
    }

    $('#search-btn').on('click', function() {
        const query = $('#search-input').val();
        $('#news-container').empty();
        page = 1;
        fetchNews(query);
    });

    $('#load-more').on('click', function() {
        page++;
        fetchNews();
    });

    // Initial fetch
    fetchNews();
});
