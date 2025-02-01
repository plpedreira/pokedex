async function buscarPokemon() {
    const id = document.getElementById('pokemonId').value;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resposta = await fetch(url);
    if (!resposta.ok) {
        alert('Pokémon não encontrado!');
        return;
    }
    const dados = await resposta.json();
    document.getElementById('nome').innerText = dados.name.toUpperCase();
    document.getElementById('imagem').src = dados.sprites.front_default;
    document.getElementById('miniatura-front').src = dados.sprites.front_default;
    document.getElementById('miniatura-back').src = dados.sprites.back_default;
    const tipo = dados.types[0].type.name;
    document.getElementById('tipo').innerText = "Tipo: " + tipo;
    document.getElementById('tipo').style.backgroundColor = getColorByType(tipo);
    carregarIcons(dados);
}

function carregarIcons(dados) {
    const iconsDiv = document.getElementById('icons');
    iconsDiv.innerHTML = ''; // Limpa os ícones anteriores

    // Exemplo de tiers (substituir com tiers reais se necessário)
    const tiers = [
        { tier: 'LC', img: 'https://cdn.discordapp.com/attachments/1334596059703283715/1334596441318101135/image.png?ex=679f158b&is=679dc40b&hm=0f2d645f69a0db2e401a3793a56c0332be53f563918d7aaa7d42cbe37b2e1f1c&' },
        { tier: 'PU', img: 'https://url-para-imagem-pu.png' }
    ];

    tiers.forEach(t => {
        const img = document.createElement('img');
        img.src = t.img;
        img.alt = t.tier;
        iconsDiv.appendChild(img);
    });
}

function getColorByType(type) {
    const colors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
        normal: '#A8A878'
    };
    return colors[type] || '#AAA';
}