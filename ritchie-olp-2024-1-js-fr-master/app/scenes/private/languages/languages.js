import { navigateTo } from '../../../Router';
import cursor from '../../../assets/rocket-coursor.png'
import { Card} from '../../../components/card/card';
import img from '../../../assets/galaxy.jpg'
import { Menu } from '../../../components/menu/menu';
import { QuillDeltaToHtmlConverter  } from 'quill-delta-to-html';

export function LanguagesScene(params){
    let pageContent = `
        <style>
        .languages-container{
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
            width:100%;
            padding:20px;
        }

        .menu-challenge-child div:hover{
            cursor:pointer;
            background: linear-gradient(rgb(118, 38, 247,0.3),rgb(118, 38, 247,0.3));
        }

        </style>
        <section class="languages-container"></section>
    `;
    let logic=function(){};
    if (params.get('routeID')) {
        const routeID = params.get('routeID');
        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/routes?id=${routeID}`);
            const route = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/languages?routeID=${routeID}`);
            const languages = await resp2.json();
            const resp3 = await fetch(`http://localhost:3000/challenges?sectionType=route`);
            const routeChallenges = await resp3.json();
            const languagesContainer = document.querySelector('.languages-container');
            languagesContainer.innerHTML=Menu(route[0].name,"",`Lenguajes de ${route[0].name}`);
            const fixMenu1=document.querySelector(".menu-theory-content");
            fixMenu1.innerHTML=`
                <div id="editor"></div>
            `;
            //editor
            const converter = new QuillDeltaToHtmlConverter(JSON.parse(route[0].content).ops, {});
            const htmlContent = converter.convert();
            console.log(htmlContent);
            const editor = document.querySelector('#editor');
            editor.innerHTML = `${htmlContent}`;
            let addLanguage=document.querySelector('.menu-children-child');
            let addCards="";
            languages.forEach(e => {
                addCards+=Card(e.name,e.id)
            });
            addLanguage.innerHTML=`
                ${addCards}
                ${Card(`Crear Lenguaje de ${route[0].name}`,"createContent")}
                ${Card(`Crear Reto de ${route[0].name}`,"create")}
            `;
            routeChallenges.filter(challenge=>challenge.idSection==route[0].id).forEach(e => {
                console.log(e);
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
                navigateTo(`/dashboard/create-content?sectionType=language&parentId=${route[0].id}`);
            });

            const createCardBtn=document.querySelector("#create");
            createCardBtn.classList.remove('card-btn');
            createCardBtn.textContent="Crear..."
            createCardBtn.addEventListener('click', (e) => {
                navigateTo(`/dashboard/create-challenges?sectionType=route&sectionId=${routeID}&sectionTitle=${route[0].name}`);
            });

            document.querySelectorAll(".card-btn").forEach(btn => {
                btn.addEventListener('click', (e) => {
                    navigateTo(`/dashboard/routes/languages/modules?languageID=${e.currentTarget.id}`);
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
