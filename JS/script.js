document.addEventListener("DOMContentLoaded", () => {
  const sprite = document.getElementById("pokemonSprite");
  sprite.src = "img/sprite.png"; // Troque pelo seu sprite personalizado
});

document.getElementById('pokemonId').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    buscarPokemon();
  }
});

async function buscarPokemon() {
  const pokemonId = document.getElementById('pokemonId').value;
  const pokemonInfo = document.getElementById('pokemonInfo');
  const pokemonImageFront = document.getElementById('pokemonImageFront');
  const pokemonImageBack = document.getElementById('pokemonImageBack');
  const pokemonName = document.getElementById('pokemonName');
  const pokemonType = document.getElementById('pokemonType');

  if (!pokemonId || pokemonId < 1 || pokemonId > 151) {
    alert('O ID deve estar entre 1 e 151.');
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) throw new Error();

    const data = await response.json();

    pokemonImageFront.src = `img/${pokemonId}.png`;
    pokemonImageBack.src = `img/${pokemonId}_back.png`;

    pokemonImageFront.onerror = () => pokemonImageFront.src = data.sprites.front_default || 'https://via.placeholder.com/96';
    pokemonImageBack.onerror = () => pokemonImageBack.src = data.sprites.back_default || 'https://via.placeholder.com/96';

    pokemonName.innerHTML = `Nome: <strong>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</strong>`;
    pokemonType.innerHTML = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

    pokemonInfo.style.display = 'flex';
  } catch {
    alert('Erro ao buscar o Pokémon. Tente novamente.');
    pokemonInfo.style.display = 'none';
  }
}
