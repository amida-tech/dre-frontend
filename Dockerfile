# Install CentOS 7
FROM centos:centos7

MAINTAINER Jacob Sachs <jacob@amida-tech.com>

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN yum install -y epel-release
# Add additional tools
RUN yum install -y git make

# Install Node and NPM
RUN git clone https://github.com/creationix/nvm.git /.nvm && \
    echo ". /.nvm/nvm.sh" >> /etc/bash.bashrc

ENV NODE_VERSION 0.12.2

RUN . /.nvm/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    nvm alias default $NODE_VERSION

RUN ln -s /.nvm/versions/node/v$NODE_VERSION/bin/node /usr/bin/node && \
    ln -s /.nvm/versions/node/v$NODE_VERSION/bin/npm /usr/bin/npm

# Install Ruby and associated tools
RUN yum install -y ruby && \
    yum install -y gcc ruby-devel rubygems

# Install Compass
RUN gem update --system && \
    gem install compass; exit 0

# Install Bower
RUN npm install -g bower

# Install Grunt
RUN npm install -g grunt-cli

# Install app dependencies
COPY package.json /src/package.json
COPY bower.json /src/bower.json
RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
    cd /src && \
    npm install && \
    bower install

# Bundle app source code
COPY . /src

# Build the dist
RUN cd /src && \
    grunt build -f && \
    grunt ngconstant:docker

# Expose bound port
EXPOSE 9000

# Run the app
WORKDIR "/src"
CMD ["grunt", "serve:docker"]

