

(PlayerCreator = () => {
    const p1name = document.getElementById('name1');
    const p2name = document.getElementById('name2');
    
    const p1x = document.getElementById('p1x');
    const p1o = document.getElementById('p1o');
    const p2x = document.getElementById('p2x');
    const p2o = document.getElementById('p2o');

    const p1save = document.getElementById('p1save');
    const p2save = document.getElementById('p2save');

    let p1Obj = {};
    let p2Obj = {};
    
    let history = [];
    let historyDiv = document.getElementById('history');

    Form1Checker = () => {
        if (p1name.value == ''){return false;}
        else if (p1name.value == undefined) {return false;}
        else if (p1x.checked == true) {
            if (p1o.checked == false) {return true;} 
            else {return false;}
        }
        else if (p1o.checked == true) {
            if (p1x.checked == false) {return true;} 
            else {return false;}
        }
        else if (p1o.checked == false && p1x.checked == false){return false;}
        else {return true;}
    }
    Form2Checker = () => {
        if (p2name.value == '') {return false}
        else if (p2name.value == undefined) {return false}
        else if (p2x.checked == true) {
            if (p2o.checked == false) {return true;} 
            else {return false;}
        }
        else if (p2o.checked == true) {
            if (p2x.checked == false) {return true;} 
            else {return false;}
        }
        else if (p2o.checked == false && p2x.checked == false){return false;}
        else {return true;}
    }

    GeneratePlayer1 = (FirName, FirSymbol ) => {
        name = FirName;
        symbol = FirSymbol;
        turn = true;
        return {name, symbol, turn};
    }
    GeneratePlayer2 = (SecName, SecSymbol ) => {
        name = SecName;
        symbol = SecSymbol;
        turn = false;
        return {name, symbol, turn};
    }

    P1Symbol = () => {
        if (p1o.checked == true){return "O"}
        else if (p1x.checked == true){return "X"}
    };
    P2Symbol = () => {
        if (p2o.checked == true){return "O"}
        else if (p2x.checked == true){return "X"}
    };


    (InstallEventListeners = (p1save, p2save, p1x, p1o, p2x, p2o) => {
        p1save.addEventListener('click', function() {
            if (Form1Checker() === true) {
                console.log("Site 1 Check Pass");
                p1Obj = GeneratePlayer1(p1name.value, P1Symbol());
            } else {
                throw "Please Finish Player 1";
            }
        });
        p2save.addEventListener('click', function() {
            if (Form2Checker() === true) {
                console.log("Site 2 Check Pass");
                p2Obj = GeneratePlayer2(p2name.value, P2Symbol());
            } else {
                throw "Please Finish Player 2";
            }
        });

        p1x.addEventListener('click', function() {
            p2o.checked = true;
            p2x.checked = false;
        });
        p1o.addEventListener('click', function() {
            p2x.checked = true;
            p2o.checked = false;
        });
        p2x.addEventListener('click', function() {
            p1o.checked = true;
            p1x.checked = false;
        });
        p2o.addEventListener('click', function() {
            p1x.checked = true;
            p1o.checked = false;
        });

        $('.tttspot').one('click', function() {
            if (p1Obj.turn === true) {
                this.innerText = p1Obj.symbol;
                p1Obj.turn = false;
                p2Obj.turn = true;
                let turn = {
                    id : this.id,
                    name : p1Obj.name,
                    symbol : p1Obj.symbol
                }
                history.push(turn);
            } else {
                this.innerText = p2Obj.symbol;
                p2Obj.turn = false;
                p1Obj.turn = true;
                let turn = {
                    id : this.id,
                    name : p2Obj.name,
                    symbol : p2Obj.symbol
                }
                history.push(turn);
            }
            Render(p1Obj, p2Obj);
        });

    })(p1save, p2save, p1x, p1o, p2x, p2o, p1Obj, p2Obj);

    Render = (p1Obj, p2Obj) => {
        if (p1Obj.name === undefined){return}
        if (p2Obj.name === undefined){return}
        
        while (historyDiv.firstChild) {
            historyDiv.removeChild(historyDiv.firstChild);
        }

        history.forEach(function(element,index,arr) {
            let list = document.createElement('input');
            list.setAttribute('type', 'button');
            list.setAttribute('value', `Turn: ${index}, Player: ${element.name}, Marker: ${element.symbol}, Spot: ${element.id}`);
            historyDiv.appendChild(list);
            
        });
        
    };

    
    

    HistoryTracker = (id, name, symbol) => {
        history.push({id, name, symbol});

        //

        
    };

})();

