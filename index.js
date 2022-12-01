// Fetch ALL TODOS
fetch("http://localhost:3000/todos/")
.then(function (response){
   return response.json()
})

.then(function (todos)
{
    console.log(todos)
    todo_container = document.getElementById("todo_container")
    //  document.getElementById("no_of_todos").innerText = todos.length

        for(let todo of todos)
        {
        todo_container.innerHTML +=  `
        <div class="single-todo">
            <h4>${todo.title}</h4>
            <p>${todo.description}</p>
            <p>${todo.completed?"Completed":"Not Completed"}</p>
        </div>`
        }
})

// Fetch only on demand

let searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function(event){
   event.preventDefault()

   let id = parseInt(document.getElementById("id").value) 
   console.log(typeof(id))

   search(id)
})



function search(searchId)
{
    fetch(`http://localhost:3000/todos/${searchId}`)
    .then(function (response){
        return response.json()
    })

    .then(function (todo)
    {
        console.log("single Todo ",todo)
        todo_container = document.getElementById("todo_container")
        //  document.getElementById("no_of_todos").innerText = todos.lengt
        let todo_length  =  Object.keys(todo).length
        console.log("length ", todo_length)
        if(todo_length === 0)
        {
            alert("The TODO with that id do not exist")
        }
        else{
            todo_container.innerHTML =  `
            <div class="single-todo">
                <h4>${todo.title}</h4>
                <p>${todo.description}</p>
                <p>${todo.completed?"Completed":"Not Completed"}</p>
            </div>`
        }
          
    })
}