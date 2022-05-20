$(document).ready(function(){
    
    var $mesContainer = $("#messageBox");
    var $buttonEl = $("#sendButton");
    var count = 0;
    
    var onSend = function() {
        var $input = $("#inputField");
        var message = $input[0].value;
        
        if (message !== ""){
            createMessage(message, "from-me");
            $input.val("");
            if (count % 4 === 0){
                respondReversing(message);
            }
            else if (count % 4 === 1){
                respondUpper(message);
            }
            else if (count % 4 === 2){
                respondVowels(message);
            }
            else {
                respondRickAstley();
            }   
        }
    }
    
    $buttonEl.on("click", onSend);
    
    /***** functions for different ways of responding to messages ****/
    var respondReversing = function(str){
        var revStr = str.split("").reverse().join("");
        createMessage(revStr, "from-them");
        count++;
    }
    
    var respondUpper = function(str){
        var upperCase = str.toUpperCase();
        createMessage(upperCase, "from-them");
        count++;
    }
    
    var respondVowels = function(str){
        var vowels = str.match(/[aeiou]/ig);
        createMessage(vowels, "from-them");
        count++;
    }
    
    var respondRickAstley = function(){
        var hook = ["Never gonna give you up", "Never gonna let you down", "Never gonna run around and desert you", "Never gonna make you cry", "Never gonna say goodbye", "Never gonna tell a lie and hurt you"];
        
        for (var i = 0; i < hook.length; i++){
            createMessage(hook[i], "from-them");
        }
        count++;
    }
    
    /************ helper functions to create messages and time ************/
    var createMessage = function(str, messClass){
        var time = createTime(); 
        
        var $newSpan = $("<span>");
        $newSpan.text(time).addClass("time");
        
        if (messClass === "from-them"){
            $newSpan.css("color", "#b0b0b0");
        }
        else{
            $newSpan.css("color", "#29a329");
        }
        
        var $newP = $("<p>");
        $newP.text(str).append($newSpan).addClass(messClass).appendTo("#messageBox");
        $mesContainer[0].scrollTop = $mesContainer[0].scrollHeight;
    }
    
    var createTime = function(){
        var today = new Date();
        var time;
        today.getMinutes() < 10 ? time = today.getHours() + ":0" + today.getMinutes() : time =  today.getHours() + ":" + today.getMinutes();
        return time;
    }
    
    
    //add time to every message on the page as soon as it loads
    var time = createTime();
    var $paragraphs = $("p");
    for (var i=0; i<$paragraphs.length; i++){
        var $newSpan = $("<span>");
        $paragraphs[i].appendChild($newSpan[0]);
        $newSpan.text(time).addClass("time");
        var classNames = $paragraphs[i].className;
        if (classNames.includes("from-them")){
            $newSpan.css("color", "#b0b0b0");
            continue;
        }
        $newSpan.css("color", "#29a329");
    }
     
})

