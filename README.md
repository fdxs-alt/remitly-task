docker build . -t value-converter
docker run -it -p 3000:3000 --rm -d value-converter
