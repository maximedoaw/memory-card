const container = document.querySelector('.container')
const turn_or_return = []
let move = true , remove = false , state_card = true
let stop_inter,count_card = 0,val1,val2
function generate_card() {
  
    for (let index = 0; index < 16; index++) {
        const card = document.createElement("div")
        card.classList.add("card")
        const text = document.createElement("h1")
        text.innerHTML = "?"
        text.classList.add("text")
        card.classList.add("my-card")
        card.appendChild(text)
        container.appendChild(card)
    }
   
    random_bg()
    rotate_card()
    inter()
    stop_inter=setInterval(loadPage,2000)
}

function inter() {
        if (state_card == false) {
            clearInterval(stop_inter)
        }
}

function random_bg() {
    const hex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
    let color1 = populate("#")
    let color2 = populate("#")

    function populate(a) {
         for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * (hex.length - 1))
        a+=hex[num]
    }
    return a
    }

    document.body.style.backgroundImage = "linear-gradient(" + "to right" + "," + color1 + "," + color2 + ")" 
}

function rotate_card(){
  const rotation =  document.querySelectorAll(".my-card")
    rotation.forEach((elem,index) =>{
        clearInterval(loadPage)

        turn_or_return.push(move)
        elem.addEventListener("click",() =>{
           if (turn_or_return[index] == move) {
                elem.classList.add("rotate")
                document.querySelectorAll("img")[index].classList.add("effect")
                 if (elem.classList.contains("remove")) {
                                    elem.classList.replace("remove","rotate")
                                    document.querySelectorAll("img")[index].classList.replace("uneffect","effect") 

                }
                turn_or_return[index] = remove 
           } else {
                 elem.classList.replace("rotate","remove"  )
                 document.querySelectorAll("img")[index].classList.replace("effect","uneffect") 
                 turn_or_return[index] = move
                 
                }
                verif_card(turn_or_return)
        })
})
add_image_card(rotation)
}
/**
 * 
 * @param {Node[]} carte_anime 
 */
function add_image_card(carte_anime){
    const list_image = [
                        "carte/image1.jpg",
                        "carte/image2.jpg",
                        "carte/image3.jpg",
                        "carte/image4.jpg",
                        "carte/image5.jpg",
                        "carte/image6.jpg",
                        "carte/image7.jpg",
                        "carte/image8.jpg"
    ]
    let temp 
    const all_card = document.querySelectorAll(".my-card")
    let sort = true
    console.log(all_card);
    carte_anime.forEach((element,index) => {
        const img = document.createElement("img")
        all_card[index].append(img)

    });   
         
         temp=document.querySelectorAll("img")
         let random_index =Math.floor(Math.random() * temp.length)  
         for (let image = 0; image < list_image.length ; image++) {
            
            for (let index_img = 0; index_img < 2; index_img++) {
                while (temp[random_index].src !== "" ) {
                            random_index = Math.floor(Math.random() * temp.length) 
                            console.log(random_index);
               
                        }
                     temp[random_index].src=list_image[image]
                   
                }  

  
         }
         

}

const loadPage = () =>{

     const all_card = document.querySelectorAll('.my-card')
     const all_image = document.querySelectorAll('img')
     if (state_card) {
        all_card.forEach( (mycard,index_card) =>{
        mycard.classList.add("rotate")
        all_image[index_card].classList.add("effect")
        state_card = false
    })
     } else {
        all_card.forEach( (mycard,index_card) =>{
            mycard.classList.replace("rotate","remove")
            all_image[index_card].classList.replace("effect","uneffect")
           
        })
        inter()

     }
    
     
     
}
 /**
  * @param {Node[]} total
  */
function verif_card(total) {
     
    count_card++

    if (count_card == 1 ) {
        val1=total.indexOf(false)
        total[val1] = ""
    } 

    if(count_card == 2){
        val2 = total.indexOf(false)
        total[val2] = ""
        count_card = 0
    }
    const all_card = document.querySelectorAll(".my-card")
    const all_image = document.querySelectorAll("img")
    let tmp1,tmp2
    tmp1 = val1
    tmp2 = val2
    if (all_image[val1].src !== all_image[val2].src) {
       
        setTimeout(() => {
        console.log(turn_or_return);
       all_card[tmp1].classList.replace("rotate","remove")
       all_card[tmp2].classList.replace("rotate","remove")
       all_image[tmp1].classList.replace("effect","uneffect")
       all_image[tmp2].classList.replace("effect","uneffect")
       turn_or_return[tmp1] = move
       turn_or_return[tmp2] = move 
        }, 1500);
       
  } 
  else{
    setTimeout(() => {
        console.log(all_card[tmp1],all_card[tmp2]);
        all_card[tmp1].style.opacity=0
        all_card[tmp2].style.opacity=0
        all_image[tmp1].disabled = true
        all_image[tmp2].disabled = true

    }, 1500);
  }     

 val1= undefined
 val2 = undefined
}
generate_card()