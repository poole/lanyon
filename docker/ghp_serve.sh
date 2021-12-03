#!/bin/bash
port="${PORT:-4000}"
jekyll clean
jekyll serve --port ${port}