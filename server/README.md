# BEFORE RUNNING APP
Please create your own .env file like this:

DB_NAME="your database name"
DB_USERNAME="your username"
DB_PASSWORD="your password"
DB_HOST="usually localhost"

# NOTICE
have your database name ALREADY CREATED before running program. The table creates itself if it isn't present, but the database initaliztion and creation has not worked yet on its own. MUST HAVE it before call node index.js . Else will not work and will output error "unknown database <name>"
