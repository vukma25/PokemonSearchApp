const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const Weight = document.getElementById("weight");
const Height = document.getElementById("height");
const alertPokemon = document.getElementById("my-pokemon");
const listTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const refresh = () => {
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    Weight.textContent = '';
    Height.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    alertPokemon.innerHTML = ``
    listTypes.innerHTML = '';
    return;
}

const searchPokemon = async () => {
    const nameOrId = searchInput.value.toLowerCase();
    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
        const data = await res.json();
        console.log(data);
        const { name, id, height, weight, sprites, stats, types } = data;

        pokemonName.textContent = `${name}`;
        pokemonId.textContent = `#${id}`;
        Weight.textContent = `Weight: ${weight}`;
        Height.textContent = `Height: ${height}`;
        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defense.textContent = stats[2].base_stat;
        specialAttack.textContent = stats[3].base_stat;
        specialDefense.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;
        alertPokemon.innerHTML = `
            <img src="${sprites.front_default}" alt="${name}"class="pic"/>
        `
        listTypes.innerHTML = types.map(el => {
            return `<div class="type ${el.type.name}">${el.type.name}</div>`
        }).join('');
    }
    catch (err) {
        alert("Not found pokemon!");
        console.log("There has been a problem with your fetch operation:", err);
        refresh();
    }
}

searchButton.addEventListener('click', searchPokemon);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});