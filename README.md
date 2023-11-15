# Boilerplate Next.js and Monkey Patch running on Vercel  🙈 

Example of to create a full webapp using Next.js for the frontend with Monkey Patch running as a serverless function on Vercel backend.

In this example we'll create a simple webapp that presents users with a form where they can enter a statement and have Monkey Patch assess its truthfulness. The app will then display the result of the assessment.

## Before Everything (most people can skip this)
Some prerequisites before you can run this demo. If you already have these, you can skip this section.
1. If you don't have one already, create free account on [Vercel](https://vercel.com/signup)
2. If you don't have one already, create free account on [GitHub](https://github.com/join)
2. Install [Vercel CLI](https://vercel.com/download) on your machine
3. Install [Node.js](https://nodejs.org/en/download/) on your machine
4. Install [Python 3.9](https://www.python.org/downloads/) on your machine (the version is important, as the Vercel uses Python 3.9)
5. Get an [OpenAI API key](https://openai.com/blog/openai-api) (you'll need this to use Monkey Patch)

## Running the app
1. Create a boilerplate vercel app using npx
```bash
npx create-next-app@latest
``` 
*NOTE:* This project was created with all of the default selections, and this tutorial assumes you did the same. If you modify any of the defaults, make sure you update the code accordingly and architecture of this demo project accordingly.

Once you run this command you'll have an opportunity to choose a project name. This will create a new folder with that name.

2. Enter the folder you just created
```bash
cd <project-name>
```

3.  (optional) Merge this repo with your project
```bash
git init
git remote add origin https://github.com/monkeypatch/example-vercel-serverless.git
git remote -v # To verify the new remote URL
git pull origin master
```

*Note*: If you don't want to merge this repo with your project, you can just copy the files from this repo into your project manually.

4. Create an .env.local file based on the .env.demo file in this repo and update it with your OpenAI API key
```bash
cp .env.demo .env.local
```
5. Create / update the requirements.txt file and place it in the root of your project (see example in repo)
6. Create / update `./app/api/index.py` that will serve our serverless function (see example in repo)
7. Create / update `./package.json` (see example in repo) so that all dependencies are installed when the app is deployed'
8. Run `npm install` to install all dependencies
9. A `globals.css` is automatically created when you run `npx create-next-app@latest`. For the purposes of this demo change the word `dark` in the file to `light` so that the background is white instead of black (vercel's default).
7. Deploy the app to Vercel or run it locally
```bash
# Run locally
vercel dev

# Deploy to Vercel
vercel deploy
```
8. (Optional) If you want vercel to automatically deploy your app on every push to GitHub, you can link your GitHub account to Vercel and then run:
    * Go on Vercel and create a new project
    * Select the repo you want to link
    * Select the branch you want to deploy
    * Select the framework you want to use (Next.js)
    * Follow the instructions to deploy the app
    
