
import { navigateTo } from '../../../Router';
export function ModulesScene(params){
    let pageContent = ``;
    let logic=function(){};
    if (params.get('languageID')) {
        const languageID = params.get('languageID');
        pageContent = `
            <style>
              
            </style>    
            <div class="menu-container"></div>
        `;
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/languages?id=${languageID}`);
            const language = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/modules?languageID=${languageID}`);
            const modules = await resp2.json();
            const resp3 = await fetch(`http://localhost:3000/challenges?sectionType=language`);
            const languageChallenges = await resp3.json();
            const modulesContainer = document.querySelector('.menu-container');
            modulesContainer.innerHTML=`
                <div class="menu-title">${language[0].name}</div>
                <div class="menu-content">${language[0].content}</div>
                <div class="menu-parent">Modulos de ${language[0].name}</div>
                ${modules.map(l => `
                    <div id=${l.id} class="menu-child">
                        ${l.name}
                    </div>`
                ).join('')}
                <div class="menu-challenge-title">Retos de ${language[0].name}</div>
                ${languageChallenges.filter(e=>e.idSection==languageID).map(l => `
                    <div id=${l.id} class="menu-challenges">
                        ${l.name}
                    </div>`
                ).join('')}
            `;
            if(modules.length === 0){
                const $parent=document.querySelector(".menu-parent");
                $parent.style.marginBottom="60px";
            }
            if(languageChallenges.filter(e=>e.idSection==languageID).length===0){
                const $challengeTitle=document.querySelector(".menu-challenge-title");
                $challengeTitle.style.marginBottom="60px";
            }
            document.querySelectorAll(".menu-child").forEach(btn => {
                btn.addEventListener('click', (e) => {
                    navigateTo(`/dashboard/routes/languages/modules/module-challenges?moduleID=${e.currentTarget.id}`);
                });
            });
        };
    }
    
    
    return {
        pageContent,
        logic
    };
}