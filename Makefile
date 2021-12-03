IMAGE 	= velythyl/jekyll-ghp
TAG 	= latest
PORT 	= 4000


ez_init:
	echo "TODO"

ez_serve:
	echo "TODO"

ez_zip:
	echo "TODO"


serve:
	docker run --rm --volume="${PWD}:/srv/jekyll" -p ${PORT}:${PORT} -e PORT=${PORT} -it ${IMAGE}:${TAG} ghp_serve

zip:
	docker run --rm --volume="${PWD}:/srv/jekyll" -it ${IMAGE}:${TAG} ghp_export
