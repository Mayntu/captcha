let randomNumbers;
let rightNumbers;
let currentScore = 0;
let bestScore = 0;
let captchaButton = document.getElementById("captchaButtonId");
let captchaButtonClicked = false;
captchaButton.addEventListener("click", function(){
    captchaButtonClicked = true;
    checker();
    currentScoreFunc();
    bestScoreFunc();
    bestScoreToTextFunc();
});
document.addEventListener("keydown",function(key){
    if(key.keyCode === 13)
    {
        checker();
        currentScoreFunc();
        bestScoreFunc();
        bestScoreToTextFunc();
    }
});
function getRandom() 
{
    randomNumbers = Math.ceil(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000);
    // if(randomNumbers < 10000)
    // {
    //     if(randomNumbers < 10000)
    //     {
    //         if(randomNumbers < 10000)
    //         {
    //             randomNumbers = Math.ceil(Math.random() * 100000);
    //         }
    //     }
    // }
}
function numbersToText()
{
    const captcha = document.getElementById("captchaId");
    captcha.innerText = randomNumbers;
    // document.body.replaceChild(captcha)
    inputMaxLength();
    autoEnter();
    deleteLetters();
}
function checker()
{
    let inputField = String(document.getElementById("captchaInputId").value);
    if(inputField == randomNumbers)
    {
        currentScore++;
        rightNumbers = inputField;
        getRandom();
        numbersToText();
        captchaRight();
        console.log("Правильно");
        console.log(currentScore);
        document.getElementById("captchaInputId").value = '';
        document.getElementById("captchaInputId").focus();
        pauseWatch();
        watchToText();
        resetWatch();
        startWatch();
        bestScoreFunc();
        bestTimeFunc();
        // bestTimeToTextFunc();
    }
    else
    {
        getRandom();
        numbersToText();
        captchaWrong();
        console.log("Не правильно");
        document.getElementById("captchaInputId").value = '';
        document.getElementById("captchaInputId").focus();
        currentScore = 0;
        resetWatch();
        startWatch();
    }
}
const captchaRightInput = document.getElementById("captchaClassId");
function captchaRight()
{
    captchaRightInput.classList.remove("captcha");
    captchaRightInput.classList.add("captchaRight");
    setTimeout("captchaRightInput.classList.remove('captchaRight');", 500);
    setTimeout("captchaRightInput.classList.add('captcha');", 500);
}
function captchaWrong()
{
    captchaRightInput.classList.remove("captcha");
    captchaRightInput.classList.add("captchaWrong");
    setTimeout("captchaRightInput.classList.remove('captchaWrong');", 500);
    setTimeout("captchaRightInput.classList.add('captcha');", 500);
}
// const captchaClass = document.getElementById("captchaInputBlockId");
// function captchaWrong()
// {
//     captchaClass.classList.remove("captchaInputBlock");
//     captchaClass.classList.add("captchaWrongInputBlock");
//     setTimeout("captchaClass.classList.remove('captchaWrongInputBlock');", 1000);
//     setTimeout("captchaClass.classList.add('captchaInputBlock');", 1000);
// }
function currentScoreFunc()
{
    const currentScoreHtml = document.getElementById("currentScoreId");
    currentScoreHtml.innerText = currentScore;
}
function bestScoreFunc()
{
    if(currentScore > bestScore)
    {
        bestScore = currentScore;
        localStorage.setItem("bc", bestScore);
    }
}
const bc = +localStorage.getItem('bc');
const bestScoreHtml = document.getElementById("bestScoreId");
bestScoreHtml.innerText = bc;
bestScore = bc;
function bestScoreToTextFunc()
{

    const bestScoreHtml = document.getElementById("bestScoreId");
    bestScoreHtml.innerText = bestScore;
}
getRandom();
numbersToText();
// checker();
currentScoreFunc();

const watch = document.querySelector('#currentTimeId');
let watchTimer;
let milliseconds = 0;
let timer;
let watchControl;

const startWatch = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	timer = setInterval(()=>{
		milliseconds += 10;
		let dateTimer = new Date(milliseconds);
		watchTimer =
			('0'+dateTimer.getUTCSeconds()).slice(-2) + ':' +
			('0'+dateTimer.getUTCMilliseconds()).slice(-3,-1);
	},10);
};
const watchToText = () =>{
    watch.innerHTML = watchTimer;
}

const pauseWatch = () => {
  watch.classList.add('paused');
  clearInterval(timer);
  watchControl = watchTimer;
};

const resetWatch = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	milliseconds = 0;
	// watch.innerHTML = '00:00';
};

// document.addEventListener('click', (e) =>{
// 	const element = e.target;
// 	if (element.id === 'start') startWatch();
// 	if (element.id === 'pause') pauseWatch();
// 	if (element.id === 'reset') resetWatch();
// });
startWatch();
let bestWatchTimer = new Date(milliseconds);
let bestWatchTime = ('1'+bestWatchTimer.getUTCSeconds()).slice(-2) + ':' +
('10'+bestWatchTimer.getUTCMilliseconds()).slice(-3,-1);
function bestTimeFunc()
{
    if(watchTimer < bestWatchTime)
    {
        bestWatchTime = watchTimer;
        localStorage.setItem('bestCaptchaValue', rightNumbers);
        bestCaptchaToTextFunc();
        console.log(bestWatchTime);
        localStorage.setItem('bt', bestWatchTime);
        bestTimeToTextFunc();
    }
}
function bestTimeToTextFunc()
{
    let bt1 = localStorage.getItem('bt');
    if(bt1)
    {
        let bt = localStorage.getItem('bt');
        console.log(bt);
        const bestTimeHtml = document.getElementById("bestTimeId");
        bestTimeHtml.innerText = bt;
        bestWatchTime = bt;
        bestTimeHtml.innerHTML = bestWatchTime;
    }
}
function bestCaptchaToTextFunc()
{
    let bestCaptchaValue1 = localStorage.getItem('bestCaptchaValue');
    if(bestCaptchaValue1)
    {
        let bestCaptchaValue = localStorage.getItem('bestCaptchaValue');
        console.log(bestCaptchaValue);
        const bestCaptcha = document.getElementById("bestCaptchaId");
        bestCaptcha.innerText = bestCaptchaValue;
        rightNumbers = bestCaptchaValue;
        bestCaptcha.innerHTML = rightNumbers;
    }
}
bestTimeToTextFunc();
bestCaptchaToTextFunc();
function inputMaxLength()
{
    const limit = document.getElementById("limitValueId");
    if(limit.checked === true)
    {
        $('#captchaInputId').attr('maxlength',  5);
    }
    else if(limit.checked === false)
    {
        $('#captchaInputId').attr('maxlength',  30);
    }
}
function autoEnter()
{
    var inputField = document.getElementById("captchaInputId");
    const autoEnter = document.getElementById("autoEnterValueId");
    if(autoEnter.checked === true)
    {
        inputField.addEventListener("input", autoEnt);

    }
    else if(autoEnter.checked === false)
    {
        inputField.removeEventListener("input", autoEnt);
    }

}
function autoEnt()
{
    const inputField = document.getElementById("captchaInputId").value;
    if(inputField == randomNumbers)
    {
          
          document.dispatchEvent(new KeyboardEvent('keydown', {
            'keyCode': '13'
          }));
    }
}
function deleteLetters()
{
    const deleteLettersValue = document.getElementById("deleteLettersValueId")
    if(deleteLettersValue.checked === true)
    {
        $(".captchaInput").keypress(function(event){
            event = event || window.event;
            if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
              return false;
          });
    }
}
let loh = document.getElementById("loh");
console.log(loh);
let button;