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

        let count=1;
        let key= e.target.closest('.pizza-item').getAttribute('data-key')
        
        c('.pizzaWindowArea').style.opacity= 0;
        c('.pizzaWindowArea').style.display= 'flex'
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity=1;
        },200)

        c('.pizzaInfo--qtmais').addEventListener('click',function(){
            count++

            c('.pizzaInfo--qt').innerHTML= count
                
          })
          c('.pizzaInfo--qtmenos').addEventListener('click',function(){
            count--
            if(count==0){
                count =1
            }  
            c('.pizzaInfo--qt').innerHTML= count;
          })
       
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

    c('.pizzaInfo--cancelButton').addEventListener('click',()=>{ 
        count=1
        c('.pizzaInfo--qt').innerHTML= count
        c('.pizzaWindowArea').style.display='none'   

    })

    c('.pizza-area').appendChild(pizzaItem)
})