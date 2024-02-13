document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector(".grid");
    const flags_left = document.querySelector("#flags-left");
    let result = document.querySelector("#results");
    //Create Board
    const width = 10;
    const bombAmount = 20;
    const squares = [];

    var isGameOver = false;

    function createBoard(){
        flags_left.innerHTML = bombAmount;

        const bombArray = Array(bombAmount).fill("bomb");
        const emptyArray = Array(width*width - bombAmount).fill("valid");

        const gameArray = bombArray.concat(emptyArray);

        const shuffledArray = gameArray.sort(()=>Math.random() - 0.5)

        for (let index = 0; index < width*width; index++) {
            const square = document.createElement("div");
            square.id =index;
            square.classList.add(shuffledArray[index]);

            grid.appendChild(square)

            squares.push(square)

            //normal click

            square.addEventListener('click',(e)=>{
                Click(square)
            })
        }

        //Add Number
       
     for(let i=0; i<squares.length; i++){
        let total =0;
        const isLeftEdge = (i%width ===0);
        const isRightEdge = (i === width-1)


        if(squares[i].classList.contains('valid')){
            if(i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++;
            if(i> 9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++;
            if(i > 10 && squares[i-width].classList.contains('bomb')) total++;
            if( i > 11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++;

            if( i< 98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++;
            if( i< 90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++;
            if(i < 88 && !isRightEdge && squares[i+1+width].classList.contains("bomb")) total++;
            if(i < 89 && squares[i+width].classList.contains('bomb')) total++;

            squares[i].setAttribute('data',total);

        }

        }
    }

    createBoard()

    //click on square action

    function Click(square){
        const currentId = square.id;
        if(isGameOver)return

        if(square.classList.contains('checked') || square.classList.contains('flag')) return
    
         
        if(square.classList.contains('bomb')){
            GameOver(square);
        }else{
            let total = square.getAttribute('data');
            if(total != 0){
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square,currentId);
        }
        square.classList.add('checked');
    }

    //checking neighbouring squares once clicked

    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width ===0);
        const isRightEdge = (currentId % width ===width-1);

        setTimeout(()=>{
            if(currentId > 0 && !isLeftEdge){
                const newId = squares[parseInt(currentId)-1].id
                const newSquare = document.getElementById(newId);

                Click(newSquare)
            }

            if(currentId > 9 && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }

            if( currentId > 10){
                const newId = squares[parseInt(currentId)-width].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }

            if( currentId > 11 && !isLeftEdge){
                const newId = squares[parseInt(currentId)-1-width].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }

            if( currentId < 98 && !isRightEdge){
                const newId = squares[parseInt(currentId)+1].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }

            if( currentId < 90 && !isLeftEdge){
                const newId = squares[parseInt(currentId)-1+width].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }

            if( currentId < 88 && !isRightEdge){
                const newId = squares[parseInt(currentId)+1+width].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }

            if( currentId < 89 ){
                const newId = squares[parseInt(currentId)+width].id
                const newSquare = document.getElementById(newId);
                Click(newSquare)
            }
        },10)

    }



   function GameOver(square){
      result .innerText = 'BOOM! Game Over'
      isGameOver = true;
      
      squares.forEach(function(square){
        if(square.classList.contains('bomb')){
            square.innerHTML = '💣'
            square.classList.remove('bomb');
            square.classList.add('checked');
        }
      })
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }



})