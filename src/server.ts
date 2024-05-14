// Modules Imports
import app from './app';

// Dotenv Config
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	console.clear();
	console.log(`⚡ Server is running on port ${PORT}.`);
});
