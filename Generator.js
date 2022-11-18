
const https = require('https');
const creds = require('./apikey.json');

const teams = [
{
    id: 1,
    country: 'Qatar',
    assignedTo: null,
    seeding: 1,
    odds: null
}, 
{
    id: 2,
    country: 'Brazil',
    assignedTo: null,
    seeding: 1,
    odds: null
},
{
    id: 3,
    country: 'Belgium',
    assignedTo: null,
    seeding: 1,
    odds: null
}, 
{
    id: 4,
    country: 'France',
    assignedTo: null,
    seeding: 1,
    odds: null
},
{
    id: 5,
    country: 'Argentina',
    assignedTo: null,
    seeding: 1,
    odds: null
}, 
{
    id: 6,
    country: 'England',
    assignedTo: null,
    seeding: 1,
    odds: null
},
{
    id: 7,
    country: 'Spain',
    assignedTo: null,
    seeding: 1,
    odds: null
}, 
{
    id: 8,
    country: 'Portugal',
    assignedTo: null,
    seeding: 1,
    odds: null
},
{
    id: 9,
    country: 'Mexico',
    assignedTo: null,
    seeding: 2,
    odds: null
}, 
{
    id: 10,
    country: 'Netherlands',
    assignedTo: null,
    seeding: 2,
    odds: null
},
{
    id: 11,
    country: 'Denmark',
    assignedTo: null,
    seeding: 2,
    odds: null
}, 
{
    id: 12,
    country: 'Germany',
    assignedTo: null,
    seeding: 2,
    odds: null
},
{
    id: 13,
    country: 'Uruguay',
    assignedTo: null,
    seeding: 2,
    odds: null
}, 
{
    id: 14,
    country: 'Switzerland',
    assignedTo: null,
    seeding: 2,
    odds: null
},
{
    id: 15,
    country: 'USA',
    assignedTo: null,
    seeding: 2,
    odds: null
}, 
{
    id: 16,
    country: 'Croatia',
    assignedTo: null,
    seeding: 2,
    odds: null
},
{
    id: 17,
    country: 'Senegal',
    assignedTo: null,
    seeding: 3,
    odds: null
}, 
{
    id: 18,
    country: 'Iran',
    assignedTo: null,
    seeding: 3,
    odds: null
},
{
    id: 19,
    country: 'Japan',
    assignedTo: null,
    seeding: 3,
    odds: null
}, 
{
    id: 20,
    country: 'Morocco',
    assignedTo: null,
    seeding: 3,
    odds: null
},
{
    id: 21,
    country: 'Serbia',
    assignedTo: null,
    seeding: 3,
    odds: null
}, 
{
    id: 22,
    country: 'Poland',
    assignedTo: null,
    seeding: 3,
    odds: null
},
{
    id: 23,
    country: 'South Korea',
    assignedTo: null,
    seeding: 3,
    odds: null
}, 
{
    id: 24,
    country: 'Tunisia',
    assignedTo: null,
    seeding: 3,
    odds: null
},
{
    id: 25,
    country: 'Cameroon',
    assignedTo: null,
    seeding: 4,
    odds: null
}, 
{
    id: 26,
    country: 'Canada',
    assignedTo: null,
    seeding: 4,
    odds: null
},
{
    id: 27,
    country: 'Ecuador',
    assignedTo: null,
    seeding: 4,
    odds: null
}, 
{
    id: 28,
    country: 'Saudi Arabia',
    assignedTo: null,
    seeding: 4,
    odds: null
},
{
    id: 29,
    country: 'Ghana',
    assignedTo: null,
    seeding: 4,
    odds: null
}, 
{
    id: 30,
    country: 'Wales',
    assignedTo: null,
    seeding: 4,
    odds: null
},
{
    id: 31,
    country: 'Costa Rica',
    assignedTo: null,
    seeding: 4,
    odds: null
}, 
{
    id: 32,
    country: 'Australia',
    assignedTo: null,
    seeding: 4,
    odds: null
}
]

let userList = [{
    Name: "PersonA",
    teamsAssigned: [],
    avgOdds: 0},
];





    
let oddsApi = (tournament, apikey, region, markets, format, bookmakers, teamList) => {

    let req = `https://api.the-odds-api.com/v4/sports/${tournament}/odds/?apiKey=${apikey}&regions=${region}&markets=${markets}&oddsformat=${format}&bookmakers=${bookmakers}`

    https.get(req, (res) =>{
        let data = '';
    
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        let teamData = JSON.parse(data)[0].bookmakers[0].markets[0].outcomes
    
        for(const oddsTeam of teamData){
            
            //console.log(oddsTeam.name)
            
            teamList.forEach(t => {
                
                if(t.country == oddsTeam.name){
                    t.odds = oddsTeam.price
                }
            })
            
        }


        console.log(teamList)
       
      });
    
    }).on("error", (err) => {
      console.log(`Error: ${err.message}`);
    });
}

let sweepGenerator = (teams, userList) =>{

    oddsApi(creds.tournament, creds.apikey, creds.region, creds.market, creds.format, creds.bookmakers, teams)

    let maxTeams = Math.floor(teams.length / userList.length);
    let usedIDs = []
    
    do{
    
        for(const user of userList){
            if(user.teamsAssigned.length < maxTeams){
            
                let drawn = false;
        
                do{
                let drawNumber = Math.round(Math.random() * teams.length);
                if(!(usedIDs.includes(drawNumber)) && drawNumber !== 0){
         
                    usedIDs.push(drawNumber);
                    selected = teams.find(t => t.id === drawNumber);
                    user.teamsAssigned.push(selected.country)
                    drawn = true;
        
                    console.log(user.Name + " has been drawn " + selected.country + "!")
                    
                }
        
                } while (drawn = false)
                
                }
    
        }
    
        } while ((maxTeams * userList.length) != usedIDs.length)
        
      
    
    
}

sweepGenerator(teams, userList);


//console.log(creds.market);