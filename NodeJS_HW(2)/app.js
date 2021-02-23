// 	При реєстрації юзер вводть мейл, нік та пороль і ви його данні дописуєте в файл. Але тільки якщо його немає ще. Якшо він є, то видаєте помилку. Після реєстрації переходите на сторінку зі всіма юзерми.
//
// 	При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти його мейлик в списку юзерів та якщо такий мейлик з таким паролем є, то віддати інформацію про юзера. В інакшому випадку сказати, що необхідно реєструватись.
//
// 	І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
// 	При реєстрації мейли не можуть повторюватись

const fs = require('fs');
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));

app.set('views', path.join(__dirname, 'views'));


const dirPath = path.join(__dirname, 'users', 'users.json');

//registration
app.get('/register', (req, res) => {
	res.render('registration')
})
app.post('/register', (req, res) => {

	fs.readFile(path.join(dirPath), (e, file) => {
		if (e) {
			console.log(e);
			return;
		}
		const objUsers = JSON.parse(file.toString());
		//console.log(objUsers)
		const findDataUser = objUsers.find(value => value.email === req.body.email);
		if (!findDataUser) {
			objUsers.push(req.body);
			fs.writeFile(dirPath, JSON.stringify(objUsers), err1 => {
				if (err1) {
					console.log(err1);
				}
			});
			res.redirect('/users');
			return;
		}
		res.redirect('/err');

	});
});

//ALL USERS
	app.get('/users', (req, res) => {
		fs.readFile(path.join(dirPath), (e, file) => {
			if (e) {
				console.log(e);
				return;
			}
			const objUsers = JSON.parse(file.toString());
			res.render('users', {objUsers})
		})
	})

//login
	app.get('/login', (req, res) => {
		res.render('login')
	})
	app.post('/login', (req, res) => {
		fs.readFile(dirPath, (e, file) => {
			if (e) {
				console.log(e)
				return;
			}
			const users = JSON.parse(file.toString())
			const findDataUser = users.findIndex(value => value.email === req.body.email &&
				value.password === req.body.password)
			if (findDataUser > -1) {
				res.redirect(`/users/${findDataUser}`)
				return;
			}
			res.redirect('/register');
		})
	})

// one user
	app.get('/users/:userId', (req, res) => {
		fs.readFile(dirPath, (e, file) => {
			if (e) {
				console.log(e)
				return;
			}
			const users = JSON.parse(file.toString())
			const {userId} = req.params;
			res.json(users[userId])
			res.render('user', {user: users[userId]})
		})
	})

//message
	app.get('/err', (req, res) => {
		res.render('error')
	})

	app.listen(5000, () => {
		console.log('Ready')
	})
