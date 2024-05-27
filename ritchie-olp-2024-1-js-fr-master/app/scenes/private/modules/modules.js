import { navigateTo } from '../../../Router';
import cursor from '../../../assets/rocket-coursor.png'
import { Card} from '../../../components/card/card';
import img from '../../../assets/galaxy.jpg'
import { Menu } from '../../../components/menu/menu';
import { QuillDeltaToHtmlConverter  } from 'quill-delta-to-html';

export function ModulesScene(params){
    let pageContent = `
        <style>
        .modules-container{
            background-image: url('../../../assets/galaxy.jpg');
            background-size: cover;
            min-height: 90vh;
            cursor: url(${cursor}), auto;
            width: 100%;
            position:relative;
            padding:20px;
            overflow:hidden;
            display: flex;
            flex-direction:column;
            align-content: center;
            gap: 20px;
        }

        .menu-challenge-child div{
            padding:20px;
            width:100%;
        }

        .menu-challenge-child div:hover{
            cursor:pointer;
            background: linear-gradient(rgb(118, 38, 247,0.3),rgb(118, 38, 247,0.3));
        }

        </style> 
        <div class="modules-container"></div>
    `;
    let logic=function(){};
    if (params.get('languageID')) {
        const languageID = params.get('languageID');
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/languages?id=${languageID}`);
            const language = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/modules?languageID=${languageID}`);
            const modules = await resp2.json();
            const resp3 = await fetch(`http://localhost:3000/challenges?sectionType=language`);
            const languageChallenges = await resp3.json();
            const modulesContainer = document.querySelector('.modules-container');
            modulesContainer.innerHTML=Menu(language[0].name,"",`Módulos de ${language[0].name}`);
            const fixMenu1=document.querySelector(".menu-theory-content");
            fixMenu1.innerHTML=`
                <div id="editor"></div>
            `;
            //editor
            const converter = new QuillDeltaToHtmlConverter(JSON.parse(language[0].content).ops, {});
            const htmlContent = converter.convert();
            console.log(htmlContent);
            const editor = document.querySelector('#editor');
            editor.innerHTML = `${htmlContent}`;
            let addModules=document.querySelector('.menu-children-child');
            let addCards="";
            modules.forEach(e => {
                addCards+=Card(e.name,e.id)
            });
            addModules.innerHTML=`
                ${addCards}
                ${Card(`Crear Módulo de ${language[0].name}`,"createContent")}
                ${Card(`Crear Reto ${language[0].name}`,"create")}
            `;
            languageChallenges.filter(challenge=>challenge.idSection==language[0].id).forEach(e => {
                let selectSection=document.querySelector(`.menu-challenge-child`);
                let newChallenge=document.createElement('div');
                newChallenge.textContent=e.name;
                newChallenge.id = e.id;
                newChallenge.className="challengeDiv";
                newChallenge.style.textAlign="center";
                selectSection.appendChild(newChallenge);
            });
                
            const createContentBtn=document.querySelector("#createContent");
            createContentBtn.classList.remove('card-btn');
            createContentBtn.textContent="Crear..."
            createContentBtn.addEventListener('click', (e) => {
                navigateTo(`/dashboard/create-content?sectionType=module&parentId=${language[0].id}`);
            });

            const createCardBtn=document.querySelector("#create");
            createCardBtn.classList.remove('card-btn');
            createCardBtn.textContent="Crear..."
            createCardBtn.addEventListener('click', (e) => {
                navigateTo(`/dashboard/create-challenges?sectionType=language&sectionId=${languageID}&sectionTitle=${language[0].name}`);
            });
            
            document.querySelectorAll(".card-btn").forEach(btn => {
                btn.addEventListener('click', (e) => {
                    navigateTo(`/dashboard/routes/languages/modules/module-challenges?moduleID=${e.currentTarget.id}`);
                });
            });

            document.querySelectorAll(".challengeDiv").forEach(div => {
                div.addEventListener('click', (e) => {
                    navigateTo(`/dashboard/challenge?challengeID=${e.target.id}`);
                });
            });
        };
    }
    
    
    return {
        pageContent,
        logic
    };
}