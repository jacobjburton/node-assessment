const userData = require('./userData.json');


module.exports = {
    getUsers: (req, res) => {
        // console.log(req.query)
        var returnData = [];
        if (req.query.age) {
            const { age } = req.query;
            
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].age < age) {
                    returnData.push(userData[i]);
                }
            }
            res.status(200).send(returnData);
        }
        if (req.query.lastname) {
            const { lastname } = req.query;

            for (let i = 0; i < userData.length; i++) {
                if (userData[i].last_name === lastname) {
                    returnData.push(userData[i]);
                }
            }
            res.status(200).send(returnData);
        }
        if (req.query.email) {
            const { email } = req.query;

            for (let i = 0; i < userData.length; i++) {
                if (userData[i].email === email) {
                    returnData.push(userData[i]);
                }
            }
            res.status(200).send(returnData);
        }
        if (req.query.favorites) {
            const { favorites } = req.query;

            for (let i = 0; i < userData.length; i++) {
                for (let j = 0; j < userData[i].favorites.length; j++) {
                    if (userData[i].favorites[j] === favorites) {
                        returnData.push(userData[i]);
                    }
                }
                
            }
            res.status(200).send(returnData);
        }
        else {
            res.status(200).send(userData);
        }
    },
    getUserById: (req, res) => {
        // console.log(req.params);

        const { id } = req.params;
        // var returnData = [];
        
        for (let i = 0; i < userData.length; i++) {
            var exists = false;
            if (userData[i].id === +id)
            {
                exists = true;
                res.status(200).send(userData[i]);                
            }
        }
        if (!exists) {
            res.status(404).json(null);
        }
    },
    getAdmins: (req, res) => {
        var returnData = [];

        for (let i = 0; i < userData.length; i++) {
            if(userData[i].type === 'admin') {
                returnData.push(userData[i]);
            }            
        }
        res.status(200).send(returnData);
    },
    getNonAdmins: (req, res) => {
        var returnData = [];

        for (let i = 0; i < userData.length; i++) {
            if(userData[i].type !== 'admin') {
                returnData.push(userData[i]);
            }            
        }
        res.status(200).send(returnData);
    },
    getUsersByType: (req, res) => {
        var returnData = [];   
        const { usertype } = req.params;
        // console.log(usertype);
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].type === usertype) {
                returnData.push(userData[i]);
            }
        }
        res.status(200).send(returnData);
    },
    updateUser: (req, res) => {
        //const { id } = +req.params;
        let newId = +req.params.id;
        // console.log(newId, req.body);
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;

        // userData[id] = req.body;
        let userIndex = userData.findIndex((i) => i.id === newId); 
        let newUser = userData[userIndex];
        // console.log(userIndex)
     
        userData[userIndex].id = newId;
        userData[userIndex].first_name = first_name;
        userData[userIndex].last_name = last_name;
        userData[userIndex].email = email;
        userData[userIndex].gender = gender;
        userData[userIndex].language = language;
        userData[userIndex].age = age;
        userData[userIndex].city = city;
        userData[userIndex].state = state;
        userData[userIndex].type = type;
        userData[userIndex].favorites = favorites;
        // console.log(userData[userIndex]);
        res.status(200).send(userData);
    },
    createUser: (req, res) => {
        let newId = userData.length + 1;
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        let index = userData.length;
        let newUser = {};


        newUser.id = newId;
        newUser.first_name = first_name;
        newUser.last_name = last_name;
        newUser.email = email;
        newUser.gender = gender;
        newUser.language = language;
        newUser.age = age;
        newUser.city = city;
        newUser.state = state;
        newUser.type = type;
        newUser.favorites = favorites;

        userData.push(newUser);
        res.status(200).send(userData);
    },
    deleteUser: (req, res) => {
        let idToDelete = +req.params.id;
        let userIndex = userData.findIndex((i) => i.id === idToDelete); 
    
        // let tempArr = userData;
        userData.splice(userIndex, 1);
        // userData = tempArr;

        res.status(200).send(userData);
    }
}