$(document).ready(function() {

    let name_player_1 = prompt("Giocatore 1, inserisci il tuo nome");
    let name_player_2 = prompt("Giocatore 2, inserisci il tuo nome");

    if (name_player_1 != null && name_player_2 != null) {
        $(".info_player_uno .nome_player").text(name_player_1);
        $(".info_player_due .nome_player").text(name_player_2);
    }

    let arrayRaccoltaSimboli = ["fas fa-ghost",
                                "fab fa-steam",
                                "fab fa-xbox",
                                "fab fa-playstation",
                                "fab fa-nintendo-switch",
                                "fas fa-gamepad",
                                "fab fa-twitch",
                                "fas fa-headset",
                              ];

    let scacchiera = $(".scacchiera"),
        pedina_1 = $("<i id=\"player_uno\" class=\"" + arrayRaccoltaSimboli[numeroRandom(0, arrayRaccoltaSimboli.length - 1)] + "\"></i>"),
        pedina_2 = $("<i id=\"player_due\" class=\"" + arrayRaccoltaSimboli[numeroRandom(0, arrayRaccoltaSimboli.length - 1)] + "\"></i>"),
        arrayCaselle = [11, 10, 9, 8, 7, 6, 5, 12, 27, 26, 25, 24, 23, 4, 13, 28, 35, 34, 33, 22, 3, 14, 29, 30, 31, 32, 21, 2, 15, 16, 17, 18, 19, 20, 1]; // Creo array con le caselle, partendo da in alnumero_casella_destinazione a sinistra

    // Creo le caselle ed assegno loro il numero ed un id
    for (let i = 0; i < arrayCaselle.length; i++) {
        scacchiera.append("<div></div>");
    }
    for (let i = 0; i <= arrayCaselle.length; i++) {
        scacchiera.find("div:nth-child(" + i + ")").attr('data-id-casella', arrayCaselle[i - 1]);
    }

    //$("#dado").addClass("player1");

    //Inserisco le due pedine nella prima casella (div 35)
    scacchiera.find("div:nth-child(35)").append(pedina_1, pedina_2).addClass("start posizione_player_1 posizione_player_2");
    scacchiera.find("div:nth-child(17)").addClass("arrive");

    // Inserisco i bonus_casella_ottenuto e i malus
    scacchiera.find("div:nth-child(21)").addClass("casella_speciale bonus_piu_due");
    scacchiera.find("div:nth-child(8)").addClass("casella_speciale bonus_piu_due");
    scacchiera.find("div:nth-child(25)").addClass("casella_speciale bonus_piu_due");
    scacchiera.find("div:nth-child(10)").addClass("casella_speciale malus_meno_cinque");
    scacchiera.find("div:nth-child(5)").addClass("casella_speciale malus_meno_cinque");
    scacchiera.find("div:nth-child(32)").addClass("casella_speciale malus_meno_cinque");
    scacchiera.find("div:nth-child(13)").addClass("casella_speciale scambia_posizione")
    scacchiera.find("div:nth-child(23)").addClass("casella_speciale scambia_posizione");
    // Inserisco i bonus e i malus

    // Inizio partita
    $(".info_player_uno .turno_attuale").addClass("gioca");

    let risultato_dado = 0,
        numero_casella_destinazione = 0,
        nth_child_destinazione_partenza = 0,
        nth_child_destinazione = 0,
        casella_1 = arrayCaselle.indexOf(1),
        casella_2 = arrayCaselle.indexOf(1),
        turno_corrente = 'player_uno',
        vincitore = 'nessuno',
        potere_casella_ottenuto = 'nessuno',
        turni_player_1 = 0,
        turni_player_2 = 0;

    $(".info_player_uno .lanci_dado").text(turni_player_1);
    $(".info_player_due .lanci_dado").text(turni_player_2);


    // Lancio del dado
    $("#dado").click(function() {

        if (turno_corrente === 'player_uno') {

            let player_1 = $("#player_uno"),
                player_2 = $("#player_due"),
                info_player_1 = $(".info_player_uno");

            $(".info_player_uno .turno_attuale").removeClass("gioca");
            $(".info_player_due .turno_attuale").addClass("gioca");

            //Turno Pedina Player 1
            risultato_dado = tira_dado(); //risultato dado

            //arrayCaselle[casella_1] <-- indice casella di partenza
            numero_casella_destinazione = arrayCaselle[casella_1] + risultato_dado; //numero della casella di destinazione (indice casella di partenza + risultato dado)

            let nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1; // nth-child della casella di destinazione (controlla s'e presente con indexOf)

            player_1.remove(); //rimuovo la pedina dalla casella di partenza

            scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_1); // Inserisco la pedina nella nuova casella

            casella_1 = arrayCaselle.indexOf(numero_casella_destinazione); //recupero il nuovo indice della casella

            //console.log(casella_1)
            //console.log("numero_casella_destinazione " + numero_casella_destinazione);
            //console.log("nth_child_destinazione " + nth_child_destinazione);

            // Casi caselle speciali
            switch (scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").attr('class')) {

                case 'casella_speciale bonus_piu_due':
                    numero_casella_destinazione = arrayCaselle[casella_1] + 2;

                    nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1;
                    player_1.remove();

                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_1);
                    casella_1 = arrayCaselle.indexOf(numero_casella_destinazione);

                    potere_casella_ottenuto = 'Avanza di 2 caselle';
                    info_player_1.find(".malus_corrente").text("");
                    info_player_1.find(".bonus_corrente").text(potere_casella_ottenuto);
                    console.log(potere_casella_ottenuto);

                    break;

                case 'casella_speciale malus_meno_cinque':
                    numero_casella_destinazione = arrayCaselle[casella_1] - 5;

                    nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1;
                    player_1.remove();

                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_1);
                    casella_1 = arrayCaselle.indexOf(numero_casella_destinazione);

                    potere_casella_ottenuto = 'Torna indietro di 5 caselle';
                    info_player_1.find(".bonus_corrente").text("");
                    info_player_1.find(".malus_corrente").text(potere_casella_ottenuto);
                    console.log(potere_casella_ottenuto);

                    break;

                case 'casella_speciale scambia_posizione':
                    player_2.remove();
                    nth_child_destinazione = arrayCaselle.indexOf(arrayCaselle[casella_1]) + 1;
                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_2);

                    numero_casella_destinazione = arrayCaselle[casella_2];
                    nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1;
                    player_1.remove();
                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_1);

                    casella_2 = arrayCaselle.indexOf(arrayCaselle[casella_1]);
                    casella_1 = arrayCaselle.indexOf(numero_casella_destinazione);

                    potere_casella_ottenuto = 'Scambia la posizione della casella con il giocatore 2';
                    info_player_1.find(".malus_corrente").text("");
                    info_player_1.find(".bonus_corrente").text(potere_casella_ottenuto);
                    console.log(potere_casella_ottenuto);

                    break;
                default:
                    potere_casella_ottenuto = 'Nessuno';
                    info_player_1.find(".bonus_corrente, .malus_corrente").text(potere_casella_ottenuto);
                    break;
            }
            // Casi caselle speciali

            scacchiera.find("div").removeClass("posizione_player_1");
            scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").addClass("posizione_player_1");

            if ((numero_casella_destinazione >= 35)) {
                vincitore = 'player_1';
                scacchiera.find("div:nth-child(17)").append(pedina_1);
            }

            turno_corrente = 'player_due';

            turni_player_1++;
            info_player_1.find(".lanci_dado").text(turni_player_1);

        } else if (turno_corrente === 'player_due') {

            let player_1 = $("#player_uno"),
                player_2 = $("#player_due"),
                info_player_2 = $(".info_player_due");

            $(".info_player_due .turno_attuale").removeClass("gioca");
            $(".info_player_uno .turno_attuale").addClass("gioca");

            //Turno Pedina Player 2
            risultato_dado = tira_dado(); //risultato dado

            numero_casella_destinazione = arrayCaselle[casella_2] + risultato_dado; //numero della casella di destinazione 

            let nth_child_destinazione_partenza = arrayCaselle.indexOf(1) + 1; // nth-child della casella di partenza
            let nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1; // nth-child della casella di destinazione

            console.log("numero_casella_destinazione " + numero_casella_destinazione);
            console.log("nth_child_destinazione " + nth_child_destinazione_partenza);
            console.log("nth_child_destinazione " + nth_child_destinazione);

            player_2.remove();
            scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_2);

            casella_2 = arrayCaselle.indexOf(numero_casella_destinazione);

            // Casi caselle speciali
            switch (scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").attr('class')) {

                case 'casella_speciale bonus_piu_due':
                    numero_casella_destinazione = arrayCaselle[casella_2] + 2;

                    nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1;
                    player_2.remove();

                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_2);
                    casella_2 = arrayCaselle.indexOf(numero_casella_destinazione);

                    potere_casella_ottenuto = 'Avanza di 2 caselle';
                    info_player_2.find(".malus_corrente").text("");
                    info_player_2.find(".bonus_corrente").text(potere_casella_ottenuto);
                    console.log(potere_casella_ottenuto);
                    break;

                case 'casella_speciale malus_meno_cinque':
                    numero_casella_destinazione = arrayCaselle[casella_2] - 5;

                    nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1;
                    player_2.remove();

                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_2);
                    casella_2 = arrayCaselle.indexOf(numero_casella_destinazione);

                    potere_casella_ottenuto = 'Torna indietro di 5 caselle';
                    info_player_2.find(".bonus_corrente").text("");
                    info_player_2.find(".malus_corrente").text(potere_casella_ottenuto);
                    console.log(potere_casella_ottenuto);
                    break;

                case 'casella_speciale scambia_posizione':
                    player_1.remove();
                    nth_child_destinazione = arrayCaselle.indexOf(arrayCaselle[casella_2]) + 1;
                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_1);

                    numero_casella_destinazione = arrayCaselle[casella_1];
                    nth_child_destinazione = arrayCaselle.indexOf(numero_casella_destinazione) + 1;
                    player_2.remove();
                    scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").append(pedina_2);

                    casella_1 = arrayCaselle.indexOf(arrayCaselle[casella_2]);
                    casella_2 = arrayCaselle.indexOf(numero_casella_destinazione);

                    potere_casella_ottenuto = 'Scambia la posizione della casella con il giocatore 1';
                    info_player_2.find(".malus_corrente").text("");
                    info_player_2.find(".bonus_corrente").text(potere_casella_ottenuto);
                    console.log(potere_casella_ottenuto);
                    break;
                default:
                    potere_casella_ottenuto = 'Nessuno';
                    info_player_2.find(".bonus_corrente, .malus_corrente").text(potere_casella_ottenuto);
                    break;
            }
            // Casi caselle speciali

            scacchiera.find("div").removeClass("posizione_player_2");
            scacchiera.find("div:nth-child(" + nth_child_destinazione + ")").addClass("posizione_player_2");

            if ((numero_casella_destinazione >= 35)) {
                vincitore = 'player_2';
                scacchiera.find("div:nth-child(17)").append(pedina_2);
            }

            turno_corrente = 'player_uno';

            turni_player_2++;
            info_player_2.find(".lanci_dado").text(turni_player_2);
        }

        if (numero_casella_destinazione >= 35) {

            if (vincitore === 'player_1') {
                $('#modalScore').modal('show');
                $('#modalScore .vincitore').text("Giocatore 1: " + $(".info_player_uno .nome_player").text());
            } else {
                $('#modalScore').modal('show');
                $('#modalScore .vincitore').text("Giocatore 2: " + $(".info_player_due .nome_player").text());
            }

            $(".resetGame").click(function() {
                $("#player_uno").remove();
                $("#player_due").remove();
                scacchiera.find("div:nth-child(35)").append(pedina_1, pedina_2).addClass("start posizione_player_1 posizione_player_2");
                casella_1 = arrayCaselle.indexOf(1);
                casella_2 = arrayCaselle.indexOf(1);
                turno = 'player_uno';
                turni_player_1 = 0;
                turni_player_2 = 0;
                $(".info_player_uno").find(".lanci_dado").text(turni_player_1);
                $(".info_player_due").find(".lanci_dado").text(turni_player_2);
                vincitore = 'nessuno';

                let name_player_1 = prompt("Giocatore 1, inserisci il tuo nome");
                let name_player_2 = prompt("Giocatore 2, inserisci il tuo nome");
                if (name_player_1 != null && name_player_2 != null) {
                    $(".info_player_uno .nome_player").text(name_player_1);
                    $(".info_player_due .nome_player").text(name_player_2);
                }
            });
        }

    });

    function numeroRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function tira_dado() {
        let risultato_dado = numeroRandom(1, 6);
        $("#dado").attr('data-estrazione', risultato_dado);
        //console.log("");
        //console.log("Risultato lancio dado "+risultato_dado);
        return risultato_dado;
    }

});