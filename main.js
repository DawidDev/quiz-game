class Game {
    constructor(){ 
        this.render();
    }

    render(){
        this.createStartPage();
    }

    // Tworzenie strony startowej
    createStartPage(){
        const mainHTML = document.querySelector('main')

        const headerBox = document.createElement('div');
        headerBox.className = 'header-box';
        mainHTML.appendChild(headerBox);

        const h4 = document.createElement('h4');
        h4.textContent = 'QUIZICKY';
        headerBox.appendChild(h4);

        const h3 = document.createElement('h3');
        headerBox.appendChild(h3)

        const mainContainer = document.createElement('div')
        mainContainer.className = 'container';
        mainHTML.appendChild(mainContainer)
        
        const startContainer = document.createElement('div');
        startContainer.className = 'start-container';
        mainContainer.appendChild(startContainer);

        const titleApp = document.createElement('h1');
        titleApp.textContent = 'QUIZICKY';
        startContainer.appendChild(titleApp)

        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.placeholder = 'Wpisz imię';
        startContainer.appendChild(inputName);

        const buttonAccept = document.createElement('button');
        buttonAccept.textContent = 'Dalej';
        buttonAccept.className = 'primary-button';
        startContainer.appendChild(buttonAccept);
        buttonAccept.addEventListener('click', () => { new ListQuiz(inputName.value) })
    }

    
    

}

const game = new Game()