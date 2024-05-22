import { menuCss } from "../../../helpers/menu";
export function ModulesScene(params){
    let pageContent = ``;
    let logic=function(){};
    if (params.get('languageID')) {
        const langaugeID = params.get('languageID');
        pageContent = `
            <style>
                ${menuCss}
            </style>    
            <div class="menu-container"></div>
        `;
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/languages?id=${langaugeID}`);
            const language = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/modules?languageID=${langaugeID}`);
            const modules = await resp2.json();
            console.log(modules);
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
            `;
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