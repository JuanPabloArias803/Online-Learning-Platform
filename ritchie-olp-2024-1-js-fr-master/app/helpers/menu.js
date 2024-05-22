export const menuCss= `
.empty{
    width: 100%;
    height: 50px;
    border: solid 1px black;
    border-top: 0px;
    border-bottom: 0px;
}

.menu-title{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    border-bottom: solid 1px black;
    background-color: blueviolet;
    color:white;
}

.menu-content{
    width: 100%;
    padding: 20px;
    height: fit-content;
    color: black;
}

.menu-container{
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    border: solid 1px black;
}

.menu-parent{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    background-color: blueviolet;
    color:white;
}
.menu-child{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    background-color: transparent;
    color: black;
}

.menu-child:hover{
    cursor: pointer;
    background: linear-gradient(rgb(119,72,205,0.3),rgb(119,72,205,0.3));
}

.menu-challenge-title{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    background-color: blueviolet;
    color:white;
}

.menu-challenges{
    width: 100%;
    padding: 20px;
    height: fit-content;
    text-align: center;
    background-color: transparent;
    color: black;
    border-bottom:0;
}

.menu-challenges:hover{
    cursor: pointer;
    background: linear-gradient(rgb(119,72,205,0.3),rgb(119,72,205,0.3));
}
`