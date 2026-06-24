function animate(id,target){

let count=0;

let interval=setInterval(()=>{

count++;

document.getElementById(id).innerText=count;

if(count>=target){
clearInterval(interval);
}

},40);

}

animate("papers",5);
animate("projectsCount",15);
animate("oss",1);

const toggle=document.getElementById("theme-toggle");

toggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

});
