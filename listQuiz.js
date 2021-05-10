const listButtons = [
    {
        id: 1,
        title: 'Gegrafia',
        img: 'img1',
        name: 'geography'
    },
    {
        id: 2,
        title: 'Miasta i stolice',
        img: 'img4',
        name: 'cities'
    },
    {
        id: 3,
        title: 'Filmy',
        img: 'img3',
        name: 'movies'
    },
    {   
        id: 4,
        title: 'Technologia',
        img: 'img4',
        name: 'it'
    },
]

class ListQuiz{
    constructor(name){
        console.log('list quiz ' + name);
        this.createListQuiz(name);
        this.createEventListener();
    }

    createListQuiz(name){
        const mainHTML = document.querySelector('.container');

        const headerBox = document.querySelector('.header-box')

        const h3 = document.querySelector('h3');
        h3.textContent = name;
    

        const quizListContainer = document.createElement('div');
        quizListContainer.className = 'quiz-list-container';
        mainHTML.appendChild(quizListContainer);

         // Tworzenie przycisków odpowiadających quizom
        listButtons.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'btn-quiz';
            btn.textContent = item.title;
            btn.setAttribute('id', item.id);
            btn.setAttribute('name', item.name);
            quizListContainer.appendChild(btn);

            const icon = document.createElement('img');
            icon.src = `img/${item.id}.png`
            btn.appendChild(icon)
        })

        // Tworzenie przycisku odpowiadającego do powrotu strony startowej
        const btnBackToStartPage = document.createElement('button');
        btnBackToStartPage.textContent = 'Cofnij';
        btnBackToStartPage.className = 'primary-button';
        quizListContainer.appendChild(btnBackToStartPage);
        btnBackToStartPage.addEventListener('click', () => { 
            setTimeout(() => { 
                quizListContainer.style.transform = 'translateY(100%)';
                setTimeout( ()=> { quizListContainer.remove()}, 500 ) 
                headerBox.style.transform = 'translateY(-100%)' 
            }, 100);
         });

        setTimeout(() => { 
            quizListContainer.style.transform = 'translateY(0%)' 
            headerBox.style.transform = 'translateY(0)'
        }, 100)
    }

    createEventListener(){
        const btns_quiz = document.querySelectorAll('.btn-quiz')
        btns_quiz.forEach(item => item.addEventListener('click', (e) => { new SelectedQuiz(e.target.id, e.target.name) }))
    }
}