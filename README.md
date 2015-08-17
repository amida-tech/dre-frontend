DRE Front-end
=========

DRE front-end using FHIR API

# Platforms, Frameworks & Development Tools
  - [AngularJS](http://angularjs.org/): JavaScript Single Page Application Framework
  - [Bootstrap](http://getbootstrap.com/): Responsive UI Framework 
  - [Sass](http://sass-lang.com/): CSS Extension Language
  - [Compass](http://compass-style.org/): Tool for Compiling SASS into CSS
  - [NodeJS](http://nodejs.org/): Platform for Running Development Tools
  - [NPM](https://www.npmjs.org/):Package Manager for Node
  - [GruntJS](http://gruntjs.com/): Node Task Runner for Development and Build Activities
  - [Bower](http://bower.io/): Package Manager for Front End Components 
  - [Yeoman](http://yeoman.io/): Scaffolding Tool for the Front End App 
  
# Installation

## Get source code

 Get [sources from github](https://github.com/amida-tech/dre-frontend/)
 
## Install [Compass](http://compass-style.org/) SCSS compiller

(This is official install [How to](http://compass-style.org/install/))

Install Ruby. Here is [instruction](https://www.ruby-lang.org/en/documentation/installation/) please choose your platform and go on.

After Ruby will be installed, run 
```
gem update --system
gem install compass
```

> If after execute `gem update --system` you saw error about ssl sertificate.
> The reason is old rubygems. So we need to remove ssl source to be able to update gem --system which includes rubygems and so on. after this we can feel free to get back to ssl source.
>`gem sources -r https://rubygems.org/` - to temporarily remove secure connection
>`gem sources -a http://rubygems.org/` - add insecure connection
>`gem update --system` - now we're able to update rubygems without SSL
>after updating rubygems do vice versa
>`gem sources -r http://rubygems.org/` - to remove insecure connection
>`gem sources -a https://rubygems.org/` - add secure connection
>Now you're able to update gems using secure connection.
And try to update system and install compass again.


## Install [Node.js](https://nodejs.org) and global npm packages

[Download](https://nodejs.org/download/) and install Node.js server and npm package manager.

Then install yo, grunt-cli, bower, generator-angular and generator-karma:
Run (In Windows OS probably you will need to start cmd as Administarator)
```
npm install -g grunt-cli bower yo generator-karma generator-angular
```

## Install required packages

Install required npm packages. Go to 'src' directory and run 
```
npm install
```

Install required bower packages. Go to 'src' directory and run 
```
bower install
```

# Configuration managment

You have the option to choose your API services from different servers. This is helpful if you do not have or want the Backend Project set up on your local environment.
There are different configurations:

### Development server less server (mock)

This is demo and client debug configuration. All server responses already mocked. No server calls. Log to the browser console debug information enabled.
```
grunt ngconstant:mock

### Development without server (dev)

This is development server configuration. Log to the browser console debug information enabled.
```
grunt ngconstant:dev
```

### Staging (qa)
This is configuration for test stands. Use relative path server calls. Log to the browser console debug information enabled.
```
grunt ngconstant:qa
```

#### *Note about config switch*
Switching config will update *dreFrontend.util.dreFrontendEnvironment* service (dre-frontend\app\dre-frontend.util\scripts\config\dre-frontend-environment.js)
Please do not update it manual.

# Build & development

* Run `grunt build` for building  current configuration.
* Run `grunt serve` for preview current configuration.
* Run `grunt serve:dist` for preview current builded configuration.
* Run `grunt buildQa` for building qa version.
* Run `grunt buildMock` for building mocked (server less) version.

#### *Note for a staging build*
```
grunt buildQa
```

Application package will be stored in the 'src/dist' directory. 


## Contributing

Contributors are welcome. See issues https://github.com/amida-tech/dre-frontend/issues

## Release Notes

See release notes [here] (./RELEASENOTES.md)

## License

Licensed under [Apache 2.0](./LICENSE)
