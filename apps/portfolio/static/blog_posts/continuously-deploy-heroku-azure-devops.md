---
title: "How to Continuously Deploy a Heroku App with Azure DevOps"
slug: "continuously-deploy-heroku-azure-devops"
aliases:
    - /2019/01/20/continuously-deploy-heroku-azure-devops/
date: "2019-01-20"
menu_section: "blog"
toc: true
categories: ["DevOps", "Shell"]
summary: "If you create Heroku apps, you know that the only built-in options for deployment are 1) the Heroku CLI or 2) integration with a github repo. If you don't want your application's code to be publicly accessible, this results in a tedious routine of manually pushing your changes to Heroku. With Azure DevOps, you can create flexible build pipelines to automate various tasks: running tests, creating binaries, publishing artifacts, etc. In this post, I will go through the steps to create a simple build pipeline that automatically pushes the latest code to Heroku when changes are committed to a Azure DevOps repo."
resources:
  - name: cover
    src: cover.jpg
    params:
      credit: "Photo by Scott Blake on Unsplash"
  - name: img1
    src: azure_build_pipeline_00_new_build_pipeline_01.jpg
    title: Figure 1 - First build pipeline
  - name: img2
    src: azure_build_pipeline_01_new_build_pipeline_02.jpg
    title: Figure 2 - New build pipeline
  - name: img3
    src: azure_build_pipeline_02_select_source.jpg
    title: Figure 3 - Select a source repository
  - name: img4
    src: azure_build_pipeline_03_select_template.jpg
    title: Figure 4 - Select a Template
  - name: img5
    src: azure_build_pipeline_04_blank_template.jpg
    title: Figure 5 - Empty pipeline
  - name: img6
    src: azure_build_pipeline_05_build_triggers.jpg
    title: Figure 6 - Trigger settings
  - name: img7
    src: azure_build_pipeline_06_pipeline_variables_1.jpg
    title: Figure 7 - Create pipeline variable for API token
  - name: img8
    src: azure_build_pipeline_07_pipeline_variables_2.jpg
    title: Figure 8 - Make pipeline variable secret
  - name: img9
    src: azure_build_pipeline_08_add_task_01.jpg
    title: Figure 9 - Add a build task to Agent job 1
  - name: img10
    src: azure_build_pipeline_09_add_task_02.jpg
    title: Figure 10 - Add a Powershell task
  - name: img11
    src: azure_build_pipeline_10_new_task.jpg
    title: Figure 11 - Select inline for script type
  - name: img12
    src: azure_build_pipeline_12_powershell_script.jpg
    title: Figure 12 - Inline Powershell script to push changes to Heroku
  - name: img13
    src: azure_build_pipeline_13_save_pipeline.jpg
    title: Figure 13 - Save pipeline and queue build
  - name: img14
    src: azure_build_pipeline_14_build_log.jpg
    title: Figure 14 - Successful build logs
  - name: img15
    src: azure_build_pipeline_15_heroku_deploy_log.jpg
    title: Figure 15 - Heroku deployment logs
  - name: img16
    src: azure_build_pipeline_16_heroku_activity.jpg
    title: Figure 16 - Heroku activity stream
---

## Introduction

If you create Heroku apps, you know that the only built-in options for deployment are 1) the Heroku CLI or 2) integration with a github repo. If you don't want your application's code to be publicly accessible, this results in a tedious routine of manually pushing your changes to Heroku. With Azure DevOps, you can create flexible build pipelines to automate various tasks: running tests, creating binaries, publishing artifacts, etc. In this post, I will go through the steps to create a simple build pipeline that automatically pushes the latest code to Heroku when changes are committed to a Azure DevOps repo.

## Creating a New Build Pipeline

Creating a project in Azure DevOps gives you more than a private git repository. With **Build Pipelines**, you can quickly create a CICD process. Navigate to your project's build piplelines by clicking on the blue rocketship icon. If you have never created a build pipeline for this project, you will be directed to create one as shown in **Figure 1**. Otherwise, select **New -> New build pipeline** as shown in **Figure 2**:

