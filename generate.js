
var groups = {};


module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");
    faker.locale = "en";


    function getRandomPoints(rounds) {
        var ran =_.times(rounds, function (n) {
            return faker.random.number(1);
        });
        return ran;
    }

    function getRandomPointsBoolean(rounds) {
        var ran =_.times(rounds, function (n) {
            return faker.random.boolean();
        });
        return ran;
    }


    function calcPts(results){
        var sum = 0;
        for (i = 0; i < results.length; i++) {
            result = results[i];
            sum = sum + result;
        }
        return sum;
    }

    function calcPtsBoolean(results){
        var sum = 0;
        for (i = 0; i < results.length; i++) {
            result = results[i];
            if(result==true){
                sum++;
            }
        }
        return sum;
    }

    function getParticipant() {
        var participants = _.times(100, function (n) {
            var results = getRandomPointsBoolean(12);
            return {
                id: n,
                first_name: faker.name.findName(),
                last_name : faker.name.findName(),
                lane: faker.random.number(11)+1,
                //pts: faker.random.number(23)+1,
                results: results,
                lane_name:faker.number(3)+1,
                pts:calcPtsBoolean(results)
            }
        });

        return participants;
    }


    groups = [
        {
            id:1,
            group_name: "0-6 år",
            participants: getParticipant(),
            group_run_alone:true,
            rounds:4,
            extra_round_writer:'steffenhk@gmail.com',
            extra_round_writer_2:'steffenhk@gmail.com',
            lanes:[
                {
                    id:1,
                    lane_writer:"simonhein@gmail.com"

                },
                {
                    id:2,
                    lane_writer:"steffenhk@gmail.com"
                }
            ]

        },
        {
            id:2,
            group_name: "7-9 år",
            participants: getParticipant(),
            group_run_alone:false,
            rounds:8,
            extra_round_writer:'steffenhk@gmail.com',
            extra_round_writer_2:'steffenhk@gmail.com',
            lanes:[
                {
                    id:1,
                    lane_writer:"simonhein@gmail.com"
                },
                {
                    id:2,
                    lane_writer:"steffenhk@gmail.com"
                }
            ]
        },
        {
            id:3,
            group_name: "10-14 år",
            participants: getParticipant(),
            group_run_alone:false,
            rounds:8,
            extra_round_writer:'steffenhk@gmail.com',
            extra_round_writer_2:'steffenhk@gmail.com',
            lanes:[
                {
                    id:1,
                    lane_writer:"simonhein@gmail.com"
                },
                {
                    id:2,
                    lane_writer:"steffenhk@gmail.com"
                }
            ]

        }
    ];

    var html_content = '<h3 class="home-heading">Om Børneland</h3><div class="well-lg"> <p>Alle aktiviteter i ringriderfestens Børneland er gratis. Undtagen caféen, som drives af Sønderborg Gardens Støtteforening, samt lykkehjulet, der samler penge ind til foreningen ”En God Jul til Alle”, der giver julehjælp til børnefamilier i Sønderborg.</p> <p>I Børneland har vi vores egen møntfod: Guldmønter. Dem tjener børnene ved selv aktivt at grave efter guld i guldgraverområdet. Guldmønterne kan bruges til, at ”betale” de forskellige aktiviteter med. ”Prisen” på de forskellige aktiviteter varierer, se opslagene på pladsen for detaljer.</p> <p>Børneland er helt alkohol- og røgfrit område. Det er børnenes fest.</p> <p><strong>Aktiviteter:</strong></p> <p>Aktiviteterne skifter år efter år følg med i årets program, på hjemmesiden og på facebook for at få opdatering over årets aktiviteter. Af aktiviteter kan nævnes: ponyridning, cykelringridning, militærforhindringsbane, squash, børneringriderfrokost, boldspil, MTB Bane, Ansigtsmaling, ballonklovn, klatrevæg mm.</p> <p><strong>Vore hjælpere er til for jer</strong><br/>Børnelands mange glade hjælpere er til for børn og deres forældre, så børnene kan lege rundt uden de voksnes øjne i nakken. Men hjælperne kan og må ikke påtage sig ansvaret for børnene. Alle børn er velkomne, men kun i selskab med en voksen.</p> </div>';
    var email_content = 'Hej Du er nu bekræftet som deltager til [EVENT]. Din tilmeldingsreference er: [REFFERENCE_NR] Afhent din gratis deltagerpakke hos Fri BikeShop på Alsgade 2, 6400 Søndeborg fra 15. juni 2016 til 6. juli 2016. Print denne bekræftelsesmail og medbring til Fri Bikeshop for at modtage forskellige ting til at pynte din cykel med samt overraskelser. HUSK PRINTE OG MEDBRINGE DENNE MAIL TIL CYKELRINGRIDNING, REF. NR.: [REFFERENCE_NR] Vi ses lørdag d. 9. juli kl. 12.30 ved Fri BikeShop og pynter cykler, optoget gennem byen mod Ringriderpladsen starter kl. 13.30 Hvis du har spørgsmål send en e-mail til 6400borneland@gmail.com Med venlig hilsen Ringriderfestens Børneland'
    var shirts = [
        {
            color:"Pink",
            number:24,
            group:1
        },
        {
            color:"Dark Blue",
            number:24,
            group:1
        },
        {
            color:"Black",
            number:24,
            group:1
        },
        {
            color:"White",
            number:24,
            group:1
        },
        {
            color:"Red",
            number:24,
            group:1
        },
        {
            color:"Turquoise",
            number:24,
            group:1
        },
        {
            color:"Orange",
            number:24,
            group:1
        },
        {
            color:"Green",
            number:24,
            group:1
        },
        {
            color:"Grey",
            number:24,
            group:1
        },
        {
            color:"Yellow",
            number:24,
            group:1
        }
    ]
    var states = [{name:'Ready'}, {name:'Running'}, {name : 'Ended'}]
    return {

        events :[
            {

                id:1,
                states:states,
                state:"live",
                lane_capacity:12,
                max_lanes:8,
                shirts:shirts,
                event_name:"Sønderborg Cykelringridning 2016",
                event_date: "06/07/2016",
                html_content:  html_content,
                email_content: email_content,
                groups: groups
            }
        ],

        groups:groups,
        participants:getParticipant()

    }

}

var kig = groups;