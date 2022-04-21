document.querySelector('.busca').addEventListener('submit', async (event)=>{
    //prevenindo o comportamento padrão do formulario
    event.preventDefault();

    //pegando o que foi digitado
    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        //adicionando a API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=937365ebc61e8908c148dd98bbd87e4b&units=metric&lang=pt_br`;
        //fazendo a requisição da url
        let results = await fetch(url);
        //transformando os resultados em objetos do js
        let json = await results.json();

        if(json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Localização não encontrada');
        }
    } else {
        clearInfo();
    }
    
});

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

//função para preencher as informações dos resultados encontrados
function showInfo() {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup:>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;


    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}d@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
    
}
//função para limpar a tela
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}