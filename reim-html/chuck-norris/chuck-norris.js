
async function getNewJoke(event) {

    const resp = await fetch('http://api.icndb.com/jokes/random?limitTo=[nerdy]');
    const body = await resp.json();
    const joke = body.value.joke;

    document.getElementById('joke-paragraph').innerText = joke;
}