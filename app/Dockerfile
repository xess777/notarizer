FROM python:3.6
MAINTAINER Andrew Andreev <master@fordina.com>

# Create the group and user to be used in this container
RUN groupadd flaskgroup && useradd -m -g flaskgroup -s /bin/bash flask

# Create the working directory (and set it as the working directory)
RUN mkdir -p /home/flask/app
WORKDIR /home/flask/app

# Copy the source code into the container
COPY . /home/flask/app

# Install the package dependencies (this step is separated
# from copying all the source code to avoid having to
# re-install all python packages defined in requirements.txt
# whenever any source code change is made)
RUN pip install --no-cache-dir -r requirements.txt

RUN chown -R flask:flaskgroup /home/flask

USER flask