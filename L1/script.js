var character = document.getElementById("character");
var enemy = document.getElementById("enemy");
let score = 0
const scoreDisplay = document.getElementById('score');

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(function(){
        character.classList.remove("animate");
    }, 500);
}

var checkDead = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
    if(enemyLeft<150 && enemyLeft>0 && characterTop >=470){
        enemy.style.animation = "none";
        enemy.style.display = "none";
        setTimeout(function(){location.replace("fail.html");});
    } else {
        score++
        scoreDisplay.innerHTML = score

        if (score >= 2100){
            setTimeout(function(){location.replace("pass.html");});
        }
    }
});
