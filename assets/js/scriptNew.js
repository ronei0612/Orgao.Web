class CifraPlayer {
    constructor(elements) {
        this.elements = elements;
        this.acordeGroup = null;
        this.parado = true;
        this.indiceAcorde = 0;
        this.tomAtual = 'C';
        this.notasAcordesJson = JSON.parse('{"A#":["a#","d","f"],"A#4":["a#","d#","f"],"A#5+":["a#","d","f#"],"A#6":["a#","d","f","g"],"A#7":["a#","d","f","g#"],"A#7M":["a#","d","f","a"],"A#9":["a#","d","f","c"],"A#m":["a#","c#","f"],"A#m5+":["a#","c#","f#"],"A#m6":["a#","c#","f","g"],"A#m7":["a#","c#","f","g#"],"A#m7M":["a#","c#","f","a"],"A#°":["a#","c#","e"],"A#°7":["a#","c#","e","g#"],"A":["a","c#","e"],"A4":["a","d","e"],"A5+":["a","c#","f"],"A6":["a","c#","e","f#"],"A7":["a","c#","e","g"],"A7M":["a","c#","e","g#"],"A9":["a","c#","e","b"],"Am":["a","c","e"],"Am5+":["a","c","f"],"Am6":["a","c","e","f#"],"Am7":["a","c","e","g"],"Am7M":["a","c","e","g#"],"A°":["a","c","d#"],"A°7":["a","c","d#","g"],"Ab":["g#","c","d#"],"Ab4":["g#","c#","d#"],"Ab5+":["g#","c","e"],"Ab6":["g#","c","d#","f"],"Ab7":["g#","c","d#","f#"],"Ab7M":["g#","c","d#","g"],"Ab9":["g#","c","d#","a#"],"Abm":["g#","b","d#"],"Abm5+":["g#","b","e"],"Abm6":["g#","b","d#","f"],"Abm7":["g#","b","d#","f#"],"Abm7M":["g#","b","d#","g"],"Ab°":["g#","b","d"],"Ab°7":["g#","b","d","f#"],"B":["b","d#","f#"],"B4":["b","e","f#"],"B5+":["b","d#","g"],"B6":["b","d#","f#","g#"],"B7":["b","d#","f#","a"],"B7M":["b","d#","f#","a#"],"B9":["b","d#","f#","c#"],"Bm":["b","d","f#"],"Bm5+":["b","d","g"],"Bm6":["b","d","f#","g#"],"Bm7":["b","d","f#","a"],"Bm7M":["b","d","f#","a#"],"B°":["b","d","f"],"B°7":["b","d","f","a"],"Bb":["a#","d","f"],"Bb4":["a#","d#","f"],"Bb5+":["a#","d","f#"],"Bb6":["a#","d","f","g"],"Bb7":["a#","d","f","g#"],"Bb7M":["a#","d","f","a"],"Bb9":["a#","d","f","c"],"Bbm":["a#","c#","f"],"Bbm5+":["a#","c#","f#"],"Bbm6":["a#","c#","f","g"],"Bbm7":["a#","c#","f","g#"],"Bbm7M":["a#","c#","f","a"],"Bb°":["a#","c#","e"],"Bb°7":["a#","c#","e","g#"],"Cb":["b","d#","f#"],"Cb4":["b","e","f#"],"Cb5+":["b","d#","g"],"Cb6":["b","d#","f#","g#"],"Cb7":["b","d#","f#","a"],"Cb7M":["b","d#","f#","a#"],"Cb9":["b","d#","f#","c#"],"Cbm":["b","d","f#"],"Cbm5+":["b","d","g"],"Cbm6":["b","d","f#","g#"],"Cbm7":["b","d","f#","a"],"Cbm7M":["b","d","f#","a#"],"Cb°":["b","d","f"],"Cb°7":["b","d","f","a"],"C#":["c#","f","g#"],"C#4":["c#","f#","g#"],"C#5+":["c#","f","a"],"C#6":["c#","f","g#","a#"],"C#7":["c#","f","g#","b"],"C#7M":["c#","f","g#","c"],"C#9":["c#","f","g#","d#"],"C#m":["c#","e","g#"],"C#m5+":["c#","e","a"],"C#m6":["c#","e","g#","a#"],"C#m7":["c#","e","g#","b"],"C#m7M":["c#","e","g#","c"],"C#°":["c#","e","g"],"C#°7":["c#","e","g","b"],"C":["c","e","g"],"C4":["c","f","g"],"C5+":["c","e","g#"],"C6":["c","e","g","a"],"C7":["c","e","g","a#"],"C7M":["c","e","g","b"],"C9":["c","e","g","d"],"Cm":["c","d#","g"],"Cm5+":["c","d#","g#"],"Cm6":["c","d#","g","a"],"Cm7":["c","d#","g","a#"],"Cm7M":["c","d#","g","b"],"C°":["c","d#","f#"],"C°7":["c","d#","f#","a#"],"B#":["c","e","g"],"B#4":["c","f","g"],"B#5+":["c","e","g#"],"B#6":["c","e","g","a"],"B#7":["c","e","g","a#"],"B#7M":["c","e","g","b"],"B#9":["c","e","g","d"],"B#m":["c","d#","g"],"B#m5+":["c","d#","g#"],"B#m6":["c","d#","g","a"],"B#m7":["c","d#","g","a#"],"B#m7M":["c","d#","g","b"],"B#°":["c","d#","f#"],"B#°7":["c","d#","f#","a#"],"D":["d","f#","a"],"D#":["d#","g","a#"],"D#4":["d#","g#","a#"],"D#5+":["d#","g","b"],"D#6":["d#","g","a#","c"],"D#7":["d#","g","a#","c#"],"D#7M":["d#","g","a#","d"],"D#9":["d#","g","a#","f"],"D#m":["d#","f#","a#"],"D#m5+":["d#","f#","b"],"D#m6":["d#","f#","a#","c"],"D#m7":["d#","f#","a#","c#"],"D#m7M":["d#","f#","a#","d"],"D#°":["d#","f#","a"],"D#°7":["d#","f#","a","c#"],"D4":["d","g","a"],"D5+":["d","f#","a#"],"D6":["d","f#","a","b"],"D7":["d","f#","a","c"],"D7M":["d","f#","a","c#"],"D9":["d","f#","a","e"],"Db":["c#","f","g#"],"Db4":["c#","f#","g#"],"Db5+":["c#","f","a"],"Db6":["c#","f","g#","a#"],"Db7":["c#","f","g#","b"],"Db7M":["c#","f","g#","c"],"Db9":["c#","f","g#","d#"],"Dbm":["c#","e","g#"],"Dbm5+":["c#","e","a"],"Dbm6":["c#","e","g#","a#"],"Dbm7":["c#","e","g#","b"],"Dbm7M":["c#","e","g#","c"],"Db°":["c#","e","g"],"Db°7":["c#","e","g","b"],"Dm":["d","f","a"],"Dm5+":["d","f","a#"],"Dm6":["d","f","a","b"],"Dm7":["d","f","a","c"],"Dm7M":["d","f","a","c#"],"D°":["d","f","g#"],"D°7":["d","f","g#","c"],"Eb":["d#","g","a#"],"Eb4":["d#","g#","a#"],"Eb5+":["d#","g","b"],"Eb6":["d#","g","a#","c"],"Eb7":["d#","g","a#","c#"],"Eb7M":["d#","g","a#","d"],"Eb9":["d#","g","a#","f"],"Ebm":["d#","f#","a#"],"Ebm5+":["d#","f#","b"],"Ebm6":["d#","f#","a#","c"],"Ebm7":["d#","f#","a#","c#"],"Ebm7M":["d#","f#","a#","d"],"Eb°":["d#","f#","a"],"Eb°7":["d#","f#","a","c#"],"E":["e","g#","b"],"E4":["e","a","b"],"E5+":["e","g#","c"],"E6":["e","g#","b","c#"],"E7":["e","g#","b","d"],"E7M":["e","g#","b","d#"],"E9":["e","g#","b","f#"],"Em":["e","g","b"],"Em5+":["e","g","c"],"Em6":["e","g","b","c#"],"Em7":["e","g","b","d"],"Em7M":["e","g","b","d#"],"E°":["e","g","a#"],"E°7":["e","g","a#","d"],"Fb":["e","g#","b"],"Fb4":["e","a","b"],"Fb5+":["e","g#","c"],"Fb6":["e","g#","b","c#"],"Fb7":["e","g#","b","d"],"Fb7M":["e","g#","b","d#"],"Fb9":["e","g#","b","f#"],"Fbm":["e","g","b"],"Fbm5+":["e","g","c"],"Fbm6":["e","g","b","c#"],"Fbm7":["e","g","b","d"],"Fbm7M":["e","g","b","d#"],"Fb°":["e","g","a#"],"Fb°7":["e","g","a#","d"],"F#":["f#","a#","c#"],"F#4":["f#","b","c#"],"F#5+":["f#","a#","d"],"F#6":["f#","a#","c#","d#"],"F#7":["f#","a#","c#","e"],"F#7M":["f#","a#","c#","f"],"F#9":["f#","a#","c#","g#"],"F#m":["f#","a","c#"],"F#m5+":["f#","a","d"],"F#m6":["f#","a","c#","d#"],"F#m7":["f#","a","c#","e"],"F#m7M":["f#","a","c#","f"],"F#°":["f#","a","c"],"F#°7":["f#","a","c","e"],"E#":["f","a","c"],"E#4":["f","a#","c"],"E#5+":["f","a","c#"],"E#6":["f","a","c","d"],"E#7":["f","a","c","d#"],"E#7M":["f","a","c","e"],"E#9":["f","a","c","g"],"E#m":["f","g#","c"],"E#m5+":["f","g#","c#"],"E#m6":["f","g#","c","d"],"E#m7":["f","g#","c","d#"],"E#m7M":["f","g#","c","e"],"E#°":["f","g#","b"],"E#°7":["f","g#","b","d#"],"F":["f","a","c"],"F4":["f","a#","c"],"F5+":["f","a","c#"],"F6":["f","a","c","d"],"F7":["f","a","c","d#"],"F7M":["f","a","c","e"],"F9":["f","a","c","g"],"Fm":["f","g#","c"],"Fm5+":["f","g#","c#"],"Fm6":["f","g#","c","d"],"Fm7":["f","g#","c","d#"],"Fm7M":["f","g#","c","e"],"F°":["f","g#","b"],"F°7":["f","g#","b","d#"],"G":["g","b","d"],"G#":["g#","c","d#"],"G#4":["g#","c#","d#"],"G#5+":["g#","c","e"],"G#6":["g#","c","d#","f"],"G#7":["g#","c","d#","f#"],"G#7M":["g#","c","d#","g"],"G#9":["g#","c","d#","a#"],"G#m":["g#","b","d#"],"G#m5+":["g#","b","e"],"G#m6":["g#","b","d#","f"],"G#m7":["g#","b","d#","f#"],"G#m7M":["g#","b","d#","g"],"G#°":["g#","b","d"],"G#°7":["g#","b","d","f#"],"G4":["g","c","d"],"G5+":["g","b","d#"],"G6":["g","b","d","e"],"G7":["g","b","d","f"],"G7M":["g","b","d","f#"],"G9":["g","b","d","a"],"Gb":["f#","a#","c#"],"Gb4":["f#","b","c#"],"Gb5+":["f#","a#","d"],"Gb6":["f#","a#","c#","d#"],"Gb7":["f#","a#","c#","e"],"Gb7M":["f#","a#","c#","f"],"Gb9":["f#","a#","c#","g#"],"Gbm":["f#","a","c#"],"Gbm5+":["f#","a","d"],"Gbm6":["f#","a","c#","d#"],"Gbm7":["f#","a","c#","e"],"Gbm7M":["f#","a","c#","f"],"Gb°":["f#","a","c"],"Gb°7":["f#","a","c","e"],"Gm":["g","a#","d"],"Gm5+":["g","a#","d#"],"Gm6":["g","a#","d","e"],"Gm7":["g","a#","d","f"],"Gm7M":["g","a#","d","f#"],"G°":["g","a#","c#"],"G°7":["g","a#","c#","f"]}');
        this.notasAcordes = Object.keys(this.notasAcordesJson);
        this.acordes = {};
        this.tonsMaiores = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.tonsMenores = this.tonsMaiores.map(tom => tom + 'm');
        this.audioPath = location.origin.includes('file:') ? 'https://ronei0612.github.io/orgao.web/assets/audio/' : './assets/audio/';
        this.initEventListeners();
        this.carregarAcordes();
    }

    initEventListeners() {
        this.elements.playButton.addEventListener('mousedown', () => this.iniciarReproducao());
        this.elements.notesButton.addEventListener('mousedown', () => this.alternarNotas());
        this.elements.stopButton.addEventListener('mousedown', () => this.pararReproducao());
        this.elements.prevButton.addEventListener('click', () => this.retroceder());
        this.elements.nextButton.addEventListener('click', () => this.avancar());
        // ... outros event listeners
        this.elements.tomSelect.addEventListener('change', () => this.transposeCifra());
        //this.elements.pulseRange.addEventListener('input', () => this.mudarTempoCompasso(this.elements.pulseRange));
    }

    destacarCifras(texto) {
        const linhas = texto.split('\n');
        let cifraNum = 1;
    
        const linhasDestacadas = linhas.map(linha => {
            if (!/[a-zA-Z]{3,}/.test(linha)) {
                const palavras = linha.split(/\s+/);
                const espacos = linha.match(/\s+/g) || [];
                const linhaProcessada = palavras.map((palavra, index) => {
                    let acorde = palavra;
                    while (!this.notasAcordes.includes(acorde) && acorde) {
                        acorde = acorde.slice(0, -1);
                    }
                    const elemento = this.notasAcordes.includes(acorde) ? `<b id="cifra${cifraNum++}">${acorde}</b>` : palavra;
                    return index < palavras.length - 1 && espacos[index] ? elemento + espacos[index] : elemento;
                }).join('');
                return linhaProcessada;
            }
            return linha;
        });
        return `<style>.cifraSelecionada{background-color:#DAA520}</style><pre>${linhasDestacadas.join('\n')}</pre>`;
    }

    carregarAcordes() {
        const instrumentos = ['orgao', 'strings'];
        const oitavas = ['grave', 'baixo', ''];
        const notas = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

        instrumentos.forEach(instrumento => {
            notas.forEach(nota => {
                oitavas.forEach(oitava => {
                    const key = `${instrumento}_${nota}${oitava ? '_' + oitava : ''}`;
                    this.acordes[key] = new Pizzicato.Sound({
                        source: 'file',
                        options: {
                            path: `${this.audioPath}${instrumento.charAt(0).toUpperCase() + instrumento.slice(1)}/${key}.ogg`,
                            loop: true,
                            release: 0.5,
                            attack: 0.1
                        }
                    });
                });
            });
        });
    }

    preencherSelect(tom) {
        this.elements.tomSelect.innerHTML = '';
    
        const tons = this.tonsMaiores.includes(tom) ? this.tonsMaiores : this.tonsMenores.includes(tom) ? this.tonsMenores : [];
    
        tons.forEach(t => {
            const option = document.createElement('option');
            option.value = t;
            option.text = t;
            this.elements.tomSelect.appendChild(option);
        });
    
        this.elements.tomSelect.value = tom;
        this.tomAtual = tom;
    }
    
    tocarCifraManualmente(cifraElem) {
        debugger;
        this.indiceAcorde = parseInt(cifraElem.id.split('cifra')[1]) - 1;
        if (!this.parado) {
            this.iniciarReproducao();
        }
        // } else {
        //     this.tocarAcorde(cifraElem.innerHTML.trim());
        // }
    }

    transposeCifra() {
        if (this.elements.tomSelect.value) {
            const novoTom = this.elements.tomSelect.value;
            this.transporCifraNoIframe(novoTom);
            this.tomAtual = novoTom;

            if (this.indiceAcorde > 0) {
                this.indiceAcorde--;
            }

            if (!this.parado) {
                this.pararAcorde();
                this.avancarCifra();
            }
        }
    }

    transporCifraNoIframe(novoTom) {
        let acordes;
        if (this.tonsMaiores.includes(novoTom)) {
            acordes = this.tonsMaiores;
        } else if (this.tonsMenores.includes(novoTom)) {
            acordes = this.tonsMenores;
        }

        const cifras = this.elements.iframeCifra.contentDocument.querySelectorAll('b');

        for (const cifra of cifras) {
            let acorde = cifra.innerText;
            while (!this.tonsMaiores.includes(acorde) && acorde) {
                acorde = acorde.slice(0, -1);
            }
            const steps = acordes.indexOf(novoTom) - acordes.indexOf(this.tomAtual);
            const novoAcorde = this.transposeAcorde(acorde, steps, acordes);
            cifra.innerText = cifra.innerText.replace(acorde, novoAcorde);
        }
    }

    transposeAcorde(acorde, steps, acordes) {
        let index = acordes.indexOf(acorde);
        if (index === -1) return acorde;

        index = (index + steps + acordes.length) % acordes.length;
        return acordes[index];
    }

    addEventCifrasIframe(frame) {
        const elements = frame.contentDocument.getElementsByTagName("b");
    
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", (e) => {
                this.removerClasseCifraSelecionada(frame.contentDocument, e.target);
    
                e.target.classList.add('cifraSelecionada');
                e.target.scrollIntoView();
    
                this.tocarCifraManualmente(e.target);
                parent.focus(); // Mantém o foco fora do iframe para o teclado físico funcionar
            });
        }
    }

    iniciarReproducao() {
        if (!this.parado) {
            this.pararAcorde();
        }
        this.avancarCifra();
    }

    alternarNotas() {
        if (this.indiceAcorde > 0) {
            this.indiceAcorde--;
        }

        if (!this.parado) {
            this.pararAcorde();
            this.avancarCifra();
        }
    }

    pararReproducao() {
        this.pararAcorde();
        const frameContent = this.elements.iframeCifra.contentDocument;
        const cifraElems = frameContent.getElementsByClassName('cifraSelecionada');

        Array.from(cifraElems).forEach(elemento => {
            elemento.classList.remove('cifraSelecionada');
        });

        if (this.indiceAcorde > 0) {
            this.indiceAcorde--;
        }
    }

    avancarCifra() {
        const frameContent = this.elements.iframeCifra.contentDocument;
        const elements_b = frameContent.getElementsByTagName('b');

        this.parado = false;

        if (this.indiceAcorde < elements_b.length) {
            this.removerClasseCifraSelecionada(frameContent);

            const cifraElem = elements_b[this.indiceAcorde];
            if (cifraElem) {
                const cifra = cifraElem.innerHTML.trim();
                this.tocarAcorde(cifra);

                cifraElem.classList.add('cifraSelecionada');
                cifraElem.scrollIntoView();

                this.indiceAcorde++;
            }
        } else {
            this.pararAcorde();
        }
    }

    tocarAcorde(acorde) {
        this.pararAcorde();

        if (!this.acordeGroup) {
            this.acordeGroup = new Pizzicato.Group();
            this.acordeGroup.attack = 0.1;
        }

        const notas = this.notasAcordesJson[acorde];
        if (!notas) return;

        this.adicionarSomAoGrupo('orgao', notas[0], 'grave');
        this.adicionarSomAoGrupo('strings', notas[0], 'grave');

        notas.forEach(nota => {
            this.adicionarSomAoGrupo('orgao', nota, 'baixo');
            this.adicionarSomAoGrupo('strings', nota, 'baixo');

            if (this.elements.notesButton.classList.contains('pressed')) {
                this.adicionarSomAoGrupo('orgao', nota);
                this.adicionarSomAoGrupo('strings', nota);
            }
        });

        setTimeout(() => {
            if (!this.parado) {
                this.acordeGroup.play();
            }
        }, 60);
    }

    adicionarSomAoGrupo(instrumento, nota, oitava = '') {
        const key = `${instrumento}_${nota}${oitava ? '_' + oitava : ''}`;
        if (this.acordes[key]) {
            this.acordeGroup.addSound(this.acordes[key]);
        }
    }

    pararAcorde() {
        if (this.acordeGroup) {
            this.acordeGroup.stop();
            this.parado = true;

            const sons = this.acordeGroup.sounds.length;
            for (let i = sons - 1; i > -1; i--) {
                this.acordeGroup.removeSound(this.acordeGroup.sounds[i]);
            }
        }
    }

    removerClasseCifraSelecionada(iframeDoc, excecao = null) {
        const elementos = iframeDoc.querySelectorAll('.cifraSelecionada');
        elementos.forEach(elemento => {
            if (elemento !== excecao) {
                elemento.classList.remove('cifraSelecionada');
            }
        });
    }


    mudarTempoCompasso(bpm) {
        const tempo = parseInt(bpm.value);
        const bpmValor = 60000 / tempo;
        this.elements.bpmValue.textContent = tempo;

        // Define a duração da animação nos botões de play e stop
        this.elements.playButton.style.animationDuration = `${bpmValor}ms`;
        this.elements.stopButton.style.animationDuration = `${bpmValor}ms`;

        if (this.acordeGroup) {
            // Ajusta a velocidade de reprodução do acorde atual (se houver)
            // ... (lógica para ajustar a velocidade com Pizzicato) ...
        }
    }

    // ... outros métodos
}


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
    increaseTom: document.getElementById('increaseTom'),
    pulseRange: document.getElementById('pulseRange')
};

