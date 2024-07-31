

const apiKey = 'BzpecI6yjpooMxc5-g-lSnHzCVzTRJLHz25U1N1a-OgBnuxWJ-cJdpxFfKa24Ytm' // Replace with your Genius API key

try {
    // Step 1: Search for the track
    const searchResponse = await fetch(`https://api.genius.com/search?q=${encodeURIComponent('not like us')} ${encodeURIComponent('kendrik lamar')}&access_token=${apiKey}`);
    const searchData = await searchResponse.json();

    // Check if we have any results
    if (searchData.response.hits.length === 0) {
        throw new Error('No results found');
    }

    // Get the first song result
    const song = searchData.response.hits[0].result;

    // Step 2: Get the song URL
    const songUrl = song.url;

    // Fetch the lyrics page
    const lyricsResponse = await fetch(songUrl);
    const lyricsHtml = await lyricsResponse.text();

    // Parse the lyrics from the HTML (Note: This requires parsing HTML; a library like Cheerio for Node.js or regex in the browser could be used)
    const parser = new DOMParser();
    const doc = parser.parseFromString(lyricsHtml, 'text/html');
    const lyricsElement = doc.querySelector('.lyrics');

    if (lyricsElement) {
        console.log(lyricsElement)
        /*   document.getElementById('lyrics').textContent = lyricsElement.innerText; */
    } else {
        throw new Error('Lyrics not found on Genius page');
    }

} catch (error) {
    console.error('Error fetching lyrics:', error);
    document.getElementById('lyrics').textContent = 'Error fetching lyrics. Please try again.';
}