
const https = require('https');
const config = require('./config.json');

const teams = config.Teams
const creds = config.APICreds

let userList = [{
    Name: "PersonA",
    teamsAssigned: [],
    avgOdds: 0}
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