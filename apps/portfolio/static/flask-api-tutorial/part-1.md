---
title: "How To: Create a Flask API with JWT-Based Authentication (Part 1)"
lead: "Part 1: Project Setup and Environment Configuration"
slug: "part-1"
series: ["flask_api_tutorial"]
series_weight: 1
series_title: "How To: Create a Flask API with JWT-Based Authentication"
series_part: "Part 1"
series_part_lead: "Project Setup and Environment Configuration"
menu_section: "tutorials"
categories: ["Flask", "Python", "Tutorial-Series"]
toc: true
summary: "In Part 1, the core concepts of REST and JWTs are introduced, project dependencies are described and installed, and the project is fully configured for prod/dev environments. The flask server and CLI are demonstrated to ensure the setup was performed correctly before moving on to Part 2."
git_release_name: "v0.1"
url_git_rel_browse: "https://github.com/a-luna/flask-api-tutorial/tree/v0.1"
url_git_rel_zip: "https://github.com/a-luna/flask-api-tutorial/archive/v0.1.zip"
url_git_rel_tar: "https://github.com/a-luna/flask-api-tutorial/archive/v0.1.tar.gz"
resources:
  - name: cover
    src: cover.jpg
    params:
      credit: "Photo by Matt Howard on Unsplash"
---
## Introduction

My goal for this tutorial is to provide a detailed guide to designing and creating a Flask API that uses JSON Web Tokens (JWT) to authenticate HTTP requests. There are many different Flask extensions and Python packages that can be used to create a web service that satisfies these requirements. The toolchain that this product utilizes includes Flask-RESTx, SQLAlchemy, PyJWT, pytest and tox (this is simply my personal preference).

This is <span class="emphasis">NOT</span> a full-stack tutorial, creating a front-end that consumes the API is not covered. However, Flask-RESTx will automatically generate a Swagger UI webpage that allows anyone to send requests and inspect responses from the API.

In addition to the user management and authentication functions, the API will contain a RESTful resource that registered users can manipulate with CRUD actions &mdash; a list of "widgets". Why did I decide to create widgets and not to-do items, or something real? Using a generic resource reinforces the idea that this code is boilerplate and could be easily adapted for use in a real-world API.

Performing CRUD actions and restricting access based on a user's assigned role/permissions are extremely common requirements, and the code to do so is the same for a widget, blog post or anything else that you expose to clients via HTTP.

The feature specification for the API is given below. I hope that the various methodologies and "best practices" that I present are well-founded and justified by the arguments I present for them. Any and all comments/criticism are appreciated, please feel free to <a href="https://github.com/a-luna/flask-api-tutorial/issues" target="_blank">log issues in the github repository</a> for suggested improvements and/or any bugs that I missed.

At the end of each section, any requirements that have been completely implemented will be marked as complete (<span class="fa fa-star goldenrod"></span>):

<div class="requirements">
  <p class="title">User Management/JWT Authentication</p>
  <div class="fa-bullet-list">
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>New users can register by providing an email address and password</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Existing users can obtain a JWT by providing their email address and password</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWT contains the following claims: time the token was issued, time the token expires, a value that identifies the user, and a flag that indicates if the user has administrator access</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWT is sent in access_token field of HTTP response after successful authentication with email/password</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWTs must expire after 1 hour (in production)</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWT is sent by client in Authorization field of request header</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Requests must be rejected if JWT has been modified</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Requests must be rejected if JWT is expired</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>If user logs out, their JWT is immediately invalid/expired</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>If JWT is expired, user must re-authenticate with email/password to obtain a new JWT</p>
  </div>
  <p class="title">API Resource: Widget List</p>
  <div class="fa-bullet-list">
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>All users can retrieve a list of all widgets</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>All users can retrieve individual widgets by name</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Users with administrator access can add new widgets to the database</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Users with administrator access can edit existing widgets</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Users with administrator access can delete widgets from the database</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>The widget model contains attributes with URL, datetime, timedelta and bool data types, along with normal text fields.</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>URL and datetime values must be validated before a new widget is added to the database (and when an existing widget is updated).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>The widget model contains a "name" attribute which must be a string value containing only lowercase-letters, numbers and the "-" (hyphen character) or "_" (underscore character).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>The widget model contains a "deadline" attribute which must be a datetime value where the date component is equal to or greater than the current date. The comparison does not consider the value of the time component when this comparison is performed.</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Widget name must be validated before a new widget is added to the database (and when an existing widget is updated).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>If input validation fails either when adding a new widget or editing an existing widget, the API response must include error messages indicating the name(s) of the fields that failed validation.</p>
  </div>
</div>

## Core Concepts

It is important to understand the history and actual meaning of the term REST, as well as the structure and purpose of JSON Web Tokens. Let's review these topics before we begin working on the application.

### Statelessness

I have made the conscious decision NOT to refer to this series as a REST API tutorial. Seemingly every API and every how-to article on API design written in the last few years proclaims itself RESTful. This trend is a disservice to the depth and complexity that Roy Fielding laid out in his doctoral thesis introducing and defining REST. I will go into further detail on this subject in [Part 3](/series/flask-api-tutorial/part-3/) when we begin configuring the API.

However, I think it is important to point out where I am attempting to adhere to the requirements/constraints of REST. One of these constaints is **statelessness**. Statelessness is an essential characteristic of a RESTful system, but it can be a confusing concept at first.

Obviously both the client and server in any hypothetical system keep state; they just keep different types of state. For example, a web browser keeps track of each web page visited as well as the current page; in a RESTful system, this is called **application state**. If the website is a banking application, the server hosting the website keeps track of which bank accounts have been accessed or modified; this is called  **resource state**. "Statelessness" is meant to convey that the server doesn't care about the client's application state, and therefore no data about the client's application state should be stored by the server.

This has obvious implications for authentication scenarios since in a RESTful system the server does not store any information about which users are currently logged in. Therefore, in order to access a protected resource a client must must include authentication information with every request. In order to avoid including the client's password with every request, a common practice is for the server to generate an access token when user credentials have been verified. Now, when the client sends a request for access to a protected resource, the token is included in the request header and verified by the server. The most common format for authorization tokens is the JSON Web Token, which we will take a look at in the next section.

### JSON Web Tokens

JSON Web Token (JWT) is an <a href="https://tools.ietf.org/html/rfc7519" target="_blank">open IETF standard</a> that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWTs are made up of three parts: header, payload and signature. These are converted to a URL-safe base64-encoded string and concatenated together. Each part is separated by "." (the <a href="http://www.fileformat.info/info/unicode/char/2e/index.htm" target="_blank">full-stop</a> or period character).

The **header** will identify the object as a JWT and also identify the algorithm used to generate the signature (e.g., `{"typ": "JWT", "alg": "HS256"}`). The conversion to URL-safe base64-encoded string is shown below:

<pre><code><span class="green">      ASCII: </span><span class="goldenrod">{"t</span>  <span class="blue">yp"</span>  <span class="goldenrod">:"J</span>  <span class="blue">WT"</span>  <span class="goldenrod">,"a</span>  <span class="blue">lg"</span>  <span class="goldenrod">:"H</span>  <span class="blue">S25</span>  <span class="goldenrod">6"}</span>
<span class="green">URLSAFE-B64: </span><span class="goldenrod">eyJ0</span> <span class="blue">eXAi</span> <span class="goldenrod">OiJK</span> <span class="blue">V1Qi</span> <span class="goldenrod">LCJh</span> <span class="blue">bGci</span> <span class="goldenrod">OiJS</span> <span class="blue">UzI1</span> <span class="goldenrod">NiJ9</span></code></pre>

The **payload** is made up of various **claims**, which are key/value pairs containing information about the user and the key itself. There are many claims which are predefined (called <a href="https://tools.ietf.org/html/rfc7519#section-4.1" target="_blank">registered claims</a>), but you are free to create your own as well.

Usually, the payload contains the time when the token was issued and the time when the token expires. These are registered claims and are identified by `iat` and `exp`, respectively. Datetime values must be expressed as "seconds since the epoch", and python contains <a href="https://docs.python.org/3/library/time.html" target="_blank">built-in functions</a> for converting `datetime` objects to this numeric format. However, the PyJWT package will take care of this conversion for you when creating a token.

Another registered claim is `sub` (subject) which is meant to represent the entity that the token was issued to. When a user registers with the API, a random UUID value is generated and stored in the database which will be used as the value for `sub`.

An example payload containing these three claims would be: `{"sub": "570eb73b-b4b4-4c86-b35d-390b47d99bf6", "exp": 1555873759, "iat": 1555872854}`. The conversion to URL-safe base64-encoded string is shown below:

