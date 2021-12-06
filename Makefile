BLOG_PATH 	= ${PWD}
IMAGE 		= velythyl/jekyll-ghp
TAG 		= latest
PORT 		= 4000

serve:
	docker run --rm --volume="${BLOG_PATH}:/srv/jekyll" -p ${PORT}:${PORT} -e PORT=${PORT} -it ${IMAGE}:${TAG} ghp_serve

export:
	docker run --rm --volume="${BLOG_PATH}:/srv/jekyll" -it ${IMAGE}:${TAG} ghp_export
