/* VARIABLES */
const cards=document.getElementById("cards");
const items=document.getElementById("items");
const footer=document.getElementById("footer");
/* variables template */
const templateCard=document.getElementById("template-card").content;
const templateCart=document.getElementById("template-cart").content;
const templateFooter=document.getElementById("template-footer").content;
/* fragment */
const fragment=document.createDocumentFragment();
let cart={};


/* EVENTS */
document.addEventListener("DOMContentLoaded",()=>{
    fetchData();
//to maintain the cart with the products that were chosen if the page is refreshed.
    if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"));
        printCart();
    }
});

cards.addEventListener("click",(e)=>{
    addItem(e);
});

items.addEventListener("click",e=>{
    btnAddSubstract(e);
})



/* FUNCTIONS */


const fetchData=async()=>{
    try{
        const res=await fetch("api.json");
        const data=await res.json();
        /* console.log(data) */
        paintCards(data)
    }
    catch(err){
        console.log(err)
    }
}



const paintCards=(data)=>{
    data.forEach(product=>{
      /*   console.log(product) */
        templateCard.querySelector("h5").textContent=product.title;
        templateCard.querySelector("p").textContent=`${product.price}`;
        templateCard.querySelector("img").setAttribute("src",product.thumbnailUrl);
        templateCard.querySelector(".btn-dark").dataset.id=product.id;
        const clone= templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cards.appendChild(fragment)
    
}

const addItem=(e)=>{
    /* console.log(e.target); */
    if(e.target.classList.contains("btn-dark")){
        setCart(e.target.parentElement)
    }
    e.stopPropagation();
}

const setCart=obj=>{
    /* console.log(obj) */;
    const product={
        id:obj.querySelector(".btn-dark").dataset.id,  
        title:obj.querySelector("h5").textContent,
        price:obj.querySelector("p").textContent,
        amount:1
    }
    if(cart.hasOwnProperty(product.id)){
        product.amount= cart[product.id].amount+1;
    }
    //create index(id) if it doesn't exist,if it already exists, the quantity is added
    cart[product.id]={...product};
    printCart();
    
}

const printCart=()=>{
   /*  console.log(cart);  */
//so that products already selected are not repeated again(innerHTML="")
    items.innerHTML="";
//transform obj into arr to use forEach=>Object.values(chart)
    Object.values(cart).forEach(product=>{
        templateCart.querySelector("th").textContent=product.id;
        templateCart.querySelectorAll("td")[0].textContent=product.title;
        templateCart.querySelectorAll("td")[1].textContent=product.amount;
        templateCart.querySelector(".btn-success").dataset.id=product.id;
        templateCart.querySelector(".btn-danger").dataset.id=product.id;
        templateCart.querySelector("td span").innerHTML= `${product.price*product.amount}`;

        const clone=templateCart.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
    printFooter();

    //to maintain the cart with the products that were chosen if the page is refreshed.
    localStorage.setItem("cart",JSON.stringify(cart))

   
}
/*table footer */

const printFooter=()=>{
    footer.innerHTML="";
    if(Object.keys(cart).length===0){
        footer.innerHTML= `
        <th scope="row" colspan="5">Cart is empty, start buying!</th>
         `
        return;
         
    }
    
    //- add up the amounts
    const amountAddUp= Object.values(cart).reduce((acc,{amount})=>acc+amount, 0);
    //- add up the prices
    const pricesAddUp= Object.values(cart).reduce((acc,{amount,price})=>acc+price*amount, 0);
 /*    console.log(amountAddUp)
    console.log(pricesAddUp) */

    templateFooter.querySelectorAll("td")[0].textContent=amountAddUp;
    templateFooter.querySelector("span").textContent=pricesAddUp;
    
    const clone=templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);
    
    //to empty the cart
    const btnEmpty=document.querySelector("#empty");
    btnEmpty.addEventListener("click",()=>{
        cart={};
        printCart();
    })
   
   
    
}

const btnAddSubstract=(e)=>{
    /* console.log(e.target) */
    let product=cart[e.target.dataset.id]
    //add
    if(e.target.classList.contains("btn-success")){  
         product.amount+=1;
        
    }
    //substract
    if(e.target.classList.contains("btn-danger")){
         product.amount-=1;
        if(product.amount===0){
             delete cart[e.target.dataset.id];
         }
    }
    e.stopPropagation();
    printCart()
}