<pre><code><span class="green">      ASCII: </span><span class="goldenrod">{"s</span>  <span class="blue">ub"</span>  <span class="goldenrod">:"5</span>  <span class="blue">70e</span>  <span class="goldenrod">b73</span>  <span class="blue">b-b</span>  <span class="goldenrod">4b4</span>  <span class="blue">-4c</span>  <span class="goldenrod">86-</span>  <span class="blue">b35</span>  <span class="goldenrod">d-3</span>  <span class="blue">90b</span>  <span class="goldenrod">47d</span>  <span class="blue">99b</span>  <span class="goldenrod">f6"</span>  <span class="blue">,"e</span>  <span class="goldenrod">xp"</span>  <span class="blue">:15</span>  <span class="goldenrod">558</span>  <span class="blue">737</span>  <span class="goldenrod">59,</span>  <span class="blue">"ia</span>  <span class="goldenrod">t":</span>  <span class="blue">155</span>  <span class="goldenrod">587</span>  <span class="blue">285</span>  <span class="goldenrod">4}</span>
<span class="green">URLSAFE-B64: </span><span class="goldenrod">eyJz</span> <span class="blue">dWIi</span> <span class="goldenrod">OiI1</span> <span class="blue">NzBl</span> <span class="goldenrod">Yjcz</span> <span class="blue">Yi1i</span> <span class="goldenrod">NGI0</span> <span class="blue">LTRj</span> <span class="goldenrod">ODYt</span> <span class="blue">YjM1</span> <span class="goldenrod">ZC0z</span> <span class="blue">OTBi</span> <span class="goldenrod">NDdk</span> <span class="blue">OTli</span> <span class="goldenrod">ZjYi</span> <span class="blue">LCJl</span> <span class="goldenrod">eHAi</span> <span class="blue">OjE1</span> <span class="goldenrod">NTU4</span> <span class="blue">NzM3</span> <span class="goldenrod">NTks</span> <span class="blue">Imlh</span> <span class="goldenrod">dCI6</span> <span class="blue">MTU1</span> <span class="goldenrod">NTg3</span> <span class="blue">Mjg1</span> <span class="goldenrod">NH0=</span></code></pre>

The cryptographic **signature** is calculated from the header and payload which ensures that the information in both parts has not been modified. The conversion to URL-safe base64-encoded string is shown below:

<pre><code><span class="green">        HEX: </span><span class="goldenrod">c88b51</span> <span class="blue">cb57fc</span> <span class="goldenrod">521fff</span> <span class="blue">0baf19</span> <span class="goldenrod">162dba</span> <span class="blue">b7d3e6</span> <span class="goldenrod">c2395b</span> <span class="blue">90512b</span> <span class="goldenrod">1f1847</span> <span class="blue">4f3ec5</span> <span class="goldenrod">672e</span>
<span class="green">URLSAFE-B64: </span><span class="goldenrod">yItR</span>   <span class="blue">y1f8</span>   <span class="goldenrod">Uh__</span>   <span class="blue">C68Z</span>   <span class="goldenrod">Fi26</span>   <span class="blue">t9Pm</span>   <span class="goldenrod">wjlb</span>   <span class="blue">kFEr</span>   <span class="goldenrod">HxhH</span>   <span class="blue">Tz7F</span>   <span class="goldenrod">Zy4=</code></pre>

Combining these into a JWT would result in the following token:

<div class="command"><code><span class="white">eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1NzBlYjczYi1iNGI0LTRjODYtYjM1ZC0zOTBiNDdkOTliZjYiLCJleHAiOjE1NTU4NzM3NTksImlhdCI6MTU1NTg3Mjg1NH0.yItRy1f8Uh__C68ZFi26t9PmwjlbkFErHxhHTz7FZy4</span></code></div>

The PyJWT package trims all padding characters ("=") from the JWT components. The payload and signature each originally had one such character that is not present in the final version shown above.

{{< alert_box >}}
Base64-encoded strings may look like gibberish, but <strong><u>DO NOT</u></strong> make the mistake of assuming that the payload data has been encrypted. <strong><u>NEVER</u></strong> include any sensitive data (e.g., user password, payment info) in the JWT payload since it can be easily decoded by anyone.
{{< /alert_box >}}

## Project Dependencies

My favorite thing about Python is that for any type of application or library you could possibly need, it's already been created and made available via `pip`. When it comes to tools for creating REST APIs and JWTs, there is a dizzying array of possibilities. I'd like to give a brief overview of the most important packages and Flask extensions that we will be using in this project.

### PyJWT

<a href="https://pyjwt.readthedocs.io/en/latest/" target="_blank">PyJWT</a> is the package we will use to generate and decode JSON Web Tokens (JWTs).

### Flask-RESTx

<a href="https://github.com/python-restx/flask-restx" target="_blank">Flask-RESTx</a> is a Flask extension that makes creating APIs simple (in fact, most of the configuration can be done with decorators). This extension provides helpful tools for marshalling data from custom Python objects to an appropriate format for sending as a HTTP response. As you would expect, there are also tools for parsing data from HTTP requests into basic and custom Python datatypes. However, my favorite feature is the visual, interactive documentation that is automatically generated for you using <a href="https://swagger.io/tools/swagger-ui/" target="_blank">Swagger UI</a>.

### OpenAPI/Swagger UI

The <a href="https://www.openapis.org" target="_blank">OpenAPI Initiative (OAI)</a> is an organization that aims to curate a single format for documenting API services. The OpenAPI format was originally known as the <a href="https://docs.swagger.io/spec.html" target="_blank">Swagger Specification</a>. <a href="https://swagger.io/tools/swagger-ui/" target="_blank">Swagger UI</a> is an extremely useful tool that generates a webpage from an OpenAPI/Swagger spec, providing visual documentation for your API that allows anybody to test your API methods, construct requests, inspect responses, etc.

### Flask-CORS

<a href="https://flask-cors.readthedocs.io/en/latest/" target="_blank">Flask-CORS</a> is a Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible. Using this extension to enable CORS for all routes (as is the case in this project) is extremely simple. As you will see shortly, the entire process involves initializing the extension with the Flask application instance with default values.

### Flask-SQLAlchemy

<a href="http://flask-sqlalchemy.palletsprojects.com/en/2.x/" target="_blank">Flask-SQLAlchemy</a> is a Flask extension that adds support for <a href="https://www.sqlalchemy.org/" target="_blank">SQLAlchemy</a> and makes integrating the ORM with your Flask application simple. If you are unfamiliar with SQLAlchemy, the description below from the official documentation is a perfect summation:

<blockquote cite="https://docs.sqlalchemy.org/en/13/orm/tutorial.html"><p>The <strong>SQLAlchemy Object Relational Mapper</strong> presents a method of associating user-defined Python classes with database tables, and instances of those classes (objects) with rows in their corresponding tables. It includes a system that transparently synchronizes all changes in state between objects and their related rows, called a unit of work, as well as a system for expressing database queries in terms of the user defined classes and their defined relationships between each other.</p></blockquote>

I know, it sounds like magic. <a href="https://docs.sqlalchemy.org/en/13/core/engines.html" target="_blank">Another key feature</a> of SQLALchemy is that the type of database you use (MySQL, SQLite, PostgreSQL, etc.) is almost completely irrelevent (it comes into play if you need to use a feature that is only supported by a specific backend). For example, you could have your API configured to use a PostgreSQL database in production, and use a simple SQLite file as the backend in your test and development environments. There would be no need to change any code to support each configuration, which, again sounds like magic.

### Flask-Migrate (Alembic)

<a href="https://pypi.org/project/alembic/" target="_blank">Alembic</a> is a database migrations tool created by the author of SQLAlchemy, and <a href="https://flask-migrate.readthedocs.io/en/latest/" target="_blank">Flask-Migrate</a> is a Flask extension that adds Alembic's operations to the Flask CLI. A database migration is a set of changes to a database schema (e.g., add new table, update foreign key relationships, etc.), similar to a commit in a version-control system. With Flask-Migrate, each migration is represented as a script of SQL statements, allowing you to "upgrade" a database to apply the schema changes or "downgrade" and undo the changes. This makes the process of deploying database changes to a production environment safe and easy; simply create a migration script when your changes have been tested and verified, then run the migration script in the production environment to apply the changes.

## Development Dependencies

The installation script for our application will allow the user to install dependencies that are only needed to run the test set and/or contribute to the development of the app. This is an extremely common option for a Python application, and in fact this is how we will install the application to ensure that we are executing our test cases against the code as it would be installed by an end-user.

For a good description of the process we will use to enable this installation option, please read <a href="https://codefellows.github.io/sea-python-401d4/lectures/python_packaging_1.html#specifying-dependencies" target="_blank">this section from <span class="italics">An Introduction to Python Packaging</span></a>.

The `[dev]` installation option for our project will install a code formatter, a linter, the unit testing framework, some pytest plugins and the pre-commit package which will automatically run the code formatter on all changed files. Next, for each of these tools, I will give a brief explanation of why I chose that specific tool/package.

### Pytest

I have a strong preference for <a href="https://pytest.org" target="_blank">pytest</a> as my testing framework. Compared to the built-in unittest library (or other frameworks like nose), pytest requires almost no boilerplate code (e.g., inheriting from `TestCase`) and relies solely on the built-in `assert` statement for verifying expected behavior. In contrast, with unittest you have to learn a new API with several different methods in order to "assert" the same expression (i.e., `self.assertEqual`, `self.assertFalse`, `self.assertIsNotNone`, etc.).

The other feature that sets pytest apart is <a href="https://pytest.readthedocs.io/en/latest/fixture.html#fixtures" target="_blank">fixtures</a>. Fixtures can be extremely complex but in the simplest case a fixture is just a function that constructs and returns a test object (e.g., a function named `db` that returns a mock database object). A fixture is created by decorating the function with `@pytest.fixture`:

```python
@pytest.fixture
def db():
    return MockDatabase()
```

If we wish to use the mock database object in a test case, we simply add a parameter with the same name as the fixture (i.e., `db`) to the test case function as shown below:

