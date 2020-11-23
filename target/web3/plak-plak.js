/*fuckingButton.addEventListener('click', function() {

    let currentSheet = document.getElementsByClassName("timeSheet").item(0);
    currentSheet.classList.add("rotating");

    setTimeout(function () {
        currentSheet.style.visibility = 'hidden';
        currentSheet.firstChild.innerText = "6";
        currentSheet.style.transform = 'rotateX(90deg)';
        currentSheet.classList.remove("rotating");
        currentSheet.classList.add("rotateBack");
        currentSheet.style.visibility = 'visible';
    }, 1900);

    setTimeout(function () {
        currentSheet.classList.remove("rotateBack");
        currentSheet.style.transform = 'rotateX(0deg)';
    }, 3900);


});*/

let startSeconds = new Date().getSeconds().toString().padStart(2, '0');
let startMinutes = new Date().getMinutes().toString().padStart(2, '0');
let startHours = new Date().getHours().toString().padStart(2, '0');

let decadeChange = false;
let minutesChange = false;
let tenMinutesChange = false;
let hoursChange = false;
let tenHoursChange = false;

let digitSecond = Number(startSeconds[1]);
let decadeSecond = Number(startSeconds[0]);

let secondsSheet = document.getElementsByClassName("timeSheet").item(5);     // получаем листок, отвечающий за секунды
let tenSecondsSheet = document.getElementsByClassName("timeSheet").item(4);      // получаем листок, отвечающий за десятки секунд
let minutesSheet = document.getElementsByClassName("timeSheet").item(3);     // получаем листок, отвечающий за минуты
let tenMinutesSheet = document.getElementsByClassName("timeSheet").item(2);  // получаем листок, отвечающий за десятки минут
let hoursSheet = document.getElementsByClassName("timeSheet").item(1);       // получаем листок, отвечающий за часы
let tenHoursSheet = document.getElementsByClassName("timeSheet").item(0);    // получаем листок, отвечающий за десятки часов

// записываем текущее время при загрузке
secondsSheet.firstChild.innerText = startSeconds[1];
tenSecondsSheet.firstChild.innerText = startSeconds[0];
minutesSheet.firstChild.innerText = startMinutes[1];
tenMinutesSheet.firstChild.innerText = startMinutes[0];
hoursSheet.firstChild.innerText = startHours[1];
tenHoursSheet.firstChild.innerText = startHours[0];

