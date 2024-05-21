export function ModulesScene(params){
    let pageContent = ``;
    let logic=function(){};
    if (params.get('languageID')) {
        const langaugeID = params.get('languageID');
        pageContent = `
            <div id="modules-container"></div>
        `;
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/languages?id=${langaugeID}`);
            const language = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/modules?languageID=${langaugeID}`);
            const modules = await resp2.json();
            console.log(modules);
            const modulesContainer = document.getElementById('modules-container');
            const estilos = document.getElementById('estilos');
            modulesContainer.innerHTML=`
                <h1>${language[0].name}</h1>
                ${modules.map(l => `
                    <button id=${l.id} class="moduleBtn">
                        ${l.name}
                    </button>`
                ).join('')}
            `;
            document.querySelectorAll(".moduleBtn").forEach(btn => {
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