```python
def test_new_user(db, email, password):
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    user_exists = User.query.filter_by(email=email).first()
    assert user_exists
```

When this test executes, pytest will discover and call the fixture named `db`, making the mock database object available within the test case. This method of decoupling test code from the objects needed to execute the test code is an example of <a href="http://en.wikipedia.org/wiki/Dependency_injection" target="_blank">dependency injection</a>.

### Black

<a href="https://github.com/python/black" target="_blank">Black</a> is my preferred code formatter. Compared to YAPF or autopep8, black is deliberately opinionated and provides very few configuration options. With the other formatting tools, you have to spend time tweaking the configuration until it produces your desired format. With black, the only setting I tweak is the maximum line length (I increase it from 79 to 89).

This has an additional benefit if you are collaborating with others on a code base, since enforcing consistent style/format is difficult when everyone is using different customized autopep8 settings. Having a consistent style throughout a project will make your team more productive since less time will be spent conforming to style and the code will become easier to digest visually.

### Flake8

Flake8 is my preferred code linter. While black reformats your code, it doesn't modify the behavior in any way (black verifies that the AST is not modified before applying any changes). Flake8 is actually a wrapper for three different static-analysis tools: pydocstyle (checks for compliance with PEP8 formatting rules, like black but stricter), PyFlakes (checks for programming errors that would only be caught at run-time) and mccabe (checks cyclomatic complexity).

Flake8 can be configured in a multitude of ways, so getting the most out of it requires a bit of an investment. Applied correctly, flake8 will make your code easier to read, less bug-prone and more maintainable. We will explore my preferred flake8 settings later in this tutorial.

### Tox

<a href="https://tox.readthedocs.io/en/latest/" target="_blank">Tox is a very powerful tool</a> that can be used as a single entry point for various build, test and release activities. The most common use case for tox is validating the installation process for a project and running arbitrary commands (such as unit tests) within isolated virtual environments. This is extremely important if you need to support multiple Python versions, and extremely helpful since tox automates what would otherwise be a tedious, involved process.

## Project Structure

The location of your test code in relation to your app code is very important. There are multiple valid ways to layout your project, and the pros and cons of various project layouts are collected as <a href="https://docs.pytest.org/en/latest/goodpractices.html" target="_blank">a helpful set of best practices</a> on the pytest documentation site. The specific recommendations that I have applied to this project are given below:

<div>
  <ul>
    <li>Place a <code>setup.py</code> file in your project's root folder. We will cover the contents of this file shortly, having this file allows you to install your application with <code>pip</code>.</li>
    <li>Place your test code in a separate folder <span class="emphasis">outside</span> of your application code.
      <ul>
        <li>This allows you to run your tests against an installed version of your application after executing either <code>pip install .</code> or <code>pip install -e .</code></li>
        <li>The <code>-e</code> flag installs the application in <span class="bold-text">editable mode</span>, which allows you to run your tests against your local development instance of your code. This saves you from having to re-install your application whenever a change is made, since your tests will be executed against the code that you modified.</li>
      </ul>
    </li>
  </ul>
</div>

In addition to these requirements, I am using a project structure with an isolated **src** folder for this project. The important thing about the **src** folder is that it is **not a Python package** (i.e., it does not contain a `__init__.py` file). The **src** folder is located at the root of the project and contains only a single folder named `flask_api_tutorial`. This folder **is** a Python package and will contain all of our application code.

The project root will also contain the **tests** folder, the `setup.py` file to install the application, configuration files, license, README, etc. Here's a visual to help if you're confused by my description:

<pre class="project-structure"><div><span class="project-folder">.</span> <span class="project-structure">(project root folder)</span>
|- <span class="project-folder">src</span>
|   |- <span class="project-folder">flask_api_tutorial</span>
|       |- <span class="project-empty-file">__init__.py</span>
|       |- <span class="project-empty-file">...</span>
|
|- <span class="project-folder">tests</span>
|   |- <span class="project-empty-file">__init__.py</span>
|   |- <span class="project-empty-file">...</span>
|
|- <span class="project-empty-file">setup.py</span>
|- <span class="project-empty-file">README.md</span>
|- <span class="project-empty-file">...</span></div></pre>

There are numerous benefits that result from structuring your project in this manner. The most obvious is that you are forced to install your application through `pip` in order to run your tests. This ensures that your `setup.py` script correctly deploys the application, allowing any issues to be detected and fixed immediately.

<a href="https://blog.ionelmc.ro/2014/05/25/python-packaging/" target="_blank"><span class="italics">Python Packaging</span> by Ionel Cristian Mărieș</a> provides an excellent argument in favor of the **src** layout. Similarly, <a href="https://hynek.me/articles/testing-packaging/" target="_blank"><span class="italics">Testing & Packaging</span> by Hynek Schlawack</a> is a more recent article arguing in favor of the **src** layout. I strongly recommend reading both blog posts in their entirety.

### Create Initial Folders & Files

With those guidelines in mind, let's start by creating the folder layout for our application (and also create empty `__init__.py` files for each Python package).

You can name your root folder whatever you like (represented by the top-level "." node below), or you can be just like me and use `flask_api_tutorial`. In most projects using the src-folder structure, the root folder and the folder containing the application code within the src-folder will have the same name.

In this section, we will work on everything marked as <code class="work-file">NEW CODE</code> in the chart below (all files will be empty at this point):

<pre class="project-structure"><div><span class="project-folder">.</span> <span class="project-structure">(project root folder)</span>
|- <span class="project-folder">src</span>
|   |- <span class="project-folder">flask_api_tutorial</span>
|       |- <span class="project-folder">api</span>
|       |   |- <span class="project-folder">auth</span>
|       |   |   |- <span class="project-empty-file">__init__.py</span>
|       |   |
|       |   |- <span class="project-folder">widgets</span>
|       |   |   |- <span class="project-empty-file">__init__.py</span>
|       |   |
|       |   |- <span class="project-empty-file">__init__.py</span>
|       |
|       |- <span class="project-folder">models</span>
|       |   |- <span class="project-empty-file">__init__.py</span>
|       |
|       |- <span class="project-folder">util</span>
|       |   |- <span class="project-empty-file">__init__.py</span>
|       |   |- <span class="work-file">datetime_util.py</span>
|       |   |- <span class="work-file">result.py</span>
|       |
|       |- <span class="work-file">__init__.py</span>
|       |- <span class="work-file">config.py</span>
|
|- <span class="project-folder">tests</span>
|   |- <span class="project-empty-file">__init__.py</span>
|   |- <span class="work-file">test_config.py</span>
|
|- <span class="work-file">.env</span>
|- <span class="work-file">.gitignore</span>
|- <span class="work-file">.pre-commit-config.yaml</span>
|- <span class="work-file">pyproject.toml</span>
|- <span class="work-file">pytest.ini</span>
|- <span class="work-file">README.md</span>
|- <span class="work-file">run.py</span>
|- <span class="work-file">setup.py</span>
|- <span class="work-file">tox.ini</span></div>
<div class="project-structure-key-wrapper">
<div class="project-structure-key">
<div class="key-item key-label">KEY:</div>
<div class="key-item project-folder">FOLDER</div>
<div class="key-item work-file">NEW CODE</div>
<div class="key-item project-empty-file">EMPTY FILE</div>
</div>
</div></pre>

Feel free to create the project structure manually or through the command line as shown below:

<pre><code><span class="cmd-prompt">~ $</span> <span class="cmd-input">mkdir flask_api_tutorial && cd flask_api_tutorial</span>
<span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">mkdir src && cd src</span>
<span class="cmd-prompt">flask-api-tutorial/src $</span> <span class="cmd-input">mkdir flask_api_tutorial && cd flask_api_tutorial && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial $</span> <span class="cmd-input">mkdir api && cd api && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial/api $</span> <span class="cmd-input">mkdir auth && cd auth && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial/api/auth $</span> <span class="cmd-input">cd ..</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial/api $</span> <span class="cmd-input">mkdir widgets && cd widgets && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial/api/widgets $</span> <span class="cmd-input">cd ../..</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial $</span> <span class="cmd-input">mkdir models && cd models && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial/models $</span> <span class="cmd-input">cd ..</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial $</span> <span class="cmd-input">mkdir util && cd util && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/src/flask_api_tutorial/util $</span> <span class="cmd-input">cd ../../..</span>
<span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">mkdir tests && cd tests && touch __init__.py</span>
<span class="cmd-prompt">flask-api-tutorial/tests $</span> <span class="cmd-input">cd ..</span>
<span class="cmd-prompt">flask-api-tutorial $</span></code></pre>

### Create Virtual Environment

Next, create a new virtual environment by whatever method you prefer (this project requires Python 3.6+). I use `pyenv` to manage multiple installations of Python since various projects must support and be tested against different or multiple versions. For a quick and easy guide to setting up and using `pyenv`, check out <a href="https://hackernoon.com/reaching-python-development-nirvana-bb5692adf30c" target="_blank">this article from Hacker Noon</a>.

Even if you do not use `pyenv`, the process to create and activate a virtual environment will be similar to the steps below:

<pre><code><span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">python --version</span>
<span class="cmd-results">Python 2.7.14</span>
<span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">pyenv local 3.7.6</span>
<span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">python --version</span>
<span class="cmd-results">Python 3.7.5</span>
<span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">python -m venv venv --prompt flask-api-tutorial</span>
<span class="cmd-prompt">flask-api-tutorial $</span> <span class="cmd-input">source venv/bin/activate</span>
<span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span></code></pre>

