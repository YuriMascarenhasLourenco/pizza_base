const c = (el)=>{
    return document.querySelector(el)
}
pizzaJson.map((item,index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    pizzaItem.querySelector('.pizza-item--img img ').src=item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML=item.price
    pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML=item.description
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault()
        c('.pizzaWindowArea').style.display= 'flex'
    })
    c('.pizza-area').appendChild(pizzaItem)
})