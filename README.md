# Meetings Management


## How to run application locally? 🌟
  - Clone the repo
  - open the terminal in the repo location
  - Run **npm install** in *client* and *server* folder separetly 
  - In *server* folder add **.env** file with following contents
    - CONNECTION_URI = mongo_db_connect_uri
    - JWT_KEY = key_for_signing_jwt_token
  - Also add **.env** file *client* folder with following contents
    - REACT_APP_BASE_URI = url_at_which_server_is_running
    - REACT_APP_JWT_KEY = same_as_in_server
  - Run **npm start** in *client* folder to start the frontend
  - Run **npm run dev** in *server* folder to start the server  