After activating the new virtual environment, upgrade `pip`, `setuptools` and `wheel`:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">pip install --upgrade pip setuptools wheel</span>
<span class="cmd-comment"># removed package upgrade messages...</span>
<span class="cmd-results">Successfully installed pip-20.0.2 setuptools-45.2.0 wheel-0.34.2</span></code></pre>

Finally, initialize a new git repository for our project:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">git init</span>
<span class="cmd-results">Initialized empty Git repository in /Users/aaronluna/Projects/flask-api-tutorial</span></code></pre>

## Configuration Files

If you are familiar with the Python ecosystem, you have probably noticed that the root folder for any project that is more complex than a to-do list is filled with various configuration files, a `README.md`, a license file, `requirements.txt`, etc. Unfortunately, this project will be no different. Let's get these out of the way right now.

At this point, I recommend switching to your IDE of choice for Python development. I am a huge fan of <a href="https://code.visualstudio.com" target="_blank">VSCode</a>, so that is what I will be using.

### `README.md` and `.gitignore`

Create two empty files in the project root folder: one named `README.md` and the other named `.gitignore`. Feel free to copy the versions in the github repository for this project. I am not providing an example to copy & paste since people tend to very opinionated about what files/folders they include in their `.gitignore`. The version I am using is customized from <a href="https://github.com/github/gitignore/blob/master/Python.gitignore" target="_blank">this example `.gitignore` file for Python projects from the official github repository</a>.

### `.env` File

Create a file named `.env` in the project root folder and add the values below. Save the file:

```ini
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY="please change me"
```

`FLASK_APP` is the filepath (or module import-path) where the Flask application object is located (<a href="http://flask.pocoo.org/docs/1.0/cli/#application-discovery" target="_blank">More info on <code>FLASK_APP</code></a>).

`FLASK_ENV` only has two valid values: `development` and `production`. Setting `FLASK_ENV=development` enables the interactive debugger and automatic file reloader (<a href="http://flask.pocoo.org/docs/1.0/config/#environment-and-debug-features" target="_blank">More info on <code>FLASK_ENV</code></a>).

The `SECRET_KEY` will be used to sign our JSON authorization tokens. The value you choose for this key should be a long, random string of bytes. <span class="emphasis">It is absolutely vital that this value remains secret</span> since anyone who knows the value can generate authorization keys for your API. <a href="http://flask.pocoo.org/docs/1.0/config/?highlight=secret_key#SECRET_KEY" target="_blank">The recommended way</a> to generate a `SECRET_KEY` is to use the Python interpreter:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">python</span>
<span class="cmd-results">Python 3.7.6 (default, Jan 19 2020, 06:08:58)
[Clang 11.0.0 (clang-1100.0.33.8)] on darwin
Type "help", "copyright", "credits" or "license" for more information.</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">import os</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">os.urandom(24)</span>
<span class="cmd-repl-results">b'\x1ah\xe9\x00\x04\x1d>\x00\x14($\x17\x90\x1f?~?\xdc\xe9\x91U\xd2\xb5\xd7'</span></code></pre>

Update your `.env` file to use the random value you generated. Save the changes:

```ini
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY="\x1ah\xe9\x00\x04\x1d>\x00\x14($\x17\x90\x1f?~?\xdc\xe9\x91U\xd2\xb5\xd7"
```

### Black Configuration

Before we write any app code, let's customize the rules used by black. Create a file named `pyproject.toml` in the project root folder and add the following content:

```ini
[tool.black]
line-length = 89
target-version = ['py37']
include = '\.pyi?$'
exclude =  '''
/(
    \.eggs
    | \.git
    | \.hg
    | \.mypy_cache
    | \.pytest_cache
    | \.tox
    | \.vscode
    | __pycache__
    | _build
    | buck-out
    | build
    | dist
    | venv
)/
'''
```

I prefer to increase the maximum line length to 89. The black maintainers recommend a line-length of roughly 90, but you should use whatever line length works best for you. `target-version` controls which Python versions Black-formatted code should target. `include` and `exclude` are both regular expressions that match files and folders to format with black and exclude from formatting.

### Pre-commit Configuration

Wouldn't it be helpful if there was a way to make sure that all of the code within a commit had been formatted with `black` before the changes were pushed to the remote server? That way, the project will never contain code with different formatting styles, making everything nice and uniform.

There is a really easy way to do this thanks to <a href="https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks" target="_blank">git hooks</a>. There are many different hooks available but the one we are interested in is the pre-commit hook. We can use this hook by providing a script that determines whether the commit is rejected or allowed to proceed.

Thankfully, all of the work has been done for us by the folks behind the `pre-commit` package that we will install shortly. In order to run `black` on all files being committed, create a new file named `.pre-commit-config.yaml` in the project root folder and enter the content below:

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: stable
    hooks:
      - id: black
        language_version: python3.7
```

The workflow that results from running this script is as follows: if any file in the commit is not correctly formatted, the commit will be rejected and `black` will apply any necessary changes. Then, you simply update your commit to include the formatting changes, submit it again and this time the commit will be made.

### Pytest Configuration

Before we begin writing any test code, let's configure how pytest reports test results and setup some of the plugins that we installed. Create a file named `pytest.ini` in the project root folder and enter the content below:

```ini {linenos=table}
[pytest]
addopts =
    # generate report with details of all (non-pass) test results
    -ra
    # show local variables in tracebacks
    --showlocals
    # report formatting changes suggested by black
    --black
    # report linting issues with flake8
    --flake8
    # verbose output
    --verbose
norecursedirs =
    .git
    .pytest_cache
    .vscode
    migrations
    venv
flake8-max-line-length = 89
flake8-ignore = E203, E266, E501, W503
flake8-max-complexity = 18
```

We are obviously making many configuration decisions in this file. Please note the following:

<div class="code-details">
  <ul>
    <li><strong>Line 2: </strong>The <span class="bold-text">addopts</span> config option <span class="bold-text">add</span>s the specified <span class="bold-text">opt</span>ion<span class="bold-text">s</span> to the set of command line arguments whenever <code>pytest</code> is executed by the user. In other words, if <code>addopts = -ra --showlocals</code>, executing the command <code>pytest test_config.py</code> would actually execute <code>pytest -ra --showlocals test_config.py</code>.</li>
    <li><strong>Line 4: </strong>The <code>-r</code> flag generates a "short test summary info" section at the end of the test session making it easier to see all the non-pass test results. The <code>-a</code> flag means "all except passes".</li>
    <li><strong>Line 6: </strong>The <code>--showlocals</code> flag adds all local variable values to the traceback for all test failures.</li>
    <li><strong>Line 8: </strong>The <code>--black</code> flag reports formatting changes that are suggested by black. This option is only available because we will install the pytest-black plugin as a dev requirement.</li>
    <li><strong>Line 10: </strong>The <code>--flake8</code> flag reports linting changes that are suggested by flake8. This option is only available because we will install the pytest-flake8 plugin as a dev requirement.</li>
    <li><strong>Line 12: </strong>This option should be self-explanatory, I prefer to enable verbose output for all test results.</li>
    <li><strong>Lines 13-18: </strong>The <span class="bold-text">norecursedirs</span> config option tells pytest to not look for test code in the specified list of folders. This makes pytest run much faster since the total number of locations to search is greatly reduced.</li>
    <li><strong>Line 19: </strong>This and all config options that begin with <code>flake8</code> only apply to the pytest-flake8 plugin. <code>flake8-max-line-length</code> is set to 89 to enforce the same style rule I have customized in my black configuration.</li>
    <li><strong>Line 21: </strong><code>flake8-ignore</code> tells pytest-flake8 to never report instances of the specified rule violations. This list is copied from the <code>flake8</code> <a href="https://github.com/python/black/blob/master/.flake8" target="_blank">config settings in black</a>, which supressses these errors since the rules they enfore violate PEP8.</li>
    <li><strong>Line 22: </strong><code>flake8-max-complexity</code> sets the allowed threshold for cyclomatic complexity. If any function is more complex than the specified value, a flake8 error will be reported in the test results.</li>
  </ul>
</div>

### Tox Configuration

The last configuration file we need is for Tox. The main reason we are using tox is because it allows us to test our src-folder project structure in the proper manner. Right now, the configuration we use will be very simple. Create a new file named `tox.ini` in the project root folder and add the content below:

```ini
[tox]
envlist = py37

[testenv]
deps =
    black
    flake8
    pydocstyle
    pytest
    pytest-black
    pytest-clarity
    pytest-dotenv
    pytest-flake8
    pytest-flask

commands = pytest
```

This file tells tox to install the packages listed under `deps` (as well as our application) in a new, isolated virtual environment running Python 3.7 and run a single command: `pytest`.

That's all of the configuration files we need! We still need to create another file in the project root folder, though.

## Installation Script

Next, create a new file named `setup.py` in the project root folder and add the content below. Then, save and close the file:

```python {linenos=table,hl_lines=[30]}
"""Installation script for flask-api-tutorial application."""
from pathlib import Path
from setuptools import setup, find_packages

