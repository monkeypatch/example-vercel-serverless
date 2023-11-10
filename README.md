# Boilerplate Next.js and Monkey Patch running on Vercel  🙈 

Example of to create a full webapp using Next.js for the frontend with Monkey Patch running as a serverless function on Vercel backend.

## Before Everything (most people can skip this)
Some prerequisites before you can run this demo. If you already have these, you can skip this section.
1. If you don't have one already, create free account on [Vercel](https://vercel.com/signup)
2. If you don't have one already, create free account on [GitHub](https://github.com/join)
2. Install [Vercel CLI](https://vercel.com/download) on your machine
3. Install [Node.js](https://nodejs.org/en/download/) on your machine
4. Install [Python 3.9](https://www.python.org/downloads/) on your machine (the version is important, as the Vercel uses Python 3.9)
5. Get an [OpenAI API key](https://openai.com/blog/openai-api) (you'll need this to use Monkey Patch)

## Running the app
1. Clone this repo
2. Create a boilerplate vercel app using npx
```bash
npx create-next-app@latest
```
3. Create a requirements.txt file and place it in the root of your project (see example in repo)
4. Create `./app/api/index.py` hat will serve our serverless function (see example in repo)
5. Deploy the app to Vercel
```bash
vercel deploy
```
6. (Optional) If you want vercel to automatically deploy your app on every push to GitHub, you can link your GitHub account to Vercel and then run:
    * Go on Vercel and create a new project
    * Select the repo you want to link
    * Select the branch you want to deploy
    * Select the framework you want to use (Next.js)
    * Follow the instructions to deploy the app
    
