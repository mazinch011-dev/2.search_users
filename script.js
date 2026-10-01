const search=document.querySelector(".search_box")
const filter=document.querySelector(".company_filter")
const loading=document.querySelector(".loading")
const error=document.querySelector(".error")
const peopleList=document.querySelector(".people-list")
const sortFilter = document.querySelector(".sort_filter");

const url="https://jsonplaceholder.typicode.com/users"

let users=[]
async function loadusers(){
    try {
        loading.textContent="..loading"
        error.textContent=""
        const response=await fetch(url)
        if(!response.ok){
            throw new Error("Failed to reach")
        }
        users=await response.json()
        loading.textContent=""
        displayUsers(users)
    } catch (error) {
        loading.textContent=""
        error.textContent="Sorry,something went wrong."
        
    }
 }

function displayUsers(userdisplay){
    peopleList.innerHTML=""
    userdisplay.forEach(user => {
      const card=document.createElement('div')
      card.textContent=user.name

      const email=document.createElement("p")
      email.textContent=user.email
      card.appendChild(email)

      const phone=document.createElement("p")
      phone.textContent=user.phone
      card.appendChild(phone)

      const company=document.createElement("p")
      company.textContent=user.company.name
      card.appendChild(company)
      
      peopleList.appendChild(card)
    });
}

search.addEventListener("input",function(){
   const item=search.value.toLowerCase()
   const result=users.filter(function(user){
    return user.name.toLowerCase().includes(item)||
    user.email.toLowerCase().includes(item)
   })

   displayUsers(result)
})

filter.addEventListener("change",function(){
    const company = filter.value;

    const result = users.filter(function(user) {
        return company === "all" ||
               user.company.name === company;
    });

    displayUsers(result);
});
sortFilter.addEventListener("change", function () {

    const sortValue = sortFilter.value;

    const result = [...users];

    if (sortValue === "az") {

        result.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

    } else if (sortValue === "za") {

        result.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        });
    }

    displayUsers(result);
});

loadusers();
