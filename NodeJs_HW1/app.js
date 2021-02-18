const fs = require('fs');
const path = require('path');



const path18Time = path.join(__dirname, 'dir', '1800')
const path20Time = path.join(__dirname, 'dir', '2000')

fs.readdir(path18Time, (e, files) => {
		if (e) {
				console.log(e)
				return
		}
		files.map(file => {
				const pathFull18 = path.join(path18Time, file)
				const pathFull20 = path.join(path20Time, file)
				fs.readFile(pathFull18, (e, data) => {
						if (e) {
								console.log(e)
								return;
						}
						const object = JSON.parse(data);
						if (object.gender === 'male') {
								fs.rename(pathFull18, pathFull20, e => {
										if (e) {
												console.log(e)
												return;
										}
								})
						}
				})
		})
})
fs.readdir(path20Time, (e, files) => {
		if (e) {
				console.log(e)
				return
		}
		files.map(file => {
				const pathFull18 = path.join(path18Time, file)
				const pathFull20 = path.join(path20Time, file)
				fs.readFile(pathFull20, (e, data) => {
						if (e) {
								console.log(e)
								return;
						}
						const object = JSON.parse(data);
						if (object.gender === 'female') {
								fs.rename(pathFull20, pathFull18, e => {
										if (e) {
												console.log(e)
												return;
										}
								})
						}
				})
		})
})


