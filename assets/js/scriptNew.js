const elements = {
    controlButtons: document.getElementById('controlButtons'),
    editTextarea: document.getElementById('editTextarea'),
    startButton: document.getElementById('startButton'),
    saveButton: document.getElementById('saveButton'),
    addButton: document.getElementById('addButton'),
    playButton: document.getElementById('playButton'),
    notesButton: document.getElementById('notesButton'),
    stopButton: document.getElementById('stopButton'),
    searchButton: document.getElementById('searchButton'),
    searchInput: document.getElementById('searchInput'),
    spinner: document.querySelector('.spinner-border'),
    searchIcon: document.getElementById('searchIcon'),
    searchResultsList: document.getElementById('searchResults'),
    savesList: document.getElementById('saves'),
    pulseRange: document.getElementById('pulseRange'),
    bpmValue: document.getElementById('bpmValue'),
    iframeCifra: document.getElementById('iframeCifra'),
    prevButton: document.getElementById('prevButton'),
    nextButton: document.getElementById('nextButton'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    searchModalLabel: document.getElementById('searchModalLabel'),
    savesSelect: document.getElementById('savesSelect'),
    editSavesSelect: document.getElementById('editSavesSelect'),
    deleteSavesSelect: document.getElementById('deleteSavesSelect'),
    tomSelect: document.getElementById('tomSelect'),
    decreaseTom: document.getElementById('decreaseTom'),
    increaseTom: document.getElementById('increaseTom')
};
let acordeGroup = null;
let parado = true;
let indiceAcorde = 0;
let tomAtual = 'C';

$('#searchModal').on('shown.bs.modal', exibirListaSaves);

elements.tomSelect.addEventListener('change', () => {
    if (elements.tomSelect.value) {
        transposeCifra(elements.iframeCifra.contentDocument.body.innerText, elements.tomSelect.value);
        tomAtual = elements.tomSelect.value;

        if (indiceAcorde > 0) {
            indiceAcorde--;
        }

        if (!parado) {
            pararAcorde();
            avancarCifra();
        }
    }
});

elements.decreaseTom.addEventListener('click', () => {
    if (elements.tomSelect.value) {
        elements.tomSelect.value = elements.tomSelect.options[elements.tomSelect.selectedIndex - 1].value;
        elements.tomSelect.dispatchEvent(new Event('change'));
    }
});

elements.increaseTom.addEventListener('click', () => {
    if (elements.tomSelect.value) {
        elements.tomSelect.value = elements.tomSelect.options[elements.tomSelect.selectedIndex + 1].value;
        elements.tomSelect.dispatchEvent(new Event('change'));
    }
});

function transposeAcorde(acorde, steps) {
    let index = tonsMaiores.indexOf(acorde);
    if (index === -1)
        return acorde;

    index = (index + steps + tonsMaiores.length) % tonsMaiores.length;

    return tonsMaiores[index];
}

function transposeCifra(texto, tom) {
    let acordes;
    if (tonsMaiores.includes(tom)) {
        acordes = tonsMaiores;
    } else if (tonsMenores.includes(tom)) {
        acordes = tonsMenores;
    }
    
    const cifras = elements.iframeCifra.contentDocument.querySelectorAll('b');

    for (let i = 0; i < cifras.length; i++) {
        const cifra = cifras[i];
        let acorde = cifra.innerText;
        const steps = acordes.indexOf(tom) - acordes.indexOf(tomAtual);

        while (!tonsMaiores.includes(acorde) && acorde) {
            acorde = acorde.slice(0, -1);
        }

        const newAcorde = transposeAcorde(acorde, acordes.indexOf(tom) - acordes.indexOf(tomAtual));
        cifra.innerText = cifra.innerText.replace(acorde, newAcorde);
    }
}

elements.savesSelect.addEventListener('change', () => {
    const selectItem = elements.savesSelect.value;
    const saves = JSON.parse(localStorage.getItem('saves'));
    elements.editTextarea.value = saves[selectItem];
    elements.searchModalLabel.textContent = selectItem;
    elements.savesSelect.style.color = 'black';

    elements.searchInput.value = '';
    elements.searchResultsList.classList.add('d-none');
    elements.editTextarea.classList.remove('d-none');
    elements.startButton.classList.remove('d-none');
    elements.addButton.classList.remove('d-none');
    elements.saveButton.classList.remove('d-none');
})

elements.editSavesSelect.addEventListener('click', () => {
    const saveName = elements.savesSelect.value;
    if (saveName !== 'all') {
        editarSave(saveName);
        exibirListaSaves();
    }
});

elements.deleteSavesSelect.addEventListener('click', () => {
    const saveName = elements.savesSelect.value;
    if (saveName !== 'all') {
        if (confirm(`Deseja excluir ${saveName}?`)) {
            deletarSave(saveName);
            exibirListaSaves();
        }
        fullScreen();
    }
});

elements.searchButton.addEventListener('click', () => {
    if (elements.searchInput.value) {
        elements.savesSelect.selectedIndex = 0;
        elements.savesSelect.style.color = '';
        elements.searchModalLabel.textContent = 'Cifras';
        searchMusic();
    }
});

elements.notesButton.addEventListener('click', function () {
    if (indiceAcorde > 0) {
        indiceAcorde--;
    }

    if (!parado) {
        pararAcorde();
        avancarCifra();
    }
});

elements.stopButton.addEventListener('mousedown', function () {
    pararAcorde();
    const frameContent = elements.iframeCifra.contentDocument;
    const cifraElems = frameContent.getElementsByClassName('cifraSelecionada');

    Array.from(cifraElems).forEach(elemento => {
        elemento.classList.remove('cifraSelecionada');
    });

    if (indiceAcorde > 0) {
        indiceAcorde--;
    }
});

document.addEventListener('mousedown', fullScreen);

document.addEventListener('click', (event) => {
    if (!elements.addButton.contains(event.target) &&
        !elements.deleteSavesSelect.contains(event.target) &&
        !elements.editSavesSelect.contains(event.target) &&
        !elements.savesSelect.contains(event.target)
    ) {
        hideEditDeleteButtons();
    }
});

elements.playButton.addEventListener('mousedown', function () {
    avancarCifra();
});

function hideEditDeleteButtons() {
    elements.deleteSavesSelect.classList.add('d-none');
    elements.editSavesSelect.classList.add('d-none');
    elements.addButton.classList.remove('rounded-0');
    elements.addButton.classList.add('rounded-right-custom');
}

function toggleEditDeleteButtons() {
    elements.deleteSavesSelect.classList.toggle('d-none');
    elements.editSavesSelect.classList.toggle('d-none');
    elements.addButton.classList.toggle('rounded-0');
    elements.addButton.classList.toggle('rounded-right-custom');
}

elements.addButton.addEventListener('click', function () {
    toggleEditDeleteButtons();

    // Important: Reset the form fields *only* if the buttons are hidden
    if (elements.deleteSavesSelect.classList.contains('d-none')) {
        const saveContent = elements.editTextarea.value;

        const saveName = prompt("Digite o nome para salvar:");
        if (saveName) {
            salvarSaves(saveName, saveContent);
        }

        fullScreen();
    }
});

elements.saveButton.addEventListener('click', function () {
    const saveContent = elements.editTextarea.value;

    if (saveContent) {
        let saveName = elements.searchModalLabel.textContent;
        if (saveName === 'Cifras' || !confirm(`Deseja salvar ${saveName}?`))
            saveName = prompt("Digite o nome para salvar:");

        if (saveName) {
            salvarSaves(saveName, saveContent);
        }

        fullScreen();
    } else {
        elements.editTextarea.focus();
    }
});

elements.darkModeToggle.addEventListener('change', toggleDarkMode);

elements.startButton.addEventListener('click', () => {
    if (elements.editTextarea.value) {
        const tom = descobrirTom(elements.editTextarea.value);
        mostrarTextoCifrasCarregado(tom, elements.editTextarea.value);
        const texto = elements.editTextarea.value;
        elements.iframeCifra.contentDocument.body.innerHTML = destacarCifras(texto);
        addEventCifrasIframe(elements.iframeCifra);
        
        indiceAcorde = 0;
        $('#searchModal').modal('hide');
    }
    else {
        elements.searchInput.focus();
    }
});

elements.prevButton.addEventListener('click', () => {
    if (elements.controlButtons.classList.contains('justify-content-center')) {
        elements.controlButtons.classList.remove('justify-content-center');
        elements.controlButtons.classList.add('justify-content-left');
    }
    else if (elements.controlButtons.classList.contains('justify-content-end')) {
        elements.controlButtons.classList.remove('justify-content-end');
        elements.controlButtons.classList.add('justify-content-center');
    }
});

elements.nextButton.addEventListener('click', () => {
    if (elements.controlButtons.classList.contains('justify-content-center')) {
        elements.controlButtons.classList.remove('justify-content-center');
        elements.controlButtons.classList.add('justify-content-end');
    }
    else if (elements.controlButtons.classList.contains('justify-content-left')) {
        elements.controlButtons.classList.remove('justify-content-left');
        elements.controlButtons.classList.add('justify-content-center');
    }
});

function salvarSaves(saveName, saveContent) {
    let saves = localStorage.getItem('saves');
    if (saves) {
        saves = JSON.parse(saves);

        if (saves.hasOwnProperty(saveName) && elements.searchModalLabel.textContent !== saveName) {
            alert("Já existe esse nome!");
            return;
        }
    } else {
        saves = {};
    }

    saveContent = saveContent.replace(/<style[\s\S]*?<\/style>|<\/?[^>]+(>|$)/g, "");
    saves[saveName] = saveContent;
    localStorage.setItem('saves', JSON.stringify(saves));

    exibirListaSaves();
    elements.savesSelect.value = saveName;
    elements.searchModalLabel.textContent = saveName;
}

function preencherSelect(tom) {
    elements.tomSelect.innerHTML = '';

    if (tonsMaiores.includes(tom)) {
        tonsMaiores.forEach(tom => {
            const option = document.createElement('option');
            option.value = tom;
            option.text = tom;
            elements.tomSelect.appendChild(option);
        });
    } else if (tonsMenores.includes(tom)) {
        tonsMenores.forEach(tom => {
            const option = document.createElement('option');
            option.value = tom;
            option.text = tom;
            elements.tomSelect.appendChild(option);
        });
    }

    elements.tomSelect.value = tom;
    tomAtual = tom;
}

function descobrirTom(texto) {
    const somenteCifras = texto.match(/[A-G][#b]?m?/g);

    if (!somenteCifras) {
        return 'C';
    }

    const acordesOrdenados = [...somenteCifras].sort();

    const padroesAcordes = {
        doisMenores: false,
        doisMaiores: false
    };

    for (let i = 0; i < acordesOrdenados.length - 1; i++) {
        if (acordesOrdenados[i].endsWith('m') && acordesOrdenados[i + 1].endsWith('m')) {
            padroesAcordes.doisMenores = true;
        }
        if (!acordesOrdenados[i].endsWith('m') && !acordesOrdenados[i + 1].endsWith('m')) {
            padroesAcordes.doisMaiores = true;
        }
    }

    const possiveisTons = {};
    for (const [tom, acordes] of Object.entries(camposHarmonicos)) {
        let pontos = 0;

        if (padroesAcordes.doisMenores) {
            for (let i = 0; i < acordes.length - 1; i++) {
                if (acordes[i].endsWith('m') && acordes[i + 1].endsWith('m')) {
                    pontos += 1;
                }
            }
        }
        if (padroesAcordes.doisMaiores) {
            for (let i = 0; i < acordes.length - 1; i++) {
                if (!acordes[i].endsWith('m') && !acordes[i + 1].endsWith('m')) {
                    pontos += 1;
                }
            }
        }

        pontos += somenteCifras.filter(cifra => acordes.includes(cifra)).length;
        somenteCifras.forEach(cifra => {
            if (!acordes.includes(cifra)) {
                pontos -= 1; // Subtrai 1 ponto se o acorde não estiver no campo harmônico
            }
        });

        possiveisTons[tom] = pontos;
    }

    const primeiroAcorde = somenteCifras[0];
    const ultimoAcorde = somenteCifras[somenteCifras.length - 1];

    for (const tom in possiveisTons) {
        if (camposHarmonicos[tom][0] === primeiroAcorde) {
            possiveisTons[tom] += 1;
        }
        if (camposHarmonicos[tom][0] === ultimoAcorde) {
            possiveisTons[tom] += 1;
        }
    }

    const tomProvavel = Object.keys(possiveisTons).reduce((a, b) => possiveisTons[a] > possiveisTons[b] ? a : b);
    return tomProvavel;
}

function descobrirTomOld(texto) {
    const somenteCifras = texto.match(/[A-G][#b]?m?/g);

    if (!somenteCifras) {
        return 'C';
    }

    const possiveisTons = {};
    for (const [tom, acordes] of Object.entries(camposHarmonicos)) {
        possiveisTons[tom] = somenteCifras.filter(cifra => acordes.includes(cifra)).length;
        somenteCifras.forEach(cifra => {
            if (!acordes.includes(cifra)) {
                possiveisTons[tom] -= 1;
            }
        });
    }

    const primeiroAcorde = somenteCifras[0];
    const ultimoAcorde = somenteCifras[somenteCifras.length - 1];

    for (const tom in possiveisTons) {
        if (camposHarmonicos[tom][0] === primeiroAcorde) {
            possiveisTons[tom] += 1;
        }
        if (camposHarmonicos[tom][0] === ultimoAcorde) {
            possiveisTons[tom] += 1;
        }
    }
    
    const tomProvavel = Object.keys(possiveisTons).reduce((a, b) => possiveisTons[a] > possiveisTons[b] ? a : b);
    
    return tomProvavel;
}

function exibirListaSaves() {
    elements.addButton.classList.add('rounded-right-custom');
    elements.addButton.classList.remove('rounded-0');
    elements.deleteSavesSelect.classList.add('d-none');
    elements.editSavesSelect.classList.add('d-none');

    if (elements.searchModalLabel.textContent === 'Cifras') {
        elements.savesSelect.innerHTML = '<option selected disabled hidden value="all">Selecione uma Cifra...</option>';
        elements.savesSelect.style.color = '';

        let saves = localStorage.getItem('saves');            
        if (saves && saves !== '{}') {
            saves = JSON.parse(saves);

            for (const saveName in saves) {
                const listItem = criarItemSelect(saveName, saves[saveName]);
                elements.savesSelect.appendChild(listItem);
            }
        }
    }
}

function criarItemSelect(saveName, saveContent) {
    const option = document.createElement('option');

    option.value = saveName;
    option.textContent = saveName;

    // Important: Check if the option already exists to avoid duplicates
    const existingOption = elements.savesSelect.querySelector(`option[value="${saveName}"]`);
    if (!existingOption) {
        elements.savesSelect.appendChild(option);
    }

    // Optionally, add an event listener for the select option
    option.addEventListener('click', () => {
        //Handle what happens when the option is selected
        //You would likely want to load the saveContent into editTextarea
        //Example, but adjust this to your needs.
        elements.editTextarea.value = saveContent;
        elements.searchModalLabel.textContent = saveName; //Update modal label
    });

    return option;
}

function criarItemLista(saveName, saveContent) {
    elements.savesList.innerHTML = '';
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    listItem.textContent = saveName;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

    deleteButton.addEventListener('click', () => {
        if (confirm(`Deseja excluir ${saveName}?`)) {
            deletarSave(saveName);
            exibirListaSaves();
        }

        fullScreen();
    });

    listItem.appendChild(deleteButton);

    listItem.addEventListener('click', () => {
        desselecionarTodos();
        listItem.classList.add('selected');
        elements.editTextarea.value = saveContent;
        elements.searchModalLabel.textContent = saveName;
        elements.editTextarea.classList.remove('d-none');
        elements.savesList.classList.add('d-none');
        elements.saveButton.classList.remove('d-none');
        elements.startButton.classList.remove('d-none');
        elements.addButton.classList.remove('d-none');
    });
    return listItem;
}

function desselecionarTodos() {
    const allItems = document.querySelectorAll('.list-group-item');
    allItems.forEach(item => item.classList.remove('selected'));
}

function editarSave(saveName) {
    let optionToEdit = savesSelect.querySelector(`option[value="${saveName}"]`);

    if (optionToEdit) {
        let saves = JSON.parse(localStorage.getItem('saves')) || {};
        const newSaveName = prompt(`Digite o novo nome para "${saveName}":`, saveName);

        if (newSaveName) {
            if (saves.hasOwnProperty(newSaveName)) {
                alert("Já existe esse nome!");
                return;
            }

            const saveContent = saves[saveName];
            saves[newSaveName] = saveContent;
            delete saves[saveName];
            localStorage.setItem('saves', JSON.stringify(saves));

            optionToEdit.textContent = newSaveName;
            optionToEdit.value = newSaveName;
            elements.searchModalLabel.textContent = newSaveName;
        }

        fullScreen();
    }
}

function deletarSave(saveName) {
    let saves = JSON.parse(localStorage.getItem('saves') || '{}');
    delete saves[saveName];
    localStorage.setItem('saves', JSON.stringify(saves));
    elements.searchModalLabel.textContent = 'Cifras';
}

async function searchMusic() {
    elements.editTextarea.classList.add('d-none');
    elements.searchIcon.classList.add('d-none');
    elements.spinner.classList.remove('d-none');
    elements.savesList.classList.add('d-none');
    elements.saveButton.classList.add('d-none');
    elements.startButton.classList.add('d-none');
    elements.addButton.classList.add('d-none');
    elements.searchResultsList.classList.remove('d-none');
    elements.searchResultsList.innerHTML = '';
    elements.searchButton.disabled = true;

    const textoPesquisa = elements.searchInput.value;

    try {
        const response = await fetch('https://apinode-h4wt.onrender.com/pesquisar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: textoPesquisa }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.success) {
            const { lista: titles, links } = data; // destructuring
            if (titles.length > 0) {
                titles.forEach((title, index) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    const link = document.createElement('a');
                    link.href = '#';
                    link.onclick = () => choseLink(links[index], title);
                    link.textContent = title;
                    listItem.appendChild(link);
                    elements.searchResultsList.appendChild(listItem);
                });
            } else {
                elements.searchResultsList.innerHTML = '<li class="list-group-item">Nenhuma cifra encontrada.</li>';
            }
        } else { throw new Error(data.message); }
    } catch (error) {
        alert(`Erro na busca: ${error.message}`);
        elements.savesList.classList.remove('d-none');
        elements.searchResultsList.classList.add('d-none');
    } finally {
        elements.searchButton.disabled = false;
        elements.spinner.classList.add('d-none');
        elements.searchIcon.classList.remove('d-none');
    }
}

async function choseLink(urlLink, text) {
    elements.searchButton.disabled = true;
    elements.spinner.classList.remove('d-none');
    elements.searchIcon.classList.add('d-none');
    elements.searchResultsList.innerHTML = '';

    try {
        const response = await fetch('https://apinode-h4wt.onrender.com/downloadsite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlLink }),
        });
        const data = await response.json();
        if (data.success) {
            mostrarTextoCifrasCarregado(data.tom, data.message);                    
            elements.searchModalLabel.textContent = text;
            elements.editTextarea.classList.remove('d-none');
            elements.startButton.classList.remove('d-none');
            elements.addButton.classList.remove('d-none');
            elements.saveButton.classList.remove('d-none');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Erro ao baixar a cifra. Tente novamente mais tarde.');
    } finally {
        elements.searchButton.disabled = false;
        elements.spinner.classList.add('d-none');
        elements.searchIcon.classList.remove('d-none');
        elements.searchResultsList.classList.add('d-none');
    }
}

const togglePressedState = (event) => {
    const button = event.currentTarget;
    const action = button.dataset.action;

    if (action === 'notes') {
        if (elements.notesButton.classList.contains('pressed')) {
            elements.notesButton.classList.remove('pressed');
        } else {
            elements.notesButton.classList.add('pressed');
        }
    } else {
        button.classList.remove('pressed');
        setTimeout(() => button.classList.add('pressed'), 100);

        if (action === 'play') {
            setTimeout(() => button.classList.add('pulse'), 100);
            elements.stopButton.classList.remove('pulse');
            elements.stopButton.innerHTML = '<i class="bi bi-stop-fill"></i>';
            elements.playButton.classList.remove('pulse');
        } else {
            if (action === 'stop' && elements.stopButton.innerHTML.includes('bi-search')) {
                $('#searchModal').modal('show');
            }
            elements.playButton.classList.remove('pressed', 'pulse');
            elements.stopButton.classList.add('pulse');
            elements.stopButton.innerHTML = '<i class="bi bi-search"></i>';
        }
    }
};

const mudarTempoCompasso = (bpm) => {
    const tempo = parseInt(bpm.value);
    const bpmValor = 60000 / tempo;
    elements.bpmValue.textContent = tempo;
    elements.playButton.style.animationDuration = `${bpmValor}ms`;
    elements.stopButton.style.animationDuration = `${bpmValor}ms`;
};

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    aplicarModoEscuroIframe();
};

const updateSwitchDarkMode = () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        elements.darkModeToggle.checked = false;
    } else {
        elements.darkModeToggle.checked = true;
    }
};

const aplicarModoEscuroIframe = () => {
    const iframeDoc = elements.iframeCifra.contentDocument || elements.iframeCifra.contentWindow.document;
    iframeDoc.body.style.color = document.body.classList.contains('dark-mode') ? '#FFFFFF' : '#4F4F4F';
};

document.addEventListener('DOMContentLoaded', function () {
    elements.darkModeToggle.checked = true;
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        updateSwitchDarkMode();
        aplicarModoEscuroIframe();
    }
});

