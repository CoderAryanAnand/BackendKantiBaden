# How to submit your project 

## What you need to submit

You need to submit one folder, containing:
- Your game/app in HTML
- Your CSS for the game

## Format
This is how what you need to submit looks like:

### Folder
Your folder needs to be called your group number (not text).

### HTML
You should use [this template](template_submission/G1.html).
The name of the file must be ``G`` + ``your group number`` + ``.html``
In this template, you need to edit all the things that the comments tell you to.

##### Head
In the head you need to edit the first (only the first) link tag. In the ``href`` part, you need to change the number to your group.
You also need to give your game/app a title in the title tag.
````html
  <head>
    <meta charset="UTF-8">
    <title>Game 1</title>

      <!-- YOUR GROUP CSS -->
    <link rel="stylesheet" href="1/style.css">
      <!-- END OF CSS -->
      <!-- Give a title to your page. -->
    <title>YOUR OWN TITLE - KANTI GAMES</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
  </head>
````
##### Body
In the body you should not touch any of the code until the ``<!-- Game -->`` line. 
Between the ``<!-- INSERT HTML HERE -->`` and the ``<!-- END OF YOUR OWN HTML--> `` lines, insert only your 
body part of your HTML document (leave out the ``body`` tags).
Your javascript should go between the ```script``` tags.
````html
  <body>
    <nav>
      <a class="action" href="/">
        <h1>KantiGames</h1>
      </a>
      <ul>
        {% if g.user %}
        <li><span>{{ g.user['username'] }}</span>
        <li><a href="{{ url_for('auth.logout') }}">Log Out</a>
          {% else %}
        <li><a href="{{ url_for('auth.register') }}">Register</a>
        <li><a href="{{ url_for('auth.login') }}">Log In</a>
          {% endif %}
      </ul>
    </nav>

    <!-- Game -->

    <!-- INSERT HTML HERE -->

    <!-- END OF YOUR OWN HTML--> 

    <!-- Your javascript goes between the script tags. -->
    <script>

    </script>


  </body>
````

### CSS
Your CSS file needs to be named ```style.css```.

## Help
For your convenience, we have provided a template submission folder found [here](template_submission). Just rename the 
folder and the file, and then add your code to both of the files in the folder.
