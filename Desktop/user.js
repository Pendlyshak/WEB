/*
 *Клас користувача
 * username - логін
 * _password - пароль не менше 3 символів
 * image - URL аватара
 * _idCounter - статична властивість, використовується для генрування унікального ідентифікатора.
 * setablePropertisList - список полів, які можна змінювати
 */

 class User {

    constructor(username, gender, birthYear, education, specialty, dateOfRegistration, image) {
      this.username = username;
      this.gender = gender;
      this.birthYear = birthYear;
      this.education = education;
      this.specialty = specialty;
      this.dateOfRegistration = dateOfRegistration;
      this.image = image;
      this._id = User._idCounter++; // генеруємо унікальний ідентифікатор 0, 1, 2, ...
    }
  
    get id() {
      return this._id;
    }
  
    //список властивостей класу які можна змінювати
    get settablePropertiesList() {
      return ["username", "gender", "birthYear", "education", "specialty", "dateOfRegistration", "image"];
    }
  
    get gettablePropertiesList() {
      return ["id", ...this.setablePropertisList];
    }
  }
  
  User._idCounter = 0;