setInterval(function (){    // каждые 4 секунды
    let dateSeconds = new Date().getSeconds();      // получаем секунды текущей даты
    dateSeconds = dateSeconds.toString().padStart(2, '0');   // приводим секунды к формату с двумя цифрами (9 -> 09)

    secondsSheet.classList.add("rotating");     // начинаем анимацию листка секунд

    // проверка на десятки секунд
    decadeChange = Number(dateSeconds.toString()[0]) - decadeSecond !== 0;    // определяем, изменились ли десятки секунд
    digitSecond = Number(dateSeconds.toString()[1]);     // получаем цифру - единицы секунд
    decadeSecond = Number(dateSeconds.toString()[0]);     // получаем цифру - десяток секунд
    let currentMinutes = Number(minutesSheet.firstChild.innerText);
    let currentTenMinutes = Number(tenMinutesSheet.firstChild.innerText);
    let currentHours = Number(hoursSheet.firstChild.innerText);
    let currentTenHours = Number(tenHoursSheet.firstChild.innerText);

    // проверка на единицы минут
    if (10*decadeSecond + digitSecond <= 7){
        minutesChange = true;
        minutesSheet.classList.add("rotating");

        if (currentMinutes === 9) {
            currentMinutes = -1;
            tenMinutesChange = true;
            tenMinutesSheet.classList.add("rotating");

            if (currentTenMinutes === 5) {
                currentMinutes = -1;
                hoursChange = true;
                hoursSheet.classList.add("rotating");

                if(currentHours === 9){
                    currentHours = -1;
                    tenHoursChange = true;
                    tenHoursSheet.classList.add("rotating");
                    if (currentTenHours + currentHours === 24){
                        currentTenHours = -1;
                    }
                }else {
                    tenHoursChange = false;
                }
            }else {
                hoursChange = false;
            }
        }else {
            tenMinutesChange = false;
        }
    }else {
        minutesChange = false;
    }

    if (decadeChange){
        tenSecondsSheet.classList.add("rotating");  // начинаем анимацию листка десятков секунд
    }

    setTimeout(function () {    // спустя 2 секунды делаем следующее:
        secondsSheet.style.visibility = 'hidden';   // прячем листок для красивой смены цифры

        if ( decadeChange ) {     // если десяток изменился
            tenSecondsSheet.firstChild.innerText = decadeSecond; // помещаем в листок десятков секунд значение
            rotateBack(tenSecondsSheet);
        }

        if ( minutesChange ){   // если надо изменить минуты
            minutesSheet.firstChild.innerText = currentMinutes + 1;
            rotateBack(minutesSheet);
        }

        if ( tenMinutesChange ){    // если надо изменить десятки минут
            tenMinutesSheet.firstChild.innerText = currentTenMinutes + 1;
            rotateBack(tenMinutesSheet);
        }

        if (hoursChange){   // если надо изменить часы
            hoursSheet.firstChild.innerText = currentHours + 1;
            rotateBack(hoursSheet);
        }

        if (tenHoursChange){   // если надо изменить часы
            tenHoursSheet.firstChild.innerText = currentTenHours + 1;
            rotateBack(tenMinutesSheet);
        }

        secondsSheet.firstChild.innerText = dateSeconds[1]; // помещаем в листок секунд значение
        rotateBack(secondsSheet);

    }, 2000);

    setTimeout(function () { // спустя 4 секунды делаем следующее:
        // приводим листок секунд (и листок десятков секунд, если был изменен) в исходное состояние
        secondsSheet.classList.remove("rotateBack");
        secondsSheet.style.transform = 'rotateX(0deg)';
        if (decadeChange){
            document.getElementsByClassName("timeSheet").item(4).classList.remove("rotateBack");
            document.getElementsByClassName("timeSheet").item(4).style.transform = 'rotateX(0deg)';
        }
        if (minutesChange){
            document.getElementsByClassName("timeSheet").item(3).classList.remove("rotateBack");
            document.getElementsByClassName("timeSheet").item(3).style.transform = 'rotateX(0deg)';
        }
        if (tenMinutesChange){
            document.getElementsByClassName("timeSheet").item(2).classList.remove("rotateBack");
            document.getElementsByClassName("timeSheet").item(2).style.transform = 'rotateX(0deg)';
        }
        if (hoursChange){
            document.getElementsByClassName("timeSheet").item(1).classList.remove("rotateBack");
            document.getElementsByClassName("timeSheet").item(1).style.transform = 'rotateX(0deg)';
        }
        if (tenHoursChange){
            document.getElementsByClassName("timeSheet").item(0).classList.remove("rotateBack");
            document.getElementsByClassName("timeSheet").item(0).style.transform = 'rotateX(0deg)';
        }
    }, 3900);
}, 8000);

/*function setTime(decadeSheet, digitSheet, changeTime){
    setInterval(function (){    // каждые 4 секунды
        let dateSeconds = new Date().getSeconds();      // получаем секунды текущей даты
        dateSeconds = dateSeconds.toString().padStart(2, '0');   // приводим секунды к формату с двумя цифрами (9 -> 09)

        digitSheet.classList.add("rotating");     // начинаем анимацию листка секунд

        decadeChange = Number(dateSeconds.toString()[0]) - decadeSecond !== 0;    // определяем, изменились ли десятки секунд
        decadeSecond = Number(dateSeconds.toString()[0]);     // получаем цифру - десяток секунд

        if (decadeChange){
            tenSecondsSheet.classList.add("rotating");  // начинаем анимацию листка десятков секунд
        }

        setTimeout(function () {    // спустя 2 секунды делаем следующее:
            secondsSheet.style.visibility = 'hidden';   // прячем листок для красивой смены цифры

            if ( decadeChange ) {     // если десяток изменился
                tenSecondsSheet.firstChild.innerText = decadeSecond; // помещаем в листок десятков секунд значение
                rotateBack(tenSecondsSheet);
            }

            secondsSheet.firstChild.innerText = dateSeconds[1]; // помещаем в листок секунд значение
            rotateBack(secondsSheet);

        }, 2000);

        setTimeout(function () { // спустя 4 секунды делаем следующее:
            // приводим листок секунд (и листок десятков секунд, если был изменен) в исходное состояние
            secondsSheet.classList.remove("rotateBack");
            secondsSheet.style.transform = 'rotateX(0deg)';
            if (decadeChange){
                document.getElementsByClassName("timeSheet").item(4).classList.remove("rotateBack");
                document.getElementsByClassName("timeSheet").item(4).style.transform = 'rotateX(0deg)';
            }
        }, 3900);
    }, changeTime);
}*/

function rotateBack(currentSheet){
    // останавливаем анимацию и запускаем возвращение листка в изначальное положение
    currentSheet.style.transform = 'rotateX(90deg)';
    currentSheet.classList.remove("rotating");
    currentSheet.classList.add("rotateBack");
    currentSheet.style.visibility = 'visible';
}
