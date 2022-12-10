// selectig dom 

const cricketMatchElm = document.querySelector('.cricketSection .matchlist')

const footballMatchElm = document.querySelector('.footballSection .matchlist')

// fetching data from api

const fetchApiData = {
    async cricketData(){
        const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=1af58a04-1234-4515-b346-342f8c7103c2&offset=0')
        const result = await response.json()

        // console.log(result.data);

        return result;
    }, 

    async footabllData(){
        
    }
}

// data show in ui

const dataShowInUi = {
    async cricketDataShow(){

        const result = await fetchApiData.cricketData()

        // console.log( result.data);



        result.data.map( elm => {
            const htmlElm = `
            <div class="match">
                <p id="cteam">${elm.name}</p>
                <p id="cStatus">${elm.status}</p>
    
                <a href="#">see more...</a>
            </div>
            `

            cricketMatchElm.insertAdjacentHTML('beforeend', htmlElm)
        })

        
    }
}


// initialize method

function init(){
    

    dataShowInUi.cricketDataShow()
}

init()