function mostrarTextoCifrasCarregado(tom = null, texto = null) {
    if (tom) {
        preencherSelect(tom);
    }

    if (texto) {
        const textoSemTags = texto.replace(/<style[\s\S]*?<\/style>|<\/?[^>]+(>|$)/g, "");
        elements.editTextarea.value = textoSemTags;
    }
}

function addEventCifrasIframe(frame) {
    var elements = frame.contentDocument.getElementsByTagName("b");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function (e) {
            var cifraElements = frame.contentDocument.getElementsByClassName('cifraSelecionada');

            if (cifraElements.length > 0)
                cifraElements[0].classList.remove('cifraSelecionada');

            e.target.classList.add('cifraSelecionada');
            e.target.scrollIntoView();
            parent.tocarCifraManualmente(e.target);

            parent.focus(); //Foca fora para funcionar o teclado físico
        });
    }
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function fullScreen() {
    if (isMobileDevice()) {
        if (!document.fullscreenElement &&    // Opera 12.1, Firefox, Chrome, Edge, Safari
            !document.webkitFullscreenElement && // Old WebKit
            !document.mozFullScreenElement && // Old Firefox
            !document.msFullscreenElement) {  // IE/Edge
            var el = document.documentElement;
            var requestMethod = el.requestFullscreen || el.webkitRequestFullscreen ||
                el.mozRequestFullScreen || el.msRequestFullscreen;

            if (requestMethod) {
                requestMethod.call(el);
            }

            let wakeLock = null;
            try {
                wakeLock = navigator.wakeLock.request("screen");
            } catch { }
        }
    }
}