<div style="display: flex; flex-flow: row wrap; align-items: flex-end;">
    <div style="flex: 0 0 50%;">
{{< linked_image img1 >}}
    </div>
    <div style="flex: 0 0 50%;">
{{< linked_image img2 >}}
    </div>
</div>

First, you must select the repository that contains your heroku app. Leave **Azure Repos Git** selected and choose the repo from the dropdown list. Then, click **Continue** (**Figure 3**):

{{< linked_image img3 >}}

Next, you are asked to select a template. You can find templates for many technologies/tools, but since we are creating a simple CD process, scroll to the bottom and select **Empty pipeline** (**Figure 4**):

{{< linked_image img4 >}}

You should see the empty pipeline shown in **Figure 5**. Notice that you are currently viewing the **Tasks** section of the pipeline. Change the name to "Deploy to Heroku" or anything else you like. You can leave the value for **Agent pool** as **Hosted VS2017**:

{{< linked_image img5 >}}

## Enabling Continous Integration

Currently, this pipeline is not configured to run in response to any trigger. In fact, it will never run unless you setup a schedule or enable continuous integration. To do so, Click **Triggers** and select the checkbox for **Enable continuous integration** as shown in Figure 6.

{{< linked_image img6 >}}

Now this pipeline will run whenever a commit is made to the master branch of your repo. You can make this behavior more fine-grained if you wish, by selecting a different branch or adding a path filter in the **Branch Filters** section.

## Obtaining a Heroku API Token

In order to make code changes to your Heroku app, you must authenticate yourself. Normally this is handled for you by the Heroku CLI. When you first run ``heroku login`` an API token is generated and stored in a ~/.netrc file on your machine. To see the value of your API token, you can run ``heroku auth:token`` or ``cat ~/.netrc``. This default token is silently used for all further CLI interactions with Heroku, and it can also be used to push changes from our build pipleline.

However, there are two reasons why this may not be the best token to use for our CD process. 1) The default token expires one year after being generated. 2) The default token will be immediately expired if you run ``heroku logout``. Obviously we do not want our build pipeline to fail unexpectedly when the default token expires. To avoid this, we can create a token which never expires with the ``heroku authorizations:create`` command. For more information on Heroku API tokens, <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=2ahUKEwit9fKKhoHhAhUtHDQIHS3lCnUQFjABegQIChAB&url=https%3A%2F%2Fhelp.heroku.com%2FPBGP6IDE%2Fhow-should-i-generate-an-api-key-that-allows-me-to-use-the-heroku-platform-api&usg=AOvVaw1uXeD1y2O02DcITYNgrc4I" target="_blank">please read this support article</a>.

As shown below, creating a API token is simple. You can also add a description to remind yourself of the intended use. For information on the possible options/values with the ``heroku authorizations:create`` command, please <a href="https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-authorizations-create" target="_blank">see the official docs</a>.

<pre><code><span class="cmd-prompt">$</span> <span class="cmd-input">heroku authorizations:create --description="azure cd token" --short</span>
<span class="cmd-results">787f6805-b74a-45a0-bc58-f6a187bacff2</span>
<span class="cmd-prompt">$</span> <span class="cmd-input">heroku authorizations</span>
<span class="cmd-results">Heroku CLI             5b570a3c-3d2a-4b64-af97-7c1c69fd8f2e  global
azure cd token         787f6805-b74a-45a0-bc58-f6a187bacff2  global</span></code></pre>

Generate a new API token and have the value ready before moving on to the next step.

## Creating a Pipeline Variable

Ok, back at the Azure Build Pipeline, click **Variables** and create a new Pipeline variable as shown in **Figure 7**. I recommend using a simple, short name for any build variables, so I named mine ``pat`` (personal access token).

{{< alert_box >}}
Since exposing the API token would be no different than exposing the password to your Heroku account, **make sure to click the lock icon to make the variable secret as shown in Figures 7 and 8**. This will prevent the API token from appearing in build logs.
{{< /alert_box >}}

