async function findPokemon(event) {
    event.preventDefault();
    console.log('finding pokemon by id');
    const id = document.getElementById('poke-number').value;

    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const body = await resp.json();

    const {name, sprites} = body;
    console.log(body);

    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = '';
    for(let sprite in sprites) {
        if(sprites[sprite]) {
            const img = document.createElement('img');
            img.src = sprites[sprite];
            spriteContainer.appendChild(img);
        }
    }

    document.getElementById('poke-name').innerText = 'Name: ' + name;
}
console.log('loaded');