# CS375GroupProject

## How to run the app instruction for professor Long:

### Option 1:
- Once you are inside `CS375GroupProject`, `cd client` and then run `npm run build`. That build command has been set up so that the content of the output folder will automatically being moved to inside the `server/public` folder
- cd into `CS375GroupProject/server` and then run `npm run start` or `npm run dev`
- You should see the app in `http://localhost:3000/`

### Option 2:
- Once you are inside `CS375GroupProject`, `cd server` and then run `npm run dev`
- Open another terminal, cd into `CS375GroupProject/client` and then run `npm run dev`
- You should see the app in `http://localhost:5173/`

## How to setup development environment:
 - Clone the project: `git clone git@github.com:alexgmaier11/CS375GroupProject.git`
 - `cd CS375GroupProject` and `npm install`

 ## Run the dev server: `cd app` and `npm run dev`
 - `nodemon` is used to run the dev server. This package automatically restart when we make 
 changes to the server so that we don't have to manually stop and restart.
 - Mac user might have to run something that I forgot to use nodemon. Or you can just use `npm run start` or `node server.js`
 - See the "script" part in the package.json file for details

 ## Run production server: `cd app` and `npm run start`
 - See the "script" part in the package.json file for details

 ## Git stuff

 ### Pull new commits from the remote Github repo to your local repo
 - `git pull origin <branch-name>`

 ### Create a new branch locally 
 Assume we want to create a branch "dev" based on the `main` branch:
 - Make sure we are on `main` branch: `git checkout main`
 - Create a new branch based on the `main` branch: `git checkout -b <branch-name>` (you would be move to this new branch after running this)
 - Go to other branchs: `git checkout <branch-name>`

 ### Push commit to remote GitHub repo
 - `git status` to see anything needs to be added
 - `git add <filenames>` or to add everything: `git add .`
 - `git commit -m "your message"` put in present tense
 - `git push origin <branch-name>` (don't push to main !!!)

 ### Rewrite commit message:
 - Can only be done if hasn't push to remote repo: `git commit --amend`

 ### Uncommit your most recent commit (locally):
 `git reset --soft HEAD~1`
