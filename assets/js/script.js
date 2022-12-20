// selectig dom 

const cricketMatchElm = document.querySelector('.cricketSection .matchlist')

const footballMatchElm = document.querySelector('.footballSection .matchlist')

const preloaderElm = document.querySelector('.preloader')

const matchDetname = document.querySelector('.popup-body .match-name')

const matchDelScore = document.querySelector('.popup-body .short-score')

const matchDelStatus = document.querySelector('.match-result')

const matchDetCardElm = document.querySelector('.popup')

const detailscartClose = document.querySelector('.popup-header p')

if(detailscartClose){
    detailscartClose.addEventListener('click', () => {
        if(matchDetCardElm) {
            matchDetCardElm.style.display = 'none'
        }
    })
}


// preloader function

const preloader = {
    preload(res) {
        window.addEventListener('load', () => {
            preloaderElm.style.display = 'none'

        })

        if (res) preloaderElm.style.display = 'none'


    }
}

// fetching data from api

const fetchApiData = {
    async cricketData() {
        const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=1af58a04-1234-4515-b346-342f8c7103c2&offset=0')
        const result = await response.json()

        preloader.preload(result)

        return result;
    },

    async footabllData() {

    }
}

// data show in ui

const dataShowInUi = {
    async cricketDataShow() {

        const result = await fetchApiData.cricketData()



        result.data.forEach((elm, index) => {
            // console.log(elm);
            const htmlElm = `
            <div class="match">
                <p id="cteam">${elm.name}</p>
                <p id="cStatus">${elm.status}</p>
    
                <button type="button" class="${index} det-btn">See more</button>
            </div>
            `

            cricketMatchElm.insertAdjacentHTML('beforeend', htmlElm)


        })


    }
}

// button id generate 

function idGenerate(e) {
    return e.target.classList[0]
}

// Error message showing

async function errorApi(){
    const result = await fetchApiData.cricketData()


    if(result.info.hitsLimit >= 100){

        const htmlElm = `
            <h1 style="text-align: center; margin-top: 50px; color: red;">Api Error! Pleas try after a day...</h1>
        `

        document.write(htmlElm)
    }
}


// initialize method

// match details function

const matchDetails = {
    detailsFunc() {

        document.querySelector('.cricketSection .matchlist').addEventListener('click', async e => {
            if (e.target.type === 'button') {
                const matchdid = idGenerate(e)

                const result = await fetchApiData.cricketData()

                const match = result.data[Number(matchdid)]



                const htmlElm = `
                <p>${match.teams[0]} vs ${match.teams[1]}</p>

                <p id="match-venue">Match Type: ${match.matchType}</p>
                
                <p id="match-venue">Venue: ${match.venue}</p>
               `

                const htmlElmTwo = `
                <p> ${match.score[0].inning} <br> <img src="${match.teamInfo[0].img}">
                        
                <br>
                    <span> Runs: ${match.score[0].r} </span> <br>
                    <span> Wicket: ${match.score[0].w}</span><br>
                    <span> Over: ${match.score[0].o}</span><br>
                </p>

                    <br>

                <p>${match.score[1].inning} <br> <img src="${match.teamInfo[1].img}">
                        <br>
                        <span>Runs: ${match.score[1].r}</span><br>
                        <span>Wicket: ${match.score[1].w} </span><br>
                        <span>Over: ${match.score[1].o}</span>
                </p>
               `

               const htmlElmThree = `
                <p>${match.status}</p>
               `

               
                matchDetname.innerHTML = htmlElm

                matchDelScore.innerHTML = htmlElmTwo

                matchDelStatus.innerHTML = htmlElmThree

                document.querySelector('.popup').style.display = 'block'

            }
        })
    }
}



function init() {


    dataShowInUi.cricketDataShow()
    matchDetails.detailsFunc()
    errorApi()
}

init()