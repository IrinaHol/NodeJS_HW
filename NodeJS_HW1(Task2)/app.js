// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.

const fs = require('fs');
const path = require('path');

const oldFolder = path.join(__dirname, "Flat1");


function flatMoving(oldFolder) {
		fs.readdir(oldFolder, (err, files) => {
				if (err) {
						console.log(err);
						return;
				}
				files.forEach(file => {
						const pathFromFolder = path.join(oldFolder, file);

						fs.stat(pathFromFolder, (e, stats) => {
								if (e) {
										console.log(e);
										return;
								}
								if (stats.isDirectory()) {
										flatMoving(pathFromFolder);
								} else {
										const newFolder = path.join(__dirname, "Flat2");
										fs.rename(pathFromFolder, path.join(newFolder, file), e => {
												if (e) {
														console.log(e);
														return;
												}
										})
								}
						})
				})
		})
}

flatMoving(oldFolder);
