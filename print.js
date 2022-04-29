let myFile = "./test.jpg";
const fs = require("fs");
		
app.all('/test', async (req, res) => {
	try {
		const readData = fs.readFileSync(myFile, 'utf8');
		if (readData) {
			res.send(readData)
		}
	} catch (error) {
		res.send("something is wrong", error)
	}
})