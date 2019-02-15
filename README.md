# Website for PyCascades

🚨🚨🚨🚨 Pushing or merging to master will automatically deploy 🚨🚨🚨🚨

Just a few notes on how to work with this setup for the website. The most
important is that we are using the static site generator
[Lektor](https://www.getlektor.com/) and are hosting the content on
[Netlify](https://app.netlify.com/sites/2019-pycascades).

## Why Lektor?

Lektor is a static site generator written in Python. The reason for choosing it
(and if you need somebody to blame...it was Seb) was that it provides a much
easier way to:

1. Customize the website templates without having to build a full themes.
2. Create simple and flexible data representations for different parts of the site.

Basically, Lektor has a file-based data model that allows custom objects to be
defined such as *sponsors*, *organizers* and others.

The best way to understand how Lektor works it to take a look [at the content
model in the docs](https://www.getlektor.com/docs/content/) and through the code
here.


## Running Lektor locally

Let's get you started with downloading the latest version of the repo:

```
$ git clone git@github.com:pycascades/www.pycascades.com.git
$ cd www.pycascades.com
```

Lektor needs Python (I think we all do 😉). This means you'll have to setup a
virtualenv before you can install it:

```
$ pipenv --three
$ pipenv shell
```

Now you're ready to get things installed:

```
$ pipenv install --dev
```

And with Lektor finally installed, you can run the built-in development server:

```
$ lektor server
```

You should be able to view the site by heading to
[http://localhost:5000](http://localhost:5000).


## Changes to CSS / Javascript

We are using a hand-rolled extension for Lektor that uses the `webassets` package
to build CSS and Javascript artefacts. This might have some bugs in it still.

If you make changes to a CSS or Javascript file and changes aren't reflected in
the dev server. You should clear the built cache and start the service again:

```
$ lektor clean -yes && lektor server
```

Also let Seb know that he needs to fix this 😇.


## Adding Sponsors

We have a data model for sponsors that will automatically include it into the
website. Adding an new sponsor to show up on the website, follow these steps:

Create a new folder for the sponsor in `contents/sponsors`:

```
$ mkdir contents/sponsors/google-cloud-platform
```

Now create a `content.lr` file inside this new directory using this template:

```
_hidden: yes
---
name: 
---
tier:
---
website:
---
logo:
---
signed_on:
```

The `_hidden` entry prevents a website from being created for the individual
sponsor. We only want them to show up as part of the sponsor listing.

Copy the logo for the sponsor into the same directory and complete all the
fields in the `contents.lr` file. This could look something like this:

```
_hidden: yes
---
name: Google Cloud Platform
---
tier: diamond
---
website: http://cloud.google.com
---
logo: logo_cloud_color.svg
---
signed_on: 2018-09-28
```


## Deploying the site to Netlify

Our Netlify setup is integrated with Github. That means **all branches** that
are pushed to Github will be built on Netlify and will be available on a unique
URL. If you need access to the Netlify account, ask Seb.

The `master` branch is the Production branch. 


## Questions?

Ask Seb 🤓.