const cifraPlayer = new CifraPlayer(elements);

$('#searchModal').on('shown.bs.modal', exibirListaSaves);

elements.tomSelect.addEventListener('change', () => {
    if (elements.tomSelect.value) {
        cifraPlayer.transposeCifra(); // Chama o método da classe
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

elements.notesButton.addEventListener('click', () => {
    cifraPlayer.alternarNotas();
});

elements.stopButton.addEventListener('mousedown', () => {
    cifraPlayer.pararReproducao();
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
        elements.iframeCifra.contentDocument.body.innerHTML = cifraPlayer.destacarCifras(texto);
        cifraPlayer.addEventCifrasIframe(elements.iframeCifra);
        
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

const camposHarmonicos = {
    // Campos harmônicos maiores
    'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am'],
    'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm'],
    'C#': ['C#', 'D#m', 'Fm', 'F#', 'G#', 'A#m'],
    'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm'],
    'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm'],
    'D#': ['D#', 'Fm', 'Gm', 'G#', 'A#', 'Cm'],
    'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
    'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm'],
    'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m'],
    'Gb': ['Gb', 'Abm', 'Bbm', 'B', 'Db', 'Ebm'],
    'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em'],
    'G#': ['G#', 'A#m', 'B#m', 'C#', 'D#', 'Fm'],
    'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm'],
    'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
    'A#': ['A#', 'B#m', 'Dm', 'D#', 'F', 'Gm'],
    'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm'],
    'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m'],
    // Campos harmônicos menores
    'Am': ['Am', 'C', 'Dm', 'Em', 'F', 'G'],
    'Bbm': ['Bbm', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
    'B#m': ['B#m', 'D', 'E#m', 'F#m', 'G', 'A'],
    'Bm': ['Bm', 'D', 'Em', 'F#m', 'G', 'A'],
    'Cm': ['Cm', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
    'C#m': ['C#m', 'E', 'F#m', 'G#m', 'A', 'B'],
    'Dm': ['Dm', 'F', 'Gm', 'Am', 'Bb', 'C'],
    'D#m': ['D#m', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'],
    'Ebm': ['Ebm', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'],
    'Em': ['Em', 'G', 'Am', 'Bm', 'C', 'D'],
    'Fm': ['Fm', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
    'F#m': ['F#m', 'A', 'Bm', 'C#m', 'D', 'E'],
    'Gm': ['Gm', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
    'G#m': ['G#m', 'B', 'C#m', 'D#m', 'E', 'F#'],
    'Abm': ['Abm', 'Cb', 'Dbm', 'Ebm', 'Fb', 'Gb'],
    'A#m': ['A#m', 'D', 'E#m', 'F#m', 'G', 'A']
};

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

window.onerror = function (message, source, lineno, colno, error) {
	alert("Erro!\n" + message + '\nArquivo: ' + source + '\nLinha: ' + lineno + '\nPosicao: ' + colno);
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
        cifraPlayer.preencherSelect(tom);
    }

    if (texto) {
        const textoSemTags = texto.replace(/<style[\s\S]*?<\/style>|<\/?[^>]+(>|$)/g, "");
        elements.editTextarea.value = textoSemTags;
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

['mousedown'].forEach(event => {
    elements.playButton.addEventListener(event, togglePressedState);
    elements.notesButton.addEventListener(event, togglePressedState);
    elements.stopButton.addEventListener(event, togglePressedState);
});
