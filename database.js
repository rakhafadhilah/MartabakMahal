const fs = require('fs');
const crypto = require('crypto');

const foods_path = './databases/foods.json';
const users_path = './databases/users.json';

module.exports = {

    // template
    food_template: function () {
        return 
    },
    user_template: function () {
        return {
            name: 'Keju',
            salt: 'garam',
            password: '1234'
        }
    },

    // makanan
    get_foods: function () {
        return JSON.parse(fs.readFileSync(foods_path)).foods;
    },
    set_foods: function (foods) {
        var fdb = { foods: foods };
        fs.writeFileSync(foods_path, JSON.stringify(fdb, null, 4));
    },
    get_food: function (id) {
        var foods = this.get_foods();
        return foods.find(food => food.id === id);
    },
    get_food_by_name: function (name) {
        var foods = this.get_foods();
        return foods.find(food => food.name === name);
    },
    add_food: function (name, price, milkbased) {
        var foods = this.get_foods();
        var food = {
            id: 0,
            name: name,
            price: price,
            mengandung_susu: milkbased || false
        }
        if (typeof foods !== 'undefined') {
            food.id = foods.length
            foods.push(food);
        } else {
            foods = [food];
        }
        this.set_foods(foods);
    },

    // user
    get_users: function () {
        return JSON.parse(fs.readFileSync(users_path)).users;
    },
    set_users: function (users) {
        var udb = { users: users }
        fs.writeFileSync(users_path, JSON.stringify(udb, null, 4));
    },
    get_user: function (name) {
        var users = this.get_users();
        return users.find(user => user.name === name);
    },
    add_user: function (name, password) {
        var users = this.get_users();
        var salt = crypto.randomBytes(16).toString('hex');
        var user = {
            name: name,
            salt: salt,
            password: this.hash(password, salt)
        }
        if (typeof users !== 'undefined') {
            users.push(user);
        } else {
            users = [user];
        }
        this.set_users(users);
    },

    // password
    check_password: function (name, password) {
        var user = this.get_user(name);
        if (typeof user === 'undefined') {
            return false;
        } else {
            var hashed = this.hash(password, user.salt);
            return user.password === this.hash(password, user.salt);
        }
    },
    hash: function (password, salt) {
        return crypto.pbkdf2Sync(password, salt, 10, 64, `sha512`).toString(`hex`);
    }

}