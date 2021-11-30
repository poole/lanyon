CURDIR=$(shell pwd)

serve:
	docker run --rm   --volume="$(CURDIR):/srv/jekyll"  -p 4000:4000  -it velythyl/jekyll-ghp:latest  ghp_serve

zip:
	docker run --rm --volume="$(CURDIR):/srv/jekyll" -it velythyl/jekyll-ghp:latest   ghp_export
