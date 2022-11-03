/*
* клас доповнює можливості колекції користувачів відображатись на дисплеї
*/

class UserCollectionWithDOM extends UserCollection {
    // значення для пошуку
    searchString = "";
    //генеруємо рядок таблиці за вказаними даними користувача
    userToTableRowHtml(user) {
        return `
        <tr>
            <td>
                ${user.id}
            </td>
            <td>
                ${user.username}
            </td>
            <td>
                ${user.gender}
            </td>
            <td>
                ${user.birthYear}
            </td>
            <td>
                ${user.education}
            </td>
            <td>
                ${user.specialty}
            </td>
            <td>
                ${user.dateOfRegistration}
            </td>
            <td>
                <img
                    src="${user.image}" width="120" height="100"
                    alt="${user.username}"
                    class="avatar"
                />
            </td>
            <td> 
                <button onclick="DeleteUser(${user.id})">
                    Delete
                </button>
            </td>
            <td> 
                <button onclick="StartEditUser(${user.id})">
                    Edit
                </button>
            </td>
        </tr>
        `;
    }

    //допоміжний метод, який визначає яких користувачів требавиводити при рендері

    getUsers() {
        // якщо  задане значення для пошуку шукаємо користувачів ім'я яких починається із вказаного значення
        if (this.searchString)
            return this.getByUsernameStart(this.searchString);

        // якщо не задане значення для пошуку, то виводимо всіх користувачів   
        return this.getAll();
    }

    // генеруємо таблицю користувачів
    get usersToTableHtml() {
        //вибираємо яких користувачів шукати
        let users = this.getUsers();
        //якщо для виводу нема користувачів, то показуэмо відповідне повідомлення
        if (users.length == 0)
            return `
                <h3> No users </h3>
            `;
        // якщо є користувачі то формуємо рядки таблиці
        let rows = "";
        for (let user of users) {
            rows += this.userToTableRowHtml(user);
        }
        return `
            <h2> Users </h2>
            <table>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Username
                    </th>
                    <th>
                        Gender
                    </th>
                    <th>
                        Birth Year
                    </th>
                    <th>
                        Education
                    </th>
                    <th>
                        Specialty
                    </th>
                    <th>
                        Date Of Registration
                    </th>
                    <th>
                        Image
                    </th>
                    <th colspan="2">
                        Actions
                    </th>
                </tr>
                ${rows}
            </table>
        `;
    }
    // форма для додавання нового користувача    
    get addFormHtml() {
        return `
            <button type="button" onclick="ShowAddUserForm()">
                Add user
            </button> 
            <div id="add-user">
                <form name="addForm" method="post" action="#">
                    <h3> Add User </h3>
                    <input name="id" type="hidden">
                    <input name="username" placeholder="username"> 
                    <input name="gender" placeholder="gender">
                    <input name="birthYear" placeholder="birthYear">
                    <input name="education" placeholder="educstion">
                    <input name="specialty" placeholder="specialty">
                    <input name="dateOfRegistration" placeholder="dateOfRegistration">
                    <input name="image" placeholder="avatar url">
                    <button type="button" onclick="AddNewUser()">
                        Save
                    </button>
                </form>
            </div>
        `;
    }
    //форма для редагування даних користувача
    get editFormHtml() {
        return ` 
            <div id="edit-user">
                <form name="editForm" method="post" action="#">
                    <h3> Edit User </h3>
                    <input name="id" type="hidden">
                    <input name="username" placeholder="username"> 
                    <input name="gender" placeholder="gender">
                    <input name="birthYear" placeholder="birthYear">
                    <input name="education" placeholder="educstion">
                    <input name="specialty" placeholder="specialty">
                    <input name="dateOfRegistration" placeholder="dateOfRegistration">
                    <input name="image" placeholder="avatar url">
                    <button type="button" onclick="EditUser()">
                        Save
                    </button>
                </form>
            </div>
        `;
    }

    get searchInputHtml() {
        return `<input type="text" 
            name="searchByName" 
            id="searchByName"
            placeholder="Enter username for search"
            value="${this.searchString}"
            onchange="Search()"
        >`;
    }

    //монтуємо компонент у вказаний батьківський та призначаємо обробку подій
    mount(parrent) {
        this._parrent = parrent;
        this.render();
        this.addEventListners();
        this.createClickHadlers();
        this.addErrorMessage();
    }

