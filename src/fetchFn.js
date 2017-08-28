function fetchTopScores() {
    return fetch('/api/topScores')
    .then(res => {
        if(!res.ok){
            return Promise.reject(res.statusText);
        }
        return res.json();
    });
}