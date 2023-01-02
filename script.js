let cart =[];
const c = (el)=>{
    return document.querySelector(el)
}
const cs=(el)=>document.querySelectorAll(el)
let count=1;
let modalKey=0;
pizzaJson.map((item,index)=>{
    
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--img img ').src=item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML=`R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML=item.description
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault()

        c('.pizzaInfo--qt').innerHTML= count
        let key= e.target.closest('.pizza-item').getAttribute('data-key')
        modalKey=key
        c('.pizzaWindowArea').style.opacity= 0;
        c('.pizzaWindowArea').style.display= 'flex'
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity=1;
        },200)

       
       
        c('.pizzaWindowArea img').src=pizzaJson[key].img;
        c('.pizzaWindowArea h1').innerHTML = pizzaJson[key].name;
        c('.pizzaWindowArea .pizzaInfo--desc').innerHTML=pizzaJson[key].description;
        c('.pizzaWindowArea .pizzaInfo--actualPrice').innerHTML= `${(pizzaJson[key].price).toFixed(2)}`;
       


        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected')
        }
            size.querySelector('span').innerHTML= pizzaJson[key].sizes[sizeIndex]
          })
         
           
    })
    c('.pizza-area').appendChild(pizzaItem)
})

function exitModal(){
        c('.pizzaWindowArea').style.display='none'
}

cs('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((element)=>{
    element.addEventListener('click',exitModal)
})
c('.pizzaInfo--qtmais').addEventListener('click',function(){
    count++
    c('.pizzaInfo--qt').innerHTML= count    
  })
c('.pizzaInfo--qtmenos').addEventListener('click',function(){
    if(count>1){
        count--
    }  
    c('.pizzaInfo--qt').innerHTML= count;
  })
cs('.pizzaInfo--size').forEach((item)=>{
    item.addEventListener('click',()=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    item.classList.add('selected')
    c('.pizzaInfo--actualPrice').innerHTML=pizzaJson[key].price
})
  })
 c('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size=c('.pizzaInfo--size.selected').getAttribute('data-key')
    let identifier = pizzaJson[modalKey]+'@'+size
    let index = cart.findIndex((item)=>item.identifier = identifier)
    if(index > -1){
        cart[index].qt+=count
    }else{
        cart.push({
            pizza:modalKey,
            qt: count,
            size: size , 
            identifier:identifier
            })
    }
    console.log(cart)
    exitModal()
 })