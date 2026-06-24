const text = [
"Independant AI/Machine Learning Researcher",
"Open Source Contributor",
"Founder @ Khwand",
"Cybersecurity Enthusiast"
];

let i = 0;
let j = 0;
let current = "";
let deleting = false;

function type() {

let el = document.getElementById("typing");

if(!deleting){

current = text[i].substring(0,j++);

}else{

current = text[i].substring(0,j--);

}

el.innerHTML = current;

if(j===text[i].length+1){

deleting=true;

setTimeout(type,1500);

return;

}

if(j===0){

deleting=false;

i=(i+1)%text.length;

}

setTimeout(type,deleting?40:80);

}

type();
