const btnIncrease=document.querySelector(".btnIncrease");
const btnDecrease=document.querySelector(".btnDecrease");
const span=document.querySelector("#counter");
let counter=0

//with Event Delegation

const increase=()=>{
    counter++;
    span.textContent=counter;
}

const decrease=()=>{
    counter--;
    span.textContent=counter;
}

const container=document.querySelector(".container");


container.addEventListener("click",(e)=>{
    e.stopPropagation();
    if(e.target.classList.contains("btnIncrease")){
        increase();
    }
    if(e.target.classList.contains("btnDecrease")){
        decrease();
    }
   
}) 


document.body.addEventListener("click",()=>{
    console.log("click");
})
/*
estructura HTML:

 <div class="container text-center py-5 bg-warning">
        <h1>Counter</h1>
       
        <button class=" btnIncrease btn btn-info mt-4">Increase</button>
        <button class=" btnDecrease btn btn-danger mt-4">Decrease</button>

        <h4 class="mt-2">Counter: <span id="counter">0</span></h4>

    </div>

*/
/* const increase=(e)=>{
    counter++;
    span.textContent=counter;
}
const decrease=(e)=>{
    counter--;
    span.textContent=counter;
}

btnIncrease.addEventListener("click",increase)

btnDecrease.addEventListener("click",decrease) */