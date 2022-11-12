
class UserCollectionWithDOM extends UserCollection {
    searchString = "";
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
                ${user.price}
            </td>
            <td>
                ${user.manufacturer}
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

    getUsers() {
        if (this.searchString)
            return this.getByUsernameStart(this.searchString);

        return this.getAll();
    }

    get usersToTableHtml() {
        let users = this.getUsers();
        if (users.length == 0)
            return `
                <h3> No users </h3>
            `;
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
                        Price
                    </th>
                    <th>
                        Manufacturer
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
                    <input name="price" placeholder="price">
                    <input name="manufacturer" placeholder="manufacturer">
                    <input name="image" placeholder="avatar url">
                    <button type="button" onclick="AddNewUser()">
                        Save
                    </button>
                </form>
            </div>
        `;
    }
    get editFormHtml() {
        return ` 
            <div id="edit-user">
                <form name="editForm" method="post" action="#">
                    <h3> Edit User </h3>
                    <input name="id" type="hidden">
                    <input name="username" placeholder="username"> 
                    <input name="price" placeholder="price">
                    <input name="manufacturer" placeholder="manufacturer">
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

    mount(parrent) {
        this._parrent = parrent;
        this.render();
        this.addEventListners();
        this.createClickHadlers();
        this.addErrorMessage();
    }

    render() {
        this._parrent.innerHTML = this.searchInputHtml + this.usersToTableHtml + this.addFormHtml + this.editFormHtml;
    }
    addEventListners() {
        document.addEventListener("deleteUser", event => {
            super.delete(event.detail.id);
            this.render();
        });
        document.addEventListener("addUser", event => {
            super.create(event.detail);
            this.render();
        });
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
        window.DeleteUser = (id) => {
            let deleteUserEvent = new CustomEvent("deleteUser", { detail: { id } });
            document.dispatchEvent(deleteUserEvent);
        }

        window.ShowAddUserForm = () => {
            document.getElementById("add-user").style.display = "block";
        }
        window.AddNewUser = () => {
            const username = document.getElementsByName("username")[0].value;
            const price = document.getElementsByName("price")[0].value;
            const manufacturer = document.getElementsByName("manufacturer")[0].value;
            const image = document.getElementsByName("image")[0].value;
            let addUserEvent = new CustomEvent("addUser", {
                detail: {
                    username, 
                    price,
                    manufacturer,
                    image,
                }
            });
            document.dispatchEvent(addUserEvent);
        }

        
        window.StartEditUser = (id) => {
            document.getElementById("edit-user").style.display = "block";

            let user = super.getById(id); 
            document.getElementsByName("id")[1].value = user.id;
            document.getElementsByName("username")[1].value = user.username;
            document.getElementsByName("price")[1].value = user.price;
            document.getElementsByName("manufacturer")[1].value = user.manufacturer;
            document.getElementsByName("image")[1].value = user.image;
        }

        window.EditUser = () => {
            const id = parseInt(document.getElementsByName("id")[1].value);
            const username = document.getElementsByName("username")[1].value;
            const price = document.getElementsByName("price")[1].value;
            const manufacturer = document.getElementsByName("manufacturer")[1].value;
            const image = document.getElementsByName("image")[1].value;
            let editUserEvent = new CustomEvent("editUser", {
                detail: {
                    id,
                    username, 
                    price,
                    manufacturer,
                    image,
                }
            });
            document.dispatchEvent(editUserEvent);
        }
        window.Search = () => {
            const searchString = document.getElementById("searchByName").value;
            let searchEvent = new CustomEvent("searchUser", { detail: { searchString } });
            document.dispatchEvent(searchEvent);
        }
    }
    addErrorMessage() {
        window.onerror = (error) => {
            alert(error);
        }
    }
}