function destacarCifras(texto) {
    const linhas = texto.split('\n');
    let cifraNum = 1;
    const linhasDestacadas = linhas.map(linha => {
        if (!/[a-zA-Z]{3,}/.test(linha)) {
            const palavras = linha.split(/\s+/);
            const espacos = linha.match(/\s+/g) || [];
            const linhaProcessada = palavras.map((palavra, index) => {
                let acorde = palavra;
                while (!notasAcordes.includes(acorde) && acorde) {
                    acorde = acorde.slice(0, -1);
                }
                const elemento = notasAcordes.includes(acorde) ? `<b id="cifra${cifraNum++}">${acorde}</b>` : palavra;
                return index < palavras.length - 1 && espacos[index] ? elemento + espacos[index] : elemento;
            }).join('');
            return linhaProcessada;
        }
        return linha;
    });
    return (`<style>.cifraSelecionada{background-color:#DAA520}</style><pre>${linhasDestacadas.join('\n')}</pre>`);
}

function tocarAcorde(acorde) {
    pararAcorde();

    if (!acordeGroup) {
        acordeGroup = new Pizzicato.Group();
        acordeGroup.attack = 0.1;
    }

    const notas = notasAcordesJson[acorde];

    acordeGroup.addSound(acordes[`orgao_${notas[0]}_grave`]);
    acordeGroup.addSound(acordes[`strings_${notas[0]}_grave`]);

    notas.forEach(nota => {
        acordeGroup.addSound(acordes[`orgao_${nota}_baixo`]);
        acordeGroup.addSound(acordes[`strings_${nota}_baixo`]);

        if (elements.notesButton.classList.contains('pressed')) {
            acordeGroup.addSound(acordes[`orgao_${nota}`]);
            acordeGroup.addSound(acordes[`strings_${nota}`]);
        }
    });

    setTimeout(() => {
        parado = false;
        acordeGroup.play();
    }, 60);
}

