

 class User {

    constructor(username, price, manufacturer, image) {
      this.username = username;
      this.price = price;
      this.manufacturer = manufacturer;
      this.image = image;
      this._id = User._idCounter++; 
    }
  
    get id() {
      return this._id;
    }
  
    get settablePropertiesList() {
      return ["username", "price", "manufacturer", "image"];
    }
  
    get gettablePropertiesList() {
      return ["id", ...this.setablePropertisList];
    }
  }
  
  User._idCounter = 0;