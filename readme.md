Application template
====================

[![build status](https://img.shields.io/travis/magsdk/boilerplate.svg?style=flat-square)](https://travis-ci.org/magsdk/boilerplate)
[![dependencies status](https://img.shields.io/david/magsdk/boilerplate.svg?style=flat-square)](https://david-dm.org/magsdk/boilerplate)
[![devDependencies status](https://img.shields.io/david/dev/magsdk/boilerplate.svg?style=flat-square)](https://david-dm.org/magsdk/boilerplate?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/magsdk)


## Usage ##

Install global packages:

```bash
sudo npm install -g eslint magsdk
```

Create a new project base:

```bash
git clone https://github.com/magsdk/boilerplate.git my-project
```

There is an example of simple UI inside.
Remove git metadata, build and start services:

```bash
cd my-project
rm -rf .git
magsdk
# or
DEBUG=* magsdk
```

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/magsdk/boilerplate/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`mag-boilerplate` is released under the [MIT License](license.md).