function pararAcorde() {
    if (acordeGroup) {
        acordeGroup.stop();
        parado = true;

        var sons = acordeGroup.sounds.length;
        for (let i = sons - 1; i > -1; i--) {
            acordeGroup.removeSound(acordeGroup.sounds[i]);
        };
    }
}

function removerClasseCifraSelecionada(iframeDoc, excecao = null) {
    const elementos = iframeDoc.querySelectorAll('.cifraSelecionada');
    elementos.forEach(elemento => {
        if (elemento !== excecao) {
            elemento.classList.remove('cifraSelecionada');
        }
    });
}

function avancarCifra() {
    const frameContent = elements.iframeCifra.contentDocument;
    const elements_b = frameContent.getElementsByTagName('b');
    const cifraElems = frameContent.getElementsByClassName('cifraSelecionada');
    parado = false;

    if (indiceAcorde < elements_b.length) {
        if (cifraElems.length > 0)
            cifraElems[0].classList.remove('cifraSelecionada');

        const cifraElem = elements_b[indiceAcorde];
        if (cifraElem) {
            const cifra = cifraElem.innerHTML.trim();
            tocarAcorde(cifra);

            cifraElem.classList.add('cifraSelecionada');
            cifraElem.scrollIntoView();

            indiceAcorde++;
        }
    }
}

function tocarCifraManualmente(cifraElem) {
    indiceAcorde = cifraElem.id.split('cifra')[1] - 1;

    if (parado === false) {
        elements.playButton.dispatchEvent(new Event('mousedown'));
    }
}

['mousedown'].forEach(event => {
    elements.playButton.addEventListener(event, togglePressedState);
    elements.notesButton.addEventListener(event, togglePressedState);
    elements.stopButton.addEventListener(event, togglePressedState);
});