DESCRIPTION = (
    "Boilerplate Flask API with Flask-RESTx, SQLAlchemy, pytest, flake8, "
    "tox configured"
)
APP_ROOT = Path(__file__).parent
README = (APP_ROOT / "README.md").read_text()
AUTHOR = "Aaron Luna"
AUTHOR_EMAIL = "contact@aaronluna.dev"
PROJECT_URLS = {
    "Documentation": "https://aaronluna.dev/series/flask-api-tutorial/",
    "Bug Tracker": "https://github.com/a-luna/flask-api-tutorial/issues",
    "Source Code": "https://github.com/a-luna/flask-api-tutorial",
}
INSTALL_REQUIRES = [
    "Flask",
    "Flask-Bcrypt",
    "Flask-Cors",
    "Flask-Migrate",
    "flask-restx",
    "Flask-SQLAlchemy",
    "PyJWT",
    "python-dateutil",
    "python-dotenv",
    "requests",
    "urllib3",
    "werkzeug==0.16.1",
]
EXTRAS_REQUIRE = {
    "dev": [
        "black",
        "flake8",
        "pre-commit",
        "pydocstyle",
        "pytest",
        "pytest-black",
        "pytest-clarity",
        "pytest-dotenv",
        "pytest-flake8",
        "pytest-flask",
        "tox",
    ]
}

setup(
    name="flask-api-tutorial",
    description=DESCRIPTION,
    long_description=README,
    long_description_content_type="text/markdown",
    version="0.1",
    author=AUTHOR,
    author_email=AUTHOR_EMAIL,
    maintainer=AUTHOR,
    maintainer_email=AUTHOR_EMAIL,
    license="MIT",
    url="https://github.com/a-luna/flask-api-tutorial",
    project_urls=PROJECT_URLS,
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    python_requires=">=3.6",
    install_requires=INSTALL_REQUIRES,
    extras_require=EXTRAS_REQUIRE,
)
```

{{< alert_box >}}
Installing the latest version of werkzeug (v1.0.0) breaks Flask-RESTx. However, this is due to an import error and should be fixed soon. Currently, werkzeug is pinned to the last version which does not break Flask-RESTx, and I will update this once this issue has been resolved.
{{< /alert_box >}}

If you are unfamiliar with the structure or operation of the `setup.py` file, <a href="https://github.com/pypa/sampleproject/blob/master/setup.py" target="_blank">I recommend bookmarking this example from the PyPA</a> which is fully documented with comments explaining every keyword-argument that the `setup` function supports, which kwargs are required or optional, etc.

## Install `flask-api-tutorial`

Finally, install the `flask-api-tutorial` application in editable mode:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">pip install -e .[dev]</span>
<span class="cmd-comment"># removed package install messages...</span>
<span class="cmd-results">Installing collected packages: PyJWT, six, pycparser, cffi, bcrypt, itsdangerous, MarkupSafe, Jinja2, click, werkzeug, Flask, Flask-Bcrypt, python-dotenv, SQLAlchemy, Flask-SQLAlchemy, python-editor, python-dateutil, Mako, alembic, Flask-Migrate, pytz, pyrsistent, attrs, zipp, importlib-metadata, jsonschema, aniso8601, flask-restx, urllib3, certifi, chardet, idna, requests, Flask-Cors, more-itertools, py, wcwidth, pyparsing, packaging, pluggy, pytest, snowballstemmer, pydocstyle, pytest-dotenv, toml, pathspec, typed-ast, regex, appdirs, black, pytest-flask, distlib, filelock, virtualenv, tox, pyyaml, identify, cfgv, nodeenv, pre-commit, termcolor, pytest-clarity, pytest-black, mccabe, pyflakes, entrypoints, pycodestyle, flake8, pytest-flake8, flask-api-tutorial
  Running setup.py develop for flask-api-tutorial
Successfully installed Flask-1.1.1 Flask-Bcrypt-0.7.1 Flask-Cors-3.0.8 Flask-Migrate-2.5.2 Flask-SQLAlchemy-2.4.1 Jinja2-2.11.1 Mako-1.1.1 MarkupSafe-1.1.1 PyJWT-1.7.1 SQLAlchemy-1.3.13 alembic-1.4.0 aniso8601-8.0.0 appdirs-1.4.3 attrs-19.3.0 bcrypt-3.1.7 black-19.10b0 certifi-2019.11.28 cffi-1.14.0 cfgv-3.1.0 chardet-3.0.4 click-7.0 distlib-0.3.0 entrypoints-0.3 filelock-3.0.12 flake8-3.7.9 flask-api-tutorial flask-restx-0.1.1 identify-1.4.11 idna-2.9 importlib-metadata-1.5.0 itsdangerous-1.1.0 jsonschema-3.2.0 mccabe-0.6.1 more-itertools-8.2.0 nodeenv-1.3.5 packaging-20.1 pathspec-0.7.0 pluggy-0.13.1 pre-commit-2.1.1 py-1.8.1 pycodestyle-2.5.0 pycparser-2.19 pydocstyle-5.0.2 pyflakes-2.1.1 pyparsing-2.4.6 pyrsistent-0.15.7 pytest-5.3.5 pytest-black-0.3.8 pytest-clarity-0.3.0a0 pytest-dotenv-0.4.0 pytest-flake8-1.0.4 pytest-flask-0.15.1 python-dateutil-2.8.1 python-dotenv-0.11.0 python-editor-1.0.4 pytz-2019.3 pyyaml-5.3 regex-2020.2.20 requests-2.23.0 six-1.14.0 snowballstemmer-2.0.0 termcolor-1.1.0 toml-0.10.0 tox-3.14.5 typed-ast-1.4.1 urllib3-1.25.8 virtualenv-20.0.7 wcwidth-0.1.8 werkzeug-0.16.1 zipp-3.0.0</span></code></pre>

{{< info_box >}}
`pip install -e .` installs the `flask-api-tutorial` application in the virtual environment in __**editable mode**__. This allows our tests to be executed with the folder layout discussed previously, and also allows any changes made to app code or test code to be tested without needing to re-install the `flask-api-tutorial` application.
{{< /info_box >}}

Next, run the `pre-commit install` command to actually add the hooks to the local `.git` folder:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">pre-commit install</span>
<span class="cmd-results">pre-commit installed at .git/hooks/pre-commit</span></code></pre>

## `flask_api_tutorial.util` Package

The `flask_api_tutorial.util` package contains general-purpose utlity classes and functions that we will use throughout this project. They are not related to the main topics of this tutorial, so let's get them out of the way before we begin working on the actual project.

### `Result` Class

[In a previous post](/blog/error-handling-python-result-class/), I demonstrated and explained the merits of incorporating principles from functional programming, with the `Result` class as a useful example. We will use this class frequently, so please read the linked post. When you finish that, create a new file in `src/flask_api_tutorial/util` named `result.py` and add the content below:

```python
"""The Result class represents the outcome of an operation."""


class Result:
    """Represent the outcome of an operation."""

    def __init__(self, success, value, error):
        """Represent the outcome of an operation."""
        self.success = success
        self.error = error
        self.value = value

    def __str__(self):
        """Informal string representation of a result."""
        if self.success:
            return "[Success]"
        else:
            return f"[Failure] {self.error}"

    def __repr__(self):
        """Official string representation of a result."""
        if self.success:
            return f"<Result success={self.success}>"
        else:
            return f'<Result success={self.success}, message="{self.error}">'

    @property
    def failure(self):
        """Flag that indicates if the operation failed."""
        return not self.success

    def on_success(self, func, *args, **kwargs):
        """Pass result of successful operation (if any) to subsequent function."""
        if self.failure:
            return self
        if self.value:
            return func(self.value, *args, **kwargs)
        return func(*args, **kwargs)

    def on_failure(self, func, *args, **kwargs):
        """Pass error message from failed operation to subsequent function."""
        if self.success:
            return self.value if self.value else None
        if self.error:
            return func(self.error, *args, **kwargs)
        return func(*args, **kwargs)

    def on_both(self, func, *args, **kwargs):
        """Pass result (either succeeded/failed) to subsequent function."""
        if self.value:
            return func(self.value, *args, **kwargs)
        return func(*args, **kwargs)

    @staticmethod
    def Fail(error_message):
        """Create a Result object for a failed operation."""
        return Result(False, value=None, error=error_message)

    @staticmethod
    def Ok(value=None):
        """Create a Result object for a successful operation."""
        return Result(True, value=value, error=None)

    @staticmethod
    def Combine(results):
        """Return a Result object based on the outcome of a list of Results."""
        if all(result.success for result in results):
            return Result.Ok()
        errors = [result.error for result in results if result.failure]
        return Result.Fail("\n".join(errors))
```

### `datetime_util` Module

If you've spent anytime programming in Python, there is a 100% chance that you have encountered an annoying issue with `datetime`, `timezone` and/or `timedelta` objects. The `datetime_util` module contains helper functions for converting `datetime` objects from naive to timezone-aware, formatting `datetime` and `timedelta` objects as strings and a `namedtuple` named `timespan` that represents the difference between two `datetime` values but provides more data than the set of attributes provided by the `timedelta` class.

Create a new file in `src/flask_api_tutorial/util` named `datetime_util.py` and add the content below:

```python
"""Helper functions for datetime, timezone and timedelta objects."""
import time
from collections import namedtuple
from datetime import datetime, timedelta, timezone


