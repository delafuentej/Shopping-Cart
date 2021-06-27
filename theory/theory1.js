const body=document.querySelector("body");
const list=document.createElement("ul");
list.textContent="List"
body.appendChild(list);

/*hay que copiar previamente esta estructura en html

*/
const names=["juan","maria","victor","paula"];

const template=document.querySelector("#template-li");
const fragment=document.createDocumentFragment();

names.forEach(item=>{
    template.querySelector(".list span .text-danger").innerText=item;
    const clone=template.cloneNode(true);
    fragment.appendChild(clone)
});
list.appendChild(fragment);





//template Vs innerHTML

/*let fragment="";

names.forEach(item=>{
    fragment+=`
    <li class="list">
        <b>Name: </b> <span class="text-danger">${item}</span>
    </li>
    `
})

list.innerHTML=fragment



*/












//utilización de fragment, para evitar/minimizar el reflow
//const fragment=document.createDocumentFragment();
/* const fragment=document= new DocumentFragment(); */
//console.log(fragment);

//names.forEach(item=>{
//  const li=document.createElement("li");
//    li.textContent=item;

//    const childNode=fragment.firstChild;
    //insertBefore(recibe primero el nuevo nodo, la ref del nuevo nodo)=>Insertar los items del arr del ultimo al primero
//    fragment.insertBefore(li,childNode);
    /* console.log(item,childNode) */

    
//})
//list.appendChild(fragment);

 /* for(let i=0;i<names.length;i++){
    const li=document.createElement("li");
    li.innerText=names[i];
    ul.appendChild(li);
}  */

/* names.forEach(item=>{
    const li=document.createElement("li");
    li.innerText=item;
    list.appendChild(li);
}) */


//esto no es una buena solucion debido al reflow que se genera cada //elemente a la lista, por lo que genera problemas en listas grandes
/* names.forEach(item=>{
    list.innerHTML+=`
    <li>${item}</li>
    `
}) */