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
            <button onclick="deleteTodo(${todo.id})" type="button" class="btn btn-outline-danger">Delete</button>
            <button onclick="editTodo(${todo.id})" type="button" class="btn btn-outline-success">Update</button>

        </div>`

    }
  
})

// update function
function editTodo(id)
{

    fetch(`http://localhost:3000/todos/${id}`)
    .then(function (response){
        return response.json()
    })

    .then(function (todo)
    {
        let editContainer = document.getElementById("editTodo");
        editContainer.innerHTML = `
        <h4>Edit todo with id ${todo.id}</h4>
        <form id="editForm">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" value="${todo.title}" class="form-control" id="editTitle">
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" value="${todo.description}" class="form-control" id="editDescription">
            </div>

            <div class="mb-3">
                <label class="form-label">Completed</label>
                <select class="form-select" id="editCompleted">
                    <option value="false">False</option>
                    <option selected value="true">True</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">User Id</label>
                <input type="text" value="${todo.userId}" freadOnly class="form-control" id="editUserid">
            </div>
            
            <button type="submit" class="btn btn-success">Update</button>
        </form>
        `
        // updating Data
        let editForm = document.getElementById("editForm");
        editForm.addEventListener("submit", function(event){
            event.preventDefault()

            let title = document.getElementById("editTitle").value;
            let description = document.getElementById("editDescription").value;
            let completed = document.getElementById("editCompleted").value;
            let userid = parseInt(document.getElementById("editUserid").value);

            console.log("title "+title+" desc "+description+ " completed "+completed+" user "+userid)
        
            fetch(`http://localhost:3000/todos/${todo.id}`, {
                method:'PATCH',
                body: JSON.stringify({
                    "title":title,
                    "description": description,
                    "completed": completed,
                    "userId": userid
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(function (response){
            return response.json()
            })
            .then(function(res){
                alert("Updated successfully")
            })
        })
                  
    })

 }

// delete function
function deleteTodo(id)
{
    console.log("Delete todo called ", id)
    fetch("http://localhost:3000/todos/"+id, {
        method:'DELETE',
      })
    .then(function (response){
      return response.json()
    })
    .then(function(res){
        alert("Deleted Successfully!!")
    })
}



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


// Posting Data
let addForm = document.getElementById("addForm");
addForm.addEventListener("submit", function(event){
    event.preventDefault()

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let completed = document.getElementById("completed").value;
    let userid = parseInt(document.getElementById("userid").value);

    console.log("title "+title+" desc "+description+ " completed "+completed+" user "+userid)
   
    fetch("http://localhost:3000/todos/", {
        method:'POST',
        body: JSON.stringify({
            "title":title,
            "description": description,
            "completed": completed,
            "userId": userid
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(function (response){
      return response.json()
    })
    .then(function(res){
        console.log(res)
    })
})












































































// let req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//   if (req.readyState == XMLHttpRequest.DONE) {
    
//     console.log(req.responseText);
//   }
// };

// req.open("GET", "", true);
// req.setRequestHeader("", "");
// req.send();


// fetch("https://api.jsonbin.io/v3/b/638ee1b76a51bc4f7048e306/", {
//     method: 'GET',
//     headers: {
//     'Content-Type': 'application/json',
//     'X-Master-Key': '$2b$10$NOis3m5E9C6hkN8IO/J8Vu9Wqbmu0RUfCt0O/NAEVbZOJ37oOkokO'
//     }
// })
// .then(function(response) {
//     return response.json();
//   })
// .then(function(json) {
//     console.log("XXX")
//     console.log(json);
//   });

//   .record.todos