DT_AWARE = "%m/%d/%y %I:%M:%S %p %Z"
DT_NAIVE = "%m/%d/%y %I:%M:%S %p"
DATE_MONTH_NAME = "%b %d %Y"
ONE_DAY_IN_SECONDS = 86400

timespan = namedtuple(
    "timespan",
    [
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
        "microseconds",
        "total_seconds",
        "total_milliseconds",
        "total_microseconds",
    ],
)


def utc_now():
    """Current UTC date and time with the microsecond value normalized to zero."""
    return datetime.now(timezone.utc).replace(microsecond=0)


def localized_dt_string(dt, use_tz=None):
    """Convert datetime value to a string, localized for the specified timezone."""
    if not dt.tzinfo and not use_tz:
        return dt.strftime(DT_NAIVE)
    if not dt.tzinfo:
        return dt.replace(tzinfo=use_tz).strftime(DT_AWARE)
    return dt.astimezone(use_tz).strftime(DT_AWARE) if use_tz else dt.strftime(DT_AWARE)


def get_local_utcoffset():
    """Get UTC offset from local system and return as timezone object."""
    utc_offset = timedelta(seconds=time.localtime().tm_gmtoff)
    return timezone(offset=utc_offset)


def make_tzaware(dt, use_tz=None, localize=True):
    """Make a naive datetime object timezone-aware."""
    if not use_tz:
        use_tz = get_local_utcoffset()
    return dt.astimezone(use_tz) if localize else dt.replace(tzinfo=use_tz)


def dtaware_fromtimestamp(timestamp, use_tz=None):
    """Time-zone aware datetime object from UNIX timestamp."""
    timestamp_naive = datetime.fromtimestamp(timestamp)
    timestamp_aware = timestamp_naive.replace(tzinfo=get_local_utcoffset())
    return timestamp_aware.astimezone(use_tz) if use_tz else timestamp_aware


def remaining_fromtimestamp(timestamp):
    """Calculate time remaining from now until UNIX timestamp value."""
    now = datetime.now(timezone.utc)
    dt_aware = dtaware_fromtimestamp(timestamp, use_tz=timezone.utc)
    if dt_aware < now:
        return timespan(0, 0, 0, 0, 0, 0, 0, 0, 0)
    return get_timespan(dt_aware - now)


def format_timespan_digits(ts):
    """Format a timespan namedtuple as a string resembling a digital display."""
    if ts.days:
        day_or_days = "days" if ts.days > 1 else "day"
        return (
            f"{ts.days} {day_or_days}, "
            f"{ts.hours:02d}:{ts.minutes:02d}:{ts.seconds:02d}"
        )
    if ts.seconds:
        return f"{ts.hours:02d}:{ts.minutes:02d}:{ts.seconds:02d}"
    return f"00:00:00.{ts.total_microseconds}"


def format_timedelta_digits(td):
    """Format a timedelta object as a string resembling a digital display."""
    return format_timespan_digits(get_timespan(td))


def format_timespan_str(ts):
    """Format a timespan namedtuple as a readable string."""
    if ts.days:
        day_or_days = "days" if ts.days > 1 else "day"
        return (
            f"{ts.days} {day_or_days} "
            f"{ts.hours:.0f} hours {ts.minutes:.0f} minutes {ts.seconds} seconds"
        )
    if ts.hours:
        return f"{ts.hours:.0f} hours {ts.minutes:.0f} minutes {ts.seconds} seconds"
    if ts.minutes:
        return f"{ts.minutes:.0f} minutes {ts.seconds} seconds"
    if ts.seconds:
        return f"{ts.seconds} seconds {ts.milliseconds:.0f} milliseconds"
    return f"{ts.total_microseconds} mircoseconds"


def format_timedelta_str(td):
    """Format a timedelta object as a readable string."""
    return format_timespan_str(get_timespan(td))


def get_timespan(td):
    """Convert timedelta object to timespan namedtuple."""
    (milliseconds, microseconds) = divmod(td.microseconds, 1000)
    (minutes, seconds) = divmod(td.seconds, 60)
    (hours, minutes) = divmod(minutes, 60)
    total_seconds = td.seconds + (td.days * ONE_DAY_IN_SECONDS)
    return timespan(
        td.days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        total_seconds,
        (total_seconds * 1000 + milliseconds),
        (total_seconds * 1000 * 1000 + milliseconds * 1000 + microseconds),
    )
```

## Environment Configuration

Next, create a file named `config.py` in the `src/flask_api_tutorial` folder and add the content below. Save the file:

```python {linenos=table}
"""Config settings for for development, testing and production environments."""
import os
from pathlib import Path


HERE = Path(__file__).parent
SQLITE_DEV = "sqlite:///" + str(HERE / "flask_api_tutorial_dev.db")
SQLITE_TEST = "sqlite:///" + str(HERE / "flask_api_tutorial_test.db")
SQLITE_PROD = "sqlite:///" + str(HERE / "flask_api_tutorial_prod.db")


class Config:
    """Base configuration."""

    SECRET_KEY = os.getenv("SECRET_KEY", "open sesame")
    BCRYPT_LOG_ROUNDS = 4
    TOKEN_EXPIRE_HOURS = 0
    TOKEN_EXPIRE_MINUTES = 0
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SWAGGER_UI_DOC_EXPANSION = "list"
    RESTX_MASK_SWAGGER = False
    JSON_SORT_KEYS = False


class TestingConfig(Config):
    """Testing configuration."""

    TESTING = True
    SQLALCHEMY_DATABASE_URI = SQLITE_TEST


class DevelopmentConfig(Config):
    """Development configuration."""

    TOKEN_EXPIRE_MINUTES = 15
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", SQLITE_DEV)


class ProductionConfig(Config):
    """Production configuration."""

    TOKEN_EXPIRE_HOURS = 1
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", SQLITE_PROD)
    PRESERVE_CONTEXT_ON_EXCEPTION = True


ENV_CONFIG_DICT = dict(
    development=DevelopmentConfig, testing=TestingConfig, production=ProductionConfig
)


def get_config(config_name):
    """Retrieve environment configuration settings."""
    return ENV_CONFIG_DICT.get(config_name, ProductionConfig)
```

There are several important things to note about the `Config` class:

<div class="code-details">
  <ul>
    <li>
      <strong>Line 15: </strong>In the <code>Config</code> base class, we store the value of the <code>SECRET_KEY</code> environment variable. Since this value must be set to something, a default value of <code>"open sesame"</code> is used if the <code>SECRET_KEY</code> variable has not been set. This value (and all others) that are set in the base class are available in the <code>Config</code> subclasses (<code>TestingConfig</code>, <code>DevelopmentConfig</code>, <code>ProductionConfig</code>).
    </li>
    <li>
      <p><strong>Line 17-18, 35, 42: </strong>This is where start using our subclasses to make unique configurations for each environment. The amount of time until a token expires is determined by these two values:</p>
      <p>Token expires after: <code>TOKEN_EXPIRE_HOURS</code> + <code>TOKEN_EXPIRE_MINUTES</code> + 5 seconds (the hard-coded 5 second addition allows us to write test cases where the access token has expired).</p>
      <ul>
        <li><code>TestingConfig</code>: </strong>5 seconds</li>
        <li><code>DevelopmentConfig</code>: </strong>15 minutes, 5 seconds</li>
        <li><code>ProductionConfig</code>: </strong>1 hour, 5 seconds</li>
      </ul>
    </li>
    <li>
      <strong>Line 29, 36, 44: </strong>The value of <code>SQLALCHEMY_DATABASE_URI</code> is set to a different value for each environment. By default, separate SQLite database files will be used for each environment. However, if you add an environment variable named <code>DATABASE_URL</code> to the <code>.env</code> file that contains a URL to a database instance (e.g., PostgreSQL, MSSQL, etc) that value will be used for either the development or production environment based on the value of <code>FLASK_ENV</code>.</p>
    </li>
    <li>
      <strong>Line 53: </strong>The <code>get_config</code> function retrieves the configuration settings for each environment. This will be used by the <code>create_app</code> method which instantiates the Flask application.
    </li>
  </ul>
</div>

### python-dotenv

In order for our `Config` classes to work correctly, the environment variables defined in `.env` must be set. Rather than setting the value for each environment variable at the command-line every time we open a new terminal, we will use the `python-dotenv` package to set the values automatically. `python-dotenv` was installed from `setup.py` and requires no configuration after being installed.

As long as `python-dotenv` is installed, when the `flask` command is run any environment variables defined in `.env` will be set. This allows the `os.getenv` method to retrieve the values defined in `.env` and use them in our Flask application.

{{< alert_box >}}
Never commit your `.env` file to your project's git repository. Doing so publicly exposes the `SECRET_KEY`, allowing anyone to issue authorization tokens for the API.
{{< /alert_box >}}

## The Application Factory Pattern

In the `src/flask_api_tutorial` folder's `__init__.py` file, add the following content and save the file:

```python
"""Flask app initialization via factory pattern."""
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from flask_api_tutorial.config import get_config

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()


def create_app(config_name):
    app = Flask("flask-api-tutorial")
    app.config.from_object(get_config(config_name))

    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    return app
