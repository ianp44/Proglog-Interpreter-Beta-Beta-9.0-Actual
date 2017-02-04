# Proglog-Interpreter-Beta-Beta-9.0-Actual
Ian's Javascript Beta Beta Prolog AI Language Interpreter Version 9.0 (4/2/17) (actual), not fully functional

This is the development code for a Javascript Prolog Interpreter, not yet fully functional. 

I've put it on github mainly to register the code for copyright reasons.

To run it/test it download the key files and just open the HTML page. That's the HTML file and all the .js javascript include files and the .css file.

Prolog is probably a bit out of date now, but can support a lot of artificial intelligence functionality.

This demo can create and display a rule list. Also compiles and displays rule varable index list. 

COPYRIGHT NOTICE. This code is copyright (C) by Ian Pouncy 4/2/17. under the GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007 , see Free Software Foundation, Inc. http://fsf.org/ and has also been registered on git hub. For more detail see the source code.

About the Test Buttons The test and display functor routines button creates and displays some functor trees, including with proper Prolog Variables.

The create rule base and display button creates some Prolog rules and puts them into the rule base, then displays the entire rule base. 

The dump label table button displays all the internal program symbols from the label table.

Version 9.0 (4/2/17)

It's also possible to select a rule from the rule list after you have created
it with the above button, in order to put in on the compute stack,
which can be displayed.

You can then do this again, and then test a functor head in a selected rule
tail (that's an attempted match) item against the rule head on the rule on
the bottom of the compute stack.

This works for functors with no variables.

Not checked for functors with variables.

To see the program output after you have clicked the buttons, scroll down the page.

It's also possible to dir a sever side file list, and then select
a text file from the server.

All this does at the moment is display the file.

(For this to work you would need to put the ajax interace php file on
a server, with files in the correct place.)
Other functionality should work just with the javascript and html
files anywhere. (Eg downloaded on your computer.)

Ian p

