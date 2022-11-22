**Initial setup environment**

[install nodejs (version 16.0.0 or higher)](https://nodejs.org/en/) (we recommended to install LTS version)

**Optional setup environment**

[DB Browser](https://sqlitebrowser.org/dl/) to make it convenient to view what is stored in the database

**How to start?**

1. Grab changes from git/download archive and unzip the files
2. Go to the frontend folder and in the terminal type **yarn**, wait for the command to be processed
3. Enter the **yarn dev** command. The terminal will give us the address of the frontend application, **sample: http://localhost:5173/**, open this address in the browser
4. Open a new terminal, go to the backend folder and type **yarn** in the terminal
5. Find the .env file in the backend folder and check the ORIGIN_HOST variable, it must be exactly the same as the address in the browser
6. Enter the command **yarn dev** in the terminal. If everything is fine, the terminal will show that the server is listening on the port 3001
7. If everything starts, you can go to the browser and test
8. To view the database, you can use DB Browser and open the **database.sqlite** file which is in the backend folder