```

We are using the <a href="http://flask.pocoo.org/docs/0.12/patterns/appfactories/" target="_blank">application factory pattern</a> to create instances of our app. This makes creating different versions of our application with different settings simple, just provide the type of environment you wish to use as the `config_name` parameter to the `create_app` function. This value retrieves the configuration settings using the `get_config` function we created in `config.py`.

After creating the Flask app and applying the config settings, we initialize the extension objects (`cors`, `db`, `migrate`, `bcrypt`) by calling each object's `init_app` method and passing in the newly-created Flask app to the method. By doing this, no application-specific state is stored on the extension object, so one extension object can be used for multiple apps.

You should recognize all of the Flask extensions from the first section of this post, except for Flask-Bcrypt. This extension provides bcrypt hashing utitlities which will be used to securely store and verify user passwords.

{{< info_box >}}
By initializing the Flask-CORS extension as shown, CORS support for all domains and for all origins for all routes has been enabled.
{{< /info_box >}}

## Unit Tests: `test_config.py`

Let's verify that the config classes work as expected when we create an instance of our application and specify the environment configuration by name. Create a file named `test_config.py` in the `tests` folder, add the following content and save the file:

```python
"""Unit tests for environment config settings."""
import os

from flask_api_tutorial import create_app
from flask_api_tutorial.config import SQLITE_DEV, SQLITE_PROD, SQLITE_TEST


def test_config_development():
    app = create_app("development")
    assert app.config["SECRET_KEY"] != "open sesame"
    assert not app.config["TESTING"]
    assert app.config["SQLALCHEMY_DATABASE_URI"] == os.getenv("DATABASE_URL", SQLITE_DEV)
    assert app.config["TOKEN_EXPIRE_HOURS"] == 0
    assert app.config["TOKEN_EXPIRE_MINUTES"] == 15


def test_config_testing():
    app = create_app("testing")
    assert app.config["SECRET_KEY"] != "open sesame"
    assert app.config["TESTING"]
    assert app.config["SQLALCHEMY_DATABASE_URI"] == SQLITE_TEST
    assert app.config["TOKEN_EXPIRE_HOURS"] == 0
    assert app.config["TOKEN_EXPIRE_MINUTES"] == 0


def test_config_production():
    app = create_app("production")
    assert app.config["SECRET_KEY"] != "open sesame"
    assert not app.config["TESTING"]
    assert app.config["SQLALCHEMY_DATABASE_URI"] == os.getenv(
        "DATABASE_URL", SQLITE_PROD
    )
    assert app.config["TOKEN_EXPIRE_HOURS"] == 1
    assert app.config["TOKEN_EXPIRE_MINUTES"] == 0
```

{{< info_box >}}
In order for the pytest runner to discover the tests, each test class and test case method must begin with "test" (or "Test").
{{< /info_box >}}

In the first line of each test case, the `create_app` function is called to create a flask application object with the desired configuration settings. We pass the name of the environment to the `create_app` function, which will retrieve the desired config settings from the `get_config` function.

For each configuration, we verify that the value of `SECRET_KEY` is not equal to the default value, which verifies that the value from the `.env` file was successfully retieved. We also check that each database URL is set correctly and that the `TOKEN_EXPIRE_HOURS` and `TOKEN_EXPIRE_MINUTES` settings are correct for each environment.

{{< info_box >}}
If you are using a different database for any environment and you retrieved the URL from the `.env` file, make sure you update the test case to verify that this value is retrieved correctly.
{{< /info_box >}}

We can run these tests (and our static-analysis tools) with the `tox` command. This has the added benefit of verifying that the `setup.py` file correctly installs our application:

<pre><code class="tox"><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">tox</span>
<span class="cmd-results">GLOB sdist-make: /Users/aaronluna/Projects/flask-api-tutorial/setup.py
py37 create: /Users/aaronluna/Projects/flask-api-tutorial/.tox/py37
py37 installdeps: black, flake8, pydocstyle, pytest, pytest-black, pytest-clarity, pytest-dotenv, pytest-flake8, pytest-flask
py37 inst: /Users/aaronluna/Projects/flask-api-tutorial/.tox/.tmp/package/1/flask-api-tutorial-0.1.zip
py37 installed: alembic==1.4.0,aniso8601==8.0.0,appdirs==1.4.3,attrs==19.3.0,bcrypt==3.1.7,black==19.10b0,certifi==2019.11.28,cffi==1.14.0,chardet==3.0.4,Click==7.0,entrypoints==0.3,flake8==3.7.9,Flask==1.1.1,flask-api-tutorial==0.1,Flask-Bcrypt==0.7.1,Flask-Cors==3.0.8,Flask-Migrate==2.5.2,flask-restx==0.1.1,Flask-SQLAlchemy==2.4.1,idna==2.9,importlib-metadata==1.5.0,itsdangerous==1.1.0,Jinja2==2.11.1,jsonschema==3.2.0,Mako==1.1.1,MarkupSafe==1.1.1,mccabe==0.6.1,more-itertools==8.2.0,packaging==20.1,pathspec==0.7.0,pluggy==0.13.1,py==1.8.1,pycodestyle==2.5.0,pycparser==2.19,pydocstyle==5.0.2,pyflakes==2.1.1,PyJWT==1.7.1,pyparsing==2.4.6,pyrsistent==0.15.7,pytest==5.3.5,pytest-black==0.3.8,pytest-clarity==0.3.0a0,pytest-dotenv==0.4.0,pytest-flake8==1.0.4,pytest-flask==0.15.1,python-dateutil==2.8.1,python-dotenv==0.11.0,python-editor==1.0.4,pytz==2019.3,regex==2020.2.20,requests==2.23.0,six==1.14.0,snowballstemmer==2.0.0,SQLAlchemy==1.3.13,termcolor==1.1.0,toml==0.10.0,typed-ast==1.4.1,urllib3==1.25.8,wcwidth==0.1.8,Werkzeug==0.16.1,zipp==3.0.0
py37 run-test-pre: PYTHONHASHSEED='3249524107'
py37 run-test: commands[0] | pytest
================================================= test session starts ==================================================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1 -- /Users/aaronluna/Projects/flask-api-tutorial/.tox/py37/bin/python
cachedir: .tox/py37/.pytest_cache
rootdir: /Users/aaronluna/Projects/flask-api-tutorial, inifile: pytest.ini
plugins: clarity-0.3.0a0, black-0.3.8, dotenv-0.4.0, flask-0.15.1, flake8-1.0.4
collected 27 items

setup.py::FLAKE8 PASSED                                                                                          [  3%]
setup.py::BLACK PASSED                                                                                           [  7%]
src/flask_api_tutorial/__init__.py::FLAKE8 PASSED                                                                [ 11%]
src/flask_api_tutorial/__init__.py::BLACK PASSED                                                                 [ 14%]
src/flask_api_tutorial/config.py::FLAKE8 PASSED                                                                  [ 18%]
src/flask_api_tutorial/config.py::BLACK PASSED                                                                   [ 22%]
src/flask_api_tutorial/api/__init__.py::FLAKE8 PASSED                                                            [ 25%]
src/flask_api_tutorial/api/__init__.py::BLACK PASSED                                                             [ 29%]
src/flask_api_tutorial/api/auth/__init__.py::FLAKE8 PASSED                                                       [ 33%]
src/flask_api_tutorial/api/auth/__init__.py::BLACK PASSED                                                        [ 37%]
src/flask_api_tutorial/api/widgets/__init__.py::FLAKE8 PASSED                                                    [ 40%]
src/flask_api_tutorial/api/widgets/__init__.py::BLACK PASSED                                                     [ 44%]
src/flask_api_tutorial/models/__init__.py::FLAKE8 PASSED                                                         [ 48%]
src/flask_api_tutorial/models/__init__.py::BLACK PASSED                                                          [ 51%]
src/flask_api_tutorial/util/__init__.py::FLAKE8 PASSED                                                           [ 55%]
src/flask_api_tutorial/util/__init__.py::BLACK PASSED                                                            [ 59%]
src/flask_api_tutorial/util/datetime_util.py::FLAKE8 PASSED                                                      [ 62%]
src/flask_api_tutorial/util/datetime_util.py::BLACK PASSED                                                       [ 66%]
src/flask_api_tutorial/util/result.py::FLAKE8 PASSED                                                             [ 70%]
src/flask_api_tutorial/util/result.py::BLACK PASSED                                                              [ 74%]
tests/__init__.py::FLAKE8 PASSED                                                                                 [ 77%]
tests/__init__.py::BLACK PASSED                                                                                  [ 81%]
tests/test_config.py::FLAKE8 PASSED                                                                              [ 85%]
tests/test_config.py::BLACK PASSED                                                                               [ 88%]
tests/test_config.py::test_config_development PASSED                                                             [ 92%]
tests/test_config.py::test_config_testing PASSED                                                                 [ 96%]
tests/test_config.py::test_config_production PASSED                                                              [100%]

================================================== 27 passed in 7.30s ==================================================
_______________________________________________________ summary ________________________________________________________
  py37: commands succeeded
  congratulations :)</span></code></pre>

## Flask CLI/Application Entry Point

One of the many neat features of Flask is that it comes with a built-in Command-Line Interface (CLI) that is powered by <a href="https://click.palletsprojects.com/en/7.x/" target="_blank">click</a>. In order to use the CLI, Flask needs to be able to find an application instance, which is accomplished with the `FLASK_APP` environment variable. `FLASK_APP` must be set to a file path or an import path of a module containing a Flask application (<a href="http://flask.pocoo.org/docs/1.0/cli/#application-discovery" target="_blank">Read this for more info</a>).

{{< alert_box >}}
Make sure you have activated your virtual environment, you will not be able to use the Flask CLI otherwise.
{{< /alert_box >}}

You may remember that `FLASK_APP` was one of the values we defined in our `.env` file (`FLASK_APP=run.py`). This tells Flask to look within `run.py` for an object named `app` (or a factory method named `create_app`). Currently, this file is does not exist. If you attempt to run the Flask CLI with the `flask` command, an exception is thrown:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">flask</span>
<span class="cmd-results">Traceback (most recent call last):
  File "/Users/aaronluna/Projects/flask-api-tutorial/venv/lib/python3.7/site-packages/flask/cli.py", line 240, in locate_app
    __import__(module_name)
<span class="cmd-hl-gold">ModuleNotFoundError: No module named 'run'</span>

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/Users/aaronluna/Projects/flask-api-tutorial/venv/lib/python3.7/site-packages/flask/cli.py", line 556, in list_commands
    rv.update(info.load_app().cli.list_commands(ctx))
  File "/Users/aaronluna/Projects/flask-api-tutorial/venv/lib/python3.7/site-packages/flask/cli.py", line 388, in load_app
    app = locate_app(self, import_name, name)
  File "/Users/aaronluna/Projects/flask-api-tutorial/venv/lib/python3.7/site-packages/flask/cli.py", line 250, in locate_app
    raise NoAppException('Could not import "{name}".'.format(name=module_name))
flask.cli.NoAppException: Could not import "run".
Usage: flask [OPTIONS] COMMAND [ARGS]...

  A general utility script for Flask applications.

  Provides commands from Flask, extensions, and the application. Loads the
  application defined in the FLASK_APP environment variable, or from a
  wsgi.py file. Setting the FLASK_ENV environment variable to 'development'
  will enable debug mode.

    $ export FLASK_APP=hello.py
    $ export FLASK_ENV=development
    $ flask run

Options:
  --version  Show the flask version
  --help     Show this message and exit.

Commands:
  db      Perform database migrations.
  routes  Show the routes for the app.
  run     Run a development server.
  shell   Run a shell in the app context.</span></code></pre>

<div class="note note-flex">
  <div class="note-icon">
    <i class="fa fa-pencil"></i>
  </div>
  <div class="note-message">
    <p>Because we installed <code>python-dotenv</code>, the environment variables defined in <code>.env</code> are read from the file every time the <code>flask</code> command is executed (they can be accessed with the <code>os.getenv</code> method). Without this, we would need to set the value of <code>FLASK_APP</code> manually whenever we open a new terminal window.</p>
  </div>
</div>

Create a new file named `run.py` in the project root folder and add the following content:

```python {linenos=table}
"""Flask CLI/Application entry point."""
import os

