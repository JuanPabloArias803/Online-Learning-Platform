import Quill from 'quill'; // Importa Quill desde node_modules
import 'quill/dist/quill.snow.css';
//import 'quill/dist/quill.bubble.css'; // para el tema bubble
import { ToolbarContainer } from '../../../components/quill-toolbar/toolbar';
import styles from './challenge.css';
import { fetchApi } from '../../../helpers/fetch-api';
import { navigateTo } from '../../../Router';
import { Menu } from '../../../components/menu/menu';
import cursor from '../../../assets/rocket-coursor.png'


export function CreateContentScene(params) {
    let pageContent="";
    let logic=function () {};
    if(params.get('sectionType')){
        const sectionType = params.get('sectionType');
        const parentId=params.get('parentId');
        let sectionTitle;
        if(params.get('sectionType')=="route"){
            sectionTitle="Ruta";
        }else if(params.get('sectionType')=="language"){
            sectionTitle="Lenguaje";
        }else if(params.get('sectionType')=="module"){
            sectionTitle="Módulo";
        }
    
    const editorContent = `<div id="editor" class="${styles.editor}"></div>`
    pageContent = `
    <style>
        .createContent-container{
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
        }
        </style>
        <section class="createContent-container">
            ${Menu(`Crear ${sectionTitle}`)}
        </section>
    `;

    const persistContent = (quill) => {
        const content = quill.getContents();  // Obtén el contenido como Delta
        localStorage.setItem('quillContent', JSON.stringify(content));
    }

    // Lógica para inicializar y configurar Quill
    logic = () => {
        // Quill.register('modules/formula', MathQuillBlot);
        // Espera a que el DOM esté completamente cargado
        const fixMenu= document.querySelector(".menu-children");
        const fixMenu2=document.querySelector(".menu-challenges");
        const fixMenu3=document.querySelector(".menu-theory-content")
        fixMenu.style.display="none";
        fixMenu2.style.display="none";
        fixMenu3.innerHTML=`
            <form class="${styles.newForm}" id="create-challenge-form">
                <div class="${styles["challenge_title-container"]}">
                    <label for="title">Título</label>
                    <input type="text" id="title" name="title" class="${styles["challenge_title-input"]}">
                </div>
                <div>
                    ${ToolbarContainer()}
                    ${editorContent}
                </div>
                <div class="${styles["action-buttons"]}">
                    <button type="submit">Crear</button>
                </div>
            </form>
        `;

        const quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar-container',
            },
            placeholder: 'Aquí puedes introducir la teoría...',
            theme: 'snow',
            // modules: {
            //     formula: true,
            // }
        });

        // Listener para manejar la publicación del contenido, o sea, enviar a base de datos.
        document.querySelector('#create-challenge-form')
            .addEventListener('submit', async (e) => {
                // Evita que el formulario se envíe
                e.preventDefault();
                // Valida que el título y la descripción no estén vacíos
                const titleValue = document.querySelector('#title').value;
                if (!titleValue) {
                    alert('Por favor, ingresa un título');
                    return;
                }
                persistContent(quill);
                if (!localStorage.getItem('quillContent')) {
                    alert('Por favor, ingresa la teoría');
                    return;
                }
                if (confirm("¿Estás seguro de que deseas crear este contenido?")) {
                    // Aquí va la lógica para enviar el contenido a la base de datos
                    try {
                        if(sectionType=="route"){
                            const data = {
                                id: Math.floor((Math.random()*1000000000)+1),
                                name: titleValue,
                                content: localStorage.getItem('quillContent'),
                            }
                            const response = await fetchApi('http://localhost:3000/routes', {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });
                            alert('Contenido publicado con éxito');
                            document.querySelector('#create-challenge-form').reset(); // Resetea el formulario
                            navigateTo('/dashboard');
                        }else if(sectionType=="language"){
                            const data = {
                                id: Math.floor((Math.random()*1000000000)+1),
                                name: titleValue,
                                content: localStorage.getItem('quillContent'),
                                routeID: parentId
                            }
                            const response = await fetchApi('http://localhost:3000/languages', {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });
                            alert('Contenido publicado con éxito');
                            document.querySelector('#create-challenge-form').reset(); // Resetea el formulario
                            navigateTo('/dashboard/');
                        }else if(sectionType=="module"){
                            const data = {
                                id: Math.floor((Math.random()*1000000000)+1),
                                name: titleValue,
                                content: localStorage.getItem('quillContent'),
                                languageID: parentId
                            }
                            const response = await fetchApi('http://localhost:3000/modules', {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });
                            alert('Contenido publicado con éxito');
                            document.querySelector('#create-challenge-form').reset(); // Resetea el formulario
                            navigateTo('/dashboard/');
                        }
                        
                    } catch (error) {
                        alert('Ha ocurrido un error al publicar el reto. Por favor, inténtalo de nuevo más tarde.');
                        console.error('Error al publicar el reto:', error);
                    }
                } });
    };

    // Retorna el contenido de la página y la función de lógica
    
}
return {
    pageContent,
    logic
}
}
