import { navigateTo } from '../../../Router';
import { menuCss } from '../../../helpers/menu';
export function LanguagesScene(params){
    let pageContent = ``;
    let logic=function(){};
    if (params.get('routeID')) {
        const routeID = params.get('routeID');
        pageContent = `
            <style>
                ${menuCss}
            </style>
            <div class="menu-container"></div>
        `;
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/routes?id=${routeID}`);
            const route = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/languages?routeID=${routeID}`);
            const languages = await resp2.json();
            console.log(languages);
            const resp3 = await fetch(`http://localhost:3000/challenges?sectionType=route`);
            const routeChallenges = await resp3.json();
            const languagesContainer = document.querySelector('.menu-container');
            languagesContainer.innerHTML=`
                <div class="menu-title">${route[0].name}</div>
                <div class="menu-content">${route[0].content}</div>
                <div class="menu-parent">Lenguajes de ${route[0].name}</div>
                ${languages.map(l => `
                    <div id=${l.id} class="menu-child">
                        ${l.name}
                    </div>`
                ).join('')}
                <div class="menu-challenge-title">Retos de ${route[0].name}</div>
                ${routeChallenges.filter(e=>e.idSection==routeID).map(l => `
                    <div id=${l.id} class="menu-challenges">
                        ${l.name}
                    </div>`
                ).join('')}
            `;
            if(languages.length === 0){
                const $parent=document.querySelector(".menu-parent");
                $parent.style.marginBottom="60px";
            }
            if(routeChallenges.filter(e=>e.idSection==routeID).length===0){
                const $challengeTitle=document.querySelector(".menu-challenge-title");
                $challengeTitle.style.marginBottom="60px";
            }
            document.querySelectorAll(".menu-child").forEach(btn => {
                btn.addEventListener('click', (e) => {
                    navigateTo(`/dashboard/routes/languages/modules?languageID=${e.currentTarget.id}`);
                });
            });
        };
    }
    
    
    return {
        pageContent,
        logic
    };
}
