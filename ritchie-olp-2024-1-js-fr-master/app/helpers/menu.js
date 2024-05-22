export const menuCss= `
.menu-title{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    border: solid 2px black;
    background-color: blueviolet;
}

.menu-content{
    width: 100%;
    padding: 20px;
    height: fit-content;
    border: solid 2px black;
    border-top: 0px;
    border-bottom: 0px;
    background-color: rgb(119,72,205,0.5);
    color: black;
}

.menu-container{
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
}

.menu-parent{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    border: solid 2px black;
    background-color: blueviolet;
}
.menu-child{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    border: solid 2px black;
    border-top: 0px;
    background-color: transparent;
    color: black;
}

.menu-child:hover{
    cursor: pointer;
    background: linear-gradient(rgb(119,72,205,0.3),rgb(119,72,205,0.3));
}
`