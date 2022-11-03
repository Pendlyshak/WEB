/*
 * клас реалізує шаблон Create Read Update Delete
 * для колекції користувачів.
 */

class UserCollection {
    constructor() {
      this.items = [];
    }
    //кількість користувачів в колекції
    get count() {
      return this.items.length;
    }
    //додаємо нового користувача 
    add(user) {
      if (!(user instanceof User))
        throw `${user} is not instance of User`;
      this.items.push(user);
    }
  
    //створюємо нового коритсувача із переданих даних і додаємо до колекції
    create(userData) {
      let newUser = new User(userData.username, userData.gender, userData.birthYear, userData.education, userData.specialty, userData.dateOfRegistration, userData.image);
      this.items.push(newUser);
    }
  
    //знаходиомо користувача по id
    getById(id) {
      return this.items.find(user => user.id == id);
    }
    //знаходиомо користувача по імені    
    getByUsername(username) {
      return this.items.find(user => user.username.toLowerCase() == username.toLowerCase());
    }
    //знаходиомо користувача довжина якого коротша за вказану
    getShortUsernames(len) {
      return this.items.filter(user => user.username.length <= len);
    }
  
    getByUsernameStart(searchString) {
      return this.items.filter(user => user.username.toLowerCase().startsWith(searchString.toLowerCase()));
    }
    // Копія списку всіх користувачів
    getAll() {
      // return this.items;
      return [...this.items];
      //випрпавити для захисту від зміни копії.
    }
    //оновлюємо дані користувача із вказаним id
    update(id, updatedUser) {
      let user = this.getById(id);
      if (!user)
        throw `Not found user with id ${id}`;
  
  
      // if (updatedUser?.username)
      //     user.username = updatedUser.username;
      // if (updatedUser?.password)
      //     user.password = updatedUser.password;
      // if (updatedUser?.image)
      //     user.image = updatedUser.image;
  
      // щоб не писати багато одинакових операторів використаємо цикл по списку властивостей класу, які можна змінювати
      for (let key of user.settablePropertiesList)
        if (updatedUser[key])
          user[key] = updatedUser[key];
    }
    // вилучення користувача із вказаним id
    delete(id) {
      let userIndex = this.items.findIndex(user => user.id == id);
      if (userIndex == -1)
        throw `Not found user with id ${id}`;
      this.items.splice(userIndex, 1);
    }
  }