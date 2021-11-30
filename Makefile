serve:
	docker run --rm   --volume="${PWD}:/srv/jekyll"  -p 4000:4000  -it velythyl/jekyll-ghp:latest  ghp_serve

zip:
	docker run --rm --volume="${PWD}:/srv/jekyll" -it velythyl/jekyll-ghp:latest   ghp_export
