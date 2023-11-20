# Weather

Simple weather site.

## Local Development

Easy

```
npm start
```

Alternatively,

```
docker-compose up
```

In either case, the application will be listening on http://localhost:9000

_TODO: I don't think the docker-compose approach will pick up changes on the server, confirm it does
for the frontend_.

## Building

_Note: replace tsears/ with your own docker id_

The application is meant to be deployed via docker, but at the end of the day the repo contains a
serviceable template for an nginx site, and the backend is just node. I personally use CICD to build
the docker images on merges to my develop branch. gitlab-ci.yml defines my CICD pipeline for the
application.

## License

MIT. See LICENSE.
