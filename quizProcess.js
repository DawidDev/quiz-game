class QuizProcess{
    constructor(id_Category, name_Category, choosed_level){
        console.log('QuizProcess');
        console.log(choosed_level)
        this.idCategory = id_Category;
        this.nameCategory = name_Category;
        this.fetchQuestions(name_Category, choosed_level)
    }

    fetchQuestions(nameCategory, level){
        fetch(`questions/${nameCategory}.json`)
        .then(response => response.json())
        .then(data => data.questions.filter(item => item.level === level)) // filtrownaie po levelu
        .then(data => this.renderProcess(data))
    }

    renderProcess(tab){
        // Gotowa tablica z pytaniami i odpowiedziami
        let readyAsks = [];

        let gettedAnswers = [];

        // Uzupełnianie tablicy readyAsks obiektami z pytaniami + odpowiedziami + prawdą
        let i = 0;
        while (i < 10) {
            const idAsk = Math.floor(Math.random() * (tab.length - 0));
            readyAsks.push( tab[idAsk] )
            i++;
        } console.log(readyAsks);
        

        // Tworzenie kontenera, gdzie będą wyświetlał quiz w trakcie 
        const mainHTML = document.querySelector('.container');
        const processBox = document.createElement('div');
        processBox.className = 'process-box';
        mainHTML.appendChild(processBox);
        setTimeout(() => { processBox.style.transform = 'translateY(0%)' }, 100)

        const lineProgress = document.createElement('div');
        lineProgress.className = 'progress-bar';
        processBox.appendChild(lineProgress);

        const progress = document.createElement('div');
        progress.className = 'progress';
        lineProgress.appendChild(progress);

        const progressNumber = document.createElement('div');
        progressNumber.className = 'progress-number'
        processBox.appendChild(progressNumber);

        // Zmienna opisująca numer aktualnego pytania zadawanego w quizie
        let stepProcess = 0;
        const possibleAnswers = 3;

        // Renderowanie pytania quizowego
        const renderAsk = (tab) => {
            const box = document.createElement('div');
            box.className = 'ask-box';
            box.style.zIndex = stepProcess + 1;
            processBox.appendChild(box);

            // Zwiększanie progresu na pasku postępu quizu i w numerze postępu
            progress.style.width = `${(stepProcess + 1)}0%`;
            progressNumber.textContent = `${stepProcess + 1} / 10`;

            const question = document.createElement('p');
            box.appendChild(question);
            question.textContent = tab[stepProcess].question;

            for (let j = 0; j <= possibleAnswers - 1; j++) {
                const btnAnswer = document.createElement('button');
                box.appendChild(btnAnswer);
                btnAnswer.textContent = tab[stepProcess].answer[j];
                btnAnswer.addEventListener('click', () => {
                    const obj = {
                        question: tab[stepProcess].question,
                        truth: tab[stepProcess].truth,
                        answer: tab[stepProcess].answer[j],
                    }
                 
                    // Tworzenie kopii tablicy głównej zawierającej odpowiedzi, aby przypisać od razu nową wartość
                    const newtab = [...gettedAnswers];
                    newtab.push(obj)
                    gettedAnswers = newtab;
                    if(newtab.length < 10) stepProcess++//else if(newtab.length === 10)  this.endProcess(newtab)
                    setTimeout( () => { renderAsk(tab); }, 500)
                } )
            }
            
            if(gettedAnswers.length === 10) { setTimeout(()=> {  this.endProcess(gettedAnswers) }, 500) }
        }
        renderAsk(readyAsks)

    }

    endProcess(tab){
        console.log('Udzielone odpowiedzi ');
        console.log(tab);

        // Tworzenie kontenera wyniku quizu
        const mainHTML = document.querySelector('.container');
        const score = document.createElement('div');
        score.className = 'score-container';
        mainHTML.appendChild(score);
        setTimeout(() => { score.style.transform = 'translateY(0%)' }, 100)

        // Obliczanie statystyk
        const goodAnswer = tab.filter(item => item.truth === item.answer).length;
        console.log(goodAnswer + ' / ' + tab.length);

        const points = document.createElement('div');
        points.className = 'points';
        points.textContent = `${goodAnswer} / ${tab.length}`
        score.appendChild(points);

        const ring = document.createElement('div');
        ring.className = 'ring-background';
        points.appendChild(ring);
        setTimeout(() => { 
            ring.style.width = '100%'; 
            ring.style.height = '100%'; 
        }, 500)

        
        // Tworzenie zmiennych odnoszących się do poszczególnych 'container-ów' do usunięcia z DOM
        const oldQuizContainer_remove = document.getElementsByClassName('quiz-container');
        const quizListContainer_remove = document.getElementsByClassName('quiz-list-container');
        const processBox_remove = document.getElementsByClassName('process-box');
        const scoreContainer_remove = document.getElementsByClassName('score-container');

        const btnBackToQuiz = document.createElement('button');
        btnBackToQuiz.className = 'primary-button'
        btnBackToQuiz.textContent = 'Spróbuj jeszcze raz';
        score.appendChild(btnBackToQuiz);
        btnBackToQuiz.addEventListener('click', () => {

            scoreContainer_remove[0].remove();
            processBox_remove[0].remove();
            oldQuizContainer_remove[0].remove();
            
            new SelectedQuiz(this.idCategory, this.nameCategory);    
        })

        const btnBackToList = document.createElement('button');
        btnBackToList.className = 'primary-button';
        btnBackToList.textContent = 'Wybierz inny quiz';
        score.appendChild(btnBackToList);
        btnBackToList.addEventListener('click', () => {

            scoreContainer_remove[0].style.transform = 'translateY(100%)'
            setTimeout( () => { scoreContainer_remove[0].remove(); }, 500 )

            processBox_remove[0].remove();
            //if(quizListContainer_remove.length > 0){quizListContainer_remove[0].remove();} 
            oldQuizContainer_remove[0].remove();

        })
    }
}