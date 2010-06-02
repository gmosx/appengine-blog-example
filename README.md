AppengineJS Example
===================

A simple Blog, powered by [AppengineJS](http:/www.appenginejs.org) and [Nitro](http://www.nitrojs.org). This example example uses [RingoJS](http://www.ringojs.org) but can be run on [NarwhalJS](http://www.narwhaljs.org). 

This application is intended as an example to help developers get started with AppengineJS. It is not intended for deployment as a public application. A real world application should utilize an http caching strategy, static files optimization, etc. We tried to make things self explanatory and readable instead of optimal.

* Homepage: [http://appenginejs.org/](http://appenginejs.org/)
* Documentation: [http://appenginejs.org](http://appenginejs.org)
* Mailing list: [http://groups.google.com/group/appenginejs](http://groups.google.com/group/appenginejs)
* Issue tracking: [http://github.com/gmosx/appengine/issues](http://github.com/gmosx/appengine/issues)


Setup
-----

This is a special prepackaged version of the application that includes all required packages:

* jack-lib
* nitro-lib
* appengine
* normal-template
* ringojs

However, you have to download the [Google App Engine Java SDK](http://code.google.com/appengine/downloads.html). Make sure that the SDK bin directory is in path.


Running the example
-------------------

To start the application, just use:

    $ cd appengine-example
    $ dev_appserver.sh root 


Deploying to Google App Engine
------------------------------

To deploy this application to Google App Engine (GAE) use the appcfg.sh utility that comes with the SDK:

    $ cd appengine-example
    $ appcfg.sh --email=admin@email.com update root 

where admin@email.com is the email used to create your GAE account.

The application runs automatically in optimized (hosted) mode on the GAE infrastructure.


Directory structure
-------------------

* /root - the public root directory
* /root/WEB-INF - non public files go here
* /root/WEB-INF/src - the source code of the application
* /root/WEB-INF/src/root - scripts
* /root/WEB-INF/src/templates - template files
* /root/WEB-INF/packages - CommonJS packages


Help
----

If you need help with this example or with AppengineJS in general, please post a message to the [AppengineJS Group](http://groups.google.com/group/appenginejs)


Credits
-------

* George Moschovitis <george.moschovitis@gmail.com>


License
-------

Copyright (c) 2010 George Moschovitis, http://www.gmosx.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
