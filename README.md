# CSRF

This project is the result of me trying to better understand CSRF (Cross-Site Request Forgery) exploits and protection techniques. For an introduction to CSRF, I found Jeff Atwood's [Cross-Site Request Forgeries and You](http://www.codinghorror.com/blog/2008/09/cross-site-request-forgeries-and-you.html) to be consise and easy to follow. For a description of some of the techniques commonly used to protect against CSRF attacks, see OWASP's [CSRF Prevention Cheat Sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29_Prevention_Cheat_Sheet). I found very few concrete examples of these techniques in the wild so I created a couple of sandboxed websites that would allow me to create and protect against a CSRF vunerability.

## Project structure

This repo contains two [Express](http://expressjs.com/) projects (a 'trusted site' and 'dodgy site') and a suite of [Cucumber](http://cukes.info/) tests.

The _trusted_ site allows a user to authenticate themselves and post a status update. The _dodgy_ site deceives the user into making a `POST` request to the trusted site's status update end-point.

The `master` branch of the repo contains *no protection* from the CSRF attack being carried out by the dodgy site. This is to demonstrate an open CSRF vunerability in action. A different protection technique is used in each of the other branches.

The suite of Cucumber tests will fail if the CSRF exploit is left open and will pass if a prevention mechanism has been successfully implemented. The tests will therefore fail when run against the `master` branch, but will pass when run against the others.

## Branches

* `master` - This contains the unprotected version of the trusted site and allows a user's status to be updated unknowingly by the dodgy site.
* `framework-provided` - This uses Express's built-in CSRF protection middleware; [express.csrf()](http://expressjs.com/api.html#csrf).
* `hidden-form-value` - This uses a hidden value (based on the user's session ID) embedded in the status update form on the trusted-site. The presence of this value is verified on all `POST` requests.
* `referrer-check` - This checks the referrer on every `POST` request made to the trusted site to ensure that it does not originate from another site.
* `double-submitted-cookies` - This extracts a user's session cookie using Javascript (which would not be possible on the dodgy site) and adds it as a hidden value to the status update form. The server then verifies that the user's session ID was sent twice in all post requests - once as a cookie and once in the request body. Note that this technique prevents non-JS clients from carrying out authenticated actions all together.

## Requirements

For the [Express](http://expressjs.com/) applications:

* [Node.js](http://nodejs.org/)
* [NPM](https://npmjs.org/)

For the [Cucumber](http://cukes.info) tests:

* [Ruby](https://www.ruby-lang.org/)
* [Bundler](http://bundler.io/)

## Getting started

Clone the master branch from GitHub:

```shell
git clone https://github.com/robinjmurphy/csrf.git
cd csrf
```

Install the dependencies:

```shell
make install-deps
```

Start the servers:

```shell
make serve
```

You'll then be able to access the trusted site at [http://localhost:3000](http://localhost:3000) and the dodgy site at [http://localhost:4000](http://localhost:4000).

Becuase you've checked out the `master` branch you will be able to see a CSRF attack in action by authenticating on the trusted site and then giving into temptation with the 'amazing offer' on the dodgy site. You should see the user status updated to 'Hello CSRF'.

To run the Cucumber tests:

```shell
make test
```

The tests should fail, indicating that the CSRF attack was successful. Switch to any of the remote branches and restart the servers to see the tests pass e.g.

```shell
git checkout -b referrer-check origin/referrer-check
make serve & make test
```