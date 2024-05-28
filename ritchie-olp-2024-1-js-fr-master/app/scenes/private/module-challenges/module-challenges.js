
import { navigateTo } from '../../../Router';
import cursor from '../../../assets/rocket-coursor.png'
import { Card} from '../../../components/card/card';
import img from '../../../assets/galaxy.jpg'
import { Menu } from '../../../components/menu/menu';
import { QuillDeltaToHtmlConverter  } from 'quill-delta-to-html';

export function ModuleChallengesScene(params){
    let pageContent = `
        <style>
            .module-challenges-container{
                background-image: url(${img});
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
        <div class="module-challenges-container"></div>
    `;
    let logic=function(){};
    if (params.get('moduleID')) {
        const moduleID = params.get('moduleID');

        logic = async () =>{
            const resp = await fetch(`http://localhost:3000/modules?id=${moduleID}`);
            const module = await resp.json();
            const resp2 = await fetch(`http://localhost:3000/challenges?sectionType=module`);
            const moduleChallenges = await resp2.json();
            const moduleChallengesContainer = document.querySelector('.module-challenges-container');
            moduleChallengesContainer.innerHTML=Menu(module[0].name,module[0].content,``);
            const fixMenu1=document.querySelector(".menu-theory-content");
            fixMenu1.innerHTML=`
                <div id="editor"></div>
            `;
            //editor
            const converter = new QuillDeltaToHtmlConverter(JSON.parse(module[0].content).ops, {});
            const htmlContent = converter.convert();
            console.log(htmlContent);
            const editor = document.querySelector('#editor');
            editor.innerHTML = `${htmlContent}`;
            let addChallenges=document.querySelector('.menu-children-child');
            addChallenges.innerHTML=`
                ${Card(`Crear Reto de ${module[0].name}`,"create")}
            `;
            moduleChallenges.filter(challenge=>challenge.idSection==module[0].id).forEach(e => {
                let selectSection=document.querySelector(`.menu-challenge-child`);
                let newChallenge=document.createElement('div');
                newChallenge.textContent=e.name;
                newChallenge.id = e.id;
                newChallenge.className="challengeDiv";
                newChallenge.style.textAlign="center";
                selectSection.appendChild(newChallenge);
            });

            const createCardBtn=document.querySelector("#create");
            createCardBtn.classList.remove('card-btn');
            createCardBtn.textContent="Crear..."
            createCardBtn.addEventListener('click', (e) => {
                navigateTo(`/dashboard/create-challenges?sectionType=module&sectionId=${moduleID}&sectionTitle=${module[0].name}`);
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