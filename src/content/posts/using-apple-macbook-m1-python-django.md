---
title: Using Apple Macbook M1 for Python & Django based website development
author: Suyash Mohan
tags:
  - Macbook
  - Apple Silicon
  - Python
  - Django
categories:
  - Apple Silicon
date: 2021-07-21 10:30:00
---
Recently I got myself a MacBook Air M1 8GB model. And I must say, I am pretty impressed. The performance is really good and the fact there is no fan amazes me. Plus I haven’t experienced any heating issue yet.

I am going to use MacBook Air M1 primarily to help in my web development projects. 8GB RAM might seem less and probably you want to get 16Gb RAM for heavy work or future proof it. But in my experience, I was able to run VS Code, Firefox with few tabs, PostgreSQL database, Insomnia Rest client and Django website running easily with this 8GB model.
<!-- more -->

Here is a screenshot of my memory while running above stated apps.

![](/images/macbookairm1_usage.png)

I must say, it was not a smooth or easy ride running python and Django on M1 for the first time. I spent a half-day looking around for the solutions. Therefore I decided to write this post to share how you can make Python and Django work on your Macbook M1. There are few articles that talk about setting up both ARM and Intel versions of Homebrew and other things. But you don’t have to do so, as per my experience. It was not that difficult once I figured how to set up all.

The main issue I faced came from one of the libraries used in Django, psycopg2. This library tried to compile itself from sources and needs proper header files and libraries for PostgreSQL and OpenSSL. I initially installed PostgreSQL using https://postgresapp.com Although Postgresql does support ARM chip, the Postgres.app uses Intel Libraries and it was messing my flow as I was using ARM version of Python.

### Getting Python and Django Dependencies
The easiest option I found was to simply use python installed through Xcode. You will need Xcode to compile libraries in the next steps anyway. XCode installed Python 3.8 ARM version which is good enough for me. Since I don’t want the whole Xcode, but rather just compiling support, I used following

```
xcode-select --install
```

This install all tools required to compile c/c++ code and also gave Python 3.8.
The next step was to install HomeBrew to help me install libpq. Just follow the Homebrew website to know how to install Homebrew. Installing libpq from sources not only creates an ARM version but also installs the required header and library files. This also installs OpenSSL dependencies which are also a requirement. So let’s install libpq from sources.

```
brew install libpq --build-from-source
```

Now you can create your virtual environment. In this post, I will just call it myenv.

```
python3 -m venv myenv 
source ./myvenv/bin/activate
```

Once you have activated your virtual environment in the terminal, please upgrade your pip.

```
pip install --upgrade pip
```

Now just `cd` to your Django project and you can install the required dependencies. Here is where you need to set the correct path for PostgreSQL and OpenSSL header and library paths.

```
export LDFLAGS="-L/opt/homebrew/opt/libpq/lib -L/opt/homebrew/opt/openssl@1.1/lib"
pip install -r requirements
```

The above command should help you install all the dependencies required to run the Django project. The libpq was used to build the correct version of psycopg2. You don’t have to use libpq also to create and manage your database, although it will install all PostgreSQL binaries. I still use Postges.app to manage the databases, since it makes it a little easier. Hopefully, they will update this app to support ARM in future. But I must also say I didn’t face any issue with the Intel version. Rosetta 2 works great. The only issue is if you try to compile any ARM library that needs the PostgreSQL development library and headers, it won’t work with the intel version installed by Postgres.app. For that, we can use libpq installed from the earlier step.

### Getting to run Geospatial support in Django (GDAL_LIBRARY)
If you are using geospatial logic in your code which depends on gdal library, you are going to face another issue regarding GDAL_LIBRARY_PATH. To resolve this simply use brew to install gdal. This will install the ARM version of gdal.

```
brew install geos gdal
```

To make your project pick correct path for GDAL_LIBRARY_PATH, update your settings.py file by adding following:

```
# settings.py
GDAL_LIBRARY_PATH = os.getenv(‘GDAL_LIBRARY_PATH’)
GEOS_LIBRARY_PATH = os.getenv(‘GEOS_LIBRARY_PATH’)
```

Now, you can go back to your terminal and export these environment variables as follows

```
export GDAL_LIBRARY_PATH=/opt/homebrew/lib/libgdal.dylib
export GEOS_LIBRARY_PATH=/opt/homebrew/lib/libgeos_c.dylib
```

To make your life easier, you can also add the above to lines in your .zshrc, .profile or .bashrc depending on whichever shell you are using.

Now you should be able to run your Django project.

```
python3 manage.py shell
```

Hope this post helped you with setting up Python and Django on your Apple Macbook M1 laptop. Do put a comment if this post helped you or if something was missing on this post.