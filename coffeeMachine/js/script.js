let money = document.getElementById("money");
let display = document.getElementById("display");
let bill_acc = document.getElementById("bill_acc");
let displayInfo = document.getElementById("displayInfo");
let displayBalance = document.getElementById("displayBalance");
let progressBar = document.getElementsByClassName("progress-bar")[0];
let change_box = document.getElementById("change_box");
let lock = document.getElementById("lock");
let progress = 0;
let coffee_cup = document.getElementById("coffee_cup");
function getCoffee(coffeName,coffePrice){
  let audio = new Audio("audio/click.mp3");
  audio.play();
  if(+money.value>=coffePrice){
    money.value = +money.value-coffePrice;
    displayBalance.innerText = money.value;
    let timerId = setInterval(()=>{
    lock.hidden = false;
    if(progress>115){
      let audio = new Audio("audio/ready.mp3");
      audio.play();
      clearInterval(timerId);
      progressBar.hidden = true;
      progressBar.style.width = 0+'%';
      displayInfo.innerHTML = `<i class="fas fa-mug-hot"></i> Кофе "${coffeName} готов`;
      progress = 0;
      coffee_cup.hidden = false;
      lock.hidden = true;
      return;
    }
    else if(progress<20){
      let audio = new Audio("audio/process.mp3");
      audio.play();
      displayInfo.innerHTML = '<i class="fas fa-hourglass-start"></i> Приготовление...';
    }
    else if(progress<60) displayInfo.innerHTML = '<i class="fas fa-hourglass-half"></i> Приготовление...';
    else{
      let audio = new Audio("audio/flow.mp3");
      audio.play();
      displayInfo.innerHTML = '<i class="fas fa-hourglass-end"></i> Приготовление...';
    }
    progressBar.hidden = false;
    progressBar.style.width = ++progress+'%';
    },70)
    }else{
      let audio = new Audio("audio/nomoney.mp3");
      audio.play();
      displayInfo.innerHTML = `<i class="far fa-frown"></i> Недостаточно средств`;
      coffee_cup.hidden = true;
  }
}

let banknotes = document.querySelectorAll("[src$='rub.jpg']");
let zIndex = 1;
for (let i=0; i<banknotes.length; i++){
  let banknote = banknotes[i];
  banknote.onmousedown = function(e){
    banknote.ondragstart = function(){return false;}
    this.style.position = 'absolute';
    this.style.zIndex = ++zIndex;
    this.style.transform = 'rotate(90deg)';
    moveAt(e);
    function moveAt(event){
      banknote.style.top = (event.clientY-banknote.offsetHeight/2)+"px";
      banknote.style.left = (event.clientX-banknote.offsetWidth/2)+"px";
    }
    document.addEventListener('mousemove',moveAt);
    this.onmouseup = function(){
      document.removeEventListener('mousemove',moveAt);
      let bill_acc_top = bill_acc.getBoundingClientRect().top;
      bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height*2/3);
      bill_acc_left = bill_acc.getBoundingClientRect().left;
      bill_acc_right = bill_acc.getBoundingClientRect().right;
      let banknote_top = this.getBoundingClientRect().top;
      let banknote_left = this.getBoundingClientRect().left;
      let banknote_right = this.getBoundingClientRect().right;
      if(bill_acc_top<banknote_top && bill_acc_bottom>banknote_top && bill_acc_left<banknote_left && bill_acc_right>banknote_right){
        money.value = (+money.value)+(+this.dataset.value);
        displayBalance.innerText = money.value;
        this.hidden = true;
        let audio = new Audio("audio/getmoney.mp3");
        audio.play();
      }
    }
  }
}

function getChange(num){
  while (0<num){
    let audio = new Audio("audio/change.mp3");
    audio.play();
    let change_box_h = change_box.getBoundingClientRect().height-70;
    let change_box_w = change_box.getBoundingClientRect().width-70;
    let top = Math.random()*change_box_h;
    let left = Math.random()*change_box_w;
    if (num>=10){
      let img = document.createElement('img');
      img.src = 'img/10rub.png';
      img.style.top = top+'px';
      img.style.left = left+'px';
      img.onclick = function(){this.hidden=true;}
      change_box.append(img);
      num = num-10;
    }else if (num>=5){
      let img = document.createElement('img');
      img.src = 'img/5rub.png';
      img.style.top = top+'px';
      img.style.left = left+'px';
      img.onclick = function(){this.hidden=true;}
      change_box.append(img);
      num = num-5;
    }else if (num>=2){
      let img = document.createElement('img');
      img.src = 'img/2rub.png';
      img.style.top = top+'px';
      img.style.left = left+'px';
      img.onclick = function(){this.hidden=true;}
      change_box.append(img);
      num = num-2;
    }else if (num>=1){
      let img = document.createElement('img');
      img.src = 'img/1rub.png';
      img.style.top = top+'px';
      img.style.left = left+'px';
      img.onclick = function(){this.hidden=true;}
      change_box.append(img);
      num = num-1;
    }
  }
  money.value = 0;
  displayBalance.innerText = money.value;
  coffee_cup.hidden = true;
}