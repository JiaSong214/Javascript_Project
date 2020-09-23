const todoList = (() => {
  let id = 2;

  const Model = (() => {
    //todo constructor
    function Todo(title) {
      this.id = id;
      this.check = false;
      this.title = title;
      this.time = new Date();
    }

    // Todo.prototype.changeCheck = () => {
    //   this.check = !this.check;
    // };

    const todoModel = {
      todoObj_LS: 'todo',
      todoObj: [],

      getData: function () {
        return JSON.parse(localStorage.getItem(this.todoObj_LS));
      },
      setData: function () {
        localStorage.setItem(this.todoObj_LS, JSON.stringify(this.todoObj));
      },

      addData: function (title) {
        id++;

        const newTodo = new Todo(title);
        this.todoObj.push(newTodo);
        this.setData();
      },
      deleteData: function (id) {
        const newTodoObj = this.getData().filter((todo) => {
          return parseInt(todo.id) !== parseInt(id);
        });
        this.todoObj = newTodoObj;
        this.setData();
      },
      changeCheck: function (id) {
        const newTodoObj = this.getData().map((todo) =>
          parseInt(todo.id) === parseInt(id)
            ? { ...todo, check: !todo.check }
            : todo,
        );
        this.todoObj = newTodoObj;
        this.setData();
      },
    };

    return {
      todoModel,
    };
  })();

  const View = (() => {
    const setDate = () => {
      const today = new Date();
      const monthNames = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ];
      const dayNames = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ];

      document.querySelector(
        '.todoList__date__date',
      ).textContent = today.getDate();
      document.querySelector(
        '.todoList__date__year',
      ).textContent = today.getFullYear();
      document.querySelector('.todoList__date__month').textContent =
        monthNames[today.getMonth()];
      document.querySelector('.todoList__date__day').textContent =
        dayNames[today.getDay()];
    };

    const renderTodo = (todoObj) => {
      const todoList = document.querySelector('.todoList__todo__list');
      todoList.textContent = '';

      todoObj.forEach((todo) => {
        const todoList__item = document.createElement('li');
        todoList__item.classList.add('todoList__todo__list__item');
        todoList__item.setAttribute('data-id', todo.id);

        const todoList__title = document.createElement('p');
        todoList__title.classList.add('todoList__todo__list__item__title');
        todoList__title.textContent = todo.title;

        const todoList__time = document.createElement('p');
        todoList__time.classList.add('todoList__todo__list__item__time');
        todoList__time.textContent = `Created ${todo.time}`;

        const todoList__checkBtn = document.createElement('span');
        todoList__checkBtn.classList.add(
          'todoList__todo__list__item__checkBtn',
        );
        if (todo.check === true) {
          todoList__item.classList.add('check');
        } else {
          todoList__item.classList.remove('check');
        }
        todoList__checkBtn.addEventListener('click', () =>
          Controller.checkTodo(todo.id),
        );

        const todoList__deleteBtn = document.createElement('span');
        todoList__deleteBtn.classList.add(
          'todoList__todo__list__item__deleteBtn',
        );
        todoList__deleteBtn.innerHTML = '&times;';
        todoList__deleteBtn.addEventListener('click', () =>
          Controller.deleteTodo(todo.id),
        );

        todoList.appendChild(todoList__item);

        const todo_contents_box = document.createElement('div');
        todo_contents_box.classList.add('todoList__todo__list__item__box');

        todoList__item.append(
          todoList__checkBtn,
          todo_contents_box,
          todoList__deleteBtn,
        );
        todo_contents_box.append(todoList__title, todoList__time);
      });
    };

    return {
      setDate,
      renderTodo,
    };
  })();

  const Controller = (() => {
    const submitForm = (e) => {
      e.preventDefault();

      const todo__input = todo__form.querySelector(
        '.todoList__todo__form__input',
      );
      Model.todoModel.addData(todo__input.value);
      todo__input.value = '';

      const newTodoObj = Model.todoModel.getData();
      View.renderTodo(newTodoObj);
    };

    const deleteTodo = (id) => {
      Model.todoModel.deleteData(id);
      const newTodoObj = Model.todoModel.getData();
      View.renderTodo(newTodoObj);
    };

    const checkTodo = (id) => {
      Model.todoModel.changeCheck(id);
      const newTodoObj = Model.todoModel.getData();
      View.renderTodo(newTodoObj);
    };

    const firstRender = () => {
      const userLocalStorage = Model.todoModel.getData();
      if (userLocalStorage !== null) {
        Model.todoModel.todoObj.push(...userLocalStorage);
        View.renderTodo(userLocalStorage);
      } else {
        const defaultData = [
          {
            id: 0,
            check: true,
            title: 'Make a To-do list',
            time: '2020-09-11',
          },
          {
            id: 1,
            check: false,
            title: 'Study Node.js',
            time: 'yesterday',
          },
        ];
        Model.todoModel.todoObj.push(...defaultData);
        Model.todoModel.setData();
        const newData = Model.todoModel.getData();
        View.renderTodo(newData);
      }
    };

    const todo__form = document.querySelector('.todoList__todo__form');
    todo__form.addEventListener('submit', (e) => submitForm(e));

    return {
      firstRender,
      deleteTodo,
      checkTodo,
    };
  })();

  Controller;
  View.setDate();
  Controller.firstRender();
})();
