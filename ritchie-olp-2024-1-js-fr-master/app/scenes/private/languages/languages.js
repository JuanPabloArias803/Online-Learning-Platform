import { navigateTo } from '../../../Router';
export function LanguagesScene(params){
    let pageContent = ``;
    let logic=function(){};
    if (params.get('routeID')) {
        const routeID = params.get('routeID');
        pageContent = `
            <div id="languages-container"></div>
        `;
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/routes?id=${routeID}`);
            const route = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/languages?routeID=${routeID}`);
            const languages = await resp2.json();
            const languagesContainer = document.getElementById('languages-container');
            const estilos = document.getElementById('estilos');
            languagesContainer.innerHTML=`
                <h1>${route[0].name}</h1>
                ${languages.map(l => `
                    <button id=${l.id} class="langBtn">
                        ${l.name}
                    </button>`
                ).join('')}
            `;
            document.querySelectorAll(".langBtn").forEach(btn => {
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
