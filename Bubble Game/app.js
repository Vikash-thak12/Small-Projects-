
//This is the function for making bubble in the second page
function makeBubble() {
    var clutter = "";
for(var i = 1; i<=140; i++)
{
   var num = Math.floor(Math.random()*10);
   clutter +=  `<div class="circle"><span>${num}</span></div>`;
}

document.querySelector("#second").innerHTML = clutter;
}

makeBubble();