{{< linked_image img7 >}}

{{< linked_image img8 >}}

## Configuring the Build Task

It might seem like we've done a lot of work up to this point, but right now our pipeline doesn't actually do anything. Click on **Tasks** to return to the empty build template. Click on the <i class="fa fa-plus"></i> symbol to add a task to Agent job 1 as shown in **Figure 9**:

{{< linked_image img9 >}}

The list of tasks is pretty huge, so filter it by typing **"power"** or **"powershell"** into the search box as shown in **Figure 10**. Then, click the **Add** button to add a blank Powershell task to Agent job 1:

{{< linked_image img10 >}}

This task requires either a filepath to a Powershell script or an inline Powershell script that executes when the build is triggered. Click the radio button for **Inline** as shown in **Figure 11**:

{{< linked_image img11 >}}

What do we need our Powershell script to do, exactly? In order to push our updated code to Heroku, our script needs to do three things:

1. Checkout the branch which was just updated
2. Add a remote for our heroku git repo
3. Push the current version of the updated branch to the heroku remote (authenticating our account with the API token we added as a pipeline variable).

## Using Predefined Build Variables

Azure DevOps provides <a href="https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml" target="_blank">a set of predefined variables</a> which can be referenced in build pipelines. For our Powershell script, we need to reference the name of the branch which was updated, and luckily there is a build variable which contains that exact information.

<blockquote cite="[https://www.packer.io/intro/index.html](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)">
    <p><strong>Build.SourceBranchName</strong> is the name of the branch the build was queued for ... The last path segment in the ref. For example, in <code>refs/heads/master</code> this value is <code>master</code>.
    </p>
</blockquote>

We can insert build or pipeline variables into our Powershell script by wrapping the name of the variable in ``$()``.

## Finalizing the Powershell Script

We have everything we need to create a Powershell script that pushes our latest changes to Heroku. If the name of your Heroku app is ``test_app`` and your pipeline variable containing your Heroku API token is named ``pat``, you would enter the following three lines into the Powershell task as shown in **Figure 12** (obviously, modify the script to match the name of your Heroku app and pipeline variable):

```cmd
git checkout $(Build.SourceBranchName)
git remote add heroku https://heroku:$(pat)@git.heroku.com/test_app.git
git push heroku $(Build.SourceBranchName)
```

{{< linked_image img12 >}}

It's a good idea to doublecheck your work at this point. When you are confident that everyting is configured correctly, **Save & queue** your build as shown in **Figure 13**:

{{< linked_image img13 >}}

## Verify Deployment

After the build is queued, click the link that appears, This will take you to build logs which update live as the deployment is running. If everything was configured correctly, you should eventually see that every step of the build pupeline succeeded as shown in **Figure 14**:

{{< linked_image img14 >}}

To see detailed logs for the Heroku deployment process, click on **Powershell Script**. Scroll to the bottom of the log in the popup that appears and you should see something similar to **Figure 15**:

{{< linked_image img15 >}}

Note the revision number (``v60``) and commit ID (``3cced9be``) in the Powershell logs. You can confirm these same details in the Activity stream for your Heroku app (**Figure 16**):

{{< linked_image img16 >}}

## Conclusion

To sum up, Azure DevOps provides a simple way to create a continuous deployment process for your Heroku app. The most important points to remember are:

<ul class="warning">
<li><strong>Enable continuous integration</strong> in the Triggers section of your build pipeline. If you forget to do this, your build process will fail to trigger when you push new commits to the Azure repo.</li>
<li><strong>Create a Heroku API token</strong> that is only used for authenticating automated deployment tasks.</li>
<li><strong>Add the API token as a secret variable</strong> to your build pipeline to prevent the token from being displayed in log messages.</li>
<li><strong>Inspect the log messages</strong> for your build if any errors occur.</li>
</ul>
I hope this post was helpful to you, let me know if you have any questions or suggestions in the comments!
