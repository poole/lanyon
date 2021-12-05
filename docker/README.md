# ICLR Blogpost 2022 Dockerfile
 
This repository defines a docker image that allows users to serve and build Jekyll/Github-Pages sites
for the ICLR blog track.
The image can be found on dockerhub:

- [velythyl/jekyll-ghp](https://hub.docker.com/r/velythyl/jekyll-ghp)

Of particular note is `ghp_export.sh`. This implements our specific logic for hosting the submitters static site:
we generate a unique ID, concatenate a timestamp to it, and then replace the Jekyll URL inside the config folder by it.


# Building and Pushing (for ICLR Admins only) 

If you are creating a blog post to submit to ICLR, you should **not run the following steps**!
These are to be run by the ICLR blog post track admins when updating the docker image. 

### Build

Build the image via:

```bash
export TAG=1.0.0  # update this!
docker build -t velythyl/jekyll-ghp:${TAG} -t velythyl/jekyll-ghp:latest .
```

Make sure the tag is incremented appropriately!


### Push

Note that you will need push permissions to the docker repository!

```bash
export TAG=1.0.0  # update this!
docker push velythyl/jekyll-ghp:${TAG}
docker push velythyl/jekyll-ghp:latest
```
