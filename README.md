**Initial setup environment**

[install nodejs at least 16.0.0 version](https://nodejs.org/en/) (recommended install LTS version)

**Optional setup environment**

[DB Browser](https://sqlitebrowser.org/dl/) to make it convenient to view what is stored in the database

**How to start?**

1. grab changes from git/download archive and unzip
2. go to the frontend folder and in the terminal type **yarn** and we are waiting
3. then we enter the **yarn dev** command and remember that what the terminal will give us is the address of the application in the browser, **sample: http://localhost:5173/**, then go to this address
4. then open a new terminal, go to the backend folder and type in the terminal **yarn**
5. find the .env file in the backend folder and check the ORIGIN_HOST variable, it must be exactly the same as the address in the browser
6. then enter the command **yarn dev** in the terminal, if everything is fine, the answer will come that server listening on the port 3001
7. if everything starts, you can go to the browser and test
8. To view the database, you can use DB Browser and open the **database.sqlite** file which is in the backend folder

