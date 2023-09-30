const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');


const generateTemplate = Todo => {

    const html = `
     <li class="list-group-item text-light d-flex justify-content-between align-items-center">
        <span>${Todo}</span>
        <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += html;

};


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const Todo = addForm.add.value.trim();

    if(Todo.length){
        generateTemplate(Todo);
        addForm.reset();
    }

    
});

// delete todos
list.addEventListener('click', e => {

    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

const filterTodos = (term) => {
    
    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));

};

// keyup event
search.addEventListener('keyup', () =>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});