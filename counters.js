
function counter(id,target){

let n=0


let x=setInterval(()=>{


n++


document.getElementById(id)

.innerHTML=n


if(n>=target)


clearInterval(x)



},30)

}



counter(

"papers",

5

)


counter(

"citations",

0

)



counter(

"projects",

15

)



counter(

"opensource",

1

)
