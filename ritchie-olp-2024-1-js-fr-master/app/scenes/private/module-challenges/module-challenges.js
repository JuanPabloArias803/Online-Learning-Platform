import { menuCss } from "../../../helpers/menu";
import { navigateTo } from '../../../Router';
export function ModuleChallengesScene(params){
    let pageContent = ``;
    let logic=function(){};
    if (params.get('moduleID')) {
        const moduleID = params.get('moduleID');
        pageContent = `
            <style>
                ${menuCss}
            </style>    
            <div class="menu-container"></div>
        `;
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/modules?id=${moduleID}`);
            const module = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/challenges?sectionType=module`);
            const moduleChallenges = await resp2.json();
            const moduleChallengesContainer = document.querySelector('.menu-container');
            moduleChallengesContainer.innerHTML=`
                <div class="menu-title">${module[0].name}</div>
                <div class="menu-content">${module[0].content}</div>
                <div class="menu-challenge-title">Retos de ${module[0].name}</div>
                ${moduleChallenges.filter(e=>e.idSection==moduleID).map(l => `
                    <div id=${l.id} class="menu-child">
                        ${l.name}
                    </div>`
                ).join('')}
            `;
            if(moduleChallenges.filter(e=>e.idSection==moduleID).length===0){
                const $challengeTitle=document.querySelector(".menu-challenge-title");
                $challengeTitle.style.marginBottom="60px";
            }
            document.querySelectorAll(".menu-child").forEach(btn => {
                btn.addEventListener('click', (e) => {
                    //navigateTo(`/dashboard/routes/languages?routeID=${extractNumber(e.currentTarget.id)}`);
                    console.log(e.target.id);
                });
            });
        };
    }
    
    
    return {
        pageContent,
        logic
    };
}