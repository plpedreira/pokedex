async function buscarPokemon() {
    const pokemonId = document.getElementById('pokemonId').value;
    const pokemonInfo = document.getElementById('pokemonInfo');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonName = document.getElementById('pokemonName');
    const pokemonType = document.getElementById('pokemonType');

    if (!pokemonId) {
        alert('Por favor, insira um ID de Pokémon!');
        return;
    }

    // Limite máximo de Pokémon
    if (pokemonId < 1 || pokemonId > 151) {
        alert('O ID deve estar entre 1 e 151.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');

        const data = await response.json();

        // Atualizar os dados
        pokemonImage.src = data.sprites.front_default;
        pokemonName.textContent = `Nome: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
        pokemonType.textContent = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

        pokemonInfo.style.display = 'flex';

    } catch (error) {
        alert('Erro ao buscar o Pokémon. Tente novamente.');
        pokemonInfo.style.display = 'none';
    }
}