async function buscarPokemon() {
    const pokemonId = document.getElementById('pokemonId').value;
  
    const pokemonInfo = document.getElementById('pokemonInfo');
    const pokemonImageFront = document.getElementById('pokemonImageFront');
    const pokemonImageBack = document.getElementById('pokemonImageBack');
    const pokemonName = document.getElementById('pokemonName');
    const pokemonType = document.getElementById('pokemonType');
  
    if (!pokemonId) {
      alert('Por favor, insira um ID de Pokémon!');
      return;
    }
  
    if (pokemonId < 1 || pokemonId > 151) {
      alert('O ID deve estar entre 1 e 151.');
      return;
    }
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) throw new Error('Pokémon não encontrado');
  
      const data = await response.json();
  
      // Atualiza as imagens frontal e traseira
      pokemonImageFront.src = data.sprites.front_default || 'https://via.placeholder.com/128';
      pokemonImageBack.src = data.sprites.back_default || 'https://via.placeholder.com/128';
  
      pokemonName.textContent = `Nome: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
      pokemonType.textContent = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
  
      pokemonInfo.style.display = 'flex';
  
    } catch (error) {
      alert('Erro ao buscar o Pokémon. Tente novamente.');
      pokemonInfo.style.display = 'none';
    }
  }  