    // генеруємо HTML код таблиці користувачі та форм редагування та додавання нового користувача
    render() {
        this._parrent.innerHTML = this.searchInputHtml + this.usersToTableHtml + this.addFormHtml + this.editFormHtml;
    }
    // навішуємо слухачів події
    addEventListners() {
        //вилучаємо користувача
        document.addEventListener("deleteUser", event => {
            super.delete(event.detail.id);
            this.render();
        });
        // додаємо нового користувача
        document.addEventListener("addUser", event => {
            super.create(event.detail);
            this.render();
        });
        //редагуэмо користувача
        document.addEventListener("editUser", event => {
            super.update(event.detail.id, event.detail);
            this.render();
        });

        document.addEventListener("searchUser", event => {
            this.searchString = event.detail.searchString;
            this.render();
        });
    }

    createClickHadlers() {
        // функція вилучення користувача при кліці на відповідну кнопку. генерує подію deleteUser
        window.DeleteUser = (id) => {
            let deleteUserEvent = new CustomEvent("deleteUser", { detail: { id } });
            document.dispatchEvent(deleteUserEvent);
        }

        //функція показу форми редагування користувача
        window.ShowAddUserForm = () => {
            document.getElementById("add-user").style.display = "block";
        }
        // функція додавання нового користувача. генерує подію аddUser
        window.AddNewUser = () => {
            const username = document.getElementsByName("username")[0].value;
            const gender = document.getElementsByName("gender")[0].value;
            const birthYear = document.getElementsByName("birthYear")[0].value;
            const education = document.getElementsByName("education")[0].value;
            const specialty = document.getElementsByName("specialty")[0].value;
            const dateOfRegistration = document.getElementsByName("dateOfRegistration")[0].value;
            const image = document.getElementsByName("image")[0].value;
            let addUserEvent = new CustomEvent("addUser", {
                detail: {
                    username, //username: username
                    gender,
                    birthYear,
                    education,
                    specialty,
                    dateOfRegistration,
                    image,
                }
            });
            document.dispatchEvent(addUserEvent);
        }

        // показуємо форму редагування та заповнюємо її значеннями користувача із вказаним id
        // оскіль в функції використовується super то тут можна використовуватит  ВИКЛЮЧНО ЛЯМБДА ФУНКЦІЮ!
        // Анонімна функція видасть помилку. Решта функцій не використовує super чи this, тому їх можна робити як лямбда так і анонімними
        window.StartEditUser = (id) => {
            document.getElementById("edit-user").style.display = "block";

            let user = super.getById(id); // знаходимо користувача із вказаним id 
            document.getElementsByName("id")[1].value = user.id;
            document.getElementsByName("username")[1].value = user.username;
            document.getElementsByName("gender")[1].value = user.gender;
            document.getElementsByName("birthYear")[1].value = user.birthYear;
            document.getElementsByName("education")[1].value = user.education;
            document.getElementsByName("specialty")[1].value = user.specialty;
            document.getElementsByName("dateOfRegistration")[1].value = user.dateOfRegistration;
            document.getElementsByName("image")[1].value = user.image;
        }

        //отримуємо відредаговані значення користувача із форми та генеруємо подію editUser
        window.EditUser = () => {
            const id = parseInt(document.getElementsByName("id")[1].value);
            const username = document.getElementsByName("username")[1].value;
            const gender = document.getElementsByName("gender")[1].value;
            const birthYear = document.getElementsByName("birthYear")[1].value;
            const education = document.getElementsByName("education")[1].value;
            const specialty = document.getElementsByName("specialty")[1].value;
            const dateOfRegistration = document.getElementsByName("dateOfRegistration")[1].value;
            const image = document.getElementsByName("image")[1].value;
            let editUserEvent = new CustomEvent("editUser", {
                detail: {
                    id,
                    username, //username: username
                    gender,
                    birthYear,
                    education,
                    specialty,
                    dateOfRegistration,
                    image,
                }
            });
            document.dispatchEvent(editUserEvent);
        }
        // пошук
        window.Search = () => {
            const searchString = document.getElementById("searchByName").value;
            let searchEvent = new CustomEvent("searchUser", { detail: { searchString } });
            document.dispatchEvent(searchEvent);
        }
    }
    // функція виводу повідомлень про помилку
    addErrorMessage() {
        window.onerror = (error) => {
            alert(error);
        }
    }
}
