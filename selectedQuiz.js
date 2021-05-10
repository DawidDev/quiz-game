class SelectedQuiz {
    constructor(id_Category, name_Category){
        console.log('selectedQuiz');
        this.createQuizContainer();
        this.idCategory = id_Category;
        this.nameCategory = name_Category;
    }

    setLevel(level){
        this.choosedLevel = level;
        const buttons = document.querySelectorAll('.level-button');
        buttons.forEach(item => item.classList.remove('checked'))
        buttons[level-1].classList.toggle('checked')

    }

    createQuizContainer(){
        const mainHTML = document.querySelector('.container');

        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container';
        mainHTML.appendChild(quizContainer);


        // Tworzenie przycisku odpowiadającego do powrotu strony z quizami
        const backToList = document.createElement('button');
        backToList.className = 'primary-button';
        backToList.textContent = 'Wróć';
        quizContainer.appendChild(backToList)
        backToList.addEventListener('click', () => { 
            quizContainer.style.transform = 'translateY(100%)'
            setTimeout(() => { quizContainer.remove() }, 500)
            })


        // Tworzenie koncenera dla przycisków wyboru poziomu
        const levelBox = document.createElement('div');
        levelBox.className = 'level-box';
        quizContainer.appendChild(levelBox);

        const levels = [1, 2, 3];
        levels.map(item => {
            const btn = document.createElement('button');
            btn.className = 'level-button';
            btn.textContent = item;
            levelBox.appendChild(btn);
            btn.addEventListener('click', this.setLevel.bind(this, item));
        })

        // Tworzenie przycisku rozpoczynającego quiz
        const btnStartQuiz = document.createElement('button');
        btnStartQuiz.textContent = 'Start';
        btnStartQuiz.className = 'primary-button';
        quizContainer.appendChild(btnStartQuiz);
        btnStartQuiz.addEventListener('click', () => { new QuizProcess(this.idCategory, this.nameCategory, this.choosedLevel) })


        setTimeout(() => { quizContainer.style.transform = 'translateY(0%)' }, 100)
    }
}