from flask_api_tutorial import create_app, db

app = create_app(os.getenv("FLASK_ENV", "development"))


@app.shell_context_processor
def shell():
    return {"db": db}

```

Please note the following about `run.py` (a.k.a the application entry point):

<div class="code-details">
  <ul>
    <li><strong>Line 6: </strong>This is the Flask application object which must exist in the <code>run</code> module in order for the <code>flask</code> command to execute without throwing an exception.</li>
    <li><strong>Line 9: </strong>The <code>@app.shell_context_processor</code> decorator makes the decorated method execute when the <code>flask shell</code> command is run.</li>
    <li><strong>Line 11: </strong>The <code>flask shell</code> command will automatically import the objects which are defined in the dictionary which is returned from the <code>shell</code> function.</li>
  </ul>
</div>

The `shell` method in the `run.py` file is decorated with `@app.shell_context_processor`. This is the method that executes when we run `flask shell`. According to the `flask --help` documentation this command "Runs a shell in the app context." If you are not sure what this means, consider the examples below:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">python</span>
<span class="cmd-results">Python 3.7.6 (default, Jan 19 2020, 06:08:58)
[Clang 11.0.0 (clang-1100.0.33.8)] on darwin
Type "help", "copyright", "credits" or "license" for more information.</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">app</span>
<span class="cmd-repl-results">Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'app' is not defined</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">db</span>
<span class="cmd-repl-results">Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'db' is not defined</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">from run import app</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">from flask_api_tutorial import db</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">app</span>
<span class="cmd-repl-results">&#60;Flask 'app'&#62;</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">db</span>
<span class="cmd-repl-results">&#60;SQLAlchemy engine=sqlite:////Users/aaronluna/Projects/flask_api_tutorial/flask_api_tutorial_dev.db&#62;</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">exit()</span></code></pre>

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">flask shell</span>
<span class="cmd-results">Python 3.7.6 (default, Jan 19 2020, 06:08:58)
[Clang 11.0.0 (clang-1100.0.33.8)] on darwin
App: app [development]
Instance: /Users/aaronluna/Projects/flask_api_tutorial/instance</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">app</span>
<span class="cmd-repl-results">&#60;Flask 'app'&#62;</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">db</span>
<span class="cmd-repl-results">&#60;SQLAlchemy engine=sqlite:////Users/aaronluna/Projects/flask_api_tutorial/flask_api_tutorial_dev.db&#62;</span>
<span class="cmd-repl-prompt">>>></span> <span class="cmd-repl-input">exit()</span></code></pre>

In the regular Python interpreter, the `app` and `db` objects are not recognized unless explicitly imported. But when we start the interpreter using `flask shell` the `app` object is imported automatically. This is nice, but what makes `flask shell` really useful is the ability to import a dictionary of objects that will be automatically imported in the Python interpreter. We configure this dictionary as the return value of the `shell_context_processor` function:

```python
@app.shell_context_processor
def shell():
    return {"db": db}
```

In [Part 2](/series/flask-api-tutorial/part-2/), as we add model classes for each database table, we will add the models to this dictionary so they will be available to us in the shell context without importing them manually. The `shell_context_processor` function must return a dictionary and not a list. This allows you to control the names used in the shell, since the dictionary key for each object will be used as the name.

Let's make sure that the error we saw earlier has been fixed, Run `flask`:

<pre><code><span class="cmd-venv">(flask-api-tutorial) flask-api-tutorial $</span> <span class="cmd-input">flask</span>
<span class="cmd-results">Usage: flask [OPTIONS] COMMAND [ARGS]...

  A general utility script for Flask applications.

  Provides commands from Flask, extensions, and the application. Loads the
  application defined in the FLASK_APP environment variable, or from a
  wsgi.py file. Setting the FLASK_ENV environment variable to 'development'
  will enable debug mode.

    $ export FLASK_APP=hello.py
    $ export FLASK_ENV=development
    $ flask run

Options:
  --version  Show the flask version
  --help     Show this message and exit.

Commands:
  db      Perform database migrations.
  routes  Show the routes for the app.
  run     Run a development server.
  shell   Run a shell in the app context.</span></code></pre>

## Checkpoint

Most of the work done in this section wasn't related to any specific project requirements, but I think we can claim at least partial credit on one (the `ProductionConfig` settings define the token age as one hour and will be used when creating JWTs). The <span class="italics requirements">JWTs must expire after 1 hour (in production)</span> item has been marked as partially complete (<span class="icon-inline fa-star-half-o"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" stroke="currentColor" fill="currentColor" style="stroke-width: 0; padding: 0;" class="s-x0McpB_FEdHb"><path d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path></svg></span>):

<div class="requirements">
  <p class="title in-progress">User Management/JWT Authentication</p>
  <div class="fa-bullet-list">
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>New users can register by providing an email address and password</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Existing users can obtain a JWT by providing their email address and password</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWT contains the following claims: time the token was issued, time the token expires, a value that identifies the user, and a flag that indicates if the user has administrator access</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWT is sent in access_token field of HTTP response after successful authentication with email/password</p>
    <p class="fa-bullet-list-item in-progress"><span class="fa fa-star-half-o fa-bullet-icon"></span>JWTs must expire after 1 hour (in production)</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>JWT is sent by client in Authorization field of request header</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Requests must be rejected if JWT has been modified</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Requests must be rejected if JWT is expired</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>If user logs out, their JWT is immediately invalid/expired</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>If JWT is expired, user must re-authenticate with email/password to obtain a new JWT</p>
  </div>
  <p class="title">API Resource: Widget List</p>
  <div class="fa-bullet-list">
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>All users can retrieve a list of all widgets</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>All users can retrieve individual widgets by name</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Users with administrator access can add new widgets to the database</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Users with administrator access can edit existing widgets</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Users with administrator access can delete widgets from the database</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>The widget model contains a "name" attribute which must be a string value containing only lowercase-letters, numbers and the "-" (hyphen character) or "_" (underscore character).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>The widget model contains a "deadline" attribute which must be a datetime value where the date component is equal to or greater than the current date. The comparison does not consider the value of the time component when this comparison is performed.</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>URL and datetime values must be validated before a new widget is added to the database (and when an existing widget is updated).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>The widget model contains a "name" field which must be a string value containing only lowercase-letters, numbers and the "-" (hyphen character) or "_" (underscore character).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>Widget name must be validated before a new widget is added to the database (and when an existing widget is updated).</p>
    <p class="fa-bullet-list-item"><span class="fa fa-star-o fa-bullet-icon"></span>If input validation fails either when adding a new widget or editing an existing widget, the API response must include error messages indicating the name(s) of the fields that failed validation.</p>
  </div>
</div>

If you have any questions (or suggestions/complaints), please let me know in the comments.
