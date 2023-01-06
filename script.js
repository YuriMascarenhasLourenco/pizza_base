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
    pizzaItem.querySelector('.pizza-item--price').innerHTML=`R$ ${item.price[2].toFixed(2)}`
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
        c('.pizzaWindowArea .pizzaInfo--actualPrice').innerHTML= `R$ ${pizzaJson[key].price[2].toFixed(2)}`;
       


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
cs('.pizzaInfo--size').forEach((item,itemIndex)=>{
    item.addEventListener('click',()=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    item.classList.add('selected')
    c('.pizzaInfo--actualPrice').innerHTML=`R$ ${pizzaJson[modalKey].price[itemIndex].toFixed(2)}`
})
  })
 c('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size=c('.pizzaInfo--size.selected').getAttribute('data-key')
    let identifier = pizzaJson[modalKey].id+'@'+size
    let index = cart.findIndex((item)=>item.identifier == identifier)
    if(index > -1){
        cart[index].qt+=count
    }else{
        cart.push({
            id:pizzaJson[modalKey].id,
            qt: count,
            size: size , 
            identifier:identifier
            })
    }
    console.log(cart)
    updateCart()
    exitModal()
 })
    c('.menu-openner').addEventListener('click',()=>{
        if(cart.length>0){
            c('aside').classList.add('show')
            c('aside').style.left='0'
        }else{
            c('aside').classList.remove('show')
        }
    })
    c('.menu-closer').addEventListener('click',()=>{
        c('aside').classList.remove('show')
        c('aside').style.left='100vw'
    })
 function updateCart(){
    c('.menu-openner span').innerHTML=cart.length
    if(cart.length>0){
        
            c('aside').classList.add('show')
        
       
        c('.cart').innerHTML=''
        let subTotal=0;
        let desconto;
        let total;
        for(let i in cart){
             let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id)
            let cartItem= c('.models .cart--item').cloneNode(true)
            let pizzaSizeName;
            
           switch(cart[i].size){
            case 0:
                pizzaSizeName ="P"
                console.log(pizzaSizeName)
                break;
            case 1: 
            pizzaSizeName ="M"
                break;
            case 2:  
            pizzaSizeName="G";
                break;
           }
           let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            cartItem.querySelector('img').src=pizzaItem.img;
            cartItem.querySelector('.cart--item--qt').innerHTML= cart[i].qt
            cartItem.querySelector('.cart--item-nome').innerHTML= pizzaName
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt>1){
                    cart[i].qt--;
                }else{
                    cart.splice(i,1)
                    
                    console.log(cart)
                }
                updateCart()
            })
            subTotal+= cart[i].qt*pizzaItem.price[cart[i].size]
            
          c('.cart').appendChild(cartItem)

        }
        desconto = subTotal*0.1
        total = subTotal - desconto
        c('.subtotal span:last-child').innerHTML=`R$ ${subTotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML=`R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML=`R$ ${total.toFixed(2)}`
    }else{
        c('aside').classList.remove('show')
    }
 }