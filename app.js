const deleteTask = document.querySelector('#deleteTask');
const adddTask = document.querySelector('#addTask');
const editTask= document.querySelector('#edit');
const mainGrid = document.querySelector('#mainGrid');
let cards;
adddTask.addEventListener('click', function(){
    const card = document.createElement('div');
    const inputBox = document.createElement('input');

    const done = document.createElement('button');
    done.innerText = 'completed';

    card.className = 'task';
    card.setAttribute('style', 'background : white');
    inputBox.setAttribute('onclick', 'event.stopPropagation()');
    cards = card;
    
    card.appendChild(inputBox);
    card.appendChild(done);
    
    mainGrid.appendChild(card);
    
    inputBox.addEventListener('keyup', enterTask );
    document.body.addEventListener('click',  enterTask);

    function enterTask(e){
        if(inputBox.value == ""){
            card.remove();
        }
        else if((e.key == 'Enter' && this.tagName == 'INPUT') || this.tagName == 'BODY'){
            const value = inputBox.value;
            const span = document.createElement('span');

            span.innerText = value;
            inputBox.replaceWith(span);
            document.body.removeEventListener('click',  enterTask);
            inputBox.removeEventListener('keyup', enterTask);
        } 
    }
    done.addEventListener('click', function(){
        const functions = document.querySelector('#completed');
        console.log(functions);
        functions.appendChild(this.parentElement);
        this.parentElement.children[1].remove();
    })
});


deleteTask.addEventListener('click', function(){
    mainGrid.addEventListener('click', myFunction);
    
    for(let i=0; i<mainGrid.children.length; i++){
        mainGrid.children[i].addEventListener('mouseenter' ,addEffect);
        mainGrid.children[i].addEventListener('mouseleave' ,removeEffect);
    }

    function addEffect(){
        this.style.backgroundColor = "#C7C7C7";
    }
    function removeEffect(){
        this.style.backgroundColor = "white";
    }

    function myFunction(event){
        
        if(event.target.className== 'task'){
            event.target.remove();
        }

        mainGrid.removeEventListener('click', myFunction);
        for(let i=0; i<mainGrid.children.length; i++){
            mainGrid.children[i].removeEventListener('mouseenter' ,addEffect);
            mainGrid.children[i].removeEventListener('mouseleave' ,removeEffect);
        }
    };
})

editTask.addEventListener('click', function(){

    mainGrid.addEventListener('click', myFunction);

    for(let i=0; i<mainGrid.children.length; i++){
        mainGrid.children[i].addEventListener('mouseenter' ,addEffect);
        mainGrid.children[i].addEventListener('mouseleave' ,removeEffect);
    }

    function addEffect(){
        this.style.backgroundColor = "#C7C7C7";
    }
    function removeEffect(){
        this.style.backgroundColor = "white";
    }

    function myFunction(event){
        if(event.target.className == 'task'){            
            const inputBox = document.createElement('input');
            inputBox.value = event.target.children[0].innerText;
            
            inputBox.setAttribute('onclick', 'event.stopPropagation()');
            event.target.children[0].replaceWith(inputBox);
            
            
            inputBox.addEventListener('keyup', enterTask);
            document.body.addEventListener('click',  enterTask);
            
            function enterTask(e){
                 if( ( (e.key == 'Enter' && this.tagName == 'INPUT') || this.tagName == 'BODY')){
                    
                    const span = document.createElement('span');
                    span.innerText = inputBox.value;
                    inputBox.replaceWith(span);
                    inputBox.removeEventListener('keyup', enterTask);
                } 
            }
            event.target.style.backgroundColor = "white";
        }

        mainGrid.removeEventListener('click', myFunction);
        for(let i=0; i<mainGrid.children.length; i++){
            mainGrid.children[i].removeEventListener('mouseenter' ,addEffect);
            mainGrid.children[i].removeEventListener('mouseleave' ,removeEffect);
        }
    };

});