const c = (el)=>{
    return document.querySelector(el)
}
const cs=(el)=>document.querySelectorAll(el)
pizzaJson.map((item,index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--img img ').src=item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML=`R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML=item.description
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault()
        let key= e.target.closest('.pizza-item').getAttribute('data-key')
        console.log(key)
        c('.pizzaWindowArea').style.opacity= 0;
        c('.pizzaWindowArea').style.display= 'flex'
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity=1;
        },200)
      
        
        c('.pizzaWindowArea img').src=pizzaJson[key].img;
        c('.pizzaWindowArea h1').innerHTML = pizzaJson[key].name;
        c('.pizzaWindowArea .pizzaInfo--desc').innerHTML=pizzaJson[key].description;
        c('.pizzaWindowArea .pizzaInfo--actualPrice').innerHTML= `R$ ${pizzaJson[key].price.toFixed(2)}`
            c('.pizzaInfo--cancelButton').addEventListener('click',()=>{
                setTimeout(()=>{
                    c('.pizzaWindowArea').style.display='none'
                },300)
                
            })
    })

    c('.pizza-area').appendChild(pizzaItem)
})