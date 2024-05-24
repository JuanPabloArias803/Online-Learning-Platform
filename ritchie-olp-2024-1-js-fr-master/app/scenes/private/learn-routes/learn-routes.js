import { navigateTo } from '../../../Router';
import cursor from '../../../assets/rocket-coursor.png'
import { Card} from '../../../components/card/card';
import img from '../../../assets/galaxy.jpg'


export function RoutesScene(params){
    let pageContent=`
    <style>
        #routes-container{
            background-image: url('../../../assets/galaxy.jpg');
            background-size: cover;
            min-height: 90vh;
            cursor: url(${cursor}), auto;
            width: 100%;
            position:relative;
            padding:20px;
            overflow:hidden;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content:center;
            gap: 20px;
        }
    </style>
    <section id="routes-container"></section>
    `;
    let logic= async ()=>{
        const resp = await fetch('http://localhost:3000/routes');
        const routes = await resp.json();
        const routesContainer = document.getElementById('routes-container');
        routesContainer.innerHTML=`
            ${routes.map(route => `
                ${Card(route.name,route.id)}
            `).join('')}
        `;
        routes.forEach(e => {
            (async()=>{
                let resp2=await fetch(`http://localhost:3000/languages?routeID=${e.id}`);
                let languages=await resp2.json();
                languages.forEach(i => {
                    let selectCard=document.querySelector(`#card${e.id} ul`);
                    let newLI=document.createElement('li');
                    newLI.textContent=i.name;
                    selectCard.appendChild(newLI);
                });
           })();
        });
        document.querySelectorAll(".card-btn").forEach(btn => {
            btn.addEventListener('click', (e) => {
                navigateTo(`/dashboard/routes/languages?routeID=${e.target.id}`);
            });
        });
    }

    return {
        pageContent,
        logic
    };
}