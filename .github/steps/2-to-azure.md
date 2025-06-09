
# ☁️ Quest: I want to move my AI prototype to Azure 

> To reset your progress and select a different quest, click this button:
>
> [![Reset Progess](https://img.shields.io/badge/Reset--Progress-ff3860?logo=mattermost)](../../issues/new?title=Reset+Quest&labels=reset-quest&body=🔄+I+want+to+reset+my+AI+learning+quest+and+start+from+the+beginning.%0A%0A**Please+wait+about+15+seconds.+Your+progress+will+be+reset,+this+issue+will+automatically+close,+and+you+will+be+taken+back+to+the+Welcome+step+to+select+a+new+quest.**)

## 📋 Pre-requisites

1. A GitHub account
2. [Visual Studio Code](https://code.visualstudio.com/) installed
3. [Node.js](https://nodejs.org/en) installed
4. An Azure subscription. Use the [free trial](https://azure.microsoft.com/free/) if you don't have one, or [Azure for Students](https://azure.microsoft.com/free/students/) if you are a student.

## 📝 Overview

In this step, you will learn how to deploy your AI model to Azure AI Foundry after testing it locally with GitHub Models.

### Assumption ⚠️

- You have already completed the previous steps in this project and have opened the **model playground on GitHub Models.**

> [!IMPORTANT]  
> If you have done the previous quest, ensure you pull your changes from GitHub using `git pull` before continuing with this project to update the project README.

## 🧠 GitHub Models to Azure AI Foundry
> [!Note]
> The following steps on GitHub Models should be in A SEPARATE BROWSER TAB. Keep this tab open for reference.

1. On the separate tab on the GitHub models playground, click on **Use this model** and select **Language: JavaScript** and **SDK: Azure AI Inference  SDK**. 

   ![Use model](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/use-this-model-button.png?raw=true)

2. Under **Create a personal access token**, select **Get production key** and this will take you to ai.azure.com and prompt you to:-
   - Sign in to your Azure account
   - Select your Azure subscription 
   - Deploy model

      ![Select subscription](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/ai-foundry-select-subscription.png?raw=true)

3. The model you selected will be pre-populated in the **Deployment name** field. You can optionally click on **Customize** to change the default configuration on deployment type, model version, tokens per minute (TPM) rate limit etc.

      ![Customize model for deployment](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/deploy-model.png?raw=true)

## 🧰 AI Foundry VS Code Extension

To continue working with your deployed model in VS Code, you will need to install the AI Foundry VS Code extension, which will allow you to deploy and manage models in Azure AI Foundry without leaving your IDE.

1. Click on the **Extensions** icon in the left sidebar of Visual Studio Code, search for **Azure AI Foundry** and **install**.

2. Once installed, click on the **AI Foundry** icon in the left sidebar and click on **Set Default Project**. Select your project and expand the **Models** section. You should see your deployed model(s) listed there.

      ![Set default project](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/set-default-project.png?raw=true)

3. Click on the model name to open the model details view, where you can see the model's metadata, including the model version, deployment status, and TPM rate limit.

      ![List of models](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/model-list.png?raw=true)

4. Right click on your model and select **Open in Playground**. This will open a tab in VS Code with a chat Playground, where you can test your deployed model.

      ![AI Foundry playground](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/ai-foundry-playground.png?raw=true)

5. You can also use the **Compare** feature to compare the performance of your deployed model with other models for manual evaluation. Once you are happy with the performance of your deployed model, right click on the model and select **Open Code File**, then:
   - Select **SDK**: Azure AI Inference SDK/ Azure OpenAI SDK
   - Select **Language**: JavaScript
   - Select **Authentication**: Key Authentication

   The code to use your deployed model will be opened in a new tab. **Ensure you save the file as `ai-foundry.js` in your project folder.**

6. Create a `.env` file in your project folder and update it with the following environment variables:

   ```bash
   AZURE_INFERENCE_SDK_KEY=your_api_key
   AZURE_INFERENCE_SDK_ENDPOINT=your_api_endpoint
   ```
   
   You can copy the API key and endpoint either from the model details page or right click on the model and select **Copy API Key/ Copy Endpoint**.

   > **Important ⚠️**
   >
   > Create a `.gitignore` file in your project folder and add the `.env` file to it to prevent it from being pushed to GitHub. This is important for security reasons, as the `.env` file contains sensitive information such as your API key.

7. Open your terminal and run `npm install dotenv` to install the `dotenv` package, which will allow you to load environment variables from the `.env` file.

   Add the following code to the top of your `ai-foundry.js` file to load the environment variables:

   ```javascript
   import dotenv from 'dotenv';

   dotenv.config();
   ```

8. Finally, run `node ai-foundry.js` and observe the output in the terminal. You should see the response from your deployed model.

   ![AI Foundry sample code](https://github.com/Azure-Samples/JS-AI-Build-a-thon/blob/assets/jsai-buildathon-assets/run-ai-foundry-sample.png?raw=true)


## ✅ Activity: Push `ai-foundry.js` code to your repository

### Quest Checklist

To complete this quest and **AUTOMATICALLY UPDATE** your progress, you MUST push your code to the repository as described below.

**Checklist**

- [ ] Have a `ai-foundry.js` file at the root of your project
- [ ] The file MUST include a call to the `chat/completion` endpoint of your deployed model

1. In the terminal, run the following commands to add, commit, and push your changes to the repository:

    ```bash
    git add .
    git commit -m "Connect to Azure AI Foundry"
    git push
    ```

2.  After pushing your changes, **WAIT ABOUT 15 SECONDS FOR GITHUB ACTIONS TO UPDATE YOUR README**.

> To skip this quest and select a different one, click this button:
>
> [![Skip to another quest](https://img.shields.io/badge/Skip--to--another--quest-ff3860?logo=mattermost)](../../issues/new?title=Skip+quest&labels=reset-quest&body=🔄+I+want+to+reset+my+AI+learning+quest+and+start+from+the+beginning.%0A%0A**Please+wait+about+15+seconds.+Your+progress+will+be+reset,+this+issue+will+automatically+close,+and+you+will+be+taken+back+to+the+Welcome+step+to+select+a+new+quest.**)

## 📚 Further Reading

Here are some additional resources to help you learn more about getting started with Azure AI Foundry and deploying models:

- [Azure AI Foundry Extension for Visual Studio Code is Available in Preview](https://devblogs.microsoft.com/foundry/azure-ai-foundry-vscode-extension-preview/)
- [Work with the Azure AI Foundry for Visual Studio Code extension docs](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/develop/get-started-projects-vs-code)
- [📹 BRK107: Develop, Build and Deploy LLM Apps using GitHub Models and Azure AI Foundry](https://build.microsoft.com/en-US/sessions/BRK107?source=sessions)
- [Microsoft AI Tools Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.microsoft-ai-tools-pack), a curated set of essential extensions for building generative AI applications and agents in VS Code